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
    // Soft Circle Texture
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

    // Wind Breeze Streaks Texture (Windy)
    function createWindTexture() {
        const c = document.createElement('canvas');
        c.width = 64;
        c.height = 64;
        const ctx = c.getContext('2d');
        ctx.clearRect(0, 0, 64, 64);

        const drawStreak = (y, height, alphaCoeff) => {
            const grad = ctx.createLinearGradient(0, y, 64, y);
            grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
            grad.addColorStop(0.25, `rgba(255, 255, 255, ${0.4 * alphaCoeff})`);
            grad.addColorStop(0.5, `rgba(255, 255, 255, ${0.95 * alphaCoeff})`);
            grad.addColorStop(0.75, `rgba(255, 255, 255, ${0.4 * alphaCoeff})`);
            grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, y - height / 2, 64, height);
        };

        drawStreak(24, 2.0, 0.5);
        drawStreak(32, 3.5, 1.0);
        drawStreak(40, 1.5, 0.7);

        return new THREE.CanvasTexture(c);
    }
    const windTexture = createWindTexture();

    // Fluffy Snowflake Texture (Snowy)
    function createSnowTexture() {
        const c = document.createElement('canvas');
        c.width = 64;
        c.height = 64;
        const ctx = c.getContext('2d');
        ctx.clearRect(0, 0, 64, 64);

        // Soft fluffy center
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 16);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.2, 'rgba(255, 255, 255, 0.85)');
        grad.addColorStop(0.6, 'rgba(255, 255, 255, 0.3)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(32, 32, 16, 0, Math.PI * 2);
        ctx.fill();

        // 6 satellite fluffs for organic shape
        const angles = [0, Math.PI / 3, Math.PI * 2 / 3, Math.PI, Math.PI * 4 / 3, Math.PI * 5 / 3];
        angles.forEach(angle => {
            const x = 32 + Math.cos(angle) * 7;
            const y = 32 + Math.sin(angle) * 7;
            const satGrad = ctx.createRadialGradient(x, y, 0, x, y, 10);
            satGrad.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
            satGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = satGrad;
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.fill();
        });

        return new THREE.CanvasTexture(c);
    }
    const snowTexture = createSnowTexture();

    // Slanted Rain Streak Texture (Rainy)
    function createRainTexture() {
        const c = document.createElement('canvas');
        c.width = 64;
        c.height = 64;
        const ctx = c.getContext('2d');
        ctx.clearRect(0, 0, 64, 64);

        // Slant ratio: speedX = -0.04, speedY = 0.26 => ratio = -0.1538
        // For a vertical height of 48 pixels, horizontal displacement is 48 * -0.1538 = -7.38 pixels
        // Let's use dx = -8. So top x is 32 + 4 = 36, bottom x is 32 - 4 = 28
        const dx = -8;
        const x1 = 32 - dx / 2; // 36
        const y1 = 8;
        const x2 = 32 + dx / 2; // 28
        const y2 = 56;

        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        grad.addColorStop(0.15, 'rgba(255, 255, 255, 0.2)');
        grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
        grad.addColorStop(0.85, 'rgba(255, 255, 255, 0.2)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

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
    const particleCount = 1200; // Balanced for performance and appearance
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);
    const phases = new Float32Array(particleCount);

    // Spread particles in a 3D box for view
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
    let initialTexture = circleTexture;
    if (initialWeather === 'windy') initialTexture = windTexture;
    else if (initialWeather === 'snowy') initialTexture = snowTexture;
    else if (initialWeather === 'rainy') initialTexture = rainTexture;

    const material = new THREE.PointsMaterial({
        size: 0.18,
        map: initialTexture,
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
            state.weatherSpeedY = 0.002; // slow drift down
            state.weatherSpeedX = 0.06;  // comfortable wind breeze to the right
            state.weatherSway = 0.01;    // slight breeze ripple
            state.particleSize = 0.45;   // enlarge for wind streak texture
            state.particleOpacity = state.theme === 'dark' ? 0.45 : 0.65;
            state.particleColor.setHex(state.theme === 'dark' ? 0xaadeff : 0x5b8db5); // light icy blue / soft slate blue lines

            material.map = windTexture;
            material.needsUpdate = true;
        } else if (weather === 'snowy') {
            state.weatherSpeedY = 0.008; // slow peaceful falling
            state.weatherSpeedX = 0.002; // minimal drift
            state.weatherSway = 0.025;   // flutter sway
            state.particleSize = 0.35;   // fluffy snow flakes
            state.particleOpacity = state.theme === 'dark' ? 0.85 : 0.95; // highly visible white snow
            state.particleColor.setHex(0xffffff); // white snow in both light and dark modes

            material.map = snowTexture;
            material.needsUpdate = true;
        } else if (weather === 'rainy') {
            state.weatherSpeedY = 0.26;  // high speed falling down
            state.weatherSpeedX = -0.04; // slanted rain falling leftwards
            state.weatherSway = 0.0;     // no sway, straight slanted down
            state.particleSize = 0.38;   // elongated rain streaks
            state.particleOpacity = state.theme === 'dark' ? 0.55 : 0.75;
            state.particleColor.setHex(state.theme === 'dark' ? 0x8ab4f8 : 0x486581); // rich slate-blue rain in light mode

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
