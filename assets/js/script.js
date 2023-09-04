(appCalculadora = () => {
    // #### Variáveis de controle da aplicação ####

    let calculado = false;
    let podeTerPonto = true;

    // #### Definição das funções que controlam a aplicação ####

    // Variável que representa o display.
    const display = document.querySelector('#display > h1');

    // Função que adiciona um valor no display.
    function adicionarDigitoDisplay(digito) {
        display.innerText += digito;
    }

    // Função que substitui o valor do display.
    function substituirValorDisplay(text) {
        display.innerText = text;
    }

    // Função que verifica so é um número;
    function ehNumero(digito) {
        return '0123456789'.includes(digito);
    }

    // Função que calcula as operações.
    function calcular() {
        const operacao = display.innerText;
        for (let i of operacao) {
            if (!'()0123456789.+-*/'.includes(i)) {
                operacao = 'Erro';
                break;
            }
        }
        let resultado = '';
        try {
            resultado = operacao === 'Erro' ? operacao : eval(operacao);
        } catch (e) {
            resultado = 'Erro';
        }
        return resultado.toString().includes('.') ? resultado.toFixed(2) : resultado;
    }

    // Função para controlar a ação das teclas
    function controlarAcao(digito) {
        const displayAtual = display.innerText;

        if (digito.toUpperCase() === 'C') {
            podeTerPonto = true;
            substituirValorDisplay('0');
            return;
        }
        if (digito === '=') {
            calculado = true;
            substituirValorDisplay(calcular());
            return;
        }
        if (digito === '←') {
            podeTerPonto = true;
            if (displayAtual.length > 1 && displayAtual !== 'Erro')
                substituirValorDisplay(displayAtual.slice(0, displayAtual.length - 1))
            else
                substituirValorDisplay('0');
            return;
        }
        if (digito === '.') {
            if (podeTerPonto) {
                adicionarDigitoDisplay(digito);
                podeTerPonto = false;
            }
            return;
        }

        if (digito === ')') {
            let cont1 = 0;
            let cont2 = 0
            for (let d of displayAtual) {
                if (d === '(') cont1++;
                if (d === ')') cont2++;
            }
            if (cont1 <= cont2) return;
        }
        if (displayAtual === '0' || calculado) {
            calculado = false;
            substituirValorDisplay('');
        }

        if (!ehNumero(digito)) {
            if ('-+/*'.includes(digito) && '-+/*'.includes(displayAtual.split('').pop()))
                return;
            podeTerPonto = true;
            adicionarDigitoDisplay(digito);
        } else {
            adicionarDigitoDisplay(digito);
        }
    }

    // Fubção que realiza a primeira checagem do valor recebido.
    function checarValorRecebido(tecla) {
        if ('←()C0123456789.+-*/='.includes(tecla))
            controlarAcao(tecla);
    }

    // #### Início da aplicação ####

    // Evento que adiciona as funcionalidades dos teclas da calculadora.
    document.querySelectorAll('#buttons > ul > li').forEach((valor) => {
        valor.addEventListener('click', (e) => {
            e.preventDefault();
            checarValorRecebido(valor.innerText);
        });
    });

    document.addEventListener("keydown", (e) => {
        e.preventDefault();
        if (e.key === 'Enter') {
            substituirValorDisplay(calcular());
            return;
        }
        if (e.key === 'Delete')
            checarValorRecebido('C');

        if (e.key === 'Backspace')
            checarValorRecebido('←');

        checarValorRecebido(e.key);
    });


})();