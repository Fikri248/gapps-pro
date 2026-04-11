const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) { entry.target.classList.add('revealed'); revealObserver.unobserve(entry.target); }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        document.querySelectorAll('.reveal, .reveal-scale').forEach(el => revealObserver.observe(el));

        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => { navbar.classList.toggle('scrolled', window.scrollY > 20); }, { passive: true });

        const navToggle = document.getElementById('navToggle');
        const navCenter = document.getElementById('navCenter');
        navToggle.addEventListener('click', () => {
            navCenter.classList.toggle('open');
            const icon = navToggle.querySelector('i');
            icon.classList.toggle('bi-list'); icon.classList.toggle('bi-x-lg');
        });
        navCenter.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navCenter.classList.remove('open');
                const icon = navToggle.querySelector('i');
                icon.classList.add('bi-list'); icon.classList.remove('bi-x-lg');
            });
        });

        const stepsLine = document.getElementById('stepsLine');
        if (stepsLine) {
            const lineObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) { setTimeout(() => stepsLine.classList.add('animate'), 400); lineObserver.unobserve(entry.target); }
                });
            }, { threshold: 0.3 });
            lineObserver.observe(stepsLine);
        }

        // Gemini Speed Selector with smooth auto-rotate
        const gmSpeedToggle = document.getElementById('gmSpeedToggle');
        const gmSpeedDropdown = document.getElementById('gmSpeedDropdown');

        if (gmSpeedToggle && gmSpeedDropdown) {
            const speedOptions = gmSpeedDropdown.querySelectorAll('.gm-speed-option');
            const speedText = gmSpeedToggle.querySelector('.gm-speed-text');
            let currentIndex = 0;
            let autoRotate;

            function setActiveOption(index, animate) {
                speedOptions.forEach(o => o.classList.remove('active'));
                speedOptions[index].classList.add('active');
                const name = speedOptions[index].dataset.speed;

                if (animate && speedText) {
                    speedText.classList.add('fade-out');
                    setTimeout(() => {
                        speedText.textContent = name;
                        speedText.classList.remove('fade-out');
                        speedText.classList.add('fade-in');
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                speedText.classList.remove('fade-in');
                            });
                        });
                    }, 300);
                } else {
                    speedText.textContent = name;
                }
            }

            function startAutoRotate() {
                autoRotate = setInterval(() => {
                    currentIndex = (currentIndex + 1) % speedOptions.length;
                    setActiveOption(currentIndex, true);
                }, 2000);
            }

            startAutoRotate();

            gmSpeedToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                gmSpeedDropdown.classList.toggle('open');
            });

            speedOptions.forEach((opt, i) => {
                opt.addEventListener('click', () => {
                    clearInterval(autoRotate);
                    currentIndex = i;
                    setActiveOption(i, false);
                    gmSpeedDropdown.classList.remove('open');
                    startAutoRotate();
                });
            });

            document.addEventListener('click', () => {
                gmSpeedDropdown.classList.remove('open');
            });
        }