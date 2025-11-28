$(document).ready(function () {

    // ==========================================================
    // 0. LÓGICA DE BLOQUEIO DE SCROLL & NAVBAR TRANSPARENTE
    // ==========================================================

    // Seletores
    const $navbar = $('.navbar');
    const $saibaMaisLink = $('.saiba-link');
    const backToTopLink = document.getElementById('back-to-top-link');

    // 1. Estado Inicial: Trava Scroll e deixa Navbar Transparente
    document.body.style.overflow = 'hidden';
    $navbar.addClass('hero-mode'); // Adiciona a transparência

    // 2. Evento de Clique no Botão "Descer"
    $saibaMaisLink.on('click', function () {
        // Libera o scroll
        document.body.style.overflow = '';

        // Remove a transparência da Navbar (ativa o fundo branco do CSS padrão)
        $navbar.removeClass('hero-mode');

        // Esconde o botão "Voltar ao Topo" temporariamente pois estamos no topo
        if (backToTopLink) {
            backToTopLink.classList.add('hidden');
        }
    });


    // ==========================================================
    // 1. LÓGICA DE FADE-IN NA CARGA (DRAMÁTICO)
    // ==========================================================
    
    // Seletores da animação:
    const $logo = $('.logo-wrapper'); 
    const $saibaMaisBtn = $('.saiba-wrapper'); 
    
    const fadeDuration = 1500; 
    const elementDelay = 1500; 

    $navbar.css('opacity', '0');
    $logo.css('opacity', '0');
    $saibaMaisBtn.css('opacity', '0');

    // Sequência:
    $logo.stop().animate({ opacity: '1' }, fadeDuration);

    setTimeout(function () {
        $navbar.stop().animate({ opacity: '1' }, fadeDuration);
    }, elementDelay);

    setTimeout(function () {
        $saibaMaisBtn.stop().animate({ opacity: '1' }, fadeDuration);
    }, elementDelay * 2);


    // ==========================================================
    // 2. LÓGICA DO BOTÃO VOLTAR AO TOPO
    // ==========================================================

    if (backToTopLink) {
        function toggleBackToTopButton() {
            const scrollPosition = window.scrollY;
            
            if (scrollPosition > 100) {
                backToTopLink.classList.remove('hidden');
                
                // SEGURANÇA EXTRA: Se o usuário rolar de volta para o topo (0px),
                // garantimos que a navbar volte a ser transparente, caso ele não tenha clicado no botão.
                $navbar.removeClass('hero-mode'); 
            } else {
                backToTopLink.classList.add('hidden');
                
                // Se o usuário voltou para o topo absoluto, a navbar pode ficar transparente de novo
                // (Opcional: se quiser que ela fique branca pra sempre depois do primeiro clique, remova a linha abaixo)
                $navbar.addClass('hero-mode'); 
            }
        }

        window.addEventListener('scroll', toggleBackToTopButton);
        toggleBackToTopButton();
    }


    // ==========================================================
    // 3. LÓGICA DE SCROLL REVEAL
    // ==========================================================

    const scrollAnimatedElements = document.querySelectorAll('.scroll-animate');
    const revealThreshold = window.innerHeight * 0.8;

    function checkScrollAnimation() {
        scrollAnimatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const elementTop = rect.top;

            if (el.classList.contains('in-view')) return;

            if (elementTop < revealThreshold) {
                el.classList.add('in-view');
            }
        });
    }

    window.addEventListener('load', checkScrollAnimation);
    window.addEventListener('scroll', checkScrollAnimation);
    checkScrollAnimation();


    // ==========================================================
    // 4. EASTER EGG (5 CLIQUES NO ÍCONE RAIO)
    // ==========================================================

    let clickCountEE = 0;
    const $lightningIcon = $('.comp-card .comp-icon i.bi-lightning-charge');
    const $creditsBox = $('#dev-credits-easter-egg');
    const requiredClicksEE = 5;

    $lightningIcon.css('cursor', 'help');

    const handleEasterEggClick = function (e) {
        e.preventDefault();
        e.stopPropagation();

        clickCountEE++;
        $(this).addClass('clicked');
        setTimeout(() => { $(this).removeClass('clicked'); }, 100);

        if (clickCountEE >= requiredClicksEE) {
            $creditsBox.addClass('show');
            const $iconRef = $(this);
            $iconRef.removeClass('bi-lightning-charge').addClass('bi-check-circle-fill').css('color', 'var(--secondary-color)');
            $lightningIcon.off('click', handleEasterEggClick);

            setTimeout(() => {
                $creditsBox.removeClass('show');
                $iconRef.removeClass('bi-check-circle-fill').addClass('bi-lightning-charge').css('color', '');
                clickCountEE = 0;
                $lightningIcon.on('click', handleEasterEggClick);
            }, 5000); 
        }

        clearTimeout(window.resetTimerEE);
        window.resetTimerEE = setTimeout(() => {
            if (clickCountEE < requiredClicksEE) {
                clickCountEE = 0;
            }
        }, 1000);
    };

    $lightningIcon.on('click', handleEasterEggClick);
    
    // ==========================================================
    // 5. INICIALIZAÇÃO DO CARROSSEL (Se houver lógica futura)
    // ==========================================================
    // (Código do Swiper removido conforme solicitado anteriormente)

});