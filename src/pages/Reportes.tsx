import { useEffect, useState } from "react";
import { FRAUD_API_URL } from "@/lib/config";

interface Fraud {
  id: number;
  impostorDetails: string;
  contactInfo: string;
  comments: string;
  createdAt: string;
}

const Reportes = () => {
  const [reportes, setReportes] = useState<Fraud[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(FRAUD_API_URL)
      .then((res) => res.json())
      .then((data) => { setReportes(data); setLoading(false); })
      .catch(() => { setError("Error al cargar los reportes."); setLoading(false); });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-red-600">Reportes de Fraude</h1>
        {loading && <p className="text-gray-500">Cargando reportes...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && reportes.length === 0 && <p className="text-gray-500">No hay reportes registrados.</p>}
        <div className="space-y-4">
          {reportes.map((r) => (
            <div key={r.id} className="bg-white rounded-xl shadow p-4">
              <p className="font-semibold text-gray-800">{r.impostorDetails}</p>
              <p className="text-sm text-gray-500">Contacto: {r.contactInfo}</p>
              <p className="text-sm text-gray-600">{r.comments}</p>
              <p className="text-xs text-gray-400 mt-1">{new Date(r.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reportes;