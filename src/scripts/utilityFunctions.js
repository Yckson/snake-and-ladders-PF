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
    // Obtém a referência ao elemento DOM que representa a lista de jogadores
    const jogadores = pegarElementos('#jogadores')[0];
    // Obtém o número atual de jogadores
    const numJogadores = pegarNumJogadores();
    // Verifica se já existem 4 jogadores, pois há um limite de 4 jogadores
    if (numJogadores >= 4){
        alert('Você já possui 4 jogadores!');
        return null;
    } 
    // Cria um novo elemento 'div' para representar o jogador
    const novoJogador = document.createElement('div');

    // Define a classe CSS 'jogador' para o novo jogador
    novoJogador.className = 'jogador';
    // Define um ID único para o novo jogador
    novoJogador.id = `jogador${numJogadores}`;

    // Cria elementos para o nome do jogador
    const jogadorLabelNome = document.createElement('label');
    jogadorLabelNome.textContent = `Jogador ${numJogadores + 1}`;
    jogadorLabelNome.setAttribute('for', `jogadorNome${numJogadores}`);

    const jogadorInputNome = document.createElement('input');
    jogadorInputNome.type = 'text';
    jogadorInputNome.id = `jogadorNome${numJogadores}: `;
    jogadorInputNome.placeholder = 'Nome do Jogador...';

    // Cria elementos para escolha da cor do jogador
    const jogadorLabelCor = document.createElement('label');
    jogadorLabelCor.setAttribute('for', `jogadorColor${numJogadores}`);
    jogadorLabelCor.classList.add('colorPicker');
    jogadorLabelCor.title = 'Escolha a cor do jogador';

    const jogadorInputCor = document.createElement('input');
    jogadorInputCor.type = 'color';
    jogadorInputCor.id = `jogadorColor${numJogadores}`;
    jogadorInputCor.classList.add('hide');
    jogadorInputCor.addEventListener('input', (e) => mostrarCorEscolhida(e));

    // Adiciona os elementos criados ao novo jogador
    novoJogador.appendChild(jogadorLabelNome);
    novoJogador.appendChild(jogadorInputNome);
    novoJogador.appendChild(jogadorLabelCor);
    novoJogador.appendChild(jogadorInputCor);
    
    // Adiciona o novo jogador à lista de jogadores
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
    // Obtém uma lista de elementos do DOM que correspondem ao seletor fornecido
    const elemento = pegarElementos(`${indentificador}`);
    // Define uma função auxiliar interna chamada 'esconderElementosAux' que recebe uma lista
    const esconderElementosAux = (lista) => {
        // Verifica se a lista de elementos está vazia
        if (lista.length === 0){ 
            return null; // Retorna 'null' quando todos os elementos foram ocultados
        }
        // Extrai o primeiro elemento da lista
        const [head, ...tail] = lista;
        head.classList.add('hide'); // Adiciona a classe 'hide' para ocultar o elemento
        // Chama recursivamente 'esconderElementosAux' para o restante da lista de elementos
        return esconderElementosAux(tail);
    }
    // Chama a função auxiliar 'esconderElementosAux' com a lista de elementos selecionados
    return esconderElementosAux(elemento);
}

// Função para colocar o boneco de um jogador no tabuleiro
const colocarBonecoJogador = (jogador) => {
    // Criação de elementos HTML para representar o boneco do jogador
    const boneco = document.createElement('div');
    const bonecoNome = document.createElement('p');
    const bonecoCorpo = document.createElement('div');

    // Define o conteúdo de texto do elemento 'bonecoNome' com o nome do jogador
    bonecoNome.textContent = jogador.nome.length > 5 ? jogador.nome.substring(0, 5) : jogador.nome;
    // Define a cor do texto do elemento 'bonecoNome' com base na cor do jogador
    bonecoNome.style.color = jogador.cor;

    // Adiciona classes CSS aos elementos 'boneco' para estilização
    boneco.classList.add('bonecoJogador');
    boneco.classList.add(`bonecoInicio`);
    // Define um ID único para o elemento 'boneco' com base no ID do jogador
    boneco.id = `${jogador.id}boneco`;

    // Define a cor de fundo do elemento 'bonecoCorpo' com base na cor do jogador
    bonecoCorpo.style.backgroundColor = jogador.cor;

    // Adiciona os elementos criados como filhos do elemento 'boneco'
    boneco.appendChild(bonecoNome);
    boneco.appendChild(bonecoCorpo);

    // Adiciona o elemento 'boneco' ao tabuleiro do jogo 
    pegarElementos('.bonecosDosJogadores')[0].appendChild(boneco);
}

