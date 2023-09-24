document.addEventListener('DOMContentLoaded', configurarNovoJogador);




pegarElementos('#adicionarJogador')[0].addEventListener('click', configurarNovoJogador);

pegarElementos('#btn-iniciar')[0].addEventListener('click', () => {
    console.log(iniciarJogo());
});