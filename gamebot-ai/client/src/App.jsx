import { useState } from "react";
import { Bot, Send, Gamepad2, Sparkles } from "lucide-react";
import "./App.css";

const initialMessages = [
  {
    type: "bot",
    text:
      "Crie um jogo de plataforma em pixel art com fases curtas, protagonista com pulo duplo e chefão final.",
  },
  {
    type: "user",
    text: "Quero uma ideia para um jogo 2D com temática cyberpunk.",
  },
  {
    type: "bot",
    text:
      "Posso ajudar com mecânicas, personagens, níveis e roteiro. Diga o estilo do jogo que você quer criar.",
  },
  {
    type: "user",
    text: "Ideias para jogos",
  },
];

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(initialMessages);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!message.trim()) {
      return;
    }

    const userMessage = message.trim();

    setMessages((previousMessages) => [
      ...previousMessages,
      {
        type: "user",
        text: userMessage,
      },
    ]);

    setMessage("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await response.json();

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          type: "bot",
          text: data.response || data.message,
        },
      ]);
    } catch (error) {
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          type: "bot",
          text: "Não foi possível conectar ao servidor.",
        },
      ]);
    }
  }

  return (
    <main className="app-container">
      <section className="app-card">
        <header className="app-header">
          <div className="brand">
            <div className="brand-icon">
              <Bot size={22} />
            </div>

            <div className="brand-text">
              <h1>GameBot AI</h1>
              <p>Seu assistente inteligente para desenvolvimento de jogos</p>
            </div>
          </div>

          <div className="status">
            <span className="status-dot" />
            Online
          </div>
        </header>

        <section className="hero">
          <div className="hero-icon">
            <Gamepad2 size={42} />
          </div>

          <h2>Crie. Codifique. Jogue.</h2>

          <p>
            Converse com o GameBot AI para criar ideias, mecânicas,
            personagens e sistemas para seus jogos digitais.
          </p>

          <div className="feature-list">
            <span>
              <Sparkles size={14} />
              Ideias para jogos
            </span>
            <span>
              <Sparkles size={14} />
              Código JavaScript
            </span>
            <span>
              <Sparkles size={14} />
              Mecânicas de gameplay
            </span>
          </div>
        </section>

        <section className="chat-area">
          {messages.map((item, index) => (
            <div
              key={`${item.type}-${index}`}
              className={`message ${
                item.type === "user" ? "user-message" : "bot-message"
              }`}
            >
              <strong>{item.type === "user" ? "Você" : "GameBot AI"}</strong>
              <p>{item.text}</p>
            </div>
          ))}
        </section>

        <form className="chat-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ex: Crie uma ideia de jogo 2D..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />

          <button type="submit">
            <Send size={18} />
            Enviar
          </button>
        </form>
      </section>
    </main>
  );
}

export default App;