// Função para mover o boneco de um jogador para uma casa específica
const moverBoneco = (jogador, numCasa) => {
    // Obtém uma referência ao elemento DOM que representa o boneco do jogador
    const boneco = pegarElementos(`#${jogador.id}boneco`)[0];
    
    // Adiciona a classe CSS 'bonecoMovido' ao boneco, para dar o efeito visual
    boneco.classList.add('bonecoMovido');
    // Remove o boneco de sua posição atual no tabuleiro
    boneco.remove();
    // Obtém uma referência ao elemento DOM da casa específica para onde o boneco deve ser movido
    pegarElementos(`#casa-${numCasa}`)[0].appendChild(boneco);
    
}

// Função para mostrar um elemento do tipo dado no DOM
const mostrarDado = () => {
    // Obtém uma referência ao elemento DOM que representa o dado
    const dado = pegarElementos('div.container')[0];
    // Remove a classe CSS 'hide' do elemento
    dado.classList.remove('hide');
}

// Função que mostra elementos com base no seletor CSS
const mostrarElemento = (seletor) => {
    // Obtém uma referência ao elemento DOM que corresponde ao seletor CSS fornecido
    const elemento = pegarElementos(seletor)[0];
    // Remove a classe CSS 'hide' do elemento
    elemento.classList.remove('hide');
}

// Função para remover bonecos de jogadores
const removerBonecos = (jogadores) => {
    // Verifica se a lista de jogadores está vazia
    if (jogadores.length === 0){
        return null; // Retorna 'null' quando todos os bonecos foram removidos
    }

    else{
        // Extrai o primeiro jogador da lista
        const [head, ...tail] = jogadores;
        // Obtém uma referência ao elemento DOM que representa o boneco do jogador e o remove
        pegarElementos(`#${head.id}boneco`)[0].remove();
        // Chama a função recursivamente com o restante da lista de jogadores
        return removerBonecos(tail); //
    }
}

// Função para criar a tela de vitória
const criarTelaVitoria = () => {
    // Cria um elemento <div> para representar a tela de vitória
    const telaVitoria = document.createElement('div');
    telaVitoria.id = 'telaVitoria';

    // Cria um elemento <p> para exibir o nome do jogador vencedor
    const nomeDoJogador = document.createElement('p');
    nomeDoJogador.id = 'nomeJogadorVencedor';

    // Cria um botão para permitir que o jogador inicie um novo jogo
    const botaoReiniciar = document.createElement('button');
    botaoReiniciar.id = 'btn-jogarNovamente';
    botaoReiniciar.innerHTML = 'Jogar Novamente';

    // Adiciona um evento de clique ao botão para chamar a função 'jogarNovamente'
    botaoReiniciar.addEventListener('click', jogarNovamente);

    // Adiciona os elementos criados como à tela de vitória
    telaVitoria.appendChild(nomeDoJogador);
    telaVitoria.appendChild(botaoReiniciar);
    pegarElementos('div.main')[0].appendChild(telaVitoria);

}

