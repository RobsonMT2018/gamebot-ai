import { useState } from "react";
import {
  Bot,
  Send,
  Gamepad2,
  Sparkles,
  Plus,
  FolderKanban,
  Sword,
  Map,
  Lightbulb,
} from "lucide-react";
import "./App.css";

const starterProjects = [
  {
    id: 1,
    name: "Neon Drift",
    focus: "Corrida cyberpunk",
    updatedAt: "agora",
    lastIdea: "Jogador corre por ruas neón enquanto evita drones e coleta energia.",
  },
  {
    id: 2,
    name: "Dungeon Echo",
    focus: "RPG em masmorras",
    updatedAt: "há 10 min",
    lastIdea: "Labirinto com salas aleatórias, tesouros e chefões de fase.",
  },
];

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

function buildLocalReply(prompt) {
  const normalized = prompt.toLowerCase();

  if (normalized.includes("personagem") || normalized.includes("personagem principal")) {
    return "Personagem sugerido: Kairo, um hacker órfão de megacidade que usa pulseiras cibernéticas para manipular energia. Ele é rápido, furtivo e aprende novas habilidades ao longo do jogo.";
  }

  if (normalized.includes("missao") || normalized.includes("missão") || normalized.includes("quest")) {
    return "Missão principal: invadir a torre central para desligar a IA corrupta que bloqueia a cidade. A missão deve incluir infiltração, combate em plataforma e escolha de rota entre três setores.";
  }

  if (normalized.includes("fase") || normalized.includes("nivel") || normalized.includes("nível")) {
    return "Fase sugerida: Ruas de Neon. O jogador atravessa avenidas em alta velocidade, evita drones, coleta energia e enfrenta um miniboss no final da rua principal.";
  }

  return `Ideia de jogo: ${prompt}. Crie um jogo em 2D com visual cyberpunk, mecânica de exploração, fases rápidas, mecânico de coleta, inimigos padronizados e uma missão final onde o jogador destrói a rede central da cidade.`;
}

function App() {
  const [projects, setProjects] = useState(starterProjects);
  const [selectedProjectId, setSelectedProjectId] = useState(starterProjects[0].id);
  const [projectName, setProjectName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  const selectedProject =
    projects.find((project) => project.id === selectedProjectId) ?? projects[0];

  function addProject() {
    const trimmedName = projectName.trim();

    if (!trimmedName) {
      return;
    }

    const newProject = {
      id: Date.now(),
      name: trimmedName,
      focus: "Novo conceito de jogo",
      updatedAt: "agora",
      lastIdea: "Projeto em andamento com foco em ideias iniciais de gameplay.",
    };

    setProjects((previousProjects) => [newProject, ...previousProjects]);
    setSelectedProjectId(newProject.id);
    setProjectName("");
  }

  function updateSelectedProject(summaryText) {
    setProjects((previousProjects) =>
      previousProjects.map((project) =>
        project.id === selectedProjectId
          ? {
              ...project,
              updatedAt: "agora",
              lastIdea: summaryText,
            }
          : project,
      ),
    );
  }

  async function submitPrompt(promptText) {
    const trimmed = promptText.trim();

    if (!trimmed) {
      return;
    }

    setMessages((previousMessages) => [
      ...previousMessages,
      {
        type: "user",
        text: trimmed,
      },
    ]);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await response.json();
      const botReply = data.response || data.message || buildLocalReply(trimmed);

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          type: "bot",
          text: botReply,
        },
      ]);

      updateSelectedProject(botReply);
    } catch (error) {
      const fallbackReply = buildLocalReply(trimmed);

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          type: "bot",
          text: fallbackReply,
        },
      ]);

      updateSelectedProject(fallbackReply);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    submitPrompt(message);
  }

  const quickIdeas = [
    "Crie um personagem principal para um jogo de plataforma cyberpunk.",
    "Sugira uma missão principal para um RPG de exploração.",
    "Crie uma fase icônica com desafios de velocidade e coleta.",
  ];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="brand-icon small-brand">
            <Bot size={18} />
          </div>
          <div>
            <h2>Projetos</h2>
          </div>
        </div>

        <div className="new-project">
          <input
            type="text"
            placeholder="Novo projeto"
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
          />
          <button type="button" onClick={addProject}>
            <Plus size={16} />
          </button>
        </div>

        <div className="project-list">
          {projects.map((project) => (
            <button
              key={project.id}
              type="button"
              className={`project-item ${
                selectedProjectId === project.id ? "project-item-active" : ""
              }`}
              onClick={() => setSelectedProjectId(project.id)}
            >
              <div className="project-icon">
                <FolderKanban size={16} />
              </div>
              <div className="project-copy">
                <strong>{project.name}</strong>
                <span>{project.focus}</span>
              </div>
            </button>
          ))}
        </div>
      </aside>

      <main className="app-card">
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
            personagens, missões e estruturas de jogo para seus projetos.
          </p>

          <div className="feature-list">
            <span>
              <Sparkles size={14} />
              Ideias para jogos
            </span>
            <span>
              <Lightbulb size={14} />
              Personagens
            </span>
            <span>
              <Map size={14} />
              Fases e missões
            </span>
          </div>
        </section>

        <section className="project-summary">
          <div className="summary-item">
            <Sword size={18} />
            <div>
              <span>Projeto ativo</span>
              <strong>{selectedProject?.name}</strong>
            </div>
          </div>
          <div className="summary-item">
            <Sparkles size={18} />
            <div>
              <span>Foco</span>
              <strong>{selectedProject?.focus}</strong>
            </div>
          </div>
        </section>

        <div className="quick-actions">
          {quickIdeas.map((idea) => (
            <button key={idea} type="button" onClick={() => submitPrompt(idea)}>
              {idea}
            </button>
          ))}
        </div>

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

          {isLoading && (
            <div className="message bot-message typing-message">
              <strong>GameBot AI</strong>
              <p>Está pensando na melhor ideia para o seu projeto...</p>
            </div>
          )}
        </section>

        <form className="chat-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ex: Crie uma ideia de jogo 2D, personagem e missão..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />

          <button type="submit" disabled={isLoading}>
            <Send size={18} />
            Enviar
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;