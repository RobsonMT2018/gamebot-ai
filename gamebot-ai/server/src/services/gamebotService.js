import OpenAI from 'openai';

function createOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY?.trim();

  if (!apiKey) {
    return null;
  }

  return new OpenAI({ apiKey });
}

export async function generateGameBotReply(prompt) {
  const apiKey = process.env.OPENAI_API_KEY?.trim();

  if (!apiKey) {
    return `GameBot AI: ideia pronta para "${prompt}". Crie um jogo de plataforma em pixel art com fases curtas, mecânicas simples e objetivos claros. Use um protagonista com habilidade de pulo duplo, inimigos padrões e uma fase final com chefão.`;
  }

  const client = createOpenAIClient();

  if (!client) {
    return `GameBot AI: ideia pronta para "${prompt}". Crie um jogo de plataforma em pixel art com fases curtas, mecânicas simples e objetivos claros. Use um protagonista com habilidade de pulo duplo, inimigos padrões e uma fase final com chefão.`;
  }

  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'Você é um assistente para criar ideias, personagens, mecânicas e níveis de jogos digitais. Responda em português, de forma criativa e prática.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 250,
    });

    return completion.choices?.[0]?.message?.content?.trim() || 'GameBot AI não retornou uma resposta válida.';
  } catch (error) {
    console.error('Erro ao consultar OpenAI:', error?.message || error);
    return `GameBot AI: não foi possível consultar a IA neste momento. Fallback: "${prompt}" pode virar um jogo de plataforma em pixel art com progressão, inimigos simples e mecânica de coleta.`;
  }
}
