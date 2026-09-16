import { useEffect, useState } from "react";
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

const STORAGE_KEY = "gamebot-ai-projects-v1";
const SELECTED_PROJECT_KEY = "gamebot-ai-selected-project-v1";

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

function buildProject(name, focus, lastIdea, messages = []) {
  return {
    id: Date.now() + Math.random(),
    name,
    focus,
    updatedAt: "agora",
    lastIdea,
    messages,
  };
}

const starterProjects = [
  buildProject(
    "Neon Drift",
    "Corrida cyberpunk",
    "Jogador corre por ruas neón enquanto evita drones e coleta energia.",
    initialMessages,
  ),
  buildProject(
    "Dungeon Echo",
    "RPG em masmorras",
    "Labirinto com salas aleatórias, tesouros e chefões de fase.",
    [
      {
        type: "bot",
        text: "Vamos criar uma masmorra com desafios e loot estratégico.",
      },
      {
        type: "user",
        text: "Quero uma ideia de dungeon crawler.",
      },
    ],
  ),
];

function buildLocalReply(prompt) {
  const normalized = prompt.toLowerCase();

  if (
    normalized.includes("personagem") ||
    normalized.includes("personagem principal")
  ) {
    return "Personagem sugerido: Kairo, um hacker órfão de megacidade que usa pulseiras cibernéticas para manipular energia. Ele é rápido, furtivo e aprende novas habilidades ao longo do jogo.";
  }

  if (
    normalized.includes("missao") ||
    normalized.includes("missão") ||
    normalized.includes("quest")
  ) {
    return "Missão principal: invadir a torre central para desligar a IA corrupta que bloqueia a cidade. A missão deve incluir infiltração, combate em plataforma e escolha de rota entre três setores.";
  }

  if (
    normalized.includes("fase") ||
    normalized.includes("nivel") ||
    normalized.includes("nível")
  ) {
    return "Fase sugerida: Ruas de Neon. O jogador atravessa avenidas em alta velocidade, evita drones, coleta energia e enfrenta um miniboss no final da rua principal.";
  }

  return `Ideia de jogo: ${prompt}. Crie um jogo em 2D com visual cyberpunk, mecânica de exploração, fases rápidas, mecânico de coleta, inimigos padronizados e uma missão final onde o jogador destrói a rede central da cidade.`;
}

function loadLocalProjects() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return starterProjects;
    }

    const parsed = JSON.parse(stored);

    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (error) {
    console.error("Erro ao carregar projetos salvos:", error);
  }

  return starterProjects;
}

function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(() => {
    const saved = localStorage.getItem(SELECTED_PROJECT_KEY);
    const numericSaved = Number(saved);

    if (saved && !Number.isNaN(numericSaved)) {
      return numericSaved;
    }

    return null;
  });
  const [projectName, setProjectName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadProjectsFromServer() {
      try {
        const response = await fetch("/api/projects");

        if (!response.ok) {
          throw new Error("Erro ao carregar projetos do backend");
        }

        const serverProjects = await response.json();

        if (Array.isArray(serverProjects) && serverProjects.length > 0) {
          setProjects(serverProjects);
          setSelectedProjectId((currentSelection) => {
            const saved = localStorage.getItem(SELECTED_PROJECT_KEY);
            const candidate = Number(saved);

            if (saved && !Number.isNaN(candidate)) {
              return serverProjects.some((project) => project.id === candidate)
                ? candidate
                : serverProjects[0].id;
            }

            return currentSelection ?? serverProjects[0].id;
          });

          return;
        }
      } catch (error) {
        console.error("Erro ao carregar projetos da API:", error);
      }

      const fallbackProjects = loadLocalProjects();
      setProjects(fallbackProjects);
      setSelectedProjectId(fallbackProjects[0]?.id ?? starterProjects[0].id);
    }

    loadProjectsFromServer();
  }, []);

  const selectedProject =
    projects.find((project) => project.id === selectedProjectId) ?? projects[0];
  const messages = selectedProject?.messages ?? [];

  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    }
  }, [projects]);

  useEffect(() => {
    if (selectedProjectId) {
      localStorage.setItem(SELECTED_PROJECT_KEY, String(selectedProjectId));
    }
  }, [selectedProjectId]);

  useEffect(() => {
    if (!projects.length) {
      const fallbackProjects = loadLocalProjects();
      setProjects(fallbackProjects);
      setSelectedProjectId(fallbackProjects[0]?.id ?? starterProjects[0].id);
      return;
    }

    const hasSelected = projects.some((project) => project.id === selectedProjectId);

    if (!hasSelected && selectedProjectId !== null) {
      setSelectedProjectId(projects[0].id);
    }
  }, [projects, selectedProjectId]);

  async function addProject() {
    const trimmedName = projectName.trim();

    if (!trimmedName) {
      return;
    }

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          focus: "Novo conceito de jogo",
          lastIdea: "Projeto em andamento com foco em ideias iniciais de gameplay.",
          messages: [
            {
              type: "bot",
              text: `Vamos começar o projeto ${trimmedName}. Qual é a principal ideia do seu jogo?`,
            },
          ],
        }),
      });

      const createdProject = await response.json();

      if (!response.ok) {
        throw new Error(createdProject.message || "Erro ao criar projeto");
      }

      setProjects((previousProjects) => [createdProject, ...previousProjects]);
      setSelectedProjectId(createdProject.id);
      setProjectName("");
      return;
    } catch (error) {
      console.error("Erro ao criar projeto no backend:", error);
    }

    const newProject = buildProject(
      trimmedName,
      "Novo conceito de jogo",
      "Projeto em andamento com foco em ideias iniciais de gameplay.",
      [
        {
          type: "bot",
          text: `Vamos começar o projeto ${trimmedName}. Qual é a principal ideia do seu jogo?`,
        },
      ],
    );

    setProjects((previousProjects) => [newProject, ...previousProjects]);
    setSelectedProjectId(newProject.id);
    setProjectName("");
  }

  async function syncProjectWithServer(projectId, nextMessages, summaryText) {
    const currentProject = projects.find((project) => project.id === projectId);

    if (!currentProject) {
      return;
    }

    try {
      await fetch(`/api/projects/${projectId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: currentProject.name,
          focus: currentProject.focus,
          lastIdea: summaryText,
          messages: nextMessages,
        }),
      });
    } catch (error) {
      console.error("Erro ao sincronizar projeto com o backend:", error);
    }
  }

  function updateProjectMessages(projectId, nextMessages, summaryText) {
    setProjects((previousProjects) =>
      previousProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              messages: nextMessages,
              lastIdea: summaryText,
              updatedAt: "agora",
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

    if (!selectedProject) {
      return;
    }

    const nextMessages = [
      ...selectedProject.messages,
      {
        type: "user",
        text: trimmed,
      },
    ];

    updateProjectMessages(selectedProjectId, nextMessages, trimmed);
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
      const finalMessages = [
        ...nextMessages,
        {
          type: "bot",
          text: botReply,
        },
      ];

      updateProjectMessages(selectedProjectId, finalMessages, botReply);
      await syncProjectWithServer(selectedProjectId, finalMessages, botReply);
    } catch (error) {
      const fallbackReply = buildLocalReply(trimmed);
      const finalMessages = [
        ...nextMessages,
        {
          type: "bot",
          text: fallbackReply,
        },
      ];

      updateProjectMessages(selectedProjectId, finalMessages, fallbackReply);
      await syncProjectWithServer(selectedProjectId, finalMessages, fallbackReply);
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