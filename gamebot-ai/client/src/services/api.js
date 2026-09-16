const API_BASE = "/api";

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro na requisição");
  }

  return response.json();
}

export const api = {
  chat(message) {
    return request("/chat", {
      method: "POST",
      body: JSON.stringify({ message }),
    });
  },
  health() {
    return request("/health");
  },
};

export default api;
