import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://localhost:7098/api/Fraud";

const ReportarFraude = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    impostorDetails: "",
    contactInfo: "",
    comments: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!form.impostorDetails || !form.contactInfo) {
      setError("Los campos de detalles del impostor y contacto son obligatorios.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok || res.status === 201) {
        setSuccess(true);
        setForm({ impostorDetails: "", contactInfo: "", comments: "" });
      } else {
        setError("Error al enviar el reporte. Intente de nuevo.");
      }
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-red-600">Reportar Fraude</h1>

        {success && (
          <div className="mb-4">
            <p className="text-green-600 font-medium">✅ Reporte enviado exitosamente.</p>
            <button
              onClick={() => navigate("/")}
              className="mt-3 w-full bg-gray-800 text-white py-2 rounded-lg font-medium hover:bg-gray-900"
            >
              Volver al inicio
            </button>
          </div>
        )}
        {error && <p className="mb-4 text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Detalles del impostor *</label>
            <input
              name="impostorDetails"
              value={form.impostorDetails}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm"
              placeholder="Nombre, descripción del impostor..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Contacto (correo, teléfono, usuario) *</label>
            <input
              name="contactInfo"
              value={form.contactInfo}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm"
              placeholder="email@ejemplo.com o @usuario"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Comentarios</label>
            <textarea
              name="comments"
              value={form.comments}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm"
              rows={4}
              placeholder="Descripción adicional del caso..."
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700"
          >
            {loading ? "Enviando..." : "Enviar Reporte"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportarFraude;