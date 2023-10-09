// http://127.0.0.1:5500/

// Função que inicia o jogo 
const iniciarJogo = ()=>{
    // Obtém a lista de jogadores a partir dos elementos DOM com a função auxiliar `construirJogadores()`.
    // Isso é feito através do seletor CSS '#jogadores > div.jogador' que encontra elementos HTML que correspondem aos jogadores.
    const listaJogadores = construirJogadores(pegarElementos('#jogadores > div.jogador'));
    // Verifica se há jogadores selecionados
    if (listaJogadores.length === 0){
        // Se nenhum jogador foi selecionado, gera um aviso
        return gerarAviso('Nenhum jogador foi selecionado!');
    }
    // Esconde elementos de configuração inicial e constrói o tabuleiro
    esconderElementos('div.configuracoesIniciais');
    construirTabuleiro();

    // Coloca os jogadores no tabuleiro à partir da lista de jogadores obtidos anteriormente.
    // O método .map() irá iterar para cada jogador na lista e chamará a função auxiliar `colocarBonecoJogador(jogador)`.
    listaJogadores.map((jogador)=>{
        colocarBonecoJogador(jogador);
    })

    //moverBoneco(listaJogadores[0], 10);
    //moverBoneco(listaJogadores[1], 10);
    //moverBoneco(listaJogadores[2], 10);
    //moverBoneco(listaJogadores[3], 10);

    mostrarDado(); // Mostra o dado na tela do jogo
    mostrarElemento('#btn-reiniciarJogo'); // Mostra o botão de reiniciar 
    mudarMomento('em jogo'); // Mostra a situação atual do jogo
    trocarMusica(album.coreDia01); // Atualiza as músicas que estão sendo tocadas no jogo

    // Retorna os dados iniciais do jogo
    return {
        jogadores: listaJogadores, // Propriedade que armazena a lista de jogadores
        qtdCasas: 100, // O número total de casas no tabuleiro do jogo
        casasEspeciais: [ // Lista de casas especiais com suas características
            [1, +20], // Casa 1: Move o jogador 20 casas adiante
            [4, +10], // Casa 4: Move o jogador 10 casas adiante
            [13, +18], // Casa 13: Move o jogador 18 casas adiante
            [23, +19], // Casa 23: Move o jogador 19 casas adiante
            [24, -21], // Casa 24: Move o jogador 21 casas para trás
            [25, +50], // Casa 25: Move o jogador 50 casas adiante
            [30, -21], // Casa 30: Move o jogador 21 casas para trás
            [37, +21], // Casa 37: Move o jogador 21 casas adiante
            [43, -36], // Casa 43: Move o jogador 36 casas para trás
            [49, +19], // Casa 49: Move o jogador 19 casas adiante
            [51, -19], // Casa 51: Move o jogador 19 casas para trás
            [59, +18], // Casa 59: Move o jogador 18 casas adiante
            [61, -21], // Casa 61: Move o jogador 21 casas para trás
            [69, +19], // Casa 69: Move o jogador 19 casas adiante
            [71, +21], // Casa 71: Move o jogador 21 casas adiante
            [73, -40], // Casa 73: Move o jogador 40 casas para trás
            [80, +19], // Casa 80: Move o jogador 19 casas adiante
            [84, -20], // Casa 84: Move o jogador 20 casas para trás
            [94, -60], // Casa 94: Move o jogador 60 casas para trás
            [96, -52]  // Casa 96: Move o jogador 52 casas para trás
        ],
        dado : { // Informações sobre o dado usado no jogo
            elemento: pegarElementos("img#foto")[0], // Elemento HTML da imagem do dado
            imagens: [ // Lista de nomes de imagem do dado
                "dado-01.svg",
                "dado-02.svg",
                "dado-03.svg",
                "dado-04.svg",
                "dado-05.svg",
                "dado-06.svg"
            ],

            jogadorAtual: listaJogadores[0] // O jogo inicia com o primeiro jogador da lista rolando o dado
        }
    }
}

