async function createGameConcept(prompt) {
  return {
    title: 'Neon Drift',
    genre: 'Aventura cyberpunk',
    summary: `Uma ideia gerada a partir do prompt: "${prompt}". O jogo combina exploração, escolhas estratégicas e combate em um mundo futurista em colapso.`,
    pillars: ['Exploração', 'História', 'Mecânicas de progressão', 'Combate em alta velocidade'],
    createdAt: new Date().toISOString(),
  };
}

module.exports = {
  createGameConcept,
};
