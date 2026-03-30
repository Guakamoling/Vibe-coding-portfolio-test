document.addEventListener('DOMContentLoaded', () => {
    /* --- Custom Cursor Logic --- */
    const cursor = document.querySelector('.cursor');
    const menuItems = document.querySelectorAll('.menu-item');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');
        });
        item.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
        });
        
        /* --- Smooth Scroll Logic --- */
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                // Target the section title for scrolling instead of the whole section to skip massive top padding
                const titleElement = targetSection.querySelector('.section-title') || targetSection;
                const offset = 80; // 80px breathing room from the top
                const elementPosition = titleElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
        
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* --- Intersection Observer for Content Reveal --- */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    document.querySelectorAll('.content-section').forEach(section => {
        revealObserver.observe(section);
    });
});

/* Simple CSS transition for revealed state (could be in style.css too) */
const style = document.createElement('style');
style.textContent = `
    .content-section {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 1s cubic-bezier(0.19, 1, 0.22, 1), transform 1s cubic-bezier(0.19, 1, 0.22, 1);
    }
    .content-section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
