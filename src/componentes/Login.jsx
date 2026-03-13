import { useState } from "react";
import API from "../servicios/api";

function Login({ setToken }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/usuario/login", form);

      const token = res.data.token;

      localStorage.setItem("token", token);
      setToken(token);
    } catch (error) {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="font-cute relative min-h-screen overflow-hidden bg-gradient-to-br from-violet-100 via-indigo-50 to-blue-100">
      <div className="pointer-events-none absolute -top-24 left-2 h-72 w-72 rounded-full bg-violet-300/60 blur-3xl" />
      <div className="pointer-events-none absolute top-10 -right-8 h-72 w-72 rounded-full bg-sky-300/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-1/3 h-80 w-80 rounded-full bg-indigo-300/55 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(255,255,255,0.7),transparent_38%),radial-gradient(circle_at_82%_14%,rgba(255,255,255,0.62),transparent_35%)]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-md rounded-[2.2rem] border border-violet-100/80 bg-white/85 p-8 shadow-[0_28px_75px_-35px_rgba(99,102,241,0.7)] backdrop-blur-md">
          <div className="pointer-events-none absolute -mt-14 ml-[70%] h-16 w-16 rounded-full border-4 border-violet-200/70 bg-white/60" />

          <div className="mb-7 text-center">
            <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-400 to-blue-400 text-2xl font-extrabold text-white shadow-md shadow-indigo-200">
              P
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-indigo-600">
              Bienvenido
            </h1>
            <p className="mt-2 text-sm text-violet-500">
              Inicia sesion para continuar con tus pedidos
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="mb-1.5 block text-sm font-semibold text-indigo-600"
              >
                Usuario
              </label>

              <input
                id="username"
                type="text"
                name="username"
                placeholder="Ingresa tu usuario"
                className="w-full rounded-2xl border border-violet-200 bg-indigo-50/70 px-4 py-3 text-indigo-900 shadow-sm outline-none transition placeholder:text-indigo-300 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-semibold text-indigo-600"
              >
                Contrasena
              </label>

              <input
                id="password"
                type="password"
                name="password"
                placeholder="Ingresa tu contrasena"
                className="w-full rounded-2xl border border-violet-200 bg-indigo-50/70 px-4 py-3 text-indigo-900 shadow-sm outline-none transition placeholder:text-indigo-300 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:from-indigo-600 hover:via-violet-600 hover:to-blue-600"
            >
              Iniciar sesion
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
