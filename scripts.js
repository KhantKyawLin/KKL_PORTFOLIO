document.addEventListener('DOMContentLoaded', function () {
    // --- Dynamic Text for Hero Section ---
    const typedTextElement = document.getElementById('typed-text');
    const strings = ['Full-Stack Developer.', 'MERN Stack Specialist.', 'Creative Problem Solver.'];
    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    if (typedTextElement) {
        function type() {
            const currentString = strings[stringIndex];
            if (isDeleting) {
                typedTextElement.textContent = currentString.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedTextElement.textContent = currentString.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && typedTextElement.textContent === currentString) {
                typeSpeed = 1500;
                isDeleting = true;
            } else if (isDeleting && typedTextElement.textContent === '') {
                isDeleting = false;
                stringIndex = (stringIndex + 1) % strings.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }
        type();
    }

    // --- Theme Toggle Functionality ---
    const desktopToggle = document.getElementById("theme-switch-input-desktop");
    const mobileToggle = document.getElementById("theme-switch-input-mobile");
    const savedTheme =
        localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    const applyTheme = (theme) => {
        if (theme === "dark") {
            document.body.classList.add("dark-theme");
            if (desktopToggle) desktopToggle.checked = true;
            if (mobileToggle) mobileToggle.checked = true;
        } else {
            document.body.classList.remove("dark-theme");
            if (desktopToggle) desktopToggle.checked = false;
            if (mobileToggle) mobileToggle.checked = false;
        }
    };

    applyTheme(savedTheme);

    const toggleTheme = () => {
        const newTheme = document.body.classList.contains("dark-theme") ? "light" : "dark";
        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme);
    };

    if (desktopToggle) desktopToggle.addEventListener("change", toggleTheme);
    if (mobileToggle) mobileToggle.addEventListener("change", toggleTheme);

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("#navbar-main .nav-link");

    function activateNavLinkOnScroll() {
        const navbarHeight = document.querySelector('#navbar-main').offsetHeight;
        let scrollY = window.pageYOffset;

        sections.forEach((section) => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - navbarHeight;
            const sectionId = section.getAttribute("id");

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", activateNavLinkOnScroll);

    // --- Smooth Scroll for Nav Links ---
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId.startsWith("#")) {
                e.preventDefault();
                const navbarHeight = document.querySelector('#navbar-main').offsetHeight;
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    window.scrollTo({
                        top: targetEl.offsetTop - navbarHeight,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // --- Close Offcanvas on Nav Link Click (Mobile only) ---
    document.querySelectorAll("#offcanvasNavbar .nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            const offcanvasEl = document.getElementById("offcanvasNavbar");
            const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
            if (bsOffcanvas) {
                bsOffcanvas.hide();
            }
        });
    });

    // --- CERTIFICATES SECTION SCRIPT ---
    const allCertificatesData = [
        {
            category: 'web',
            title: 'Full-Stack Web Development',
            issuer: 'Coursera | Issued: May 2024',
            description: 'A comprehensive program covering the MERN stack (MongoDB, Express, React, Node.js) for building and deploying full-stack web applications.',
            imgSrc: 'https://images.unsplash.com/photo-1609554496796-c345a5335ceb?auto=format&fit=crop&w=800&h=500&q=80',
            pdfLink: '#',
        },
        {
            category: 'ai',
            title: 'Machine Learning Specialist',
            issuer: 'DeepLearning.AI | Issued: Mar 2024',
            description: 'In-depth specialization in deep learning, neural networks, model architecture, and deployment strategies for AI applications.',
            imgSrc: 'https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?auto=format&fit=crop&w=800&h=500&q=80',
            pdfLink: '#',
        },
        {
            category: 'data',
            title: 'Data Science with Python',
            issuer: 'DataCamp | Issued: Jan 2024',
            description: 'Hands-on training in data manipulation with Pandas, data visualization with Matplotlib and Seaborn, and statistical analysis.',
            imgSrc: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&h=500&q=80',
            pdfLink: '#',
        },
        {
            category: 'web',
            title: 'React - The Complete Guide',
            issuer: 'Udemy | Issued: Dec 2023',
            description: 'Mastering React from basics to advanced concepts including state management with Redux, hooks, and performance optimization.',
            imgSrc: 'https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=800&h=500&q=80',
            pdfLink: '#',
        }
    ];

    const swiperContainer = document.querySelector('.certificate-swiper-container');
    const prevBtn = document.getElementById('certificate-prev-btn');
    const nextBtn = document.getElementById('certificate-next-btn');
    const statusEl = document.getElementById('certificate-status');
    const progressBar = document.getElementById('certificate-progress-bar');
    const categoryTabs = document.querySelectorAll('.category-tab');
    const certificateModalInstance = new bootstrap.Modal(document.getElementById('certificateModal'));

    let certificateSwiper = null;

    const initSwiper = (slidesData) => {
        if (certificateSwiper) {
            certificateSwiper.destroy(true, true);
        }

        const swiperWrapper = document.querySelector('.swiper-wrapper');
        swiperWrapper.innerHTML = '';

        if (slidesData.length === 0) {
            swiperWrapper.innerHTML = '<div class="swiper-slide"><p class="text-center p-3">No certificates found in this category.</p></div>';
            if (statusEl) statusEl.textContent = '';
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            if (progressBar) progressBar.style.width = '0%';
            return;
        }

        if (prevBtn) prevBtn.style.display = 'flex';
        if (nextBtn) nextBtn.style.display = 'flex';

        slidesData.forEach(cert => {
            const slideHTML = `
                <div class="swiper-slide">
                    <div class="card certificate-card" 
                        data-title="${cert.title}" 
                        data-img-src="${cert.imgSrc}" 
                        data-issuer="${cert.issuer}" 
                        data-description="${cert.description}"
                        data-pdf-link="${cert.pdfLink}">
                        <img loading="lazy" src="${cert.imgSrc}" class="card-img-top" alt="${cert.title}">
                        <div class="card-body">
                            <h6 class="card-title">${cert.title}</h6>
                            <p class="text-muted small">${cert.issuer}</p>
                        </div>
                    </div>
                </div>`;
            swiperWrapper.insertAdjacentHTML('beforeend', slideHTML);
        });

        certificateSwiper = new Swiper(swiperContainer, {
            effect: 'slide',
            loop: false,
            slidesPerView: 1,
            spaceBetween: 20,
            keyboard: { enabled: true },
            navigation: {
                nextEl: nextBtn,
                prevEl: prevBtn,
            },
            on: {
                init: updateSwiperUI,
                slideChange: updateSwiperUI,
            },
        });

        addModalListeners();
    };

    const updateSwiperUI = (swiper) => {
        if (!swiper || swiper.slides.length === 0) return;
        const totalSlides = swiper.slides.length;
        const activeIndex = swiper.realIndex;
        if (statusEl) statusEl.textContent = `Certificate ${activeIndex + 1} of ${totalSlides}`;
        if (progressBar) progressBar.style.width = `${((activeIndex + 1) / totalSlides) * 100}%`;
    };

    const filterCertificates = (e) => {
        const category = e.target.dataset.category;
        categoryTabs.forEach(tab => tab.classList.remove('active'));
        e.target.classList.add('active');
        const filteredData = category === 'all' ? allCertificatesData : allCertificatesData.filter(cert => cert.category === category);
        initSwiper(filteredData);
    };

    const openCertificateModal = (e) => {
        const card = e.currentTarget;
        document.getElementById('certificateModalLabel').textContent = card.dataset.title;
        document.getElementById('certificateModalImage').src = card.dataset.imgSrc;
        document.getElementById('certificateModalImage').alt = card.dataset.title;
        document.getElementById('certificateModalIssuer').textContent = card.dataset.issuer;
        document.getElementById('certificateModalDescription').textContent = card.dataset.description;
        document.getElementById('certificateModalPdfLink').href = card.dataset.pdfLink;
        certificateModalInstance.show();
    };

    const addModalListeners = () => {
        document.querySelectorAll('.certificate-card').forEach(card => {
            card.addEventListener('click', openCertificateModal);
        });
    };

    categoryTabs.forEach(tab => tab.addEventListener('click', filterCertificates));
    initSwiper(allCertificatesData);
});
