const iniciarJogo = ()=>{
    
}

const criarJogador = () => {
    
}

const configurarNovoJogador = (main) => {
    const jogadores = pegarElemento('jogadores');
    const novoJogador = document.createElement('div');
    novoJogador.addEventListener('input', (e) => mostrarCorEscolhida(e));

    novoJogador.className = 'jogador';

    const jogadorLabelNome = document.createElement('label');
    jogadorLabelNome.textContent = `Jogador ${main.numJogadores + 1}`;
    jogadorLabelNome.setAttribute('for', `jogador${main.numJogadores}`);

    const jogadorInputNome = document.createElement('input');
    jogadorInputNome.type = 'text';
    jogadorInputNome.id = `jogador${main.numJogadores}: `;
    jogadorInputNome.placeholder = 'Nome do Jogador...';

    const jogadorLabelCor = document.createElement('label');
    jogadorLabelCor.setAttribute('for', `jogadorcolor${main.numJogadores}`);
    jogadorLabelCor.classList.add('colorPicker');
    jogadorLabelCor.title = 'Escolha a cor do jogador';

    const jogadorInputCor = document.createElement('input');
    jogadorInputCor.type = 'color';
    jogadorInputCor.id = `jogadorcolor${main.numJogadores}`;
    jogadorInputCor.classList.add('hide');

    novoJogador.appendChild(jogadorLabelNome);
    novoJogador.appendChild(jogadorInputNome);
    novoJogador.appendChild(jogadorLabelCor);
    novoJogador.appendChild(jogadorInputCor);
    jogadores.appendChild(novoJogador);


}



const construirTabuleiro = (acc=1)=>{
    const tabuleiro = pegarElemento('tabuleiro');
    if(acc > 100){
        tabuleiro.classList.remove('hide');
        return null;
    }
    
    tabuleiro.appendChild(criarCasa(acc));

    return construirTabuleiro(acc + 1);

}

const criarCasa = (id)=>{
    const casa = document.createElement('div');

    casa.classList.add('casa');
    casa.id = id;

    return casa;
}