import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./template.css";
import templateData from "./emailTemplates.json";

const Template = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleSelect = (id) => {
    setSelectedTemplate(prev => prev === id ? null : id);
  };

  const handleContinue = () => {
    if (!selectedTemplate) {
      alert("Please select a template to continue.");
      return;
    }
    navigate("/UploadCustomers");
  };

  const renderContent = (content) => {
    if (content.body) {
      return content.body.map((section, i) => (
        <div key={i}>
          <strong>{section.heading}</strong>
          <ul>
            {section.points.map((p, idx) => <li key={idx}>{p}</li>)}
          </ul>
        </div>
      ));
    }

    if (content.engaging_questions) {
      return (
        <ul>
          {content.engaging_questions.map((q, i) => <li key={i}>{q}</li>)}
        </ul>
      );
    }

    if (content.whats_included) {
      return (
        <ul>
          {content.whats_included.map((w, i) => <li key={i}>{w}</li>)}
        </ul>
      );
    }

    return null;
  };

  return (
    <div className="template-container">

      {/* PAGE HEADER */}
      <h1 className="template-title">Choose Email Campaign Template</h1>
      <p className="template-subtitle">
        Select the structure of your email campaign before sending.
      </p>

      {/* TEMPLATE CARDS GRID */}
      <div className="templates-grid">
        {templateData.email_templates.map(template => (
          <div
            key={template.id}
            className={`template-card ${selectedTemplate === template.id ? "selected" : ""}`}
            onClick={() => handleSelect(template.id)}
          >
            {/* CARD HEADER */}
            <h3>{template.name}</h3>

            {/* SUBJECT LINE */}
            <p className="template-subject">{template.subject}</p>

            {/* PREVIEW CONTENT */}
            <div className="template-hover">
              {template.content.introduction && (
                <p>{template.content.introduction}</p>
              )}

              {renderContent(template.content)}

              {template.content.cta && (
                <p className="cta-line">
                  <strong>CTA</strong>
                  {template.content.cta}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CONTINUE ACTION */}
      <button className="template-continue-btn" onClick={handleContinue}>
        Continue →
      </button>

    </div>
  );
};

export default Template;
