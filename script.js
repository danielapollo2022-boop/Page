// =========================================
// 1. INICIALIZAÇÃO E SELETORES
// =========================================
lucide.createIcons();

const html = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const cartOverlay = document.getElementById('cartOverlay');
const cartDrawer = document.getElementById('cartDrawer');
const closeCart = document.getElementById('closeCart');
const cartIcon = document.getElementById('cartIcon');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartTotalValue = document.getElementById('cartTotalValue');
const cartCountBadge = document.getElementById('cartCount');

// Estado do Carrinho
let cart = [];

// =========================================
// 2. TEMA (DARK/LIGHT)
// =========================================
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeBtn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeBtn.innerHTML = ''; 
    const iconName = theme === 'dark' ? 'sun' : 'moon';
    const iconElement = document.createElement('i');
    iconElement.setAttribute('data-lucide', iconName);
    themeBtn.appendChild(iconElement);
    lucide.createIcons();
}

// =========================================
// 3. LÓGICA DO CARRINHO (GLASSMORPHISM)
// =========================================

// Abrir/Fechar Carrinho
const toggleCart = () => {
    cartDrawer.classList.toggle('active');
    cartOverlay.style.display = cartDrawer.classList.contains('active') ? 'block' : 'none';
};

cartIcon.addEventListener('click', toggleCart);
closeCart.addEventListener('click', toggleCart);
cartOverlay.addEventListener('click', toggleCart);

// Adicionar ao Carrinho
const addButtons = document.querySelectorAll('.add-cart-btn');

addButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.product-card');
        const product = {
            id: index,
            name: card.querySelector('.model').textContent,
            price: parseFloat(card.querySelector('.new-price').textContent.replace('R$ ', '').replace('.', '').replace(',', '.')),
            image: card.querySelector('img').src,
            quantity: 1
        };

        addToCart(product);
        
        // Feedback visual no botão
        const originalContent = btn.innerHTML;
        btn.innerHTML = `<i data-lucide="check"></i> Adicionado`;
        btn.style.borderColor = 'var(--accent-color)';
        btn.style.color = 'var(--accent-color)';
        lucide.createIcons();

        setTimeout(() => {
            btn.innerHTML = originalContent;
            btn.style.borderColor = '';
            btn.style.color = '';
            lucide.createIcons();
        }, 1500);

        // Abre o carrinho automaticamente para mostrar o efeito Glass
        setTimeout(toggleCart, 500);
    });
});

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(product);
    }
    renderCart();
}

// Mudar quantidade (Função global para os botões do carrinho)
window.updateQuantity = (id, delta) => {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
        renderCart();
    }
};

function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let itemsCount = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Seu carrinho está vazio.</p>';
    } else {
        cart.forEach(item => {
            total += item.price * item.quantity;
            itemsCount += item.quantity;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
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
            cartItemsContainer.appendChild(itemElement);
        });
    }

    // Atualiza valores na UI
    cartTotalValue.textContent = `R$ ${total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
    cartCountBadge.textContent = itemsCount;
    
    // Animação no badge
    cartCountBadge.style.transform = 'scale(1.4)';
    setTimeout(() => cartCountBadge.style.transform = 'scale(1)', 200);
    
    lucide.createIcons();
}

// =========================================
// 4. ANIMAÇÕES DE SCROLL (REVEAL)
// =========================================
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Botão de Finalizar (Simulação)
document.querySelector('.btn-checkout').addEventListener('click', () => {
    if(cart.length > 0) {
        alert('Pedido processado! Redirecionando para o checkout...');
    } else {
        alert('Adicione produtos ao carrinho primeiro!');
    }
});