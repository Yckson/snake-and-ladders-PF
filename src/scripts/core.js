// Função que inicia o jogo
const iniciarJogo = ()=>{
    // Obtém a lista de jogadores a partir dos elementos DOM
    const listaJogadores = construirJogadores(pegarElementos('#jogadores > div.jogador'));
    if (listaJogadores.length === 0){
        return gerarAviso('Nenhum jogador foi selecionado!');
    }
    // Esconde elementos de configuração inicial e constrói o tabuleiro
    esconderElementos('div.configuracoesIniciais');
    //construirTabuleiro();

    // Coloca os jogadores no tabuleiro
    listaJogadores.map((jogador)=>{
        colocarBonecoJogador(jogador);
    })

    //moverBoneco(listaJogadores[0], 10);
    //moverBoneco(listaJogadores[1], 10);
    //moverBoneco(listaJogadores[2], 10);
    //moverBoneco(listaJogadores[3], 10);

    mostrarDado();

    // Retorna os dados iniciais do jogo
    return {
        jogadores: listaJogadores,
        qtdCasas: 100,
        casasEspeciais: [
            [1, +20],
            [4, +10],
            [13, +18],
            [23, +19],
            [24, -21],
            [25, +50],
            [30, -21],
            [37, +21],
            [43, -36],
            [49, +19],
            [51, -19],
            [59, +18],
            [61, -21],
            [69, +19],
            [71, +21],
            [73, -40],
            [80, +19],
            [84, -20],
            [94, -60],
            [96, -52]
        ],
        dado : {
            elemento: pegarElementos("img#foto")[0],
            imagens: [
                "dado-01.svg",
                "dado-02.svg",
                "dado-03.svg",
                "dado-04.svg",
                "dado-05.svg",
                "dado-06.svg"
            ],

            jogadorAtual: listaJogadores[0]
        }
    }
}

// Função que constrói a lista de jogadores a partir dos elementos DOM
const construirJogadores = (listaJogadoresDOM) =>{
    if (listaJogadoresDOM.length === 0){
        return [];
    }

    const [head, ...tail] = listaJogadoresDOM;
    const jogadorId = head.id;
    const jogadorNome = pegarElementos(`#${jogadorId} input[type="text"]`)[0].value;

    if (jogadorNome === ""){
        return [...construirJogadores(tail)];
    }

    const jogadorCor = pegarElementos(`#${jogadorId} input[type="color"]`)[0].value;

    const jogador = {
        nome: jogadorNome,
        id: jogadorId,
        casaAtual: 0,
        cor: jogadorCor,
    }

    return [jogador,...construirJogadores(tail)];
}

// Função que constrói o tabuleiro
const construirTabuleiro = (acc=10)=>{
    const tabuleiro = pegarElementos('#tabuleiro')[0];
    if (acc === 0){
        //console.log(pegarElementos('#tabuleiro > div')[90].id = 'casa-1');
        tabuleiro.classList.remove('hide');
        return null;
    }
    if (acc % 2 === 0) construirTabuleiroAux(acc, acc-1, tabuleiro);
    else construirTabuleiroAux(acc-0.9, acc+0.1, tabuleiro);

    return construirTabuleiro(acc - 1);
}

// Função auxiliar para construir o tabuleiro
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
    const casa = document.createElement('div');

    casa.classList.add('casa');
    if (id < 1) casa.id = `casa-1`;
    else casa.id = `casa-${id}`;

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
    console.log(foto)
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
    fotoElemento.setAttribute("src", imagens[valorDado]); //Atualiza o atributo da imagem.
    totalElemento.innerHTML = `Você rolou ${valorDado + 1}`; //Mostra o valor obtido no dado.
}

// Função que permite rolar o dado ao pressionar o botão especificado.
const rolar = (dado) => {
    // Através do forEach, é adicionado a classe "agitar" a cada uma das imagens.
    adicionarClasseAgitar(dado);
    setTimeout(() => { // 1s de delay para evitar o spam no clique de rolagem do dado.
    removerClasseAgitar(dado); // Remoção do efeito de agitação.
    const valorDado = Math.floor(Math.random() * 6); // Valor aleatório gerado entre 0 e 5.
    atualizarDado(valorDado); // Chamando a função responsável por atualizar as propriedades do dado
    }, 1000);
}
  


//DDGSD

//nessa função, há alguma interferencia ao utilizar o evento, pois o dado para de funcionar(apenas erros kkkryng)
/*
const alternarJogadorDaVez = () => {
    
    const dado = main.dado
    const jogadores = dado.jogadores
    let jogadorAtualIndex = jogadores.indexOf(dado.jogadorAtual)

    //move pro proximo jogador
    jogadorAtualIndex++

    //volta pro jpgador 1
    if (jogadorAtualIndex >= jogadores.length) {
        jogadorAtualIndex = 0
    }

    
    dado.jogadorAtual = jogadores[jogadorAtualIndex]

    
    const turnoDoJogador = pegarElementos("#turnPlayer")[0]
    turnoDoJogador.textContent = dado.jogadorAtual.nome
}
const btnAlternarJogador = pegarElementos("#btn-rolar")[0];
btnAlternarJogador.addEventListener("click", alternarJogadorDaVez);

*/



const alternarJogadorDaVez = () => {
    const dado = main.dado;

    //verificar se main.dado ou a lista de jogadores estao vazias ou indef
    if (dado && dado.jogadores && dado.jogadores.length > 0) {
        const jogadores = dado.jogadores
        console.log(jogadores)
        let jogadorAtualIndex = jogadores.indexOf(dado.jogadorAtual)

        
        jogadorAtualIndex++

        
        if (jogadorAtualIndex >= jogadores.length) {
            jogadorAtualIndex = 0
        }

        //atualizar o jogador atual npo obj
        dado.jogadorAtual = jogadores[jogadorAtualIndex]

        const turnoDoJogador = pegarElementos("#turnPlayer")[0]
        turnoDoJogador.textContent = dado.jogadorAtual.nome
    } else {
        console.error("O objeto main.dado ou a lista de jogadores está indefinido ou vazio.")
    }
     console.log(main)
}

const rolarEAtualizarJogador = () => {
    rolar(main.dado.elemento)
    alternarJogadorDaVez()
}

