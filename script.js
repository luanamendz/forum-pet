function adicionarComentario() {
  const campo = document.getElementById('comentario');
  const texto = campo.value.trim();

  if (texto === '') {
    alert('Por favor, escreva algo antes de enviar!');
    return;
  }

  const comentarios = document.getElementById('comentarios');

  const novoComentario = document.createElement('div');
  novoComentario.className = 'comentario';
  novoComentario.textContent = texto;

  comentarios.prepend(novoComentario);

  campo.value = '';
}
