// Navegação fixa
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Menu mobile
const menuButton = document.createElement('button');
menuButton.classList.add('menu-button');
menuButton.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
`;
menuButton.setAttribute('aria-label', 'Menu');

const navbarNav = document.querySelector('.navbar-nav');
navbarNav.parentNode.insertBefore(menuButton, navbarNav);

menuButton.addEventListener('click', () => {
    navbarNav.classList.toggle('active');
    menuButton.classList.toggle('active');
});

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Fecha o menu mobile se estiver aberto
            navbarNav.classList.remove('active');
            menuButton.classList.remove('active');
        }
    });
});

// Animação de entrada dos elementos
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .timeline-item').forEach(el => {
    observer.observe(el);
});

// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fecha todos os itens
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Se o item clicado não estava ativo, abre ele
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// Mapa de Monitoramento
function initMap() {
    // Coordenadas do centro da Amazônia
    const amazonCenter = { lat: -3.4653, lng: -62.2159 };
    
    // Criar o mapa
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: amazonCenter,
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry",
                "stylers": [{"color": "#f5f5f5"}]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{"color": "#c9c9c9"}]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#9e9e9e"}]
            }
        ]
    });

    // Dados simulados de áreas de risco e focos de incêndio
    const riskAreas = [
        { lat: -3.1190, lng: -60.0217, type: 'high', title: 'Alto Risco - Manaus' },
        { lat: -2.4428, lng: -54.7074, type: 'medium', title: 'Médio Risco - Santarém' },
        { lat: -1.4557, lng: -48.4902, type: 'low', title: 'Baixo Risco - Belém' },
        { lat: -3.1019, lng: -60.0250, type: 'fire', title: 'Foco Ativo - Manaus' }
    ];

    // Ícones personalizados para cada tipo de marcador
    const icons = {
        high: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#ff4444',
            fillOpacity: 0.7,
            strokeWeight: 2,
            strokeColor: '#ffffff',
            scale: 10
        },
        medium: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#ffbb33',
            fillOpacity: 0.7,
            strokeWeight: 2,
            strokeColor: '#ffffff',
            scale: 10
        },
        low: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#00C851',
            fillOpacity: 0.7,
            strokeWeight: 2,
            strokeColor: '#ffffff',
            scale: 10
        },
        fire: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#ff0000',
            fillOpacity: 0.7,
            strokeWeight: 2,
            strokeColor: '#ffffff',
            scale: 12,
            animation: google.maps.Animation.BOUNCE
        }
    };

    // Adicionar marcadores ao mapa
    riskAreas.forEach(area => {
        const marker = new google.maps.Marker({
            position: { lat: area.lat, lng: area.lng },
            map: map,
            icon: icons[area.type],
            title: area.title
        });

        // Adicionar InfoWindow para cada marcador
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div class="map-info-window">
                    <h3>${area.title}</h3>
                    <p>Última atualização: ${new Date().toLocaleDateString()}</p>
                    <p>Status: ${area.type === 'fire' ? 'Foco Ativo' : 'Monitoramento'}</p>
                </div>
            `
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    });
}

// Carregar o script do Google Maps
function loadGoogleMapsScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDicU7y0SpjZSFiURyLx0Zhl7Fhp4AxhoQ&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

// Atualizar ano do copyright automaticamente
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    document.querySelectorAll('.copyright-year').forEach(element => {
        element.textContent = currentYear;
    });
}

// Atualizar o ano quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    updateCopyrightYear();
    loadGoogleMapsScript();
    // Voltar ao topo
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// Validação customizada do formulário de contato
function validateEmail(email) {
    // Regex simples para validar email
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (form) {
        // Adiciona aria-live nas mensagens de erro
        document.querySelectorAll('.error-message').forEach(el => el.setAttribute('aria-live', 'polite'));

        // Mensagem de sucesso
        let successMessage = document.createElement('div');
        successMessage.className = 'form-success-message';
        successMessage.style.display = 'none';
        form.parentNode.insertBefore(successMessage, form);

        form.addEventListener('submit', function(e) {
            let valid = true;

            // Limpa mensagens anteriores e feedback visual
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
            form.querySelectorAll('input, textarea').forEach(el => el.classList.remove('error'));
            successMessage.style.display = 'none';

            // Nome
            const name = document.getElementById('name');
            if (!name.value.trim()) {
                document.getElementById('error-name').textContent = 'Por favor, preencha seu nome.';
                name.classList.add('error');
                valid = false;
            }

            // Email
            const email = document.getElementById('email');
            if (!email.value.trim()) {
                document.getElementById('error-email').textContent = 'Por favor, preencha seu email.';
                email.classList.add('error');
                valid = false;
            } else if (!validateEmail(email.value.trim())) {
                document.getElementById('error-email').textContent = 'Digite um email válido.';
                email.classList.add('error');
                valid = false;
            }

            // Assunto
            const subject = document.getElementById('subject');
            if (!subject.value.trim()) {
                document.getElementById('error-subject').textContent = 'Por favor, preencha o assunto.';
                subject.classList.add('error');
                valid = false;
            }

            // Mensagem
            const message = document.getElementById('message');
            if (!message.value.trim()) {
                document.getElementById('error-message').textContent = 'Por favor, escreva sua mensagem.';
                message.classList.add('error');
                valid = false;
            }

            if (!valid) {
                e.preventDefault();
            } else {
                e.preventDefault();
                form.reset();
                successMessage.textContent = 'Mensagem enviada com sucesso!';
                successMessage.style.display = 'block';
            }
        });

        // Remover feedback visual ao digitar
        form.querySelectorAll('input, textarea').forEach(el => {
            el.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    this.classList.remove('error');
                    const errorDiv = document.getElementById('error-' + this.name);
                    if (errorDiv) errorDiv.textContent = '';
                }
            });
        });
    }
}); 