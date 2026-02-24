// ================================================================
//  MLEGATE — APP.JS (REDESIGN 2026)
//  Clean, modern, performant
// ================================================================

// Force scroll to top on reload
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================
    // 0. LOADING SCREEN
    // ==========================================================
    const loader = document.getElementById('loader');
    const body = document.body;

    // Lock scroll during loading
    body.style.overflow = 'hidden';

    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loader) loader.classList.add('hidden');
            body.style.overflow = '';
            // Trigger hero animations after loader hides
            revealHeroElements();
        }, 2200);
    });

    // Fallback: if load event already fired
    if (document.readyState === 'complete') {
        setTimeout(() => {
            if (loader) loader.classList.add('hidden');
            body.style.overflow = '';
            revealHeroElements();
        }, 2200);
    }

    // ==========================================================
    // 1. HERO STAGGERED REVEAL
    // ==========================================================
    function revealHeroElements() {
        const heroElements = document.querySelectorAll('.reveal-hero');
        heroElements.forEach((el, i) => {
            const delay = parseInt(el.dataset.delay || 0) * 200 + 100;
            setTimeout(() => {
                el.classList.add('visible');
            }, delay);
        });
    }

    // ==========================================================
    // 2. NAVBAR — TRANSPARENT/SOLID TOGGLE
    // ==========================================================
    const navbar = document.getElementById('mainNav');
    const heroSection = document.getElementById('inicio');

    function updateNavbar() {
        if (!navbar || !heroSection) return;
        const scrollY = window.scrollY;
        const heroBottom = heroSection.offsetHeight - 100;

        if (scrollY > heroBottom) {
            navbar.classList.remove('hero-mode');
        } else {
            navbar.classList.add('hero-mode');
        }
    }

    // Initial state
    if (navbar) navbar.classList.add('hero-mode');
    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();

    // ==========================================================
    // 3. SCROLL REVEAL — Intersection Observer
    // ==========================================================
    const revealElements = document.querySelectorAll('[data-reveal]');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger siblings within same parent
                const parent = entry.target.parentElement;
                const siblings = parent ? parent.querySelectorAll('[data-reveal]') : [];
                let staggerIndex = 0;

                siblings.forEach((sib, i) => {
                    if (sib === entry.target) staggerIndex = i;
                });

                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, staggerIndex * 100);

                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================================
    // 4. BACK TO TOP BUTTON
    // ==========================================================
    const backToTopBtn = document.getElementById('back-to-top-link');

    function toggleBackToTop() {
        if (!backToTopBtn) return;
        if (window.scrollY > 400) {
            backToTopBtn.classList.remove('hidden');
        } else {
            backToTopBtn.classList.add('hidden');
        }
    }

    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop();

    // ==========================================================
    // 5. COOKIE BANNER
    // ==========================================================
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('btn-accept-cookies');
    const rejectBtn = document.getElementById('btn-reject-cookies');

    // Show banner after delay
    setTimeout(() => {
        if (cookieBanner) cookieBanner.classList.add('show');
    }, 3000);

    function hideCookieBanner() {
        if (cookieBanner) cookieBanner.classList.remove('show');
    }

    if (acceptBtn) acceptBtn.addEventListener('click', hideCookieBanner);
    if (rejectBtn) rejectBtn.addEventListener('click', hideCookieBanner);

    // ==========================================================
    // 6. FILE UPLOAD NAME DISPLAY
    // ==========================================================
    const fileInput = document.getElementById('file-upload');
    const fileNameDisplay = document.getElementById('fileNameDisplay');

    if (fileInput && fileNameDisplay) {
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                fileNameDisplay.textContent = fileInput.files[0].name;
                fileNameDisplay.style.color = 'var(--color-primary)';
            } else {
                fileNameDisplay.textContent = 'Nenhum arquivo selecionado';
                fileNameDisplay.style.color = '';
            }
        });
    }

    // ==========================================================
    // 7. SMOOTH SCROLL for nav links
    // ==========================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();

                // If on hero, unlock scroll
                body.style.overflow = '';
                if (navbar) navbar.classList.remove('hero-mode');

                // Close mobile nav
                const navCollapse = document.getElementById('navbarNav');
                if (navCollapse && navCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                    if (bsCollapse) bsCollapse.hide();
                }

                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ==========================================================
    // 8. ACTIVE NAV LINK HIGHLIGHT
    // ==========================================================
    const navLinks = document.querySelectorAll('.nav-link[data-nav]');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // ==========================================================
    // 9. EASTER EGG (5 clicks on lightning icon in services)
    // ==========================================================
    let eeClickCount = 0;
    const lightningIcon = document.querySelector('.servico-item-icon .bi-lightning-charge');
    const creditsBox = document.getElementById('dev-credits-easter-egg');

    if (lightningIcon && creditsBox) {
        const iconWrapper = lightningIcon.closest('.servico-icon');
        if (iconWrapper) iconWrapper.style.cursor = 'help';

        lightningIcon.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            eeClickCount++;

            if (eeClickCount >= 5) {
                creditsBox.classList.add('show');
                eeClickCount = 0;

                setTimeout(() => {
                    creditsBox.classList.remove('show');
                }, 8000);
            }

            clearTimeout(window._eeTimer);
            window._eeTimer = setTimeout(() => {
                eeClickCount = 0;
            }, 3000);
        });
    }

    // ==========================================================
    // 10. CANVAS — PARTICLE NETWORK
    // ==========================================================
    const canvas = document.getElementById('network-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 150 };
        let animationId;

        function resizeCanvas() {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
        }

        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });
        resizeCanvas();

        canvas.parentElement.addEventListener('mousemove', (e) => {
            const rect = canvas.parentElement.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        canvas.parentElement.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.8;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
                if (this.y > canvas.height || this.y < 0) this.speedY *= -1;

                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        this.x -= (dx / dist) * force * 2;
                        this.y -= (dy / dist) * force * 2;
                    }
                }
            }

            draw() {
                ctx.fillStyle = '#f07e30';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            const count = Math.min((canvas.width * canvas.height) / 15000, 150);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 110) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(26, 60, 60, ${1 - dist / 110})`;
                        ctx.lineWidth = 0.4;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            animationId = requestAnimationFrame(animate);
        }

        initParticles();
        animate();

        // Pause when not visible for performance
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!animationId) animate();
                } else {
                    if (animationId) {
                        cancelAnimationFrame(animationId);
                        animationId = null;
                    }
                }
            });
        }, { threshold: 0.1 });

        heroObserver.observe(canvas.parentElement);
    }

    // ==========================================================
    // 11. EQUIPE CARD — TILT EFFECT ON HOVER
    // ==========================================================
    document.querySelectorAll('.equipe-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -3;
            const rotateY = ((x - centerX) / centerX) * 3;

            card.style.transform = `translateY(-6px) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ==========================================================
    // 12. SERVICO CARD — COUNTER ON HOVER
    // ==========================================================
    document.querySelectorAll('.servico-card').forEach((card, i) => {
        card.style.setProperty('--card-index', i);
    });

});