document.addEventListener('DOMContentLoaded', () => {

    // CONTROLE DE TROCA DE MODO
    const modoBtns = document.querySelectorAll('.modo-btn');
    const modoContainers = document.querySelectorAll('.modo-container');

    modoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modoBtns.forEach(innerBtn => innerBtn.classList.remove('active'));
            btn.classList.add('active');
            const targetMode = btn.getAttribute('data-mode');
            modoContainers.forEach(container => {
                container.style.display = 'none';
            });
            const targetContainer = document.getElementById(targetMode + '-mode');
            if (targetContainer) {
                targetContainer.style.display = 'flex';
            }
        });
    });

    // LÓGICA DO SIM OU NÃO
    const actionButton = document.getElementById('action-button');
    const resultCircle = document.querySelector('.result-circle');
    const resultText = document.getElementById('result-text');
    const possibleAnswers = ['Sim', 'Não'];
    let rodaRotation = 0;

    if (actionButton) {
        actionButton.addEventListener('click', () => {
            if (actionButton.disabled) return;
            actionButton.disabled = true;

            resultCircle.classList.remove('cor-sim', 'cor-nao');
            resultText.textContent = '';
            
            rodaRotation += 360; 
            resultCircle.style.transform = `rotate(${rodaRotation}deg)`;

            setTimeout(() => {
                const currentLang = localStorage.getItem('language') || 'pt';
                const randomIndex = Math.floor(Math.random() * possibleAnswers.length);
                const randomAnswerKey = possibleAnswers[randomIndex];

                let translatedAnswer = '';
                if (randomAnswerKey === 'Sim') {
                    translatedAnswer = translations.answer_yes[currentLang];
                    resultCircle.classList.add('cor-sim');
                } else {
                    translatedAnswer = translations.answer_no[currentLang];
                    resultCircle.classList.add('cor-nao');
                }
                
                resultText.textContent = translatedAnswer;
                const buttonText = translations.button_try_again[currentLang];
                actionButton.textContent = buttonText;
                actionButton.disabled = false;
            }, 400);
        });
    }

    // LÓGICA DO NÚMERO ALEATÓRIO
    const gerarNumeroBtn = document.getElementById('gerar-numero-btn');
    const minNumberInput = document.getElementById('min-number');
    const maxNumberInput = document.getElementById('max-number');
    const numeroResultado = document.getElementById('numero-resultado');

    if (gerarNumeroBtn) {
        gerarNumeroBtn.addEventListener('click', () => {
            const min = parseInt(minNumberInput.value, 10);
            const max = parseInt(maxNumberInput.value, 10);
            if (isNaN(min) || isNaN(max) || min >= max) {
                alert("Por favor, insira um intervalo válido onde o mínimo é menor que o máximo.");
                return;
            }
            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            numeroResultado.textContent = randomNumber;
        });
    }

    // LÓGICA DO SORTEADOR DE LISTA
    const sortearBtn = document.getElementById('sortear-btn');
    const listaInput = document.getElementById('lista-input');
    const listaResultado = document.getElementById('lista-resultado');

    if (sortearBtn) {
        sortearBtn.addEventListener('click', () => {
            const textoDaLista = listaInput.value;
            const items = textoDaLista.split('\n').filter(item => item.trim() !== '');
            if (items.length === 0) {
                alert("Por favor, digite pelo menos um item na lista.");
                return;
            }
            sortearBtn.disabled = true;
            let voltas = 0;
            const maxVoltas = items.length > 1 ? 20 : 1;
            
            const animacaoInterval = setInterval(() => {
                const itemAleatorio = items[Math.floor(Math.random() * items.length)];
                listaResultado.textContent = itemAleatorio;
                voltas++;
                if (voltas > maxVoltas) {
                    clearInterval(animacaoInterval);
                    revelarVencedor();
                }
            }, 100);

            const revelarVencedor = () => {
                const indiceVencedor = Math.floor(Math.random() * items.length);
                const vencedor = items[indiceVencedor];
                listaResultado.textContent = vencedor;
                sortearBtn.disabled = false;
            };
        });
    }

    // LÓGICA DO CARA OU COROA
    const flipButton = document.getElementById('flip-button');
    const coin = document.getElementById('coin');
    const coinFlipResult = document.getElementById('coin-flip-result');

    if (flipButton) {
        let isFlipping = false;
        let rotation = 0;

        flipButton.addEventListener('click', () => {
            if (isFlipping) return;
            isFlipping = true;
            coinFlipResult.textContent = '\u00A0';

            const result = Math.random() < 0.5 ? 'heads' : 'tails';
            rotation += (result === 'heads') ? 1800 : 1980;

            coin.style.transition = 'transform 1s cubic-bezier(0.45, 0.05, 0.55, 0.95)';
            coin.style.transform = `rotateY(${rotation}deg)`;

            setTimeout(() => {
                const currentLang = localStorage.getItem('language') || 'pt';
                const translatedSide = (result === 'heads')
                    ? translations.coin_heads[currentLang]
                    : translations.coin_tails[currentLang];
                const resultText = translations.coin_flip_result_text[currentLang];

                coinFlipResult.textContent = `${resultText} ${translatedSide}!`;
                isFlipping = false;
            }, 1000);
        });
    }
});