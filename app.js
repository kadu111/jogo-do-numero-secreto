let listaDeNumSorteados = [];
let numMax = 10;
let numSecreto = gerarNumAleatorio();
let tentativas = 1;


function exibirTextTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,'Brazilian Portuguese Female',{rate:1.2});
}

function exibirMsgInicial(){
    exibirTextTela('h1', 'Jogo do número secreto');
    exibirTextTela('p',`Escolha um número entre 1 e ${numMax}.`);
}

exibirMsgInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    console.log(chute == numSecreto);
    if(chute == numSecreto){
        exibirTextTela('h1','Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o numero secreto com ${tentativas} ${palavraTentativa}!`
        exibirTextTela('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if(chute > numSecreto){
            exibirTextTela('p','O numero secreto é menor.');
        } else{
            exibirTextTela('p','O numero secreto é maior.');
        }
        tentativas++;
        limpaCampo();
    }
}

function gerarNumAleatorio(){
    let numEscolhido = parseInt(Math.random() * numMax + 1);
    let qntDeElementosNaLista = listaDeNumSorteados.length;

    if(qntDeElementosNaLista == numMax){
        listaDeNumSorteados = [];
    }

    if (listaDeNumSorteados.includes(numEscolhido)){
        return gerarNumAleatorio();
    } else{    
        listaDeNumSorteados.push(numEscolhido);
        console.log(listaDeNumSorteados);
        return numEscolhido;
    }
}

function limpaCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numSecreto = gerarNumAleatorio();
    limpaCampo();
    tentativas = 1;
    exibirMsgInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}