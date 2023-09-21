const pegarElemento = (id)=>{
    return document.getElementById(id);
}

const mostrarCorEscolhida = (event) => {
    const id = event.target.id.slice(-1);
    const mudarCor = document.querySelector(`label[for="jogadorcolor${id}"]`);
    mudarCor.style.backgroundColor = event.target.value;
}

const adicionarJogadorTemporaria = ()=>{
    configurarNovoJogador(main);
    main.numJogadores += 1;
}