const criarCasa = (id)=>{
    const casa = document.createElement('div');

    casa.classList.add('casa');
    casa.id = id;

    return casa;
}

const pegarElemento = (id)=>{
    return document.getElementById(id);
}

const construirTabuleiro = (acc=1)=>{
    if(acc > 100) return null;
    const tabuleiro = pegarElemento('tabuleiro');
    tabuleiro.appendChild(criarCasa(acc));

    return construirTabuleiro(acc + 1);

}

