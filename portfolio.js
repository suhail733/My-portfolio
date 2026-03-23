document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active')
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });

    // Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });


    // --- Scroll Animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Elements to animate
    const sections = document.querySelectorAll('section');
    const heroContent = document.querySelector('.hero-content');
    const cards = document.querySelectorAll('.service-card, .project-card, .stat-card');

    // Add initial opacity 0 class
    const addAnimationBase = (el, delay = 0) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s cubic-bezier(0.5, 0, 0, 1) ${delay}s`;
        observer.observe(el);
    };

    if (heroContent) addAnimationBase(heroContent);

    sections.forEach(section => {
        const title = section.querySelector('.section-title');
        if (title) addAnimationBase(title);

        // Staggered animation for grids
        const gridItems = section.querySelectorAll('.service-card, .project-card, .stat-card, .about-content');
        gridItems.forEach((item, index) => {
            addAnimationBase(item, index * 0.1);
        });
    });

    // Class to add when visible
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);


    // --- Contact Form Handling ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simulation
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Thank you, Mehran! Your message has been sent successfully. (Demo)');
                contactForm.reset();
                btn.innerText = 'Message Sent';

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

});