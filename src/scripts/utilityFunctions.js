// Função que retorna elementos HTML com base em uma consulta CSS
const pegarElementos = (query)=>{
    const elemento = document.querySelectorAll(query);
    return elemento;
}

// Função para mostrar a cor escolhida ao selecionar uma cor para um jogador
const mostrarCorEscolhida = (event) => {
    const id = event.target.id.slice(-1);
    const mudarCor = document.querySelector(`label[for="jogadorColor${id}"]`);
    mudarCor.style.backgroundColor = event.target.value;
}

// Função responsável por adicionar um novo jogador à lista inicial de criação de jogadores

const configurarNovoJogador = () => {
    const jogadores = pegarElementos('#jogadores')[0];
    const numJogadores = pegarNumJogadores();
    if (numJogadores >= 4){
        alert('Você já possui 4 jogadores!');
        return null;
    } 
    const novoJogador = document.createElement('div');

    novoJogador.className = 'jogador';
    novoJogador.id = `jogador${numJogadores}`;

    const jogadorLabelNome = document.createElement('label');
    jogadorLabelNome.textContent = `Jogador ${numJogadores + 1}`;
    jogadorLabelNome.setAttribute('for', `jogadorNome${numJogadores}`);

    const jogadorInputNome = document.createElement('input');
    jogadorInputNome.type = 'text';
    jogadorInputNome.id = `jogadorNome${numJogadores}: `;
    jogadorInputNome.placeholder = 'Nome do Jogador...';

    const jogadorLabelCor = document.createElement('label');
    jogadorLabelCor.setAttribute('for', `jogadorColor${numJogadores}`);
    jogadorLabelCor.classList.add('colorPicker');
    jogadorLabelCor.title = 'Escolha a cor do jogador';

    const jogadorInputCor = document.createElement('input');
    jogadorInputCor.type = 'color';
    jogadorInputCor.id = `jogadorColor${numJogadores}`;
    jogadorInputCor.classList.add('hide');
    jogadorInputCor.addEventListener('input', (e) => mostrarCorEscolhida(e));

    novoJogador.appendChild(jogadorLabelNome);
    novoJogador.appendChild(jogadorInputNome);
    novoJogador.appendChild(jogadorLabelCor);
    novoJogador.appendChild(jogadorInputCor);
    
    jogadores.appendChild(novoJogador);

    return null;


}

// Função para obter o número de jogadores na lista
const pegarNumJogadores = () => {
    const numJogadores = pegarElementos('div.jogadores > div.jogador').length;
    return numJogadores;
}

// Função para gerar um aviso (alerta) com um texto específico
const gerarAviso = (text) => {
    alert(text);
}

// Função para esconder elementos com base em um seletor CSS
const esconderElementos = (indentificador) => {
    const elemento = pegarElementos(`${indentificador}`);
    const esconderElementosAux = (lista) => {
        if (lista.length === 0){
            return null;
        }
        const [head, ...tail] = lista;
        head.classList.add('hide'); // Adiciona a classe 'hide' para ocultar o elemento
        return esconderElementosAux(tail);
    }
    return esconderElementosAux(elemento);
}

// Função para colocar o boneco de um jogador no tabuleiro
const colocarBonecoJogador = (jogador) => {
    const boneco = document.createElement('div');
    const bonecoNome = document.createElement('p');
    const bonecoCorpo = document.createElement('div');

    bonecoNome.textContent = jogador.nome.length > 5 ? jogador.nome.substring(0, 5) : jogador.nome;
    bonecoNome.style.color = jogador.cor;

    boneco.classList.add('bonecoJogador');
    boneco.classList.add(`bonecoInicio`);
    boneco.id = `${jogador.id}boneco`;

    bonecoCorpo.style.backgroundColor = jogador.cor;

    boneco.appendChild(bonecoNome);
    boneco.appendChild(bonecoCorpo);

    pegarElementos('.bonecosDosJogadores')[0].appendChild(boneco);
}

// Função para mover o boneco de um jogador para uma casa específica
const moverBoneco = (jogador, numCasa) => {
    const boneco = pegarElementos(`#${jogador.id}boneco`)[0];
    
    boneco.classList.add('bonecoMovido');
    boneco.remove();
    pegarElementos(`#casa-${numCasa}`)[0].appendChild(boneco);
    
}

const mostrarDado = () => {
    const dado = pegarElementos('div.container')[0];
    dado.classList.remove('hide');
}

// Função que mostra elementos com base no seletor CSS
const mostrarElemento = (seletor) => {
    const elemento = pegarElementos(seletor)[0];
    elemento.classList.remove('hide');
}

const removerBonecos = (jogadores) => {
    if (jogadores.length === 0){
        return null;
    }

    else{
        const [head, ...tail] = jogadores;
        pegarElementos(`#${head.id}boneco`)[0].remove();
        return removerBonecos(tail); //
    }
}

const criarTelaVitoria = () => {
    const telaVitoria = document.createElement('div');
    telaVitoria.id = 'telaVitoria';

    const nomeDoJogador = document.createElement('p');
    nomeDoJogador.id = 'nomeJogadorVencedor';

    const botaoReiniciar = document.createElement('button');
    botaoReiniciar.id = 'btn-jogarNovamente';
    botaoReiniciar.innerHTML = 'Jogar Novamente';

    botaoReiniciar.addEventListener('click', jogarNovamente);

    telaVitoria.appendChild(nomeDoJogador);
    telaVitoria.appendChild(botaoReiniciar);
    pegarElementos('div.main')[0].appendChild(telaVitoria);

}

const configurarMusica = (nomeDaFaixa) => {
    const faixa = document.createElement('audio');
    faixa.src = `../src/ost/${nomeDaFaixa}`;
    faixa.id = nomeDaFaixa;
    faixa.addEventListener('ended', ()=>{
        verificarMomento(faixa);
    })
    return faixa;
}

const tocarMusica = (faixa) => {
    faixa.play(faixa);
}

const verificarMomento = (faixa) => {
    if (album.momentoAtual === 'menu'){
        if (faixa === album.menu01){
            trocarMusica(album.menu02);
        }
        else {
            trocarMusica(album.menu01);
        }
    }

    else if (album.momentoAtual === 'em jogo'){
        if (faixa === album.coreDia01){
            trocarMusica(album.coreDia02);
        }
        else if (faixa === album.coreDia02){
            trocarMusica(album.coreNoite01);
        }
        else if (faixa === album.coreNoite01){
            trocarMusica(album.coreNoite02);
        }
        else{
            trocarMusica(album.coreDia01);
        }
    }

    else if (album.momentoAtual === 'vitoria'){
        trocarMusica(album.victory01);
    }
    
}

const trocarMusica = (faixa) => {
    album.musicaAtual.pause();
    album.musicaAtual = faixa;
    tocarMusica(album.musicaAtual);
}

const mudarMomento = (momento) => {
    album.momentoAtual = momento;

}

const interacaoUsuario = () => {
    const interacao = document.createElement('div');
    const interacaoMensagem = document.createElement('p');
    const interacaoBotao = document.createElement('button');

    interacao.id = 'interacao';
    interacaoMensagem.innerHTML = 'Por favor, aperte no botão para iniciar o jogo!';
    interacaoBotao.innerHTML = 'PROSSEGUIR!';

    interacao.appendChild(interacaoMensagem);
    interacao.appendChild(interacaoBotao);
    pegarElementos('div.main')[0].appendChild(interacao);

}

async function esperar(tempo, funcao) {
    await new Promise(resolve => setTimeout(resolve, tempo)); // Aguarda 2 segundos
    funcao();
  }