// Função que constrói a lista de jogadores a partir dos elementos DOM
const construirJogadores = (listaJogadoresDOM) =>{
    // Se a lista de jogadores estiver vazia, retorna uma lista vazia
    if (listaJogadoresDOM.length === 0){
        return [];
    }

    // Divide a lista de jogadores em uma cabeça (head) e uma cauda (tail)
    const [head, ...tail] = listaJogadoresDOM;
    // Obtém o ID do jogador a partir do elemento DOM da cabeça
    const jogadorId = head.id;
    // Obtém o nome do jogador a partir do elemento de entrada de texto dentro do elemento DOM
    const jogadorNome = pegarElementos(`#${jogadorId} input[type="text"]`)[0].value;

    // Verifica se o nome do jogador está vazio
    if (jogadorNome === ""){
        // Se o nome do jogador estiver vazio, chama recursivamente a função com a cauda da lista
        return [...construirJogadores(tail)];
    }

    // Obtém a cor do jogador a partir do elemento de entrada de cor dentro do elemento DOM
    const jogadorCor = pegarElementos(`#${jogadorId} input[type="color"]`)[0].value;

    // Objeto com as informações do jogador
    const jogador = {
        nome: jogadorNome,
        id: jogadorId,
        casaAtual: 0,
        cor: jogadorCor,
    }

    // Retorna um array que contém o jogador atual e a lista de jogadores construídos recursivamente com a cauda
    return [jogador,...construirJogadores(tail)];
}

// Função que constrói o tabuleiro
// Ela recebe um argumento opcional acc com um valor padrão de 10.
// `acc` é uma valor que ajuda a determinar quantas casas devem ser criadas.
const construirTabuleiro = (acc=10)=>{
    // Armazena uma referência ao elemento DOM do tabuleiro 
    const tabuleiro = pegarElementos('#tabuleiro')[0];
    // Se acc for igual a 0, a função remove a classe hide do tabuleiro e retorna null.
    if (acc === 0){
        tabuleiro.classList.remove('hide');
        return null;
    }
    // A função então verifica se acc é um número par (acc % 2 === 0) e chama `construirTabuleiroAux` com valores específicos se for par
    // Ou chama `construirTabuleiroAux` com outros valores se for ímpar.
    if (acc % 2 === 0) construirTabuleiroAux(acc, acc-1, tabuleiro);
    else construirTabuleiroAux(acc-0.9, acc+0.1, tabuleiro);

    // A função construirTabuleiro é chamada recursivamente com acc decrementado em 1.
    return construirTabuleiro(acc - 1);
}

// Função auxiliar para construir o tabuleiro, que recebe `acc` (um valor atual), `final` (um valor final) e `tabuleiro` como argumentos. 
// Ela cria casas no tabuleiro com base em `acc` e `final`.
// A função verifica se `acc` é igual a `final` e, se for, retorna null para encerrar a recursão.
// Dependendo de se `final` é menor ou maior que `acc`, a função cria uma casa no tabuleiro multiplicando `acc` por 10
// e ajusta `acc` com um incremento ou decremento de 0.1. O valor resultante é arredondado para 1 casa decimal usando `parseFloat` e `toFixed`.
const construirTabuleiroAux = (acc, final, tabuleiro) => {
    tabuleiro = pegarElementos('#tabuleiro')[0];
    if (acc === final) return null;
    if (final < acc){
        tabuleiro.appendChild(criarCasa(acc * 10));
        return construirTabuleiroAux(parseFloat((acc - 0.1).toFixed(1)), final);
    }
    else {
        tabuleiro.appendChild(criarCasa(acc * 10));
        return construirTabuleiroAux(parseFloat((acc + 0.1).toFixed(1)), final);
    }

}

// Função que cria uma casa do tabuleiro
const criarCasa = (id)=>{
    // Cria um novo elemento div para representar uma casa do tabuleiro
    const casa = document.createElement('div');

    // Adiciona a classe 'casa' ao elemento div para aplicar estilos específicos
    casa.classList.add('casa');
    // Para a primeira casa, verifica se o ID da casa é menor que 1
    // Define o ID da casa como "casa-1"
    if (id < 1) casa.id = `casa-1`;
    // Define o ID da casa com base no valor passado como argumento
    else casa.id = `casa-${id}`;

    // Retorna o elemento div que representa a casa do tabuleiro
    return casa;
}

// Armazenando os nomes dos arquivos de imagens.
const imagens = [
    "dado-01.svg",
    "dado-02.svg",
    "dado-03.svg",
    "dado-04.svg",
    "dado-05.svg",
    "dado-06.svg"
];

// Dentro da constante dado será armazenada uma lista com todos os elementos "img".
 const dado = document.querySelectorAll("img");


