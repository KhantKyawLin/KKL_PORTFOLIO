(function () {
    // 1. Scene Setup
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 8;

    // 3. Renderer Setup (with transparency)
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Generate Soft Circle Texture Programmatically (No external image needed)
    function createCircleTexture() {
        const c = document.createElement('canvas');
        c.width = 32;
        c.height = 32;
        const ctx = c.getContext('2d');
        const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 32, 32);
        return new THREE.CanvasTexture(c);
    }
    const particleTexture = createCircleTexture();

    // 5. Create Particles
    const particleCount = 1000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    // Spread particles in a 3D box
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 20;     // X (-10 to 10)
        positions[i + 1] = (Math.random() - 0.5) * 15; // Y (-7.5 to 7.5)
        positions[i + 2] = (Math.random() - 0.5) * 10; // Z (-5 to 5)
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Theme-specific colors
    const getColors = () => {
        const isDark = document.body.classList.contains('dark-theme');
        return {
            particleColor: isDark ? 0x00b4d8 : 0x0077b6, // cyan in dark mode, blue in light mode
        };
    };

    let colors = getColors();

    // Particle Material
    const material = new THREE.PointsMaterial({
        size: 0.18,
        map: particleTexture,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        color: colors.particleColor
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // 6. Interactive Mouse Movement (Parallax)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        // Normalize mouse coordinates to (-1 to 1)
        mouseX = (event.clientX - windowHalfX) / windowHalfX;
        mouseY = (event.clientY - windowHalfY) / windowHalfY;
    });

    // Support touch devices (scrolling/touch parallax)
    document.addEventListener('touchmove', (event) => {
        if (event.touches.length === 1) {
            mouseX = (event.touches[0].clientX - windowHalfX) / windowHalfX;
            mouseY = (event.touches[0].clientY - windowHalfY) / windowHalfY;
        }
    }, { passive: true });

    // 7. Window Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // 8. Animation & Render Loop
    let frameCount = 0;
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();
        frameCount++;

        // Slow rotation of the particle system
        particleSystem.rotation.y = elapsedTime * 0.03;
        particleSystem.rotation.x = elapsedTime * 0.015;

        // Smooth mouse parallax easing (lerp)
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        // Shift camera slightly based on mouse parallax
        camera.position.x = targetX * 1.5;
        camera.position.y = -targetY * 1.5;
        camera.lookAt(scene.position);

        // Check for theme updates every 15 frames (efficient)
        if (frameCount % 15 === 0) {
            const currentColors = getColors();
            if (material.color.getHex() !== currentColors.particleColor) {
                material.color.setHex(currentColors.particleColor);
            }
        }

        renderer.render(scene, camera);
    }

    animate();
})();
