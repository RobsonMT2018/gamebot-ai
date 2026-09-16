import express from 'express';

const router = express.Router();

const projects = [
  {
    id: 1,
    name: 'Neon Drift',
    focus: 'Corrida cyberpunk',
    updatedAt: 'agora',
    lastIdea: 'Jogador corre por ruas neón enquanto evita drones e coleta energia.',
    messages: [
      {
        type: 'bot',
        text: 'Crie um jogo de plataforma em pixel art com fases curtas, protagonista com pulo duplo e chefão final.',
      },
      {
        type: 'user',
        text: 'Quero uma ideia para um jogo 2D com temática cyberpunk.',
      },
    ],
  },
  {
    id: 2,
    name: 'Dungeon Echo',
    focus: 'RPG em masmorras',
    updatedAt: 'há 10 min',
    lastIdea: 'Labirinto com salas aleatórias, tesouros e chefões de fase.',
    messages: [
      {
        type: 'bot',
        text: 'Vamos criar uma masmorra com desafios e loot estratégico.',
      },
      {
        type: 'user',
        text: 'Quero uma ideia de dungeon crawler.',
      },
    ],
  },
];

router.get('/projects', (req, res) => {
  res.status(200).json(projects);
});

router.post('/projects', (req, res) => {
  const { name, focus, lastIdea, messages = [] } = req.body || {};

  if (!name || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: 'O nome do projeto é obrigatório.',
    });
  }

  const newProject = {
    id: Date.now(),
    name: name.trim(),
    focus: focus?.trim() || 'Novo conceito de jogo',
    updatedAt: 'agora',
    lastIdea: lastIdea?.trim() || 'Projeto em andamento com foco em ideias iniciais de gameplay.',
    messages: Array.isArray(messages) ? messages : [],
  };

  projects.unshift(newProject);

  return res.status(201).json(newProject);
});

router.patch('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { name, focus, lastIdea, messages } = req.body || {};

  const projectIndex = projects.findIndex((project) => String(project.id) === String(id));

  if (projectIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Projeto não encontrado.',
    });
  }

  const project = projects[projectIndex];

  const updatedProject = {
    ...project,
    name: name?.trim() || project.name,
    focus: focus?.trim() || project.focus,
    lastIdea: lastIdea?.trim() || project.lastIdea,
    updatedAt: 'agora',
    messages: Array.isArray(messages) ? messages : project.messages,
  };

  projects[projectIndex] = updatedProject;

  return res.status(200).json(updatedProject);
});

export default router;
