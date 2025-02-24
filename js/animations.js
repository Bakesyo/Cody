// Smooth scroll with dynamic parallax
const parallaxScroll = () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const distance = window.scrollY - section.offsetTop;
        const parallaxElements = section.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax;
            element.style.transform = `translateY(${distance * speed}px)`;
        });
    });
};

// Intersection Observer for element animations
const createObserver = (elements, animationClass) => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(animationClass);
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.2,
            rootMargin: '50px'
        }
    );

    elements.forEach(el => observer.observe(el));
};

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Update scroll animation observer
function initializeScrollAnimations() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && isInViewport(entry.target)) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { 
            threshold: 0.1,
            rootMargin: '50px'
        }
    );

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
} 