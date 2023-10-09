// Objeto usado para armazenar a trilha sonora e efeitos sonoros do jogo.
const album = {
    momentoAtual: 'menu',
    musicaAtual: configurarMusica('menu01-ost1.mp3'),
    menu01: configurarMusica('menu01-ost1.mp3'),
    menu02: configurarMusica('menu02-ost2.mp3'),
    coreDia01: configurarMusica('game01-ost3.mp3'),
    coreDia02: configurarMusica('game03-ost5.mp3'),
    coreNoite01: configurarMusica('game02-ost4.mp3'),
    coreNoite02: configurarMusica('game04-ost6.mp3'),
    victory01: configurarMusica('victory01-ost7.mp3'),

    snakeSfx: configurarMusica('snake1-sfx.mp3'),
    ladderSfx: configurarMusica('ladder1-sfx.mp3'),
    victorySfx: configurarMusica('victory1-sfx.mp3'),

    dado: [configurarMusica('dice01-sfx.mp3'),
    configurarMusica('dice02-sfx.mp3'),
    configurarMusica('dice03-sfx.mp3'),
    configurarMusica('dice01-sfx.mp3'),
    configurarMusica('dice02-sfx.mp3'),
    configurarMusica('dice03-sfx.mp3')]
}