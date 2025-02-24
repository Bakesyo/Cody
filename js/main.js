class ContactForm {
    constructor(formElement) {
        this.form = formElement;
        this.submitButton = this.form.querySelector('button[type="submit"]');
        this.fields = Array.from(this.form.querySelectorAll('input, textarea'));
        
        this.setupValidation();
        this.setupAutoSave();
    }
    
    setupValidation() {
        this.fields.forEach(field => {
            field.addEventListener('input', () => this.validateField(field));
        });
    }
    
    setupAutoSave() {
        this.fields.forEach(field => {
            // Restore saved value
            const saved = localStorage.getItem(`form_${field.id}`);
            if (saved) field.value = saved;
            
            // Save on input
            field.addEventListener('input', () => {
                localStorage.setItem(`form_${field.id}`, field.value);
            });
        });
    }
    
    async submitForm() {
        try {
            this.setLoading(true);
            
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.getFormData())
            });
            
            if (!response.ok) throw new Error('Submission failed');
            
            this.showSuccess();
            this.clearForm();
        } catch (error) {
            this.showError(error);
        } finally {
            this.setLoading(false);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    try {
        console.log('Initializing components...');
        
        // Initialize tech sphere
        console.log('Initializing Tech Sphere...');
        new TechSphere();
        
        // Initialize scroll animations
        console.log('Setting up scroll animations...');
        initializeScrollAnimations();
        
        // Setup modal interactions
        console.log('Setting up modal interactions...');
        setupModalInteractions();
        
        // Setup form validation
        console.log('Setting up form validation...');
        setupFormValidation();
        
        console.log('All components initialized successfully');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});

function initializeScrollAnimations() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

function setupModalInteractions() {
    const modal = document.querySelector('.modal');
    if (!modal) {
        console.warn('Modal element not found');
        return;
    }

    const closeBtn = modal.querySelector('.close-modal');
    if (!closeBtn) {
        console.warn('Modal close button not found');
        return;
    }
    
    document.querySelectorAll('.project').forEach(project => {
        project.addEventListener('click', () => {
            try {
                const projectId = project.dataset.project;
                if (!projectId) {
                    throw new Error('Project ID not found');
                }
                
                const projectData = window.projectDetails[projectId];
                if (!projectData) {
                    throw new Error('Project data not found');
                }
                
                updateModalContent(projectData);
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            } catch (error) {
                console.error('Error opening project modal:', error);
            }
        });
    });
    
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Add click outside to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Add helper function for modal content
function updateModalContent(projectData) {
    const modal = document.querySelector('.modal');
    
    try {
        modal.querySelector('.modal-title').textContent = projectData.title;
        modal.querySelector('.project-description').textContent = projectData.description;
        
        const techStack = modal.querySelector('.tech-stack');
        techStack.innerHTML = projectData.technologies.frontend
            .concat(projectData.technologies.backend)
            .map(tech => `<span class="tech-tag">${tech}</span>`)
            .join('');
            
        const features = modal.querySelector('.project-features');
        features.innerHTML = `
            <h3>Key Features</h3>
            <ul>
                ${projectData.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        `;
    } catch (error) {
        console.error('Error updating modal content:', error);
    }
}

function setupFormValidation() {
    const form = document.querySelector('.contact-form');
    const formHandler = new ContactForm(form);
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await formHandler.submitForm();
    });
} 