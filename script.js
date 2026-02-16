// =========================================
// 1. INICIALIZAÇÃO E SELETORES GLOBAIS
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initTheme();
    initCartLogic(); // Inicializa o carrinho e carrega do LocalStorage
    initScrollReveal();
});

// =========================================
// 2. TEMA (DARK/LIGHT)
// =========================================
function initTheme() {
    const html = document.documentElement;
    const themeBtn = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme, themeBtn);

    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme, themeBtn);
        });
    }
}

function updateThemeIcon(theme, btn) {
    if(!btn) return;
    btn.innerHTML = ''; 
    const iconName = theme === 'dark' ? 'sun' : 'moon';
    const iconElement = document.createElement('i');
    iconElement.setAttribute('data-lucide', iconName);
    btn.appendChild(iconElement);
    lucide.createIcons();
}

// =========================================
// 3. LÓGICA DO CARRINHO (PERSISTÊNCIA)
// =========================================

// AQUI ESTÁ A MÁGICA: Tenta ler do LocalStorage, se não houver, cria array vazio
let cart = JSON.parse(localStorage.getItem('sneakerCart')) || [];

function initCartLogic() {
    const cartOverlay = document.getElementById('cartOverlay');
    const cartDrawer = document.getElementById('cartDrawer');
    const closeCart = document.getElementById('closeCart');
    const cartIcon = document.getElementById('cartIcon');
    const checkoutBtn = document.querySelector('.btn-checkout');

    // Renderiza o carrinho imediatamente ao carregar a página
    renderCart();

    // Funções de Abrir/Fechar
    window.toggleCart = () => {
        if(cartDrawer) {
            cartDrawer.classList.toggle('active');
            const isActive = cartDrawer.classList.contains('active');
            if(cartOverlay) cartOverlay.style.display = isActive ? 'block' : 'none';
        }
    };

    if(cartIcon) cartIcon.addEventListener('click', window.toggleCart);
    if(closeCart) closeCart.addEventListener('click', window.toggleCart);
    if(cartOverlay) cartOverlay.addEventListener('click', window.toggleCart);

    // Checkout Simulado
    if(checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if(cart.length > 0) alert('Redirecionando para checkout...');
            else alert('Seu carrinho está vazio!');
        });
    }

    // --- CONFIGURAÇÃO DOS CARDS NA HOME (INDEX.HTML) ---
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach((card, index) => {
        // A. CLIQUE NA IMAGEM -> REDIRECIONA
        const imgContainer = card.querySelector('.card-image');
        if(imgContainer) {
            imgContainer.style.cursor = 'pointer';
            imgContainer.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = `produto.html?id=${index}`;
            });
        }

        // B. CLIQUE NO BOTÃO -> ADICIONA AO CARRINHO
        const btn = card.querySelector('.add-cart-btn');
        if(btn) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // Impede clique na imagem
                
                const priceText = card.querySelector('.new-price').textContent;
                const priceValue = parseFloat(priceText.replace('R$ ', '').replace('.', '').replace(',', '.'));
                
                const product = {
                    id: index, // ID baseado na ordem da lista
                    name: card.querySelector('.model').textContent,
                    price: priceValue,
                    image: card.querySelector('img').src,
                    quantity: 1
                };

                addToCart(product);
                
                // Feedback Visual
                const originalContent = btn.innerHTML;
                btn.innerHTML = `<i data-lucide="check"></i> Adicionado`;
                btn.style.color = 'var(--accent-color)';
                btn.style.borderColor = 'var(--accent-color)';
                lucide.createIcons();

                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.style.color = '';
                    btn.style.borderColor = '';
                    lucide.createIcons();
                }, 1500);

                setTimeout(window.toggleCart, 300);
            });
        }
    });
}

// Função Helper para Salvar no Navegador
function saveCartToStorage() {
    localStorage.setItem('sneakerCart', JSON.stringify(cart));
}

// Função Global: Adicionar Item
// (Tornamos window.addToCart acessível para o produto.js usar também)
window.addToCart = function(product) {
    // Verifica se já existe produto com mesmo ID
    // OBS: Se quiser diferenciar por tamanho, precisaria mudar a lógica do ID para id + tamanho
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(product);
    }
    
    saveCartToStorage(); // Salva sempre que altera
    renderCart();
};

// Função Global: Atualizar Quantidade (+ ou -)
window.updateQuantity = (id, delta) => {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
        saveCartToStorage(); // Salva sempre que altera
        renderCart();
    }
};

// Função: Renderizar HTML do Carrinho
function renderCart() {
    const container = document.getElementById('cartItemsContainer');
    const totalElement = document.getElementById('cartTotalValue');
    const badgeElement = document.getElementById('cartCount');
    
    // Proteção caso elementos não existam na página
    if(!container || !totalElement || !badgeElement) return;
    
    container.innerHTML = '';
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-cart-msg">Seu carrinho está vazio.</p>';
    } else {
        cart.forEach(item => {
            total += item.price * item.quantity;
            count += item.quantity;
            
            const itemHTML = document.createElement('div');
            itemHTML.className = 'cart-item';
            itemHTML.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>R$ ${item.price.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
            `;
            container.appendChild(itemHTML);
        });
    }

    totalElement.textContent = total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    badgeElement.textContent = count;

    // Só anima se houve mudança de quantidade (opcional)
    if (count > 0) {
        badgeElement.style.transform = 'scale(1.3)';
        setTimeout(() => badgeElement.style.transform = 'scale(1)', 200);
    }
    
    lucide.createIcons();
}

// =========================================
// 4. ANIMAÇÕES DE SCROLL (REVEAL)
// =========================================
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}