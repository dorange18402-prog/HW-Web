document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing after reveal
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            // Basic mobile menu logic
            // For a production app, we'd add more robust styling
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            
            // If displayed, style it as an overlay
            if (navLinks.style.display === 'flex') {
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'var(--bg-dark)';
                navLinks.style.flexDirection = 'column';
                navLinks.style.padding = '2rem';
                navLinks.style.borderBottom = '1px solid var(--border)';
            }
        });
    }

    // 4. Staggered reveal for about cards
    const aboutCards = document.querySelectorAll('.about-card');
    aboutCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });

    // 5. Timeline active state handling (Optional aesthetic refinement)
    // Marks the item closer to the center of viewport as active
    window.addEventListener('scroll', () => {
        const timelineItems = document.querySelectorAll('.timeline-item');
        let currentActive = null;
        let minDistance = Infinity;

        timelineItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const distance = Math.abs(rect.top - window.innerHeight / 2);
            
            if (distance < minDistance) {
                minDistance = distance;
                currentActive = item;
            }
        });

        if (currentActive) {
            timelineItems.forEach(item => item.classList.remove('active'));
            currentActive.classList.add('active');
        }
    });
});