// Função que irá colocar a animação de agitar a imagem do dado ao pressionar o botão de rolar o dado.
// Isso é feito através da propriedade classList, que permite o acesso à lista de classes dos elementos.
const adicionarClasseAgitar = (foto) => {
    foto.classList.add("agitar");
}

// Função que irá remover a animação de agitação da imagem após rolado o dado, também à partir do classList.
const removerClasseAgitar = (foto) => {
    foto.classList.remove("agitar");
}

// Função encarregada de sempre mudar o valor que foi rolado no dado.
const atualizarDado = (valorDado) => {
    // Seleção dos elementos por meio dos IDs.
    const fotoElemento = pegarElementos("#foto")[0];
    const totalElemento = pegarElementos("#total")[0];
    // Aqui ocorre a sincronia da imagem que será mostrada do valor obtido no dado.
    // Ex: se o valor do dado for 1, será exibido o que está armazena no index 0 da lista de imagens.
    fotoElemento.setAttribute("src", imagens[valorDado]);
     //Atualiza o atributo da imagem.
    totalElemento.innerHTML = `Você rolou ${valorDado + 1}`; //Mostra o valor obtido no dado.
}

// Função que permite rolar o dado ao pressionar o botão especificado.
const rolar = (dado) => {
    // Através do forEach, é adicionado a classe "agitar" a cada uma das imagens.
    adicionarClasseAgitar(dado);
    const valorDado = Math.floor(Math.random() * 6); // Valor aleatório gerado entre 0 e 5.
    // 1s de delay para evitar o spam no clique de rolagem do dado.

    esperar(1000, ()=>{
        removerClasseAgitar(dado);
        atualizarDado(valorDado);
    })
     // Chamando a função responsável por atualizar as propriedades do dado
    
    return valorDado;
}
  


//DDGSD
//Função para alternar o turno do jogador
const alternarJogadorDaVez = () => {
    // Obtém uma referência para o objeto 'dado' a partir de algum objeto global 'main'
    const dado = main.dado;

    // Verificar se main.dado ou a lista de jogadores estão vazias ou indefinidas
    // Verificação de segurança para garantir que o jogo tenha jogadores definidos antes de tentar alternar o jogador atual.
    if (dado && main.jogadores && main.jogadores.length > 0) {
        // As verificações passaram, a função prossegue. Ela obtém a lista de jogadores em main.jogadores e,
        // encontra o índice do jogador atual dentro dessa lista e incrementa esse índice para alternar para o próximo jogador.
        const jogadores = main.jogadores;
        let jogadorAtualIndex = jogadores.indexOf(dado.jogadorAtual);

        jogadorAtualIndex++;

        // Se o índice do jogador atual for maior ou igual ao número de jogadores, volte ao primeiro jogador
        if (jogadorAtualIndex >= jogadores.length) {
            jogadorAtualIndex = 0;
        }

        // setTimeout para adicionar o delay antes de atualizar o jogador
        
            // Atualizar o jogador atual no objeto
            dado.jogadorAtual = jogadores[jogadorAtualIndex];

            // Atualiza o elemento DOM com a informação do jogador atual
            const turnoDoJogador = pegarElementos("#turnPlayer")[0];
            turnoDoJogador.textContent = `Vez de: ${dado.jogadorAtual.nome}`;
     
    } else {
        // Exibe um erro no console se 'dado' ou a lista de jogadores estiverem vazios ou indefinidos
        console.error("O objeto main.dado ou a lista de jogadores está indefinido ou vazio.");
    }
}

// Função que realiza a atualização do jogador
const rolarEAtualizarJogador = () => {
    // Chama a função 'rolar' para obter um valor do dado e armazena-o em 'valorDoDado'
    const valorDoDado = rolar(main.dado.elemento);
    // Chama a função 'tocarMusica' para reproduzir uma música com base no valor do dado
    tocarMusica(album.dado[valorDoDado]);
    
    // Aguarda 1 segundo antes de executar o código dentro da função de callback
    esperar(1000, ()=>{
        // Chama a função 'verificaDado' para verificar o resultado do dado e atualizar o jogador atual
        verificaDado(main.dado.jogadorAtual, valorDoDado + 1);
        // Chama a função 'alternarJogadorDaVez' para passar a vez para o próximo jogador
        alternarJogadorDaVez();
    })
}


