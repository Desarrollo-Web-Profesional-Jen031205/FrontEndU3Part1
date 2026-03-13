import { useState } from "react";
import Login from "./componentes/Login";
import PedidoForm from "./componentes/PedidoForm";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold">Pedidos</h1>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            setToken(null);
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Cerrar sesión
        </button>
      </div>

      <PedidoForm />
    </div>
  );
}

export default App;
