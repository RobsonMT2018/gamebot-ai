const { createGameConcept } = require('../services/aiService');

async function getGameConcept(req, res, next) {
  try {
    const prompt = req.query.prompt || 'Crie uma ideia original para um jogo de aventura com temática cyberpunk.';
    const concept = await createGameConcept(prompt);

    res.status(200).json({
      success: true,
      data: concept,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getGameConcept,
};
