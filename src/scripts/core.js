const iniciarJogo = ()=>{
    
}

const criarJogador = () => {
    
}

//Função responsável por colocar um novo jogador na lista inicial de criação de jogadores.

const configurarNovoJogador = () => {
    const jogadores = pegarElemento('jogadores');
    const numJogadores = document.querySelectorAll('div.jogadores > *').length;
    console.log(numJogadores);
    const novoJogador = document.createElement('div');
    novoJogador.addEventListener('input', (e) => mostrarCorEscolhida(e));

    novoJogador.className = 'jogador';

    const jogadorLabelNome = document.createElement('label');
    jogadorLabelNome.textContent = `Jogador ${numJogadores + 1}`;
    jogadorLabelNome.setAttribute('for', `jogador${numJogadores}`);

    const jogadorInputNome = document.createElement('input');
    jogadorInputNome.type = 'text';
    jogadorInputNome.id = `jogador${numJogadores}: `;
    jogadorInputNome.placeholder = 'Nome do Jogador...';

    const jogadorLabelCor = document.createElement('label');
    jogadorLabelCor.setAttribute('for', `jogadorcolor${numJogadores}`);
    jogadorLabelCor.classList.add('colorPicker');
    jogadorLabelCor.title = 'Escolha a cor do jogador';

    const jogadorInputCor = document.createElement('input');
    jogadorInputCor.type = 'color';
    jogadorInputCor.id = `jogadorcolor${numJogadores}`;
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
    const fotoElemento = document.querySelector("#foto");
    const totalElemento = document.querySelector("#total");
    // Aqui ocorre a sincronia da imagem que será mostrada do valor obtido no dado.
    // Ex: se o valor do dado for 1, será exibido o que está armazena no index 0 da lista de imagens.
    fotoElemento.setAttribute("src", imagens[valorDado]); //Atualiza o atributo da imagem.
    totalElemento.innerHTML = `Você rolou ${valorDado + 1}`; //Mostra o valor obtido no dado.
}

// Função que permite rolar o dado ao pressionar o botão especificado.
const rolar = () => {
    // Através do forEach, é adicionado a classe "agitar" a cada uma das imagens.
    dado.forEach(adicionarClasseAgitar);
    setTimeout(() => { // 1s de delay para evitar o spam no clique de rolagem do dado.
    dado.forEach(removerClasseAgitar); // Remoção do efeito de agitação.
    const valorDado = Math.floor(Math.random() * 6); // Valor aleatório gerado entre 0 e 5.
    atualizarDado(valorDado); // Chamando a função responsável por atualizar as propriedades do dado
    }, 1000);
}
  
//DDGSD

const jogador1Input = document.getElementById("player1");
const jogador2Input = document.getElementById("player2");

let jogadorAtual = jogador1Input.value;

const alternarJogador = () => {
    if (jogadorAtual === jogador1Input.value) {
        jogadorAtual = jogador2Input.value;
    } else {
        jogadorAtual = jogador1Input.value;
    }
  
    const turnoDoJogador = document.querySelector("#turnPlayer");
    turnoDoJogador.textContent = `Vez de: ${jogadorAtual}`;
}

const rolarEAtualizarJogador = () => {
    rolar(); 
    alternarJogador(); 
}

const btnRolarDado = document.querySelector("#btn-rolar");
btnRolarDado.addEventListener("click", rolarEAtualizarJogador);
