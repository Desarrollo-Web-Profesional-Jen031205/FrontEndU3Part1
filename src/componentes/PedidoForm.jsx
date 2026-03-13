import { useState } from "react";
import API from "../servicios/api";

function PedidoForm() {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    fecha_solicitud: "",
    fecha_envio: "",
    total: "",
    pagado: [],
    comentario: "",
  });

  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Manejo especial para checkboxes múltiples
  const handlePagadoChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setForm({
        ...form,
        pagado: [...form.pagado, value],
      });
    } else {
      setForm({
        ...form,
        pagado: form.pagado.filter((metodo) => metodo !== value),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await API.post("/pedidos", form);
      alert("Pedido guardado correctamente");
      setForm({
        nombre: "",
        telefono: "",
        fecha_solicitud: "",
        fecha_envio: "",
        total: "",
        pagado: [],
        comentario: "",
      });
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-cute relative min-h-screen overflow-hidden bg-gradient-to-br from-violet-100 via-indigo-50 to-blue-100">
      <div className="pointer-events-none absolute -top-28 left-2 h-72 w-72 rounded-full bg-violet-300/60 blur-3xl" />
      <div className="pointer-events-none absolute top-12 -right-10 h-72 w-72 rounded-full bg-sky-300/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-1/3 h-80 w-80 rounded-full bg-indigo-300/55 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(255,255,255,0.7),transparent_38%),radial-gradient(circle_at_82%_14%,rgba(255,255,255,0.62),transparent_35%)]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-3xl rounded-[2.2rem] border border-violet-100/80 bg-white/85 p-8 shadow-[0_28px_75px_-35px_rgba(99,102,241,0.7)] backdrop-blur-md">
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-indigo-600">
                Registro de Pedido
              </h2>
              <p className="mt-1 text-sm text-violet-500">
                Completa los datos para guardar un nuevo pedido
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-2xl border border-violet-200 bg-white/70 px-4 py-2 text-sm font-semibold text-indigo-600 shadow-sm transition hover:bg-indigo-50"
            >
              Cerrar sesion
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-indigo-600">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-violet-200 bg-indigo-50/70 px-4 py-3 text-indigo-900 shadow-sm outline-none transition placeholder:text-indigo-300 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-indigo-600">
                Telefono
              </label>
              <input
                type="text"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                maxLength="10"
                required
                className="w-full rounded-2xl border border-violet-200 bg-indigo-50/70 px-4 py-3 text-indigo-900 shadow-sm outline-none transition placeholder:text-indigo-300 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-indigo-600">
                Metodos de Pago
              </label>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {["Efectivo", "Transferencia", "Tarjeta", "Depósito"].map(
                  (metodo) => (
                    <label
                      key={metodo}
                      className="flex items-center gap-2 rounded-2xl border border-violet-100 bg-violet-50/70 p-3 text-indigo-700 shadow-sm transition hover:bg-indigo-50"
                    >
                      <input
                        type="checkbox"
                        value={metodo}
                        checked={form.pagado.includes(metodo)}
                        onChange={handlePagadoChange}
                        className="h-4 w-4 accent-indigo-500"
                      />
                      <span className="font-medium">{metodo}</span>
                    </label>
                  ),
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-indigo-600">
                  Fecha Solicitud
                </label>
                <input
                  type="date"
                  name="fecha_solicitud"
                  value={form.fecha_solicitud}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-violet-200 bg-indigo-50/70 px-4 py-3 text-indigo-900 shadow-sm outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-indigo-600">
                  Fecha Envio
                </label>
                <input
                  type="date"
                  name="fecha_envio"
                  value={form.fecha_envio}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-violet-200 bg-indigo-50/70 px-4 py-3 text-indigo-900 shadow-sm outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-indigo-600">
                Total ($)
              </label>
              <input
                type="number"
                name="total"
                value={form.total}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-violet-200 bg-indigo-50/70 px-4 py-3 text-indigo-900 shadow-sm outline-none transition placeholder:text-indigo-300 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-indigo-600">
                Comentario
              </label>
              <textarea
                name="comentario"
                value={form.comentario}
                onChange={handleChange}
                rows="3"
                className="w-full rounded-2xl border border-violet-200 bg-indigo-50/70 px-4 py-3 text-indigo-900 shadow-sm outline-none transition placeholder:text-indigo-300 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:from-indigo-600 hover:via-violet-600 hover:to-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Guardando..." : "Guardar Pedido"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PedidoForm;
