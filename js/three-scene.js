import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';

class NFCScene {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        this.init();
        this.setupLights();
        this.loadModel();
        this.animate();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.querySelector('.hero-visual').appendChild(this.renderer.domElement);
        
        this.camera.position.z = 5;
        
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    setupLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x4a9eff, 2);
        pointLight.position.set(5, 5, 5);
        this.scene.add(pointLight);
    }

    loadModel() {
        const loader = new GLTFLoader();
        
        loader.load('/assets/models/nfc-chip.glb', (gltf) => {
            this.model = gltf.scene;
            this.model.scale.set(0.5, 0.5, 0.5);
            this.scene.add(this.model);
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (this.model) {
            this.model.rotation.y += 0.005;
            this.model.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize 3D scene when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NFCScene();
}); 