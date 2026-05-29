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

    // 4. Lights Setup (Keep simple ambient/directional light for 3D compatibility)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 4);
    scene.add(directionalLight);

    // 5. Generate Textures Programmatically
    // Soft Circle Texture (Windy)
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

    // Fluffy Snowflake Texture (Snowy)
    function createSnowTexture() {
        const c = document.createElement('canvas');
        c.width = 32;
        c.height = 32;
        const ctx = c.getContext('2d');
        const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.85)');
        grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.2)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 32, 32);
        return new THREE.CanvasTexture(c);
    }
    const snowTexture = createSnowTexture();

    // Rain Streak Texture (Rainy)
    function createRainTexture() {
        const c = document.createElement('canvas');
        c.width = 64;
        c.height = 64;
        const ctx = c.getContext('2d');
        const grad = ctx.createLinearGradient(32, 0, 32, 64);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        grad.addColorStop(0.1, 'rgba(255, 255, 255, 0.1)');
        grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.9)');
        grad.addColorStop(0.9, 'rgba(255, 255, 255, 0.1)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(31, 0, 2, 64);
        return new THREE.CanvasTexture(c);
    }
    const rainTexture = createRainTexture();

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

    // 6. Create Particles
    const particleCount = 750; // Balanced for performance and appearance
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
        
        // Weather Targets
        weatherSpeedY: 0.01,
        weatherSpeedX: 0.03,
        weatherSway: 0.01,
        particleSize: 0.18,
        particleOpacity: 0.65,
        particleColor: new THREE.Color(0x00b4d8)
    };

    // Current interpolation values
    let currentWeatherSpeedY = state.weatherSpeedY;
    let currentWeatherSpeedX = state.weatherSpeedX;
    let currentWeatherSway = state.weatherSway;
    let currentParticleSize = state.particleSize;
    let currentParticleOpacity = state.particleOpacity;
    let currentParticleColor = state.particleColor.clone();

    // Function to calculate target values based on Theme
    function updateThemeTargets(theme) {
        state.theme = theme;
        
        // Dynamically toggle blending mode to make particles pop in light mode
        material.blending = theme === 'dark' ? THREE.AdditiveBlending : THREE.NormalBlending;
        material.needsUpdate = true;
        
        // Update weather targets because it might depend on the theme
        updateWeatherTargets(state.weather);
    }

    // Function to calculate target values based on Weather
    function updateWeatherTargets(weather) {
        state.weather = weather;
        if (weather === 'windy') {
            state.weatherSpeedY = 0.002; // very slow drift down
            state.weatherSpeedX = 0.15;  // fast wind drift to the right
            state.weatherSway = 0.02;    // wavy motion
            state.particleSize = 0.15;
            state.particleOpacity = state.theme === 'dark' ? 0.55 : 0.75;
            state.particleColor.setHex(state.theme === 'dark' ? 0x00d8f6 : 0x005b96); // darker cyan/blue in light mode
            
            material.map = circleTexture;
            material.needsUpdate = true;
        } else if (weather === 'snowy') {
            state.weatherSpeedY = 0.008; // slow peaceful falling
            state.weatherSpeedX = 0.002; // minimal drift
            state.weatherSway = 0.025;   // flutter sway
            state.particleSize = 0.26;   // fluffy snow
            state.particleOpacity = state.theme === 'dark' ? 0.85 : 0.9;
            state.particleColor.setHex(state.theme === 'dark' ? 0xffffff : 0x64748b); // cool slate gray snow in light mode
            
            material.map = snowTexture;
            material.needsUpdate = true;
        } else if (weather === 'rainy') {
            state.weatherSpeedY = 0.22;  // fast falling down
            state.weatherSpeedX = -0.03;  // slanted rain falling leftwards
            state.weatherSway = 0.0;     // no sway, straight slanted down
            state.particleSize = 0.32;   // elongated rain streaks
            state.particleOpacity = state.theme === 'dark' ? 0.5 : 0.75;
            state.particleColor.setHex(state.theme === 'dark' ? 0x8ab4f8 : 0x0f4c81); // rich navy-blue rain in light mode
            
            material.map = rainTexture;
            material.needsUpdate = true;
        }
    }

    // Run initially
    updateThemeTargets(initialTheme);
    updateWeatherTargets(initialWeather);

    // 7. Interactive Mouse Movement (Parallax)
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

    // 8. Window Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // 9. Listeners for Dynamic System updates
    window.addEventListener('themeChanged', (e) => {
        updateThemeTargets(e.detail);
    });

    window.addEventListener('weatherChanged', (e) => {
        updateWeatherTargets(e.detail);
    });

    // 10. Animation & Render Loop
    const clock = new THREE.Clock();
    let frameCount = 0;

    function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();
        frameCount++;

        // Periodic state verification for maximum robustness
        if (frameCount % 10 === 0) {
            const isDark = document.body.classList.contains('dark-theme') || document.documentElement.classList.contains('dark-theme');
            const targetTheme = isDark ? 'dark' : 'light';
            if (state.theme !== targetTheme) {
                updateThemeTargets(targetTheme);
            }

            const selectEl = document.getElementById('weather-select-desktop') || document.getElementById('weather-select-mobile');
            if (selectEl) {
                const weatherVal = selectEl.value;
                const activeWeather = weatherVal === 'auto' ? getInitialWeather() : weatherVal;
                if (state.weather !== activeWeather) {
                    updateWeatherTargets(activeWeather);
                }
            }
        }

        // Interpolations (lerp)
        currentWeatherSpeedY += (state.weatherSpeedY - currentWeatherSpeedY) * 0.05;
        currentWeatherSpeedX += (state.weatherSpeedX - currentWeatherSpeedX) * 0.05;
        currentWeatherSway += (state.weatherSway - currentWeatherSway) * 0.05;
        currentParticleSize += (state.particleSize - currentParticleSize) * 0.05;
        currentParticleOpacity += (state.particleOpacity - currentParticleOpacity) * 0.05;
        currentParticleColor.lerp(state.particleColor, 0.05);

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

            // Apply horizontal velocity (with wind gusts if windy)
            if (state.weather === 'windy') {
                const gust = Math.sin(elapsedTime * 0.8 + phases[i]) * 0.02; // natural wind gusts variation
                pos[idx] += (currentWeatherSpeedX + gust) * speeds[i];
            } else {
                pos[idx] += currentWeatherSpeedX * speeds[i];
            }

            // Apply sine wave sway if applicable
            if (currentWeatherSway > 0) {
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
