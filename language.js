document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do menu de idiomas
    const langBtn = document.getElementById('lang-btn');
    const langDropdown = document.getElementById('lang-dropdown');
    
    /**
     * Função principal para traduzir a página.
     * @param {string} lang - O código do idioma a ser aplicado (ex: 'pt' ou 'en').
     */
    const setLanguage = (lang) => {
        // 1. Traduz todos os elementos com o atributo [data-key]
        const elements = document.querySelectorAll('[data-key]');
        elements.forEach(elem => {
            const key = elem.getAttribute('data-key');
            if (translations[key] && translations[key][lang]) {
                // Usa innerHTML para permitir tags como <strong>
                elem.innerHTML = translations[key][lang];
            }
        });

        // 2. CASO ESPECIAL: Traduz o título da página (tag <title>)
        // Verifica se existe uma chave 'title' no objeto de traduções
        if (translations.title && translations.title[lang]) {
            document.title = translations.title[lang];
        }

        // 3. Atualiza o texto do botão principal de idioma para refletir a seleção
        langBtn.innerHTML = lang === 'pt' ? '🇧🇷 PT-BR' : '🇺🇸 EN';

        // 4. Guarda a preferência do usuário no armazenamento local do navegador
        localStorage.setItem('language', lang);
    };

    // --- CONTROLE DO MENU DROPDOWN ---

    // Evento para abrir e fechar o menu ao clicar no botão
    langBtn.addEventListener('click', (event) => {
        // Impede que o clique se propague para o 'window' e feche o menu imediatamente
        event.stopPropagation(); 
        langDropdown.classList.toggle('show');
    });

    // Evento para selecionar um idioma do menu
    langDropdown.addEventListener('click', (event) => {
        // Verifica se o clique foi em um link (tag <a>)
        if (event.target.tagName === 'A') {
            const lang = event.target.getAttribute('data-lang');
            setLanguage(lang); // Aplica a tradução
            langDropdown.classList.remove('show'); // Esconde o menu
        }
    });

    // Evento para fechar o menu se o usuário clicar em qualquer outro lugar da página
    window.addEventListener('click', () => {
        if (langDropdown.classList.contains('show')) {
            langDropdown.classList.remove('show');
        }
    });

    // --- INICIALIZAÇÃO ---

    // Ao carregar a página, verifica se já existe um idioma salvo.
    // Se não houver, usa 'pt' (Português) como padrão.
    const savedLang = localStorage.getItem('language') || 'pt';
    
    // Aplica a tradução com o idioma salvo ou o padrão.
    setLanguage(savedLang);
});