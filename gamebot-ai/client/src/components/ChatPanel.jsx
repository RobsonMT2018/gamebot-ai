function ChatPanel() {
  return (
    <section className="chat-panel">
      <div className="chat-message assistant">
        <span className="badge">IA</span>
        <p>Olá! Posso ajudar a criar ideias, missões, personagens e mecânicas para o seu próximo jogo.</p>
      </div>

      <div className="chat-message user">
        <span className="badge">Você</span>
        <p>Quero um jogo de ficção científica com exploração e combate intenso.</p>
      </div>

      <div className="chat-input-row">
        <input type="text" placeholder="Descreva sua ideia de jogo..." />
        <button type="button">Enviar</button>
      </div>
    </section>
  );
}

export default ChatPanel;
