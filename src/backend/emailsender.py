import smtplib
import requests
from email.mime.text import MIMEText


# ==========================
# CONFIGURATION
# ==========================

OPENROUTER_API_KEY = "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"

MODEL = "openai/gpt-4o-mini"

SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587

SENDER_EMAIL = "bhosalesarvesh6@gmail.com"
APP_PASSWORD = "dbwg vvlz wybi lwnd"


# ==========================
# AI EMAIL GENERATION
# ==========================

def generate_ai_email(name, company, need, industry):

    prompt = f"""
Write a short professional B2B outreach email.

Recipient Name: {name}
Company: {company}
Industry: {industry}
HVAC Need: {need}

Requirements:
- Be professional
- Mention the company name
- Address the HVAC problem
- Offer LG Home Comfort solution
- Under 120 words
"""

    try:

        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": MODEL,
                "messages": [
                    {"role": "user", "content": prompt}
                ]
            }
        )

        data = response.json()

        if "choices" not in data:
            print("AI response error:", data)
            return fallback_email(name, company, need)

        return data["choices"][0]["message"]["content"]

    except Exception as e:

        print("AI generation error:", e)

        return fallback_email(name, company, need)


# ==========================
# FALLBACK EMAIL
# ==========================

def fallback_email(name, company, need):

    return f"""
Hi {name},

I came across {company} and noticed the growing need for reliable HVAC solutions.

At LG Home Comfort, we help businesses improve energy efficiency and indoor comfort through modern HVAC systems tailored to their needs.

I'd love to briefly connect and see how we might support {company}'s HVAC goals.

Best regards,
LG Home Comfort
"""


# ==========================
# EMAIL SENDING FUNCTION
# ==========================

def send_email(name, company, email, need, industry):

    try:

        email = email.strip()

        print("Preparing email for:", email)

        body = generate_ai_email(name, company, need, industry)

        subject = f"Helping {company} improve {need}"

        msg = MIMEText(body)
        msg["Subject"] = subject
        msg["From"] = SENDER_EMAIL
        msg["To"] = email

        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:

            # Enable SMTP debug logs
            server.set_debuglevel(1)

            server.ehlo()
            server.starttls()
            server.ehlo()

            print("Logging into Gmail SMTP")

            server.login(SENDER_EMAIL, APP_PASSWORD)

            print("Sending email to:", email)

            server.send_message(msg)

        print("Email sent successfully to:", email)

        return True

    except Exception as e:

        print("Email sending error:", e)

        return False