//está reiniciando o jogo com os mesmos jogadores 
const reiniciarJogo = () => {
    //Limpar o tabuleiro (remover as casas)
    const tabuleiro = pegarElementos('#tabuleiro')[0];
    removerBonecos(main.jogadores);
    tabuleiro.remove()
    const novoTabuleiro = document.createElement('div');
    novoTabuleiro.classList.add('tabuleiro');
    novoTabuleiro.id = 'tabuleiro';
    
    /*
    novoTabuleiro.classList.add('hide');
    novoTabuleiro.id = 'tabuleiro';
    */
    const divPrincipal = pegarElementos('div.main')[0];
    divPrincipal.appendChild(novoTabuleiro);
    /*
    mostrarElemento('div.configuracoesIniciais');
    */
    globalThis.main = iniciarJogo();

    // Reinicializar os jogadores
    const listaJogadoresDOM = pegarElementos('#jogadores > div.jogador');
    const listaJogadores = construirJogadores(listaJogadoresDOM);

    // Exibir elementos de configuração inicial
    mostrarElemento('div.configuracoesIniciais');

    // Limpar o dado e o total
    const fotoElemento = pegarElementos('#foto')[0];
    const totalElemento = pegarElementos('#total')[0];
    fotoElemento.setAttribute('src', ''); // Limpar a imagem do dado
    totalElemento.textContent = ''; // Limpar o texto do total

    // Atualizar o jogador atual para o primeiro jogador na lista
    if (listaJogadores.length > 0) {
        main.dado.jogadorAtual = listaJogadores[0];
    }
    
    // Atualizar a exibição do jogador atual
    const turnoDoJogador = pegarElementos('#turnPlayer')[0];
    turnoDoJogador.textContent = `Vez de: ${main.dado.jogadorAtual.nome}`;
}

// Função que tem é responsável por recarregar a página web atual, reiniciando o jogo
const jogarNovamente = () => {
     location.reload()
}

// Função relacionada ao movimento do jogador no jogo com base no valor do dado lançado
const verificaDado = (jogador, valorDado) => {
  // Obtém a posição atual do jogador no tabuleiro
  const casaAtual = jogador.casaAtual
  // Obtém as casas especiais do jogo a partir do objeto global 'main'
  const casaEspecial = main.casasEspeciais

  // Atualiza a posição do jogador com base no valor do dado
  jogador.casaAtual = jogador.casaAtual + valorDado

  // Garante que o jogador não vá além da última casa
  if (jogador.casaAtual > 100) {
    jogador.casaAtual = 100
  }

  // Verifica se o jogador chegou à casa 100
  if (jogador.casaAtual === 100) {
    // Muda o momento do jogo para 'vitoria'
    mudarMomento('vitoria');
    // Toca uma música de vitória do álbum
    tocarMusica(album.victorySfx);
    // Mostra a tela de vitória com o nome do jogador vencedor
    mostrarTelaVitoria(jogador.nome)

    }

    // Itera pelas casas especiais do jogo
    main.casasEspeciais.map((casaEspecial) => {
    if (jogador.casaAtual === casaEspecial[0]) {

        // Obtém a ação associada à casa especial
        const acao = casaEspecial[1]
        // Toca uma música de acordo com a ação (cobra ou escada)
        acao < 0 ? tocarMusica(album.snakeSfx) : tocarMusica(album.ladderSfx);

        // Move o jogador com base na ação
        jogador.casaAtual += acao
        
        
        


    }
})
// Move o boneco do jogador para sua nova posição no tabuleiro
moverBoneco(jogador, jogador.casaAtual)

}

// Função que mostra na tela o vencedor do jogo, recebendo como argumento o nome desse jogador
const  mostrarTelaVitoria = (jogadorwin) => {
    // Chama a função 'criarTelaVitoria' para criar a estrutura da tela de vitória
    criarTelaVitoria()
    // Obtém uma referência para o elemento da tela de vitória
    const tela = pegarElementos('div#telaVitoria')[0];
    // Obtém uma referência para o elemento de exibição do nome do jogador vencedor
    const jogador = pegarElementos('#nomeJogadorVencedor')[0];
    // Define o conteúdo do elemento com uma mensagem de parabéns ao jogador vencedor
    jogador.innerHTML = `Parabéns! O jogador ${jogadorwin} venceu!`;

}
