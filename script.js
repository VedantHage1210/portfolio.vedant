document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Active nav link ---------- */
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        const page = window.location.pathname.split('/').pop() || 'index.html';
        if (link.getAttribute('href') === page) {
            link.classList.add('active');
        }
    });

    /* ---------- Mobile nav toggle ---------- */
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            const isOpen = menu.classList.toggle('open');
            toggle.classList.toggle('open', isOpen);
            toggle.setAttribute('aria-expanded', isOpen);
        });
        menu.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                menu.classList.remove('open');
                toggle.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ---------- Terminal typed effect (home page) ---------- */
    const typedEl = document.getElementById('typed-line');
    if (typedEl) {
        const full = "vedant — SDE aspirant · CSE (Cybersecurity)";
        let i = 0;
        const type = () => {
            if (i <= full.length) {
                typedEl.textContent = full.slice(0, i);
                i++;
                setTimeout(type, 45);
            }
        };
        type();
    }

    /* ---------- Contact form — real submission via Netlify Forms ---------- */
    const form = document.getElementById('contactForm');
    if (form) {
        const btn = document.getElementById('sendBtn');
        const status = document.getElementById('formStatus');
        const originalBtnHTML = btn.innerHTML;

        const encode = (data) => {
            return Object.keys(data)
                .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
                .join('&');
        };

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const payload = {};
            formData.forEach((value, key) => { payload[key] = value; });

            btn.disabled = true;
            btn.innerHTML = 'Sending...';
            status.textContent = '';
            status.className = 'form-status';

            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: encode(payload)
            })
                .then(() => {
                    btn.innerHTML = 'Sent ✓';
                    btn.style.background = 'var(--accent)';
                    status.textContent = "Thanks — I'll get back to you soon.";
                    status.className = 'form-status ok';
                    form.reset();
                    setTimeout(() => {
                        btn.disabled = false;
                        btn.innerHTML = originalBtnHTML;
                    }, 3000);
                })
                .catch(() => {
                    btn.disabled = false;
                    btn.innerHTML = originalBtnHTML;
                    status.textContent = 'Something went wrong. Please email me directly instead.';
                    status.className = 'form-status err';
                });
        });
    }
});
