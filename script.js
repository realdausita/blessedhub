// Mobile Menu Toggle
const hamburgerMenu = document.getElementById('hamburgerMenu');
const mobileMenu = document.getElementById('mobileMenu');

hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburgerMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
        hamburgerMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to header
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.8)';
    }
    
    lastScroll = currentScroll;
});

// Add parallax effect to background grid
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const grid = document.querySelector('.background-grid');
    if (grid) {
        grid.style.transform = `perspective(1000px) rotateX(60deg) translateY(${scrolled * 0.2}px)`;
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Game script copy functionality
document.querySelectorAll('.game-script-copy').forEach(btn => {
    btn.addEventListener('click', () => {
        const script = btn.getAttribute('data-script');
        if (script) {
            navigator.clipboard.writeText(script).then(() => {
                btn.classList.add('copied');
                const originalHTML = btn.innerHTML;
                btn.innerHTML = `
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                `;
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.classList.remove('copied');
                }, 2000);
            }).catch(err => console.error('Copy failed:', err));
        }
    });
});

// Copy code functionality
const copyCodeBtn = document.getElementById('copyCode');
if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', () => {
        const codeContent = document.querySelector('.code-content');
        if (codeContent) {
            const text = codeContent.textContent.trim();
            navigator.clipboard.writeText(text).then(() => {
                // Visual feedback
                const originalHTML = copyCodeBtn.innerHTML;
                copyCodeBtn.innerHTML = `
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                `;
                copyCodeBtn.style.color = 'var(--accent-green)';
                
                setTimeout(() => {
                    copyCodeBtn.innerHTML = originalHTML;
                    copyCodeBtn.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
            });
        }
    });
}

// Maximize code functionality
const maximizeCodeBtn = document.getElementById('maximizeCode');
if (maximizeCodeBtn) {
    maximizeCodeBtn.addEventListener('click', () => {
        const codeBox = document.querySelector('.code-box');
        if (codeBox) {
            if (codeBox.classList.contains('maximized')) {
                codeBox.classList.remove('maximized');
                maximizeCodeBtn.innerHTML = `
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                    </svg>
                `;
            } else {
                codeBox.classList.add('maximized');
                maximizeCodeBtn.innerHTML = `
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
                    </svg>
                `;
            }
        }
    });
}

// Observe stat cards
document.querySelectorAll('.stat-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe developer cards
document.querySelectorAll('.developer-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe executor cards
document.querySelectorAll('.executor-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe game cards
document.querySelectorAll('.game-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe showcase elements
document.querySelectorAll('.showcase-wrapper').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Showcase toggle functionality
const showcaseToggles = {
    esp: ['showcaseEsp1', 'showcaseEsp2', 'showcaseEsp3'],
    tracers: ['showcaseTracer1', 'showcaseTracer2', 'showcaseTracer3'],
    healthbar: ['showcaseHealthbar1', 'showcaseHealthbar2', 'showcaseHealthbar3', 'showcaseHealth1', 'showcaseHealth2', 'showcaseHealth3'],
    fov: ['showcaseFov'],
    bullets: ['showcaseBullet1', 'showcaseBullet2', 'showcaseBullet3']
};

document.querySelectorAll('.showcase-ui-toggle[data-toggle]').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const target = toggle.getAttribute('data-toggle');
        const ids = showcaseToggles[target];
        const isOn = toggle.classList.contains('showcase-ui-toggle-on');

        if (target === 'esp') {
            ids.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.classList.toggle('showcase-hidden', isOn);
            });
        } else if (ids) {
            ids.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.classList.toggle('showcase-hidden', isOn);
            });
        }

        if (target === 'bullets') {
            document.querySelectorAll('.showcase-bullet').forEach(el => {
                el.classList.toggle('showcase-hidden', isOn);
            });
            const origin = document.getElementById('showcaseBulletOrigin');
            if (origin) origin.classList.toggle('showcase-hidden', isOn);
        }

        toggle.classList.toggle('showcase-ui-toggle-on', !isOn);
        toggle.classList.toggle('showcase-ui-toggle-off', isOn);
    });
});

// Observe comparison cards
document.querySelectorAll('.comparison-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Modal functionality
const privacyPolicyModal = document.getElementById('privacyPolicyModal');
const termsOfServiceModal = document.getElementById('termsOfServiceModal');
const privacyPolicyLink = document.getElementById('privacyPolicyLink');
const termsOfServiceLink = document.getElementById('termsOfServiceLink');

// Open Privacy Policy modal
if (privacyPolicyLink) {
    privacyPolicyLink.addEventListener('click', (e) => {
        e.preventDefault();
        privacyPolicyModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Close Privacy Policy modal
const closePrivacyButtons = [
    document.getElementById('closePrivacyModal'),
    document.getElementById('closePrivacyModalBtn')
];

closePrivacyButtons.forEach(btn => {
    if (btn) {
        btn.addEventListener('click', () => {
            privacyPolicyModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
});

// Open Terms of Service modal
if (termsOfServiceLink) {
    termsOfServiceLink.addEventListener('click', (e) => {
        e.preventDefault();
        termsOfServiceModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Close Terms of Service modal
const closeTermsButtons = [
    document.getElementById('closeTermsModal'),
    document.getElementById('closeTermsModalBtn')
];

closeTermsButtons.forEach(btn => {
    if (btn) {
        btn.addEventListener('click', () => {
            termsOfServiceModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
});

// Close modals when clicking outside
[privacyPolicyModal, termsOfServiceModal].forEach(modal => {
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        privacyPolicyModal.classList.remove('active');
        termsOfServiceModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});
