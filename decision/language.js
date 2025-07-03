document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('lang-btn');
    const langDropdown = document.getElementById('lang-dropdown');
    
    // Função para traduzir a página
const setLanguage = (lang) => {
    // 1. Traduz todos os elementos com data-key no corpo da página
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(elem => {
        const key = elem.getAttribute('data-key');
        if (translations[key] && translations[key][lang]) {
            elem.innerHTML = translations[key][lang];
        }
    });

    // MUDANÇA: ADICIONADO CASO ESPECIAL PARA O TÍTULO DA PÁGINA
    // 2. Traduz o título do documento (tag <title>)
    if (translations.title && translations.title[lang]) {
        document.title = translations.title[lang];
    }
    // FIM DA MUDANÇA

    // 3. Atualiza o texto do botão principal de idioma
    langBtn.innerHTML = lang === 'pt' ? '🇧🇷 PT-BR' : '🇺🇸 EN';

    // 4. Guarda a preferência do usuário no navegador
    localStorage.setItem('language', lang);
};

    // Abre/Fecha o dropdown
    langBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // Impede que o clique feche o menu imediatamente
        langDropdown.classList.toggle('show');
    });

    // Seleciona um idioma do dropdown
    langDropdown.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            const lang = event.target.getAttribute('data-lang');
            setLanguage(lang);
            langDropdown.classList.remove('show');
        }
    });

    // Fecha o dropdown se clicar fora dele
    window.addEventListener('click', () => {
        if (langDropdown.classList.contains('show')) {
            langDropdown.classList.remove('show');
        }
    });

    // Verifica se já existe um idioma salvo e aplica a tradução ao carregar a página
    const savedLang = localStorage.getItem('language') || 'pt'; // 'pt' como padrão
    setLanguage(savedLang);
});