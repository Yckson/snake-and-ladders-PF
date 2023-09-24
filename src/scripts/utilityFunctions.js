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
    if (numJogadores === 4){
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

    bonecoNome.textContent = jogador.nome;
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