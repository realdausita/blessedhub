// Theme & Effects System
const THEME_STORAGE = 'blessedhub_theme';

function loadSettings() {
    try {
        return JSON.parse(localStorage.getItem(THEME_STORAGE) || '{}');
    } catch {
        return {};
    }
}

function saveSettings(settings) {
    localStorage.setItem(THEME_STORAGE, JSON.stringify(settings));
}

// Theme Panel - run after DOM ready
function initThemePanel() {
    const themePanel = document.getElementById('themePanel');
    const themeSettingsBtn = document.getElementById('themeSettingsBtn');
    const themePanelClose = document.getElementById('themePanelClose');
    const themePanelOverlay = document.getElementById('themePanelOverlay');

    function openThemePanel(e) {
        e?.preventDefault();
        e?.stopPropagation();
        themePanel?.classList.add('active');
        themePanelOverlay?.classList.add('active');
    }

    function closeThemePanel(e) {
        e?.preventDefault();
        themePanel?.classList.remove('active');
        themePanelOverlay?.classList.remove('active');
    }

    if (themeSettingsBtn) {
        themeSettingsBtn.addEventListener('click', openThemePanel, false);
    }
    if (themePanelClose) {
        themePanelClose.addEventListener('click', closeThemePanel, false);
    }
    if (themePanelOverlay) {
        themePanelOverlay.addEventListener('click', closeThemePanel, false);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemePanel);
} else {
    initThemePanel();
}

// Snow Effect
const snowContainer = document.getElementById('snowContainer');
function createSnowflakes(count = 50) {
    if (!snowContainer) return;
    snowContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const flake = document.createElement('div');
        flake.className = 'snowflake';
        flake.style.left = Math.random() * 100 + '%';
        flake.style.animationDelay = Math.random() * 10 + 's';
        flake.style.animationDuration = (5 + Math.random() * 10) + 's';
        flake.style.opacity = 0.3 + Math.random() * 0.5;
        flake.style.transform = `scale(${0.5 + Math.random()})`;
        snowContainer.appendChild(flake);
    }
}

// Rain Effect
const rainContainer = document.getElementById('rainContainer');
function createRainDrops(count = 80) {
    if (!rainContainer) return;
    rainContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const drop = document.createElement('div');
        drop.className = 'raindrop';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.animationDelay = Math.random() * 2 + 's';
        drop.style.animationDuration = (0.5 + Math.random() * 0.5) + 's';
        rainContainer.appendChild(drop);
    }
}

// Effect Toggles
const effects = {
    snow: { container: snowContainer, create: createSnowflakes },
    rain: { container: rainContainer, create: createRainDrops },
    bgImage: { element: document.getElementById('bgImageOverlay') },
    particles: { element: document.querySelector('.background-grid') }
};

document.querySelectorAll('.theme-toggle').forEach(toggle => {
    toggle.addEventListener('click', function () {
        const effect = this.getAttribute('data-effect');
        const settings = loadSettings();
        const isOn = this.classList.toggle('theme-toggle-on');

        if (effect === 'snow') {
            if (isOn) {
                createSnowflakes();
                snowContainer?.classList.add('active');
                effects.rain.container?.classList.remove('active');
                document.getElementById('toggleRain')?.classList.remove('theme-toggle-on');
                settings.rain = false;
            } else {
                snowContainer?.classList.remove('active');
                snowContainer?.innerHTML = '';
            }
            settings.snow = isOn;
        } else if (effect === 'rain') {
            if (isOn) {
                createRainDrops();
                rainContainer?.classList.add('active');
                effects.snow.container?.classList.remove('active');
                document.getElementById('toggleSnow')?.classList.remove('theme-toggle-on');
                settings.snow = false;
            } else {
                rainContainer?.classList.remove('active');
                rainContainer?.innerHTML = '';
            }
            settings.rain = isOn;
        } else if (effect === 'bgImage') {
            document.getElementById('bgImageOverlay')?.classList.toggle('active', isOn);
            settings.bgImage = isOn;
        } else if (effect === 'particles') {
            document.querySelector('.background-grid')?.classList.toggle('hidden', !isOn);
            settings.particles = isOn;
        }

        saveSettings(settings);
    });
});

// Theme Options
document.querySelectorAll('.theme-option').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.theme-option').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const theme = this.getAttribute('data-theme');
        document.body.setAttribute('data-theme', theme || 'dark');
        saveSettings({ ...loadSettings(), theme: theme || 'dark' });
    });
});

// Apply saved settings on load
document.addEventListener('DOMContentLoaded', () => {
    const settings = loadSettings();

    if (settings.snow) {
        createSnowflakes();
        snowContainer?.classList.add('active');
        document.getElementById('toggleSnow')?.classList.add('theme-toggle-on');
    }
    if (settings.rain) {
        createRainDrops();
        rainContainer?.classList.add('active');
        document.getElementById('toggleRain')?.classList.add('theme-toggle-on');
    }
    if (settings.bgImage) {
        document.getElementById('bgImageOverlay')?.classList.add('active');
        document.getElementById('toggleBgImage')?.classList.add('theme-toggle-on');
    }
    if (settings.particles === false) {
        document.querySelector('.background-grid')?.classList.add('hidden');
        document.getElementById('toggleParticles')?.classList.remove('theme-toggle-on');
    } else {
        document.getElementById('toggleParticles')?.classList.add('theme-toggle-on');
    }
    if (settings.theme) {
        document.body.setAttribute('data-theme', settings.theme);
        document.querySelectorAll('.theme-option').forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-theme') === settings.theme);
        });
    }
});
