// Array pra armazenar os comentários
let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];

function postarComentario() {
    const campo = document.getElementById('comentario');
    const texto = campo.value.trim();
    if (texto === '') return;

    const novoComentario = {
        id: Date.now(),
        texto,
        respostas: [],
        curtidas: 0,
        concluido: false
    };

    comentarios.push(novoComentario);
    salvar();
    renderizarComentarios();
    campo.value = '';
}

function responderComentario(id) {
    const resposta = prompt('Digite sua resposta:');
    if (resposta) {
        const comentario = comentarios.find(c => c.id === id);
        comentario.respostas.push(resposta);
        salvar();
        renderizarComentarios();
    }
}

function curtirComentario(id) {
    const comentario = comentarios.find(c => c.id === id);
    comentario.curtidas += 1;
    salvar();
    renderizarComentarios();
}

function marcarConcluido(id) {
    if (confirm('Tem certeza que deseja marcar como concluído?')) {
        comentarios = comentarios.filter(c => c.id !== id);
        salvar();
        renderizarComentarios();
    }
}

function salvar() {
    localStorage.setItem('comentarios', JSON.stringify(comentarios));
}

function renderizarComentarios() {
    const secao = document.getElementById('comentarios');
    secao.innerHTML = '';

    comentarios.forEach(c => {
        const div = document.createElement('div');
        div.className = 'comentario';

        div.innerHTML = `
            <p>${c.texto}</p>
            <p>❤️ ${c.curtidas} curtidas</p>
            <button onclick="curtirComentario(${c.id})">Curtir</button>
            <button onclick="responderComentario(${c.id})">Responder</button>
            <button onclick="marcarConcluido(${c.id})">Concluir (Admin)</button>
        `;

        // Respostas
        if (c.respostas.length > 0) {
            const resp = document.createElement('div');
            resp.style.marginTop = '10px';
            c.respostas.forEach(r => {
                const p = document.createElement('p');
                p.style.marginLeft = '15px';
                p.style.color = '#00cec9';
                p.innerText = `↪️ ${r}`;
                resp.appendChild(p);
            });
            div.appendChild(resp);
        }

        secao.appendChild(div);
    });
}

// 🐾 Patinhas descendo (animação divertida)
setInterval(() => {
    const patinha = document.createElement('div');
    patinha.className = 'patinhas';
    patinha.style.setProperty('--random', Math.random());
    patinha.innerText = Math.random() > 0.5 ? '🐾' : '🐶';
    document.body.appendChild(patinha);
    setTimeout(() => patinha.remove(), 8000);
}, 5000);

// Carregar comentários no início
renderizarComentarios();
