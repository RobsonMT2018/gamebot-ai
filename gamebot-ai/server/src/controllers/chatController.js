import { generateGameBotReply } from '../services/gamebotService.js';

export async function chatController(req, res) {
  try {
    const { message } = req.body || {};

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Digite uma mensagem válida.',
      });
    }

    const reply = await generateGameBotReply(message);

    return res.json({
      success: true,
      response: reply,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Erro ao processar a mensagem.',
      error: error.message,
    });
  }
}
