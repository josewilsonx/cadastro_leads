import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "styles.css";

// Conexão com Supabase
const supabase = createClient(
  "https://ndyeusyrtxzctwtngdnq.supabase.co", 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5keWV1c3lydHh6Y3R3dG5nZG5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4OTE1NjIsImV4cCI6MjA1NTQ2NzU2Mn0.TQd81_2bg8sBWFNe0QkBUBbmdPrRpPM5qMXOgPX8YWE"
);

export default function FarmaciaSite() {
  const [showModal, setShowModal] = useState(true);
  const [formData, setFormData] = useState({ nome: "", email: "", telefone: "", idade: "", genero: "", cep: "" });
  const [loading, setLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setButtonClicked(true);

    const { error } = await supabase.from("clientes").insert([formData]);
    if (error) {
      alert("Erro ao cadastrar. Tente novamente.");
    } else {
      setShowModal(false);
    }
    setLoading(false);
    setButtonClicked(false);
  };

  return (
    <div className="container">
      {showModal && (
        <div className="modal">
          <div className="modal-content fade-in">
            <h2>Cadastre-se e ganhe descontos!</h2>
            <form onSubmit={handleSubmit}>
              <input name="nome" placeholder="Nome" onChange={handleChange} required />
              <input name="email" type="email" placeholder="E-mail" onChange={handleChange} required />
              <input name="telefone" placeholder="Telefone" onChange={handleChange} required />
              <input name="idade" type="number" placeholder="Idade" onChange={handleChange} required />
              <input name="genero" placeholder="Gênero" onChange={handleChange} required />
              <input name="cep" placeholder="CEP" onChange={handleChange} required />
              <button 
                type="submit" 
                disabled={loading || buttonClicked} 
                className={buttonClicked ? "button-clicked" : ""}
              >
                {loading ? "Cadastrando..." : "Cadastrar"}
              </button>
            </form>
          </div>
        </div>
      )}
      <header>
        <h1>Farmácia Online</h1>
      </header>
      <main>
        <p>Confira nossos produtos abaixo:</p>
        {/* Aqui entrariam os produtos */}
      </main>
    </div>
  );
}
