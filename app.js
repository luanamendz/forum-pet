// 🌞🌙 Alternância de fundo dia/noite
const hora = new Date().getHours();
if (hora >= 6 && hora < 18) {
  document.body.style.backgroundImage = "url('public/imagens/fundo-dia.png')";
} else {
  document.body.style.backgroundImage = "url('public/imagens/fundo-noite.png')";
}

// 🔊 Som de interação
function tocarSom() {
  const som = document.getElementById('somInteracao');
  if (som) som.play();
}

// 🐾 Animação de patinhas
for (let i = 0; i < 5; i++) {
  const patinha = document.createElement('div');
  patinha.classList.add('patinha');
  patinha.innerHTML = '🐾';
  document.body.appendChild(patinha);
}

// 🚀 Banco de dados local (substituir pelo Firebase depois)
let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];

// 📝 Adiciona comentário
function adicionarComentario() {
  const texto = document.getElementById('comentario').value.trim();
  const imagem = document.getElementById('imagemComentario').files[0];
  if (texto === '') return alert('Digite um comentário.');

  let imagemURL = '';
  if (imagem) {
    imagemURL = URL.createObjectURL(imagem);
  }

  const novoComentario = {
    id: Date.now(),
    texto,
    imagem: imagemURL,
    respostas: [],
    curtidas: 0,
    concluido: false
  };

  comentarios.push(novoComentario);
  salvarComentarios();
  renderizarComentarios();
  document.getElementById('comentario').value = '';
  document.getElementById('imagemComentario').value = '';
  tocarSom();
}

// 💾 Salva no localStorage (substituir por Firebase depois)
function salvarComentarios() {
  localStorage.setItem('comentarios', JSON.stringify(comentarios));
}

// 🖥️ Renderiza os comentários
function renderizarComentarios() {
  const div = document.getElementById('comentarios');
  if (!div) return;
  div.innerHTML = '';

  comentarios.filter(c => !c.concluido).forEach(c => {
    const comentario = document.createElement('div');
    comentario.className = 'comentario';

    comentario.innerHTML = `
      <p>${c.texto}</p>
      ${c.imagem ? `<img src="${c.imagem}">` : ''}
      <p>👍 ${c.curtidas} <button onclick="curtir(${c.id})">Curtir</button></p>
      <button onclick="responder(${c.id})">Responder</button>
      <button onclick="concluir(${c.id})">Marcar como Concluído</button>
      <div>${c.respostas.map(r => `<div class="resposta">${r}</div>`).join('')}</div>
    `;

    div.appendChild(comentario);
  });
}

// 💌 Responder comentário
function responder(id) {
  const resposta = prompt('Digite sua resposta:');
  if (!resposta) return;
  const c = comentarios.find(c => c.id === id);
  c.respostas.push(resposta);
  salvarComentarios();
  renderizarComentarios();
  tocarSom();
}

// ✅ Marcar como concluído
function concluir(id) {
  const c = comentarios.find(c => c.id === id);
  c.concluido = true;
  salvarComentarios();
  renderizarComentarios();
}

// ❤️ Curtir
function curtir(id) {
  const c = comentarios.find(c => c.id === id);
  c.curtidas++;
  salvarComentarios();
  renderizarComentarios();
  tocarSom();
}

// ▶️ Inicializa
renderizarComentarios();
