let listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function gerarNumeroAleatorio() {
    //return parseInt(Math.random() * numeroLimite + 1);
    /*
    utilizar o código abaixo nos casos em que o número limite é um 
    valor pequeno e você não quer que o número secreto se repita.
    */
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosNaLista = listaNumerosSorteados.length;

    if (quantidadeElementosNaLista == numeroLimite) {
        listaNumerosSorteados = [];
    }
    
    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e ' + numeroLimite);
}

exibirMensagemInicial();

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute > 0 && chute <= numeroLimite) {
        if (chute == numeroSecreto) {
            let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
            let mensagemTentativas = `Você descobriu o número secreto ${numeroSecreto} 
                com ${tentativas} ${palavraTentativa}`;
            exibirTextoNaTela('h1', 'Parabéns!');
            exibirTextoNaTela('p', mensagemTentativas);
            finalizarJogo();
        } else {
            if (chute > numeroSecreto) {
                exibirTextoNaTela('p', 'O número secreto é menor que ' + chute);
            } else {
                exibirTextoNaTela('p', 'O número secreto é maior que ' + chute);
            }
        }

        tentativas++;
    } else {
        alert(`O número deve estar entre 1 e ${numeroLimite}!`);
    }

    limparCampo();
}

function limparCampo() {
    document.querySelector('input').value = '';
}

function finalizarJogo() {
    document.querySelector('input').style.display = 'none';
    document.getElementById('chutar').style.display = 'none';
    document.getElementById('reiniciar').removeAttribute('disabled');
    document.getElementById('reiniciar').setAttribute('class', 'container__botao habilitado');
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    exibirMensagemInicial();
    document.querySelector('input').style.display = 'initial';
    document.getElementById('chutar').style.display = 'initial';
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('reiniciar').setAttribute('class', 'container__botao');
}