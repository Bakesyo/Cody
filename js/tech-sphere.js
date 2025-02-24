class TechSphere {
    constructor() {
        this.container = document.querySelector('.tech-sphere');
        if (!this.container) {
            console.warn('Tech sphere container not found');
            return;
        }

        try {
            this.keywords = [
                'NFC', 'IoT', 'React', 'Node.js', 'Python',
                'AI', 'MongoDB', 'AWS', 'Docker', 'Security',
                'API', 'Cloud', 'DevOps', 'ML', 'Automation',
                'TypeScript', 'GraphQL', 'CI/CD', 'Kubernetes'
            ];
            this.radius = 200;
            this.init();
        } catch (error) {
            console.error('Error initializing tech sphere:', error);
        }
    }

    init() {
        // Clear existing content
        this.container.innerHTML = '';
        
        this.keywords.forEach((word, index) => {
            try {
                const element = document.createElement('span');
                element.textContent = word;
                element.className = 'tech-keyword';
                
                const phi = Math.acos(-1 + (2 * index) / this.keywords.length);
                const theta = Math.sqrt(this.keywords.length * Math.PI) * phi;
                
                const x = this.radius * Math.cos(theta) * Math.sin(phi);
                const y = this.radius * Math.sin(theta) * Math.sin(phi);
                const z = this.radius * Math.cos(phi);
                
                element.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
                this.container.appendChild(element);
            } catch (error) {
                console.error(`Error creating keyword element for "${word}":`, error);
            }
        });

        this.animate();
    }

    animate() {
        let time = 0;
        const animate = () => {
            time += 0.002;
            const keywords = this.container.querySelectorAll('.tech-keyword');
            
            keywords.forEach((word, index) => {
                const phi = Math.acos(-1 + (2 * index) / this.keywords.length);
                const theta = Math.sqrt(this.keywords.length * Math.PI) * phi + time;
                
                const x = this.radius * Math.cos(theta) * Math.sin(phi);
                const y = this.radius * Math.sin(theta) * Math.sin(phi);
                const z = this.radius * Math.cos(phi);
                
                word.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
                word.style.opacity = (z + this.radius) / (2 * this.radius);
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
} 