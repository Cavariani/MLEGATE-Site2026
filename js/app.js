$(document).ready(function () {

    // ==========================================================
    // 0. NOVO: LÓGICA DE BLOQUEIO DE SCROLL (Scroll Lock)
    // ==========================================================

    // Trava o scroll no carregamento da página
    document.body.style.overflow = 'hidden';

    // Adiciona listener para liberar o scroll ao clicar no botão "Saiba Mais"
    const $saibaMaisLink = $('.saiba-link');

    $saibaMaisLink.on('click', function () {
        // 1. Libera o scroll
        document.body.style.overflow = '';

        // 2. Opcional: Garante que o botão "Voltar ao Topo" suma imediatamente,
        // pois o scroll já está voltando à posição inicial (topo).
        const backToTopLink = document.getElementById('back-to-top-link');
        if (backToTopLink) {
            backToTopLink.classList.add('hidden');
        }
    });


    // ==========================================================
    // 1. LÓGICA DE FADE-IN NA CARGA (DRAMÁTICO)
    // ==========================================================

    // Seletores dos elementos da animação inicial:
    const $navbar = $('.navbar');
    const $logo = $('.logo-wrapper'); // Seção que contém a logo
    const $saibaMaisBtn = $('.saiba-wrapper'); // Seção que contém o botão rolar para baixo

    // Parâmetros de tempo para o efeito dramático:
    const fadeDuration = 1500; // 1.5 segundos de duração do fade
    const elementDelay = 1500; 	// 1.5 segundos de atraso entre os elementos

    // Ocultar todos os elementos no início, caso o CSS não tenha feito
    $navbar.css('opacity', '0');
    $logo.css('opacity', '0');
    $saibaMaisBtn.css('opacity', '0');

    // --- SEQUÊNCIA DE FADE-IN ---

    // 1. Fade-in da Logo (Imediatamente)
    // Duração: 1500ms
    $logo.stop().animate({ opacity: '1' }, fadeDuration);

    // 2. Fade-in da Navbar (1.5 segundos após o início da Logo)
    // Atraso: 1500ms
    setTimeout(function () {
        $navbar.stop().animate({ opacity: '1' }, fadeDuration);
    }, elementDelay);

    // 3. Fade-in do Botão "Saiba Mais" (1.5 segundos após a Navbar)
    // Atraso total: 3000ms (1500ms * 2)
    setTimeout(function () {
        $saibaMaisBtn.stop().animate({ opacity: '1' }, fadeDuration);
    }, elementDelay * 2);


    // ==========================================================
    // 2. LÓGICA DO BOTÃO VOLTAR AO TOPO
    // ==========================================================

    // Obtenha os elementos DOM
    const backToTopLink = document.getElementById('back-to-top-link');

    if (backToTopLink) {
        function toggleBackToTopButton() {
            // Pega a posição vertical da janela (scroll)
            const scrollPosition = window.scrollY;

            // Critério simples: aparecer após 100 pixels de rolagem
            if (scrollPosition > 100) {
                // Mostrar o botão (O CSS fará o fade-in)
                backToTopLink.classList.remove('hidden');
            } else {
                // Ocultar o botão (O CSS fará o fade-out)
                backToTopLink.classList.add('hidden');
            }
        }

        // Adiciona o listener para o evento de rolagem
        window.addEventListener('scroll', toggleBackToTopButton);

        // Executa a função na carga inicial para garantir o estado correto
        toggleBackToTopButton();
    }


    // ==========================================================
    // 3. LÓGICA DE SCROLL REVEAL (ANIMAÇÃO AO ROLAR - REVELAÇÃO INDIVIDUAL)
    // ==========================================================

    const scrollAnimatedElements = document.querySelectorAll('.scroll-animate');
    const revealThreshold = window.innerHeight * 0.8;

    function checkScrollAnimation() {
        scrollAnimatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const elementTop = rect.top;

            // Se o elemento já está animado, ignore.
            if (el.classList.contains('in-view')) {
                return;
            }

            // Se o topo do elemento estiver acima do limite de 80% da tela
            if (elementTop < revealThreshold) {
                el.classList.add('in-view');
            }
        });
    }

    // Chama a função na carga da página e em cada rolagem
    window.addEventListener('load', checkScrollAnimation);
    window.addEventListener('scroll', checkScrollAnimation);

    // Garante que elementos já visíveis no carregamento sejam animados imediatamente
    checkScrollAnimation();


    // ==========================================================
    // 4. NOVO: EASTER EGG (5 CLIQUES NO ÍCONE RAIO)
    // ==========================================================

    let clickCountEE = 0;
    const $lightningIcon = $('.comp-card .comp-icon i.bi-lightning-charge');
    const $creditsBox = $('#dev-credits-easter-egg');
    const requiredClicksEE = 5;

    $lightningIcon.css('cursor', 'help');

    // Função handler para poder remover e readicionar o listener
    const handleEasterEggClick = function (e) {
        e.preventDefault();
        e.stopPropagation();

        clickCountEE++;

        // Efeito visual de clique rápido (feedback)
        $(this).addClass('clicked');
        setTimeout(() => {
            $(this).removeClass('clicked');
        }, 100);

        if (clickCountEE >= requiredClicksEE) {
            $creditsBox.addClass('show');

            // Confirmação visual (ícone muda)
            const $iconRef = $(this);
            $iconRef.removeClass('bi-lightning-charge').addClass('bi-check-circle-fill').css('color', 'var(--secondary-color)');

            // Desativa temporariamente o clique e o contador
            $lightningIcon.off('click', handleEasterEggClick);

            // LÓGICA PARA DESAPARECER APÓS 5 SEGUNDOS
            setTimeout(() => {
                // Esconde a caixa de créditos
                $creditsBox.removeClass('show');

                // Restaura o ícone original
                $iconRef.removeClass('bi-check-circle-fill').addClass('bi-lightning-charge').css('color', '');

                // Reinicializa o contador e reativa o clique
                clickCountEE = 0;
                $lightningIcon.on('click', handleEasterEggClick);
            }, 8000); // 5000ms = 5 segundos
        }

        // Resetar o contador se houver um longo atraso (1 segundo) entre os cliques
        clearTimeout(window.resetTimerEE);
        window.resetTimerEE = setTimeout(() => {
            if (clickCountEE < requiredClicksEE) {
                clickCountEE = 0;
            }
        }, 1000);
    };

    // Adiciona o listener inicial
    $lightningIcon.on('click', handleEasterEggClick);


});