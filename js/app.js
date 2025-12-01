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
    $navbar.addClass('hero-mode');

    // 2. Evento de Clique no Botão "Descer"
    $saibaMaisLink.on('click', function () {
        document.body.style.overflow = '';
        $navbar.removeClass('hero-mode');
        if (backToTopLink) {
            backToTopLink.classList.add('hidden');
        }
    });


    // ==========================================================
    // 1. LÓGICA DE FADE-IN NA CARGA (DRAMÁTICO)
    // ==========================================================
    
    const $logo = $('.logo-wrapper'); 
    const $saibaMaisBtn = $('.saiba-wrapper'); 
    const fadeDuration = 1500; 
    const elementDelay = 1500; 

    $navbar.css('opacity', '0');
    $logo.css('opacity', '0');
    $saibaMaisBtn.css('opacity', '0');

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
                $navbar.removeClass('hero-mode'); 
            } else {
                backToTopLink.classList.add('hidden');
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
    // 4. EASTER EGG (5 CLIQUES NO ÍCONE RAIO - CORRIGIDO)
    // ==========================================================

    let clickCountEE = 0;
    
    // CORREÇÃO AQUI: Atualizado para .comp-icon-wrapper (nova classe do layout horizontal)
    const $lightningIcon = $('.comp-icon-wrapper i.bi-lightning-charge'); 
    
    const $creditsBox = $('#dev-credits-easter-egg');
    const requiredClicksEE = 5;

    // Define cursor help para indicar interatividade sutil
    $lightningIcon.css('cursor', 'help');

    const handleEasterEggClick = function (e) {
        e.preventDefault();
        e.stopPropagation();

        clickCountEE++;
        
        // Feedback visual de clique
        // Nota: O feedback visual no CSS precisa estar apontando para o wrapper pai se quiser animar o quadrado,
        // mas aqui estamos aplicando a classe ao ícone <i>. 
        // Se quiser animar o quadrado, use $(this).parent().addClass...
        $(this).addClass('clicked');
        setTimeout(() => { $(this).removeClass('clicked'); }, 100);

        if (clickCountEE >= requiredClicksEE) {
            $creditsBox.addClass('show');
            
            // Muda o ícone para check
            const $iconRef = $(this);
            $iconRef.removeClass('bi-lightning-charge').addClass('bi-check-circle-fill').css('color', 'var(--secondary-color)');
            
            $lightningIcon.off('click', handleEasterEggClick);

            setTimeout(() => {
                $creditsBox.removeClass('show');
                $iconRef.removeClass('bi-check-circle-fill').addClass('bi-lightning-charge').css('color', '');
                clickCountEE = 0;
                $lightningIcon.on('click', handleEasterEggClick);
            }, 10000); 
        }

        clearTimeout(window.resetTimerEE);
        window.resetTimerEE = setTimeout(() => {
            if (clickCountEE < requiredClicksEE) {
                clickCountEE = 0;
            }
        }, 3000);
    };

    $lightningIcon.on('click', handleEasterEggClick);


// VERSÃO 5: MAR MONOCROMÁTICO
// if (window.VANTA) {
//     VANTA.WAVES({
//         el: "#inicio",
//         color: 0x4d7575,        // COR DA ONDA: Teal mais claro
//         mouseControls: false,
//         touchControls: false,
//         gyroControls: false,
//         minHeight: 200.00,
//         minWidth: 200.00,
//         scale: 1.00,
//         scaleMobile: 1.00,
//         shininess: 38.00,
//         waveHeight: 8.50,
//         waveSpeed: 0.15,
//         zoom: 0.88
//     });
// }

});