// Função para configurar um elemento de música
const configurarMusica = (nomeDaFaixa) => {
    // Cria um elemento <audio> para representar a faixa de música
    const faixa = document.createElement('audio');
    // Define o atributo 'src' do elemento de áudio para o caminho do arquivo de música
    faixa.src = `../src/ost/${nomeDaFaixa}`;
    // Define o ID do elemento de áudio com base no nome da faixa
    faixa.id = nomeDaFaixa;
    // Adiciona um evento 'ended' ao elemento de áudio e, quando o evento é acionado, a função verificarMomento(faixa) é chamada
    faixa.addEventListener('ended', ()=>{
        verificarMomento(faixa);
    })
    // Retorna o elemento de áudio configurado
    return faixa;
}

// Função para reproduzir uma faixa de música
const tocarMusica = (faixa) => {
    faixa.play(faixa);
}

// Função que altera a faixa de música a ser reproduzida com base no momento atual do jogo
const verificarMomento = (faixa) => {
    // Verifica o momento atual do jogo
    if (album.momentoAtual === 'menu'){
        // Se o momento for 'menu', verifica qual faixa está tocando
        if (faixa === album.menu01){
            // Se a faixa atual for 'menu01', troca para 'menu02' com auxílio da função `trocarMusica()`
            trocarMusica(album.menu02);
        }
        else {
            // Caso contrário, troca para 'menu01'
            trocarMusica(album.menu01);
        }
    }

    else if (album.momentoAtual === 'em jogo'){
        // Se o momento for 'em jogo', verifica qual faixa está tocando
        if (faixa === album.coreDia01){
            // Se a faixa atual for 'coreDia01', troca para 'coreDia02'
            trocarMusica(album.coreDia02);
        }
        else if (faixa === album.coreDia02){
            // Se a faixa atual for 'coreDia02', troca para 'coreNoite01'
            trocarMusica(album.coreNoite01);
        }
        else if (faixa === album.coreNoite01){
            // Se a faixa atual for 'coreNoite01', troca para 'coreNoite02'
            trocarMusica(album.coreNoite02);
        }
        else{
            // Caso contrário, troca de volta para 'coreDia01'
            trocarMusica(album.coreDia01);
        }
    }

    // Se o momento for 'vitoria', troca para a faixa 'victory01'
    else if (album.momentoAtual === 'vitoria'){
        trocarMusica(album.victory01);
    }
    
}

// Função para trocar a faixa de música atual
const trocarMusica = (faixa) => {
    // Pausa a faixa de música atual
    album.musicaAtual.pause();
    // Atualiza a faixa de música atual para a nova faixa
    album.musicaAtual = faixa;
    // Inicia a reprodução da nova faixa de música
    tocarMusica(album.musicaAtual);
}

// Função para mudar o momento atual do jogo, ou seja, em qual fase do jogo o jogador se encontra.
const mudarMomento = (momento) => {
    // Atualiza o momento atual do jogo com o valor passado como argumento
    album.momentoAtual = momento;

}

// Função para criar e exibir a primeira interação com o usuário 
const interacaoUsuario = () => {
    // Cria um elemento <div> para representar a interação
    const interacao = document.createElement('div');
    // Cria um elemento <p> para exibir uma mensagem ao usuário
    const interacaoMensagem = document.createElement('p');
    // Cria um elemento <button> para que o usuário possa prosseguir
    const interacaoBotao = document.createElement('button');

    // Define o ID do elemento de interação
    interacao.id = 'interacao';
    // Define o conteúdo de texto da mensagem que será exibida para o usuário
    interacaoMensagem.innerHTML = 'Por favor, aperte no botão para iniciar o jogo!';
    // Define o texto do botão que o usuário irá clicar
    interacaoBotao.innerHTML = 'PROSSEGUIR!';

    // Adiciona a mensagem e o botão aos elementos de interação
    interacao.appendChild(interacaoMensagem);
    interacao.appendChild(interacaoBotao);
    pegarElementos('div.main')[0].appendChild(interacao);

}

// Função assíncrona para criar um atraso antes de chamar outra função
async function esperar(tempo, funcao) {
    await new Promise(resolve => setTimeout(resolve, tempo)); // Aguarda 2 segundos
    funcao();
  }
  