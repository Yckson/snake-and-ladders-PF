// Espera o evento 'DOMContentLoaded' para configurar um novo jogador quando a página estiver totalmente carregada.
document.addEventListener('DOMContentLoaded', ()=>{
    configurarNovoJogador();
    // Adiciona um ouvinte de evento ao botão com id 'adicionarJogador' para configurar um novo jogador ao clicar nele.
    pegarElementos('#adicionarJogador')[0].addEventListener('click', configurarNovoJogador);

    // Adiciona um ouvinte de evento ao botão com id 'btn-iniciar' para iniciar o jogo ao clicar nele.
    pegarElementos('#btn-iniciar')[0].addEventListener('click', () => {
        const main = iniciarJogo();
        globalThis.main = main;
    }
    );

    pegarElementos("#btn-rolar")[0].addEventListener("click", rolarEAtualizarJogador);
    pegarElementos("#btn-reiniciarJogo")[0].addEventListener("click", () => reiniciarJogo());

    interacaoUsuario();

    pegarElementos('#interacao > button')[0].addEventListener("click", (event)=>{
        trocarMusica(album.menu01)
        pegarElementos('#interacao')[0].remove();
    });


});





