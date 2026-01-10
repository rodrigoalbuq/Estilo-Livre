function initWhatsAppIntegration() {
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

function initTypedEffect() {
    const texts = [
        'Barbearia de Elite',
        'Tradição e Modernidade',
        'Seu Estilo, Nossa Arte'
    ];

    const heroSubtitle = document.querySelector('.hero-content .lead');
    if (!heroSubtitle) return;

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

    setTimeout(typeText, 1000);
}

function initBookingModal() {
    const modalHTML = `
        <div class="modal fade" id="bookingModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
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
                                    <input type="text" class="form-control" name="nome" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Telefone*</label>
                                    <input type="tel" class="form-control" name="telefone" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Serviço*</label>
                                    <select class="form-control" name="servico" required>
                                        <option value="">Selecione</option>
                                        <option value="Corte de Cabelo">Corte de Cabelo</option>
                                        <option value="Barba e Bigode">Barba e Bigode</option>
                                        <option value="Hidratação">Hidratação</option>
                                        <option value="Coloração">Coloração</option>
                                        <option value="Pacote Completo">Pacote Completo</option>
                                    </select>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Data Preferida*</label>
                                    <div class="input-group">
                                        <input type="date" class="form-control" name="data" required>
                                        <button type="button" class="btn btn-outline-secondary" id="open-date-picker" aria-label="Abrir calendário">
                                            <i class="fas fa-calendar-alt"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Horário Preferido*</label>
                                    <select class="form-control" name="horario" required>
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
                                    <select class="form-control" name="barbeiro">
                                        <option value="">Sem preferência</option>
                                        <option value="Rafael Gomes">Rafael Gomes</option>
                                        <option value="Guilherme Almeida">Guilherme Almeida</option>
                                        <option value="Ricardo Alves">Ricardo Alves</option>
                                    </select>
                                </div>
                                <div class="col-12 mb-3">
                                    <label class="form-label">Observações</label>
                                    <textarea class="form-control" name="observacoes" rows="3" placeholder="Observações especiais..."></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer justify-content-center">
                        <button type="submit" form="bookingForm" class="btn btn-primary-custom">
                            <i class="fas fa-check me-2"></i>Confirmar Agendamento
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modalEl = document.getElementById('bookingModal');
    const bodyEl = modalEl.querySelector('.modal-body');
    const footerEl = modalEl.querySelector('.modal-footer');
    const originalBodyHTML = bodyEl.innerHTML;
    const originalFooterHTML = footerEl.innerHTML;

    // Garantir que o botão de confirmar dispare o submit do formulário
    const confirmBtn = modalEl.querySelector('.modal-footer button[form="bookingForm"][type="submit"]');
    const proxySubmit = () => {
        const form = modalEl.querySelector('#bookingForm');
        if (!form) return;
        if (typeof form.requestSubmit === 'function') {
            form.requestSubmit();
        } else {
            const evt = new Event('submit', { cancelable: true, bubbles: true });
            form.dispatchEvent(evt);
        }
    };
    if (confirmBtn) {
        confirmBtn.addEventListener('click', (ev) => { ev.preventDefault(); proxySubmit(); });
    }

    // Tornar robusto: preparar qualquer botão "Agende" ou principal da hero para abrir o modal
    const candidates = new Set();
    document.querySelectorAll('a[href="#contato"]').forEach(btn => candidates.add(btn));
    const heroBtn = document.querySelector('.hero-section .btn.btn-primary-custom');
    if (heroBtn) candidates.add(heroBtn);

    candidates.forEach(btn => {
        btn.setAttribute('data-bs-toggle', 'modal');
        btn.setAttribute('data-bs-target', '#bookingModal');
        btn.setAttribute('href', '#');
        // Sem fallback programático para evitar múltiplas instâncias/backdrops
    });

    function formatDateBR(s) {
        if (!s) return '-';
        const parts = String(s).split('-');
        if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
        return s;
    }

    function formatPhoneBR(s) {
        const digits = String(s).replace(/\D/g, '').slice(0, 11);
        if (digits.length <= 2) return `(${digits}`;
        if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
        if (digits.length === 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6, 10)}`;
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
    }

    function bindFormEnhancements() {
        const phone = modalEl.querySelector('input[name="telefone"]');
        if (phone) {
            phone.addEventListener('input', () => {
                phone.value = formatPhoneBR(phone.value);
                phone.setCustomValidity('');
            });
        }

        // Data: definir mínimo como amanhã e botão para abrir o seletor
        const dateInput = modalEl.querySelector('input[name="data"]');
        if (dateInput) {
            const d = new Date();
            const tomorrow = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
            const yyyy = tomorrow.getFullYear();
            const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
            const dd = String(tomorrow.getDate()).padStart(2, '0');
            const minStr = `${yyyy}-${mm}-${dd}`;
            dateInput.setAttribute('min', minStr);

            // Corrigir valor existente inválido
            if (dateInput.value && dateInput.value < minStr) {
                dateInput.value = '';
            }

            // Abrir seletor ao clicar no botão
            const openBtn = modalEl.querySelector('#open-date-picker');
            if (openBtn) {
                openBtn.addEventListener('click', () => {
                    if (typeof dateInput.showPicker === 'function') {
                        try { dateInput.showPicker(); return; } catch { }
                    }
                    dateInput.focus();
                    try { dateInput.click(); } catch { }
                });
            }

            // Limpar mensagem de validade ao alterar
            dateInput.addEventListener('input', () => {
                dateInput.setCustomValidity('');
            });
        }
    }

    function bindFormSubmit() {
        const form = modalEl.querySelector('#bookingForm');
        if (!form) return;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const fd = new FormData(form);
            const data = Object.fromEntries(fd.entries());

            // Validação: telefone deve ter ao menos 11 dígitos (DDD + número)
            const phoneInput = form.querySelector('input[name="telefone"]');
            if (phoneInput) {
                const digits = String(phoneInput.value).replace(/\D/g, '');
                if (digits.length < 11) {
                    phoneInput.setCustomValidity('Telefone deve ter 11 dígitos (DDD + número).');
                    phoneInput.reportValidity();
                    return;
                }
            }

            // Validação: data deve ser estritamente maior que hoje
            const dateInput = form.querySelector('input[name="data"]');
            if (dateInput && dateInput.value) {
                const parts = dateInput.value.split('-');
                const selected = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
                const today = new Date();
                const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                if (selected <= todayStart) {
                    dateInput.setCustomValidity('Escolha uma data futura (a partir de amanhã).');
                    dateInput.reportValidity();
                    try { createToast('danger', 'A data deve ser maior que a data atual.'); } catch { }
                    return;
                }
            }

            const telefoneFmt = formatPhoneBR(data.telefone || '');
            const dataFmt = formatDateBR(data.data || '');

            const resumoHTML = `
                <div class="text-center">
                    <h5 class="mb-3">Resumo do Agendamento</h5>
                    <p class="mb-3">Por favor, confira seus dados:</p>
                </div>
                <ul class="list-group list-group-flush mb-3">
                    <li class="list-group-item d-flex justify-content-between"><strong>Nome:</strong><span>${data.nome || '-'}</span></li>
                    <li class="list-group-item d-flex justify-content-between"><strong>Telefone:</strong><span>${telefoneFmt || '-'}</span></li>
                    <li class="list-group-item d-flex justify-content-between"><strong>Serviço:</strong><span>${data.servico || '-'}</span></li>
                    <li class="list-group-item d-flex justify-content-between"><strong>Data:</strong><span>${dataFmt || '-'}</span></li>
                    <li class="list-group-item d-flex justify-content-between"><strong>Horário:</strong><span>${data.horario || '-'}</span></li>
                    <li class="list-group-item d-flex justify-content-between"><strong>Barbeiro:</strong><span>${data.barbeiro || 'Sem preferência'}</span></li>
                    <li class="list-group-item"><strong>Observações:</strong><br><span>${(data.observacoes || '').trim() || '—'}</span></li>
                </ul>
                <div class="alert alert-success text-center" role="alert">
                    Em breve nossa equipe entrará em contato. Obrigado por escolher a Estilo Livre!
                </div>
            `;

            bodyEl.innerHTML = resumoHTML;
            footerEl.innerHTML = `
                <button type="button" class="btn btn-primary-custom" data-bs-dismiss="modal">
                    <i class="fas fa-check me-2"></i>Concluir
                </button>
            `;

            // Toast de sucesso removido conforme solicitado
        }, { once: true });
    }

    bindFormEnhancements();
    bindFormSubmit();

    modalEl.addEventListener('hidden.bs.modal', () => {
        bodyEl.innerHTML = originalBodyHTML;
        footerEl.innerHTML = originalFooterHTML;
        // Reanexar proxy de submit ao botão restaurado
        const btn = modalEl.querySelector('.modal-footer button[form="bookingForm"][type="submit"]');
        if (btn) btn.addEventListener('click', (ev) => { ev.preventDefault(); proxySubmit(); });
        bindFormEnhancements();
        bindFormSubmit();
        // Garantir limpeza de classes/backdrop caso haja duplicidade
        document.body.classList.remove('modal-open');
        document.body.style.paddingRight = '';
        document.querySelectorAll('.modal-backdrop').forEach(b => b.remove());
    });
}

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

