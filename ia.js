// 🤖 IA responde perguntas frequentes
const perguntasFrequentes = {
  "ração": "🐾 Ração premium é sempre a melhor opção! Consulte seu veterinário.",
  "vomitando": "🚑 Seu pet precisa de cuidados! Leve ao veterinário imediatamente.",
  "banho": "🛁 Dê banho no seu pet a cada 15 dias, ou conforme orientação.",
  "vacina": "💉 Vacinas são essenciais! Consulte seu veterinário para o calendário completo.",
};

function respostaAutomatica(pergunta) {
  const chave = Object.keys(perguntasFrequentes).find(p => pergunta.toLowerCase().includes(p));
  return chave ? perguntasFrequentes[chave] : "🐶🐱 Ainda não sei responder isso... poste no fórum que alguém vai te ajudar!";
}
