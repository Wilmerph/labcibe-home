export const REPORTS_URL =
  import.meta.env.VITE_REPORTS_URL ?? "/reportar-estafa";

// Ruta relativa: en Netlify netlify.toml / _redirects reenvían a Monster (evita mixed content).
export const FRAUD_API_URL =
  import.meta.env.VITE_FRAUD_API_URL ?? "/api/Fraud";
