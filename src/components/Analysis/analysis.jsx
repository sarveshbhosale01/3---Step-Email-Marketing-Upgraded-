import React, { useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

function AnalysisPage() {
    const [file, setFile] = useState(null);
    const [summary, setSummary] = useState(null);
    const [chartsData, setChartsData] = useState(null);
    const [error, setError] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError("");
    };

    const handleUpload = async () => {
        if (!file) return setError("Please select a file first!");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:5000/upload", formData);
            setSummary(response.data.summary);
            setChartsData(response.data.chartsData);
        } catch (err) {
            setError(err.response?.data?.message || "Error uploading file.");
        }
    };

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BFF"];

    return (
        <div style={{ padding: "40px" }}>
            <h1>Data Analysis Dashboard</h1>
            <input type="file" accept=".csv, .xlsx" onChange={handleFileChange} />
            <button onClick={handleUpload}>Analyze File</button>
            {error && <p style={{ color: "red" }}>{error}</p>}

            {summary && (
                <div style={{ marginTop: "30px" }}>
                    <h2>Basic Summary</h2>
                    <p>Total Rows: {summary.totalRows}</p>
                    <p>Total Companies: {summary.totalCompanies}</p>
                    <p>Total RPCs: {summary.totalRPCs}</p>

                    <h2>Industry Distribution</h2>
                    <PieChart width={400} height={300}>
                        <Pie
                            data={chartsData.industryDistribution}
                            dataKey="count"
                            nameKey="industry"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                        >
                            {chartsData.industryDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>

                    <h2>HAVC Needs</h2>
                    <BarChart width={600} height={300} data={chartsData.havcNeeds}>
                        <XAxis dataKey="HAVC_Needs" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#01b0f0" />
                    </BarChart>
                </div>
            )}
        </div>
    );
}

export default AnalysisPage;
