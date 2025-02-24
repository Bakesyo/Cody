// Custom cursor
const cursor = document.querySelector('.cursor');
const cursor2 = document.querySelector('.cursor2');

// Add error handling for cursor elements
if (cursor && cursor2) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.cssText = cursor2.style.cssText = `left: ${e.clientX}px; top: ${e.clientY}px;`;
    });
}

// Dark mode toggle with localStorage persistence
const themeToggle = document.querySelector('#theme-toggle');
const themeToggleNav = document.querySelector('#theme-toggle-nav');

function toggleTheme() {
    const newTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Initialize theme from localStorage or system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.setAttribute('data-theme', 'dark');
}

themeToggle.addEventListener('click', toggleTheme);
themeToggleNav.addEventListener('click', toggleTheme);

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Contact form handling
const contactForm = document.querySelector('#contact-form');

const SUBMIT_COOLDOWN = 60000; // 1 minute in milliseconds
let lastSubmitTime = 0;

function validateForm(formData) {
    const errors = [];
    
    if (!formData.get('name')?.trim()) {
        errors.push('Name is required');
    }
    
    const email = formData.get('email')?.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Valid email is required');
    }
    
    if (!formData.get('message')?.trim()) {
        errors.push('Message is required');
    }
    
    return errors;
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const now = Date.now();
    if (now - lastSubmitTime < SUBMIT_COOLDOWN) {
        showNotification('Please wait a minute before sending another message.', 'error');
        return;
    }
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    const formData = new FormData(contactForm);
    const errors = validateForm(formData);
    
    if (errors.length > 0) {
        alert('Please fix the following errors:\n' + errors.join('\n'));
        return;
    }
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    try {
        // Replace with your API endpoint
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        });
        
        if (response.ok) {
            lastSubmitTime = now;
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
        } else {
            throw new Error('Server responded with an error');
        }
    } catch (error) {
        console.error('Error sending message:', error);
        showNotification('Failed to send message. Please try again.', 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }
});

// Add notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Shorten the loading sequence further
const loadingMessages = [
    ['Scanning NFC Tag', 30],
    ['Loading Portfolio', 60],
    ['Preparing Experience', 100]
];

// Fix the loading screen elements
const loadingScreen = document.querySelector('#loading-screen');
const loadingText = document.querySelector('.text-animate');

// Replace MatrixRain class with ParticleNetwork
class ParticleNetwork {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'particle-network';
        this.ctx = this.canvas.getContext('2d');
        document.querySelector('.loading-screen').prepend(this.canvas);
        
        this.particles = [];
        this.particleCount = 30;
        this.connectDistance = 150;
        this.particleSpeed = 0.3;
        
        this.initialize();
        window.addEventListener('resize', () => this.initialize());
    }
    
    initialize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Create particles
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.particleSpeed,
                vy: (Math.random() - 0.5) * this.particleSpeed,
                size: Math.random() * 1.5 + 0.5
            });
        }
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = 'var(--primary-color)';
            this.ctx.fill();
            
            // Connect particles
            this.particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.connectDistance) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `rgba(var(--primary-color-rgb), ${1 - distance / this.connectDistance})`;
                    this.ctx.stroke();
                }
            });
        });
    }
    
    start() {
        const animate = () => {
            this.draw();
            this.animationId = requestAnimationFrame(animate);
        };
        animate();
    }
    
    stop() {
        cancelAnimationFrame(this.animationId);
    }
}

// Modify the simulateLoading function
async function simulateLoading() {
    const particleNetwork = new ParticleNetwork();
    particleNetwork.start();
    
    const progressBar = document.querySelector('.loading-status');
    
    for (const [message, progress] of loadingMessages) {
        await typeWriter(loadingText, message);
        progressBar.style.setProperty('--progress', `${progress}%`);
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    particleNetwork.stop();
    loadingScreen.classList.add('fade-out');
    
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        document.querySelectorAll('section').forEach(section => {
            if (section.getBoundingClientRect().top < window.innerHeight) {
                section.classList.add('visible');
            }
        });
    }, 300);
}

// Start loading sequence when page loads
window.addEventListener('load', simulateLoading);

async function typeWriter(element, text, speed = 30) {
    element.textContent = '';
    for (let i = 0; i < text.length; i++) {
        element.textContent += text[i];
        await new Promise(resolve => setTimeout(resolve, speed));
    }
}

// Project Modal Handling
const projectData = {
    'nfc-legal': {
        title: 'NFC Legal Documents System',
        description: 'A revolutionary document management system that uses NFC technology to provide secure, instant access to legal documents.',
        features: [
            'Instant document access via NFC tags',
            'Military-grade encryption',
            'Real-time document tracking',
            'Version control system',
            'Digital signature integration'
        ],
        techStack: ['React', 'Node.js', 'MongoDB', 'NFC API', 'AWS'],
        images: ['nfc-1.jpg', 'nfc-2.jpg', 'nfc-3.jpg'],
        demo: 'https://nfc-legal.demo.com',
        source: 'https://github.com/yourusername/nfc-legal'
    },
    'ai-support': {
        title: 'AI Customer Support Bot',
        description: 'An intelligent customer support system that uses advanced AI to provide instant, accurate responses to customer queries.',
        features: [
            'Natural language processing',
            'Context-aware responses',
            'Multi-language support',
            'Integration with CRM systems',
            'Analytics dashboard'
        ],
        techStack: ['Python', 'TensorFlow', 'FastAPI', 'Redis', 'Docker'],
        images: ['ai-1.jpg', 'ai-2.jpg', 'ai-3.jpg'],
        demo: 'https://ai-support.demo.com',
        source: 'https://github.com/yourusername/ai-support'
    },
    // Add more projects...
};

function openProjectModal(projectId) {
    const modal = document.getElementById('project-modal');
    const project = projectData[projectId];
    
    if (!project) return;
    
    // Populate modal content
    modal.querySelector('.modal-title').textContent = project.title;
    modal.querySelector('.project-description').textContent = project.description;
    
    // Populate tech stack
    const techStack = modal.querySelector('.tech-stack');
    techStack.innerHTML = project.techStack.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');
    
    // Populate features
    const features = modal.querySelector('.project-features');
    features.innerHTML = `
        <h3>Key Features</h3>
        <ul>
            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
    `;
    
    // Set button links
    modal.querySelector('.btn-demo').href = project.demo;
    modal.querySelector('.btn-source').href = project.source;
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Add event listeners
document.querySelectorAll('.project').forEach(project => {
    project.addEventListener('click', () => {
        openProjectModal(project.dataset.project);
    });
});

document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('project-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}); 