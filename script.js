// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA PARA TROCAR DE MODO ---
    const modoBtns = document.querySelectorAll('.modo-btn');
    const modoContainers = document.querySelectorAll('.modo-container');

    modoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove a classe 'active' de todos os botões
            modoBtns.forEach(innerBtn => innerBtn.classList.remove('active'));
            // Adiciona 'active' apenas ao botão clicado
            btn.classList.add('active');

            const targetMode = btn.getAttribute('data-mode');

            // Esconde todos os containers de modo
            modoContainers.forEach(container => {
                container.style.display = 'none';
            });

            // Mostra apenas o container do modo alvo
            const targetContainer = document.getElementById(targetMode + '-mode');
            if (targetContainer) {
                targetContainer.style.display = 'flex'; // ou 'block'
            }
        });
    });

    // --- MODO 1: LÓGICA DO SIM OU NÃO (código que já tínhamos) ---
    const actionButton = document.getElementById('action-button');
    const resultCircle = document.querySelector('.result-circle');
    const resultText = document.getElementById('result-text');
    const possibleAnswers = ['Sim', 'Não'];

    if (actionButton) {
        actionButton.addEventListener('click', gerarDecisao);
    }
    
    function gerarDecisao() {
        actionButton.disabled = true;
        resultCircle.classList.remove('cor-sim', 'cor-nao');
        resultCircle.classList.add('spinning');
        resultText.textContent = '';
        resultText.style.color = '#495057';

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
            resultCircle.classList.remove('spinning');
            actionButton.disabled = false;
        }, 400);
    }

    // --- MODO 2: LÓGICA DO NÚMERO ALEATÓRIO ---
    const gerarNumeroBtn = document.getElementById('gerar-numero-btn');
    const minNumberInput = document.getElementById('min-number');
    const maxNumberInput = document.getElementById('max-number');
    const numeroResultado = document.getElementById('numero-resultado');

    if (gerarNumeroBtn) {
        gerarNumeroBtn.addEventListener('click', () => {
            const min = parseInt(minNumberInput.value, 10);
            const max = parseInt(maxNumberInput.value, 10);

            if (min >= max) {
                alert("O número mínimo deve ser menor que o máximo.");
                return;
            }

            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            numeroResultado.textContent = randomNumber;
        });
    }
});