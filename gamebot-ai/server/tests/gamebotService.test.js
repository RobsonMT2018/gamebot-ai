import test from 'node:test';
import assert from 'node:assert/strict';

import { generateGameBotReply } from '../src/services/gamebotService.js';

test('generateGameBotReply returns a fallback answer when OPENAI_API_KEY is not configured', async () => {
  delete process.env.OPENAI_API_KEY;

  const response = await generateGameBotReply('Crie um jogo estilo plataforma em pixel art');

  assert.match(response, /GameBot AI|pixel art|plataforma/i);
});
