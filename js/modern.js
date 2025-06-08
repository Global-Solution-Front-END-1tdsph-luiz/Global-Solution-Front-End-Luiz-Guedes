// Navegação fixa
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-down');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
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

// Função para fechar o menu
const closeMenu = () => {
    navbarNav.classList.remove('active');
    menuButton.classList.remove('active');
};

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
            closeMenu();
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
            
            if (!isActive) {
                // Fecha o item ativo anterior, se houver
                const activeItem = document.querySelector('.faq-item.active');
                if (activeItem) {
                    activeItem.classList.remove('active');
                }
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    });
});

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
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Função para limpar erros
function clearErrors(form) {
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    form.querySelectorAll('input, textarea').forEach(el => el.classList.remove('error'));
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
            e.preventDefault();
            let valid = true;
            clearErrors(form);
            successMessage.style.display = 'none';

            // Validação dos campos
            const fields = {
                name: 'Por favor, preencha seu nome.',
                email: 'Por favor, preencha seu email.',
                subject: 'Por favor, preencha o assunto.',
                message: 'Por favor, escreva sua mensagem.'
            };

            for (const [id, errorMessage] of Object.entries(fields)) {
                const field = document.getElementById(id);
                if (!field.value.trim()) {
                    document.getElementById(`error-${id}`).textContent = errorMessage;
                    field.classList.add('error');
                    valid = false;
                } else if (id === 'email' && !validateEmail(field.value.trim())) {
                    document.getElementById(`error-${id}`).textContent = 'Digite um email válido.';
                    field.classList.add('error');
                    valid = false;
                }
            }

            if (valid) {
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