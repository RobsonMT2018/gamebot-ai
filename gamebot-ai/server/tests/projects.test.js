import test from 'node:test';
import assert from 'node:assert/strict';
import { app } from '../src/server.js';

async function request(appInstance, path, options = {}) {
  const server = appInstance.listen(0);
  const address = server.address();
  const baseUrl = `http://127.0.0.1:${address.port}`;

  try {
    const response = await fetch(`${baseUrl}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });

    return {
      status: response.status,
      body: await response.json(),
    };
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

test('GET /api/projects returns a list', async () => {
  const response = await request(app, '/api/projects');
  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body));
});

test('POST /api/projects creates a project', async () => {
  const response = await request(app, '/api/projects', {
    method: 'POST',
    body: JSON.stringify({
      name: 'Teste Persistência',
      focus: 'RPG de exploração',
      lastIdea: 'Um mundo com masmorras e escolhas.',
    }),
  });

  assert.equal(response.status, 201);
  assert.equal(response.body.name, 'Teste Persistência');
  assert.ok(Array.isArray(response.body.messages));
});
