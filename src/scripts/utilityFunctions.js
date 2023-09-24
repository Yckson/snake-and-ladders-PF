const pegarElementos = (query)=>{
    const elemento = document.querySelectorAll(query);
    return elemento;
}

const mostrarCorEscolhida = (event) => {
    const id = event.target.id.slice(-1);
    const mudarCor = document.querySelector(`label[for="jogadorColor${id}"]`);
    mudarCor.style.backgroundColor = event.target.value;
}

//Função responsável por colocar um novo jogador na lista inicial de criação de jogadores.

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

const pegarNumJogadores = () => {
    const numJogadores = pegarElementos('div.jogadores > div.jogador').length;
    return numJogadores;
}

const gerarAviso = (text) => {
    alert(text);
}

const esconderElementos = (indentificador) => {
    const elemento = pegarElementos(`${indentificador}`);
    const esconderElementosAux = (lista) => {
        if (lista.length === 0){
            return null;
        }
        const [head, ...tail] = lista;
        head.classList.add('hide');
        console.log(head);
        return esconderElementosAux(tail);
    }
    return esconderElementosAux(elemento);
}  