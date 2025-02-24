class NFCSimulation {
    constructor() {
        this.canvas = document.getElementById('nfc-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mousePosition = { x: 0, y: 0 };
        this.isActive = false;
        
        // NFC field parameters
        this.fieldRadius = 150;
        this.particleCount = 50;
        this.dataStreams = [];
        
        this.setupCanvas();
        this.setupEventListeners();
        this.createParticles();
        this.animate();
    }

    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.createParticles();
        });
    }

    setupEventListeners() {
        this.canvas.addEventListener('mousemove', (e) => {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
            this.activateField();
        });

        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.mousePosition.x = e.touches[0].clientX;
            this.mousePosition.y = e.touches[0].clientY;
            this.activateField();
        });
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2,
                color: `hsla(${220 + Math.random() * 40}, 70%, 60%, 0.8)`
            });
        }
    }

    activateField() {
        if (!this.isActive) {
            this.isActive = true;
            this.updateStatus('NFC Field Active', 'active');
            this.createDataStream();
        }
    }

    createDataStream() {
        const stream = {
            points: [],
            progress: 0,
            complete: false
        };

        for (let i = 0; i < 5; i++) {
            stream.points.push({
                x: this.mousePosition.x + Math.random() * 40 - 20,
                y: this.mousePosition.y + Math.random() * 40 - 20
            });
        }

        this.dataStreams.push(stream);
    }

    updateStatus(message, state) {
        const statusText = document.querySelector('.status-text');
        const statusDot = document.querySelector('.status-dot');
        
        statusText.textContent = message;
        statusDot.className = `status-dot ${state}`;
    }

    drawParticles() {
        this.particles.forEach(particle => {
            // Calculate distance from mouse/touch position
            const dx = this.mousePosition.x - particle.x;
            const dy = this.mousePosition.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.fieldRadius && this.isActive) {
                // Particle is within NFC field
                const angle = Math.atan2(dy, dx);
                particle.x += Math.cos(angle) * 2;
                particle.y += Math.sin(angle) * 2;
            } else {
                // Normal particle movement
                particle.x += particle.speedX;
                particle.y += particle.speedY;
            }

            // Wrap particles around screen
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
        });
    }

    drawDataStreams() {
        this.dataStreams = this.dataStreams.filter(stream => !stream.complete);

        this.dataStreams.forEach(stream => {
            this.ctx.beginPath();
            this.ctx.moveTo(stream.points[0].x, stream.points[0].y);

            for (let i = 1; i < stream.points.length; i++) {
                this.ctx.lineTo(stream.points[i].x, stream.points[i].y);
            }

            this.ctx.strokeStyle = `hsla(220, 70%, 60%, ${1 - stream.progress})`;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            stream.progress += 0.02;
            if (stream.progress >= 1) {
                stream.complete = true;
            }
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.drawParticles();
        this.drawDataStreams();

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize simulation when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NFCSimulation();
}); 