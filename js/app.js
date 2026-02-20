// FORÇAR SCROLL PARA O TOPO SEMPRE QUE A PÁGINA RECARREGAR
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

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

    // ==========================================================================
    // SISTEMA DE BANNER DE COOKIES (FLUTUANTE) - SEMPRE APARECE
    // ==========================================================================
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('btn-accept-cookies');
    const rejectBtn = document.getElementById('btn-reject-cookies');

    // Função para mostrar o banner com um pequeno delay (estilo toast)
    function showBanner() {
        setTimeout(() => {
            if(cookieBanner) cookieBanner.classList.add('show');
        }, 1500); // Aparece 1.5s após entrar na página
    }

    // Função para esconder o banner apenas visualmente nesta sessão
    function hideBanner() {
        if(cookieBanner) cookieBanner.classList.remove('show');
    }

    // FORÇA O BANNER A APARECER EM TODOS OS LOADS
    showBanner();

    // Evento do botão "Aceitar"
    if(acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            hideBanner(); // Apenas esconde a UI
        });
    }

    // Evento do botão "Recusar"
    if(rejectBtn) {
        rejectBtn.addEventListener('click', function() {
            hideBanner(); // Apenas esconde a UI
        });
    }

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
    // 4. EASTER EGG (5 CLIQUES NO ÍCONE RAIO)
    // ==========================================================

    let clickCountEE = 0;
    
    // Procura o ícone de raio dentro do card de Consultoria
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

    // ==========================================================
    // 5. CANVAS INTERATIVO (REDE NEURAL / PARTÍCULAS)
    // ==========================================================
    const canvas = document.getElementById("network-canvas");
    if (canvas) { // Verifica se o canvas existe antes de rodar
        const ctx = canvas.getContext("2d");
        
        // Ajuste de tamanho
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        let particlesArray = [];
        let mouse = { x: null, y: null, radius: 150 };

        window.addEventListener('mousemove', (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        });

        // Corrigir posição do mouse ao rolar a página
        window.addEventListener('scroll', (event) => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
                if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
                
                // Mouse interaction
                if (mouse.x !== null && mouse.y !== null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx*dx + dy*dy);
                    if (distance < mouse.radius) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (mouse.radius - distance) / mouse.radius;
                        // Força de empurrão suave
                        const directionX = forceDirectionX * force * 3;
                        const directionY = forceDirectionY * force * 3;
                        this.x -= directionX;
                        this.y -= directionY;
                    }
                }
            }
            draw() {
                ctx.fillStyle = '#f07e30'; // Pontos Laranjas
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particlesArray = [];
            // Densidade ajustável: aumente o divisor para ter menos partículas
            let numberOfParticles = (canvas.height * canvas.width) / 12000; 
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function handleParticles() {
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
                
                for (let j = i; j < particlesArray.length; j++) {
                    const dx = particlesArray[i].x - particlesArray[j].x;
                    const dy = particlesArray[i].y - particlesArray[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    // Distância para conectar linhas
                    if (distance < 120) { 
                        ctx.beginPath();
                        // Linhas em cinza/verde escuro sutil
                        ctx.strokeStyle = `rgba(31, 69, 69, ${1 - distance/120})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            handleParticles();
            requestAnimationFrame(animate);
        }

        initParticles();
        animate();
    }
});