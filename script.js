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

    // --- LÓGICA DO SIM OU NÃO ---
    const actionButton = document.getElementById('action-button');
    const resultCircle = document.querySelector('.result-circle');
    const resultText = document.getElementById('result-text');
    const possibleAnswers = ['Sim', 'Não'];

    let rodaRotation = 0; // <<< ADICIONE ESTA LINHA

    if (actionButton) {
        actionButton.addEventListener('click', gerarDecisao);
    }
    
function gerarDecisao() {
    actionButton.disabled = true;
    resultCircle.classList.remove('cor-sim', 'cor-nao');
    resultText.textContent = '';
    resultText.style.color = '#495057';

    // --- NOVA LÓGICA DE ANIMAÇÃO ---
    // Adiciona 360 graus à rotação atual para fazer a roda girar uma vez
    rodaRotation += 360; 
    // Aplica a rotação diretamente no estilo do elemento
    resultCircle.style.transform = `rotate(${rodaRotation}deg)`;
    // --- FIM DA NOVA LÓGICA ---

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
        
        // A linha que removia a classe .spinning não é mais necessária
        // resultCircle.classList.remove('spinning'); // LINHA REMOVIDA

        actionButton.disabled = false;
    }, 400); // O tempo do timeout deve ser o mesmo da transição do CSS
}

    // --- LÓGICA DO NÚMERO ALEATÓRIO ---
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

    // --- LÓGICA DO SORTEADOR DE LISTA ---
    
    const sortearBtn = document.getElementById('sortear-btn');
    const listaInput = document.getElementById('lista-input');
    const listaResultado = document.getElementById('lista-resultado');

    if (sortearBtn) {
        sortearBtn.addEventListener('click', () => {
            // 1. Pega o texto da textarea e o processa
            const textoDaLista = listaInput.value;
            
            // Cria um array, separando por linha, e remove linhas vazias
            const items = textoDaLista.split('\n').filter(item => item.trim() !== '');

            // 2. Verifica se a lista não está vazia
            if (items.length === 0) {
                alert("Por favor, digite pelo menos um item na lista.");
                return; // Para a execução da função aqui
            }

            // Desabilita o botão para evitar múltiplos cliques durante a animação
            sortearBtn.disabled = true;

            // 3. LÓGICA DA ANIMAÇÃO "ROLETA"
            let voltas = 0;
            const maxVoltas = items.length > 1 ? 20 : 1; // Dá pelo menos 20 "piscadas"
            
            const animacaoInterval = setInterval(() => {
                // Pega um item aleatório da lista para mostrar na animação
                const itemAleatorio = items[Math.floor(Math.random() * items.length)];
                listaResultado.textContent = itemAleatorio;
                voltas++;
                if (voltas > maxVoltas) {
                    clearInterval(animacaoInterval); // Para a animação
                    revelarVencedor();
                }
            }, 100); // Muda o nome a cada 100 milissegundos

            // 4. SORTEIO REAL E REVELAÇÃO DO VENCEDOR
            const revelarVencedor = () => {
                const indiceVencedor = Math.floor(Math.random() * items.length);
                const vencedor = items[indiceVencedor];
                
                // Exibe o vencedor final
                listaResultado.textContent = vencedor;
                
                // Habilita o botão novamente
                sortearBtn.disabled = false;
            };
        });
    }

    // --- MODO 4: LÓGICA DO CARA OU COROA ---
const flipButton = document.getElementById('flip-button');
const coin = document.getElementById('coin');
const coinFlipResult = document.getElementById('coin-flip-result');

// Traduções de exemplo (adicione os seus)
const translations = {
    coin_heads: {
        pt: 'Cara',
        en: 'Heads'
    },
    coin_tails: {
        pt: 'Coroa',
        en: 'Tails'
    },
    coin_flip_result_text: {
        pt: 'Resultado:',
        en: 'Result:'
    }
};

if (flipButton) {
    let isFlipping = false;
    let rotation = 0;

    flipButton.addEventListener('click', () => {
        if (isFlipping) return;

        isFlipping = true;
        coinFlipResult.textContent = '\u00A0';

        // Sorteia resultado
        const result = Math.random() < 0.5 ? 'heads' : 'tails';
        rotation += (result === 'heads') ? 1800 : 1980;

        // Aplica rotação
        coin.style.transition = 'transform 1s cubic-bezier(0.45, 0.05, 0.55, 0.95)';
        coin.style.transform = `rotateY(${rotation}deg)`;

        // Exibe resultado após a animação
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