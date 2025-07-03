// 1. SELEÇÃO DOS ELEMENTOS DO HTML
const actionButton = document.querySelector('#action-button');
const resultCircle = document.querySelector('.result-circle');
const resultText = document.querySelector('#result-text');

// 2. ARRAY COM AS POSSÍVEIS RESPOSTAS
const possibleAnswers = ['Sim', 'Não'];

// 3. TEXTOS PARA O BOTÃO
const buttonTexts = [
    'Girar Novamente',
    'Tentar a Sorte',
    'Mais uma Vez',
    'Rodar de Novo'
];

// ... (o resto do seu código continua igual aqui em cima) ...

// 4. FUNÇÃO PARA GERAR A DECISÃO
function gerarDecisao() {
    // Desabilita o botão para evitar cliques múltiplos durante a animação
    actionButton.disabled = true;

    // Remove as classes de cor anteriores antes de começar a girar
    resultCircle.classList.remove('cor-sim', 'cor-nao');

    // Adiciona a classe de animação e limpa o texto
    resultCircle.classList.add('spinning');
    resultText.textContent = '';
    resultText.style.color = '#495057'; // Reseta a cor do texto para o padrão

    // Define um tempo de espera (timeout) para o suspense
    setTimeout(() => {
        // --- INÍCIO DAS MUDANÇAS PARA TRADUÇÃO ---

        // Pega o idioma atual salvo no navegador. Se não houver, usa 'pt' como padrão.
        const currentLang = localStorage.getItem('language') || 'pt';

        // Sorteia um índice aleatório do array de respostas (0 ou 1)
        const randomIndex = Math.floor(Math.random() * possibleAnswers.length);
        const randomAnswerKey = possibleAnswers[randomIndex]; // O resultado é 'Sim' ou 'Não'

        // Busca a tradução correta para a resposta sorteada ('Sim' ou 'Não')
        let translatedAnswer = '';
        if (randomAnswerKey === 'Sim') {
            translatedAnswer = translations.answer_yes[currentLang];
            resultCircle.classList.add('cor-sim');
        } else { // Se for 'Não'
            translatedAnswer = translations.answer_no[currentLang];
            resultCircle.classList.add('cor-nao');
        }

        // Atualiza o texto do resultado com a tradução
        resultText.textContent = translatedAnswer;

        // Busca a tradução correta para o texto do botão
        const buttonText = translations.button_try_again[currentLang];
        actionButton.textContent = buttonText;

        // --- FIM DAS MUDANÇAS ---

        // Remove a classe de animação após a conclusão
        resultCircle.classList.remove('spinning');
        
        // Habilita o botão novamente
        actionButton.disabled = false;

    }, 400); // 400 milissegundos de espera
}

// 5. ADICIONA O "OUVINTE DE EVENTO" DE CLIQUE NO BOTÃO
actionButton.addEventListener('click', gerarDecisao);