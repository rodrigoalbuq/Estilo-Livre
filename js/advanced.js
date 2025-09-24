/**
 * ESTILO LIVRE - BARBEARIA DE ELITE
 * JavaScript Avançado para Funcionalidades Extras
 */

//Integração com WHATSAPP 
function initWhatsAppIntegration() {
    // Criar botão flutuante do WhatsApp
    const whatsappBtn = document.createElement('div');
    whatsappBtn.innerHTML = `
        <a href="https://wa.me/5581999999999?text=Olá! Gostaria de agendar um horário na Estilo Livre." 
           target="_blank"
           class="whatsapp-float"
           title="Fale conosco no WhatsApp">
            <i class="fab fa-whatsapp"></i>
        </a>
    `;
    document.body.appendChild(whatsappBtn);
}

//Efeito de Digitação para Hero
function initTypedEffect() {
    const texts = [
        "Barbearia de Elite",
        "Tradição e Modernidade",
        "Seu Estilo, Nossa Arte"
    ];

    const heroSubtitle = document.querySelector('.hero-content .lead');
    if (heroSubtitle) {
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeText() {
            const currentText = texts[textIndex];

            if (isDeleting) {
                heroSubtitle.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                heroSubtitle.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 100 : 150;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(typeText, typeSpeed);
        }

        // Iniciar após carregamento
        setTimeout(typeText, 1000);
    }
}

//Modal de Agendamento 
function initBookingModal() {
    // Criar modal HTML
    const modalHTML = `
        <div class="modal fade" id="bookingModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-gold">
                        <h5 class="modal-title text-white">
                            <i class="fas fa-calendar-alt me-2"></i>
                            Agendamento Online
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="bookingForm">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Nome Completo*</label>
                                    <input type="text" class="form-control" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Telefone*</label>
                                    <input type="tel" class="form-control" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Serviço*</label>
                                    <select class="form-control" required>
                                        <option value="">Selecione</option>
                                        <option value="corte">Corte de Cabelo</option>
                                        <option value="barba">Barba e Bigode</option>
                                        <option value="hidratacao">Hidratação</option>
                                        <option value="coloracao">Coloração</option>
                                        <option value="pacote">Pacote Completo</option>
                                    </select>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Data Preferida*</label>
                                    <input type="date" class="form-control" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Horário Preferido*</label>
                                    <select class="form-control" required>
                                        <option value="">Selecione</option>
                                        <option value="08:00">08:00</option>
                                        <option value="09:00">09:00</option>
                                        <option value="10:00">10:00</option>
                                        <option value="11:00">11:00</option>
                                        <option value="14:00">14:00</option>
                                        <option value="15:00">15:00</option>
                                        <option value="16:00">16:00</option>
                                        <option value="17:00">17:00</option>
                                    </select>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Barbeiro Preferido</label>
                                    <select class="form-control">
                                        <option value="">Sem preferência</option>
                                        <option value="Rafael">Rafael Gomes</option>
                                        <option value="Guilherme">Guilherme Almeida</option>
                                        <option value="Ricardo">Ricardo Alves</option>
                                    </select>
                                </div>
                                <div class="col-12 mb-3">
                                    <label class="form-label">Observações</label>
                                    <textarea class="form-control" rows="3" placeholder="Observações especiais..."></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" form="bookingForm" class="btn btn-primary-custom">
                            <i class="fas fa-check me-2"></i>Confirmar Agendamento
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Conectar botões de agendamento ao modal
    document.querySelectorAll('a[href="#contato"]').forEach(btn => {
        if (btn.textContent.includes('Agende')) {
            btn.setAttribute('data-bs-toggle', 'modal');
            btn.setAttribute('data-bs-target', '#bookingModal');
            btn.setAttribute('href', '#');
        }
    });
}

// Notificações Toast
function createToast(type, message, duration = 5000) {
    const toastContainer = document.getElementById('toast-container') || createToastContainer();

    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;

    toastContainer.appendChild(toast);

    const bsToast = new bootstrap.Toast(toast, { delay: duration });
    bsToast.show();

    toast.addEventListener('hidden.bs.toast', () => toast.remove());
}

function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container position-fixed top-0 end-0 p-3';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    return container;
}

// Modo escuro TOGGLE  
function initDarkMode() {
    const darkModeBtn = document.createElement('button');
    darkModeBtn.className = 'dark-mode-toggle position-fixed';
    darkModeBtn.style.cssText = `
        bottom: 90px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: var(--gold-gradient);
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: var(--shadow-gold);
    `;
    darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeBtn.title = 'Alternar tema escuro';

    darkModeBtn.addEventListener('click', toggleDarkMode);
    document.body.appendChild(darkModeBtn);

    // Verificar preferência salva
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

function toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    const btn = document.querySelector('.dark-mode-toggle');

    btn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('darkMode', isDark);

    // Animação de transição
    document.documentElement.style.transition = 'filter 0.3s ease';
    document.documentElement.style.filter = isDark ? 'invert(1)' : 'invert(0)';

    setTimeout(() => {
        document.documentElement.style.transition = '';
        document.documentElement.style.filter = '';
    }, 300);
}

//Carregamento lento das Imagens
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Análise e rastreamento
function initAnalytics() {
    // Rastrear cliques em botões importantes
    document.querySelectorAll('.btn-primary-custom').forEach(btn => {
        btn.addEventListener('click', () => {
            console.log('Botão CTA clicado:', btn.textContent.trim());
            // Aqui você pode integrar com Google Analytics, Facebook Pixel, etc.
        });
    });

    // Rastrear tempo na página
    let startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        console.log('Tempo na página:', timeSpent, 'segundos');
    });
}

// Inicialização Completa 
document.addEventListener('DOMContentLoaded', function () {
    // Aguardar carregamento completo
    setTimeout(() => {
        initWhatsAppIntegration();
        initTypedEffect();
        initBookingModal();
        initDarkMode();
        initLazyLoading();
        initAnalytics();

        // Log de inicialização
        console.log('%c Olá, Bem vindo ao Estilo Livre Barbearia!', 'color: #d4a574; font-weight: bold;');
    }, 1500);
});