function initDarkMode() {
    const savedTheme = (function () {
        try { return localStorage.getItem('theme'); } catch { return null; }
    })();

    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-mode');
        document.body.classList.add('dark-mode');
    } else if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark-mode');
        document.body.classList.remove('dark-mode');
    } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark-mode', prefersDark);
        document.body.classList.toggle('dark-mode', prefersDark);
    }

    const btn = document.createElement('button');
    btn.className = 'dark-mode-toggle position-fixed';
    btn.style.cssText = `
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
    const setIcon = () => {
        btn.innerHTML = document.body.classList.contains('dark-mode')
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
        btn.title = document.body.classList.contains('dark-mode') ? 'Tema claro' : 'Tema escuro';
    };
    setIcon();

    btn.addEventListener('click', () => {
        const toDark = !document.documentElement.classList.contains('dark-mode');
        const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!reduceMotion) {
            const root = document.documentElement;
            root.classList.add('theme-transition');
            document.documentElement.classList.toggle('dark-mode', toDark);
            document.body.classList.toggle('dark-mode', toDark);
            try {
                const style = getComputedStyle(root);
                let dur = parseFloat(style.getPropertyValue('--theme-transition-duration')) * 1000;
                if (!Number.isFinite(dur) || dur <= 0) dur = 350;
                window.setTimeout(() => root.classList.remove('theme-transition'), Math.ceil(dur + 50));
            } catch {
                window.setTimeout(() => root.classList.remove('theme-transition'), 400);
            }
        } else {
            document.documentElement.classList.toggle('dark-mode', toDark);
            document.body.classList.toggle('dark-mode', toDark);
        }

        try { localStorage.setItem('theme', toDark ? 'dark' : 'light'); } catch { }
        setIcon();
    });
    document.body.appendChild(btn);
}

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

function initAnalytics() {
    document.querySelectorAll('.btn-primary-custom').forEach(btn => {
        btn.addEventListener('click', () => {
            console.log('Botão CTA clicado:', btn.textContent.trim());
        });
    });

    let startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        console.log('Tempo na página:', timeSpent, 'segundos');
    });
}

function initAll() {
    try { if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; } } catch { }
    window.scrollTo({ top: 0, behavior: 'auto' });

    initWhatsAppIntegration();
    initTypedEffect();
    initBookingModal();
    initDarkMode();
    initLazyLoading();
    initAnalytics();

    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    console.log('%c Olá, Bem vindo ao Estilo Livre Barbearia!', 'color: #d4a574; font-weight: bold;');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}
