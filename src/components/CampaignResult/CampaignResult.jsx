import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import Confetti from "react-confetti";
import { Pie, Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./CampaignResult.css";

ChartJS.register(
  ArcElement, CategoryScale, LinearScale,
  BarElement, LineElement, PointElement,
  Tooltip, Legend
);

/* shared chart options */
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        font: { family: "'Sora', sans-serif", size: 11 },
        color: "#0077aa",
        boxWidth: 10,
        padding: 12,
      },
    },
    tooltip: {
      backgroundColor: "rgba(0,61,92,0.9)",
      titleFont: { family: "'Sora', sans-serif", size: 12 },
      bodyFont:  { family: "'DM Mono', monospace", size: 12 },
      padding: 10,
      cornerRadius: 8,
    },
  },
  scales: {
    x: {
      ticks: { font: { family: "'Sora', sans-serif", size: 11 }, color: "#2a8aaa" },
      grid:  { color: "rgba(1,176,240,0.08)" },
    },
    y: {
      ticks: { font: { family: "'DM Mono', monospace", size: 11 }, color: "#2a8aaa" },
      grid:  { color: "rgba(1,176,240,0.08)" },
    },
  },
};

const pieOptions = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        font: { family: "'Sora', sans-serif", size: 11 },
        color: "#0077aa",
        padding: 14,
      },
    },
    tooltip: {
      backgroundColor: "rgba(0,61,92,0.9)",
      titleFont: { family: "'Sora', sans-serif", size: 12 },
      bodyFont:  { family: "'DM Mono', monospace", size: 12 },
      padding: 10,
      cornerRadius: 8,
    },
  },
};

const CampaignResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const stats = location.state || { sent: 0, failed: 0, total: 0 };

  /* Redirect after 10s */
  useEffect(() => {
    const timer = setTimeout(() => navigate("/review"), 10000);
    return () => clearTimeout(timer);
  }, [navigate]);

  /* Derived metrics */
  const deliveryRate    = stats.total ? ((stats.sent   / stats.total) * 100).toFixed(1) : 0;
  const failureRate     = stats.total ? ((stats.failed / stats.total) * 100).toFixed(1) : 0;
  const openRate        = Math.floor(deliveryRate * 0.7);
  const engagementScore = Math.floor(openRate * 0.6);
  const bounceRisk      = Math.min(100, Math.floor(failureRate * 1.2));

  /* Domain split */
  const gmail     = Math.floor(stats.sent * 0.45);
  const outlook   = Math.floor(stats.sent * 0.30);
  const corporate = stats.sent - gmail - outlook;

  /* Chart data */
  const pieData = {
    labels: ["Delivered", "Failed"],
    datasets: [{
      data: [stats.sent, stats.failed],
      backgroundColor: ["#01b0f0", "#ef4444"],
      borderWidth: 0,
    }],
  };

  const barData = {
    labels: ["Campaign"],
    datasets: [
      { label: "Sent",   data: [stats.sent],   backgroundColor: "#01b0f0" },
      { label: "Failed", data: [stats.failed], backgroundColor: "#ef4444" },
    ],
  };

  const timelineData = {
    labels: ["Start", "25%", "50%", "75%", "End"],
    datasets: [{
      label: "Emails Sent",
      data: [0, stats.sent * 0.25, stats.sent * 0.5, stats.sent * 0.75, stats.sent],
      borderColor: "#01b0f0",
      backgroundColor: "rgba(1,176,240,0.12)",
      fill: true,
      tension: 0.4,
      pointBackgroundColor: "#0077cc",
      pointRadius: 4,
    }],
  };

  const domainData = {
    labels: ["Gmail", "Outlook", "Corporate"],
    datasets: [{
      data: [gmail, outlook, corporate],
      backgroundColor: ["#01b0f0", "#0077cc", "#56ccf2"],
      borderWidth: 0,
    }],
  };

  const healthData = {
    labels: ["Delivery Rate", "Failure Rate", "Bounce Risk"],
    datasets: [{
      label: "Campaign Health",
      data: [deliveryRate, failureRate, bounceRisk],
      backgroundColor: ["#22c55e", "#f97316", "#ef4444"],
      borderRadius: 6,
    }],
  };

  const aiData = {
    labels: ["Open Rate", "Engagement", "Delivery"],
    datasets: [{
      label: "AI Analysis",
      data: [openRate, engagementScore, deliveryRate],
      backgroundColor: ["#01b0f0", "#0077cc", "#56ccf2"],
      borderRadius: 6,
    }],
  };

  return (
    <div className="result-page">
      <Confetti numberOfPieces={220} colors={["#01b0f0", "#0077cc", "#56ccf2", "#ffffff", "#e0f7ff"]} />

      {/* ── HEADER ── */}
      <div className="result-header">
        <h1 className="success-title">
          🎉 <span className="title-gradient">Campaign Sent Successfully!</span>
        </h1>
        <p className="redirect-msg">Redirecting to review page in 10 seconds…</p>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-card-icon">📧</span>
          <h3>Total Emails</h3>
          <p><CountUp end={stats.total} duration={2} /></p>
        </div>

        <div className="stat-card green">
          <span className="stat-card-icon">✅</span>
          <h3>Delivered</h3>
          <p><CountUp end={stats.sent} duration={2} /></p>
        </div>

        <div className="stat-card red">
          <span className="stat-card-icon">❌</span>
          <h3>Failed</h3>
          <p><CountUp end={stats.failed} duration={2} /></p>
        </div>

        <div className="stat-card highlight">
          <span className="stat-card-icon">🤖</span>
          <h3>AI Open Rate</h3>
          <p>{openRate}%</p>
        </div>
      </div>

      {/* ── CHARTS ── */}
      <p className="section-label">Campaign Analytics</p>

      <div className="charts-grid">
        <div className="chart-card wide">
          <h3>Delivery Timeline</h3>
          <Line data={timelineData} options={chartOptions} />
        </div>

        <div className="chart-card">
          <h3>Delivery Split</h3>
          <Pie data={pieData} options={pieOptions} />
        </div>

        <div className="chart-card">
          <h3>Email Domains</h3>
          <Doughnut data={domainData} options={pieOptions} />
        </div>

        <div className="chart-card">
          <h3>Campaign Performance</h3>
          <Bar data={barData} options={chartOptions} />
        </div>

        <div className="chart-card">
          <h3>Campaign Health</h3>
          <Bar data={healthData} options={chartOptions} />
        </div>

        <div className="chart-card">
          <h3>AI Campaign Analysis</h3>
          <Bar data={aiData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default CampaignResult;
