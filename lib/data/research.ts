// ─── Research Data ────────────────────────────────────────────────────────────

export interface ResearchHighlight {
  label: string;
  value: string;
}

export interface MethodologyStep {
  step: string;
  title: string;
  desc: string;
  color: string;
}

export interface ResearchPaper {
  tags: string[];
  titleParts: {
    prefix: string;
    accent: string;
    suffix: string;
  };
  abstract: string;
  accentColor: string;
  highlights: ResearchHighlight[];
  methodology: MethodologyStep[];
}

export const featuredResearch: ResearchPaper = {
  tags: ["Research Paper", "2025", "Machine Learning", "Explainable AI"],
  titleParts: {
    prefix: "Explainable Machine Learning Models for Dynamic Analysis of ",
    accent: "Stock Market Volatility",
    suffix: ": A Cross-Country Study",
  },
  abstract:
    "This research investigates the application of gradient boosting and explainability techniques to model and interpret dynamic stock market volatility regimes across multiple countries. By combining XGBoost with SHAP values and Ruptures change-point detection, the study delivers both predictive accuracy and transparent, interpretable AI insights for financial decision-making.",
  accentColor: "#06b6d4",
  highlights: [
    { label: "Model", value: "XGBoost + SHAP" },
    { label: "Focus", value: "Explainable AI" },
    { label: "Domain", value: "Financial Markets" },
    { label: "Scope", value: "Cross-Country Study" },
  ],
  methodology: [
    {
      step: "01",
      title: "Data Collection",
      desc: "Multi-country stock market historical data sourced and preprocessed for modelling.",
      color: "#06b6d4",
    },
    {
      step: "02",
      title: "Change-Point Detection",
      desc: "Applied Ruptures library to dynamically identify volatility regime shifts across time series.",
      color: "#8b5cf6",
    },
    {
      step: "03",
      title: "XGBoost Modelling",
      desc: "Gradient boosted ensemble trained to predict and classify volatility across detected regimes.",
      color: "#a8ff78",
    },
    {
      step: "04",
      title: "SHAP Explainability",
      desc: "SHapley Additive exPlanations applied to interpret feature importance and model decisions transparently.",
      color: "#f59e0b",
    },
  ],
};
