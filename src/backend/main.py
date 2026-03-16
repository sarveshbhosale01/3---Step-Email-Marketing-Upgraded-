from flask import Flask, request, jsonify
import pandas as pd
import re
from flask_cors import CORS
from emailsender import send_email

app = Flask(__name__)

# Enable CORS for React frontend
CORS(app, origins=["http://localhost:5173"])

REQUIRED_COLUMNS = [
    "Company Name",
    "RPC Name",
    "RPC Email Address",
    "Industry",
    "HAVC Needs"
]

EMAIL_REGEX = r"^[^@]+@[^@]+\.[^@]+$"


@app.route("/upload", methods=["POST"])
def upload_file():

    file = request.files.get("file")

    if not file:
        return jsonify({"message": "No file uploaded"}), 400

    try:

        # Read file
        if file.filename.endswith(".csv"):
            df = pd.read_csv(file)
        else:
            df = pd.read_excel(file)

        # Validate required columns
        missing_cols = [col for col in REQUIRED_COLUMNS if col not in df.columns]

        if missing_cols:
            return jsonify({
                "message": f"Missing columns: {', '.join(missing_cols)}"
            }), 400

        total_rows = len(df)

        # Remove duplicates
        before = len(df)
        df = df.drop_duplicates(subset=["RPC Email Address"])
        duplicates_removed = before - len(df)

        # Invalid emails
        invalid_mask = ~df["RPC Email Address"].astype(str).str.match(EMAIL_REGEX)
        invalid_emails = df[invalid_mask].shape[0]
        df = df[~invalid_mask]

        # Domain issues
        domain_issue = df["RPC Email Address"].str.contains("@test|@example", na=False)
        domain_removed = df[domain_issue].shape[0]
        df = df[~domain_issue]

        # Bounce simulation
        soft_bounce = df["RPC Email Address"].str.contains("info@", na=False).sum()
        hard_bounce = df["RPC Email Address"].str.contains("noreply@", na=False).sum()

        clean_rows = len(df)

        # Save cleaned dataset
        df.to_csv("cleaned_data.csv", index=False)

        summary = {
            "totalRows": int(total_rows),
            "cleanRows": int(clean_rows),
            "duplicatesRemoved": int(duplicates_removed),
            "invalidEmails": int(invalid_emails),
            "domainIssues": int(domain_removed),
            "softBounceRisk": int(soft_bounce),
            "hardBounceRisk": int(hard_bounce),
            "totalCompanies": int(df["Company Name"].nunique()),
            "totalRPCs": int(df["RPC Name"].nunique())
        }

        return jsonify({"summary": summary})

    except Exception as e:
        return jsonify({"message": str(e)}), 500


@app.route("/send-campaign", methods=["POST"])
def send_campaign():

    try:

        df = pd.read_csv("cleaned_data.csv")

        sent = 0
        failed = 0

        for _, row in df.iterrows():

            name = row["RPC Name"]
            company = row["Company Name"]
            email = row["RPC Email Address"]
            need = row["HAVC Needs"]
            industry = row["Industry"]

            success = send_email(name, company, email, need, industry)

            if success:
                sent += 1
            else:
                failed += 1

        return jsonify({
            "sent": sent,
            "failed": failed,
            "total": len(df)
        })

    except Exception as e:
        return jsonify({"message": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)