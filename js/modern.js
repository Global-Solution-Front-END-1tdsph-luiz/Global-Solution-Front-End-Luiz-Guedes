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
}); 