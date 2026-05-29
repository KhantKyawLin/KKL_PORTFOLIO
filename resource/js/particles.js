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

    // 4. Lights Setup (Sunlight & Moonlight targets)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xfff5d6, 1.0);
    directionalLight.position.set(5, 5, 4);
    scene.add(directionalLight);

    // 5. Generate Soft Circle Texture Programmatically
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
    const circleTexture = createCircleTexture();

    // Generate Rain Streak Texture Programmatically (square to preserve aspect ratio in point billboards)
    function createRainTexture() {
        const c = document.createElement('canvas');
        c.width = 64;
        c.height = 64;
        const ctx = c.getContext('2d');
        const grad = ctx.createLinearGradient(32, 0, 32, 64);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        grad.addColorStop(0.2, 'rgba(255, 255, 255, 0.1)');
        grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
        grad.addColorStop(0.8, 'rgba(255, 255, 255, 0.1)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(30, 0, 4, 64);
        return new THREE.CanvasTexture(c);
    }
    const rainTexture = createRainTexture();

    // Generate Glowing Celestial Body Texture (Sun/Moon)
    function createGlowTexture(colorStr1, colorStr2) {
        const c = document.createElement('canvas');
        c.width = 128;
        c.height = 128;
        const ctx = c.getContext('2d');
        const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        grad.addColorStop(0, colorStr1);
        grad.addColorStop(0.3, colorStr1);
        grad.addColorStop(0.6, colorStr2);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 128, 128);
        return new THREE.CanvasTexture(c);
    }

    // Determine initial state
    const isDarkInitial = document.body.classList.contains('dark-theme') || document.documentElement.classList.contains('dark-theme');
    const initialTheme = isDarkInitial ? 'dark' : 'light';

    const getInitialWeather = () => {
        const saved = localStorage.getItem("weather") || "auto";
        if (saved !== "auto") return saved;
        const hour = new Date().getHours();
        if (hour >= 0 && hour < 8) return "windy";
        if (hour >= 8 && hour < 16) return "snowy";
        return "rainy";
    };
    const initialWeather = getInitialWeather();

    // 6. Create Sun & Moon
    const sunTexture = createGlowTexture('rgba(255, 223, 103, 1)', 'rgba(255, 150, 50, 0.3)');
    const sunMaterial = new THREE.SpriteMaterial({
        map: sunTexture,
        transparent: true,
        opacity: initialTheme === 'light' ? 0.9 : 0.0,
        blending: THREE.AdditiveBlending
    });
    const sunSprite = new THREE.Sprite(sunMaterial);
    sunSprite.scale.set(4.5, 4.5, 1);
    sunSprite.position.set(initialTheme === 'light' ? 5 : 8, initialTheme === 'light' ? 3.5 : -4, -15);
    scene.add(sunSprite);

    const moonTexture = createGlowTexture('rgba(224, 242, 254, 1)', 'rgba(100, 150, 243, 0.25)');
    const moonMaterial = new THREE.SpriteMaterial({
        map: moonTexture,
        transparent: true,
        opacity: initialTheme === 'dark' ? 0.95 : 0.0,
        blending: THREE.AdditiveBlending
    });
    const moonSprite = new THREE.Sprite(moonMaterial);
    moonSprite.scale.set(3.5, 3.5, 1);
    moonSprite.position.set(initialTheme === 'dark' ? -5 : -8, initialTheme === 'dark' ? 3.5 : -4, -15);
    scene.add(moonSprite);

    // 7. Create Particles
    const particleCount = 750; // Balanced for good looks and performance
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);
    const phases = new Float32Array(particleCount);

    // Spread particles in a 3D box
    for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        positions[idx] = (Math.random() - 0.5) * 20;     // X (-10 to 10)
        positions[idx + 1] = (Math.random() - 0.5) * 16; // Y (-8 to 8)
        positions[idx + 2] = (Math.random() - 0.5) * 10; // Z (-5 to 5)

        speeds[i] = 0.6 + Math.random() * 0.8;           // speed multiplier (0.6 to 1.4)
        phases[i] = Math.random() * Math.PI * 2;          // phase for sine sway
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle Material
    const material = new THREE.PointsMaterial({
        size: 0.18,
        map: circleTexture,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // State Targets and Current Values
    const state = {
        theme: initialTheme,
        weather: initialWeather,
        
        // Theme Targets
        sunOpacity: initialTheme === 'light' ? 0.9 : 0.0,
        sunX: initialTheme === 'light' ? 5 : 8,
        sunY: initialTheme === 'light' ? 3.5 : -4,
        
        moonOpacity: initialTheme === 'dark' ? 0.95 : 0.0,
        moonX: initialTheme === 'dark' ? -5 : -8,
        moonY: initialTheme === 'dark' ? 3.5 : -4,
        
        ambientIntensity: initialTheme === 'light' ? 0.7 : 0.4,
        dirIntensity: initialTheme === 'light' ? 1.0 : 0.3,
        dirColor: new THREE.Color(initialTheme === 'light' ? 0xfff5d6 : 0xb0d0ff),
        dirX: initialTheme === 'light' ? 5 : -5,
        dirY: 5,
        
        // Weather Targets
        weatherSpeedY: 0.01,
        weatherSpeedX: 0.03,
        weatherSway: 0.01,
        particleSize: 0.18,
        particleOpacity: 0.65,
        particleColor: new THREE.Color(0x00b4d8)
    };

    // Current interpolation values
    let currentSunOpacity = state.sunOpacity;
    let currentSunX = state.sunX;
    let currentSunY = state.sunY;
    
    let currentMoonOpacity = state.moonOpacity;
    let currentMoonX = state.moonX;
    let currentMoonY = state.moonY;

    let currentAmbientIntensity = state.ambientIntensity;
    let currentDirIntensity = state.dirIntensity;
    let currentDirColor = state.dirColor.clone();
    let currentDirX = state.dirX;

    let currentWeatherSpeedY = state.weatherSpeedY;
    let currentWeatherSpeedX = state.weatherSpeedX;
    let currentWeatherSway = state.weatherSway;
    let currentParticleSize = state.particleSize;
    let currentParticleOpacity = state.particleOpacity;
    let currentParticleColor = state.particleColor.clone();

    // Function to calculate target values based on Theme
    function updateThemeTargets(theme) {
        state.theme = theme;
        if (theme === 'light') {
            state.sunOpacity = 0.9;
            state.sunX = 5;
            state.sunY = 3.5;
            
            state.moonOpacity = 0.0;
            state.moonX = -8;
            state.moonY = -4;
            
            state.ambientIntensity = 0.7;
            state.dirIntensity = 1.0;
            state.dirColor.setHex(0xfff5d6);
            state.dirX = 5;
        } else {
            state.sunOpacity = 0.0;
            state.sunX = 8;
            state.sunY = -4;
            
            state.moonOpacity = 0.95;
            state.moonX = -5;
            state.moonY = 3.5;
            
            state.ambientIntensity = 0.4;
            state.dirIntensity = 0.3;
            state.dirColor.setHex(0xb0d0ff);
            state.dirX = -5;
        }
        // Force update weather targets because it might depend on the theme
        updateWeatherTargets(state.weather);
    }

    // Function to calculate target values based on Weather
    function updateWeatherTargets(weather) {
        state.weather = weather;
        if (weather === 'windy') {
            state.weatherSpeedY = 0.005; // very slow drift down
            state.weatherSpeedX = 0.04;  // nice wind drift to the right
            state.weatherSway = 0.015;   // wavy motion
            state.particleSize = 0.18;
            state.particleOpacity = 0.6;
            state.particleColor.setHex(state.theme === 'dark' ? 0x00b4d8 : 0x0077b6);
            
            material.map = circleTexture;
            material.needsUpdate = true;
        } else if (weather === 'snowy') {
            state.weatherSpeedY = 0.018; // slow falling
            state.weatherSpeedX = 0.003; // minimal drift
            state.weatherSway = 0.025;   // flutter sway
            state.particleSize = 0.25;   // fluffy snow
            state.particleOpacity = 0.8;
            state.particleColor.setHex(0xffffff); // white snow
            
            material.map = circleTexture;
            material.needsUpdate = true;
        } else if (weather === 'rainy') {
            state.weatherSpeedY = 0.16;  // fast falling down
            state.weatherSpeedX = 0.0;   // straight down
            state.weatherSway = 0.0;     // no sway
            state.particleSize = 0.35;   // elongated streak (larger billboard helps visibility)
            state.particleOpacity = 0.55;
            state.particleColor.setHex(state.theme === 'dark' ? 0x3a86ff : 0x0077b6); // cool rain blue
            
            material.map = rainTexture;
            material.needsUpdate = true;
        }
    }

    // Run initially
    updateThemeTargets(initialTheme);
    updateWeatherTargets(initialWeather);

    // 8. Interactive Mouse Movement (Parallax)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) / windowHalfX;
        mouseY = (event.clientY - windowHalfY) / windowHalfY;
    });

    document.addEventListener('touchmove', (event) => {
        if (event.touches.length === 1) {
            mouseX = (event.touches[0].clientX - windowHalfX) / windowHalfX;
            mouseY = (event.touches[0].clientY - windowHalfY) / windowHalfY;
        }
    }, { passive: true });

    // 9. Window Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // 10. Listeners for Dynamic System updates
    window.addEventListener('themeChanged', (e) => {
        updateThemeTargets(e.detail);
    });

    window.addEventListener('weatherChanged', (e) => {
        updateWeatherTargets(e.detail);
    });

    // 11. Animation & Render Loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        // Interpolations (lerp)
        currentSunOpacity += (state.sunOpacity - currentSunOpacity) * 0.05;
        currentSunX += (state.sunX - currentSunX) * 0.05;
        currentSunY += (state.sunY - currentSunY) * 0.05;

        currentMoonOpacity += (state.moonOpacity - currentMoonOpacity) * 0.05;
        currentMoonX += (state.moonX - currentMoonX) * 0.05;
        currentMoonY += (state.moonY - currentMoonY) * 0.05;

        currentAmbientIntensity += (state.ambientIntensity - currentAmbientIntensity) * 0.05;
        currentDirIntensity += (state.dirIntensity - currentDirIntensity) * 0.05;
        currentDirColor.lerp(state.dirColor, 0.05);
        currentDirX += (state.dirX - currentDirX) * 0.05;

        currentWeatherSpeedY += (state.weatherSpeedY - currentWeatherSpeedY) * 0.05;
        currentWeatherSpeedX += (state.weatherSpeedX - currentWeatherSpeedX) * 0.05;
        currentWeatherSway += (state.weatherSway - currentWeatherSway) * 0.05;
        currentParticleSize += (state.particleSize - currentParticleSize) * 0.05;
        currentParticleOpacity += (state.particleOpacity - currentParticleOpacity) * 0.05;
        currentParticleColor.lerp(state.particleColor, 0.05);

        // Apply theme/lighting values to meshes/lights
        sunSprite.material.opacity = currentSunOpacity;
        sunSprite.position.set(currentSunX, currentSunY, -15);

        moonSprite.material.opacity = currentMoonOpacity;
        moonSprite.position.set(currentMoonX, currentMoonY, -15);

        ambientLight.intensity = currentAmbientIntensity;
        directionalLight.intensity = currentDirIntensity;
        directionalLight.color.copy(currentDirColor);
        directionalLight.position.set(currentDirX, 5, 4);

        material.size = currentParticleSize;
        material.opacity = currentParticleOpacity;
        material.color.copy(currentParticleColor);

        // Slow overall rotation for organic look
        particleSystem.rotation.y = elapsedTime * 0.015;
        particleSystem.rotation.x = elapsedTime * 0.008;

        // Easing mouse parallax
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        camera.position.x = targetX * 1.5;
        camera.position.y = -targetY * 1.5;
        camera.lookAt(scene.position);

        // Physics update on each particle
        const pos = geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
            const idx = i * 3;

            // Apply downward velocity
            pos[idx + 1] -= currentWeatherSpeedY * speeds[i];

            // Apply horizontal velocity
            pos[idx] += currentWeatherSpeedX * speeds[i];

            // Apply sine wave sway if applicable
            if (currentWeatherSway > 0) {
                // Combine a fast time factor and phase to make wind wave
                pos[idx + 1] += Math.sin(elapsedTime * 1.5 + phases[i]) * 0.005; // tiny vertical waviness
                pos[idx] += Math.sin(elapsedTime * 2.0 + phases[i]) * currentWeatherSway * speeds[i];
            }

            // Wrapping boundaries (keeps particles within the frustum)
            // Y-axis wrapping
            if (pos[idx + 1] < -8) {
                pos[idx + 1] = 8;
                pos[idx] = (Math.random() - 0.5) * 20; // randomize X coordinate
            }

            // X-axis wrapping
            if (pos[idx] > 12) {
                pos[idx] = -12;
                pos[idx + 1] = (Math.random() - 0.5) * 16;
            } else if (pos[idx] < -12) {
                pos[idx] = 12;
                pos[idx + 1] = (Math.random() - 0.5) * 16;
            }
        }
        geometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
    }

    animate();
})();
