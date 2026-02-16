// =========================================
// 1. INICIALIZAÇÃO E SELETORES GLOBAIS
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initTheme();
    initCartLogic(); // Inicializa o carrinho e carrega do LocalStorage
    initScrollReveal();
    initAdmin();     // Inicializa a área administrativa e cores personalizadas
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

let cart = JSON.parse(localStorage.getItem('sneakerCart')) || [];

function initCartLogic() {
    const cartOverlay = document.getElementById('cartOverlay');
    const cartDrawer = document.getElementById('cartDrawer');
    const closeCart = document.getElementById('closeCart');
    const cartIcon = document.getElementById('cartIcon');
    const checkoutBtn = document.querySelector('.btn-checkout');

    renderCart();

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

    if(checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if(cart.length > 0) alert('Redirecionando para checkout...');
            else alert('Seu carrinho está vazio!');
        });
    }

    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach((card, index) => {
        const imgContainer = card.querySelector('.card-image');
        if(imgContainer) {
            imgContainer.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = `produto.html?id=${index}`;
            });
        }

        const btn = card.querySelector('.add-cart-btn');
        if(btn) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); 
                
                const priceText = card.querySelector('.new-price').textContent;
                const priceValue = parseFloat(priceText.replace('R$ ', '').replace('.', '').replace(',', '.'));
                
                const product = {
                    id: index, 
                    name: card.querySelector('.model').textContent,
                    price: priceValue,
                    image: card.querySelector('img').src,
                    quantity: 1
                };

                addToCart(product);
                
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

function saveCartToStorage() {
    localStorage.setItem('sneakerCart', JSON.stringify(cart));
}

window.addToCart = function(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(product);
    }
    saveCartToStorage();
    renderCart();
};

window.updateQuantity = (id, delta) => {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
        saveCartToStorage();
        renderCart();
    }
};

function renderCart() {
    const container = document.getElementById('cartItemsContainer');
    const totalElement = document.getElementById('cartTotalValue');
    const badgeElement = document.getElementById('cartCount');
    
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

// =========================================
// 5. ÁREA ADMINISTRATIVA (SECURE & COLOR)
// =========================================
// =========================================
// 5. ÁREA ADMINISTRATIVA (SECURE & COLOR)
// =========================================
function initAdmin() {
    const trigger = document.getElementById('adminTrigger');
    const panel = document.getElementById('adminPanel');
    const closeBtn = document.getElementById('closeAdmin');
    const colorPicker = document.getElementById('colorPicker');
    const colorValue = document.getElementById('colorValue');
    const resetBtn = document.getElementById('resetColor');
    
    const STORAGE_KEY = 'customPrimaryColor';
    
    // Cores originais do CSS para o Reset
    const ORIGINAL_PRIMARY = '#8A2BE2'; // Roxo
    const ORIGINAL_ACCENT = '#00D856';  // Verde Neon

    // Carregar cor salva ao iniciar a página
    const savedColor = localStorage.getItem(STORAGE_KEY);
    if (savedColor) {
        // Se houver cor salva, aplica ela em TUDO (Primária e Accent)
        applyColor(savedColor, true); 
        if(colorPicker) colorPicker.value = savedColor;
    }

    // Login com senha dz123
    if (trigger) {
        trigger.addEventListener('click', () => {
            const password = prompt('🔐 Acesso Administrativo\nPor favor, insira a senha:');
            if (password === 'dz123') {
                panel.classList.add('active');
                lucide.createIcons();
            } else if (password !== null) {
                alert('Acesso Negado: Senha incorreta.');
            }
        });
    }

    // Fechar painel
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            panel.classList.remove('active');
        });
    }

    // Atualização dinâmica
    if (colorPicker) {
        colorPicker.addEventListener('input', (e) => {
            const newColor = e.target.value;
            // Aplica a mesma cor para Primária e Accent (unifica o tema)
            applyColor(newColor, true); 
            localStorage.setItem(STORAGE_KEY, newColor);
        });
    }

    // Restaurar cores originais
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            // Restaura as cores originais DISTINTAS
            document.documentElement.style.setProperty('--primary-color', ORIGINAL_PRIMARY);
            document.documentElement.style.setProperty('--accent-color', ORIGINAL_ACCENT);
            
            if(colorValue) colorValue.textContent = ORIGINAL_PRIMARY;
            if(colorPicker) colorPicker.value = ORIGINAL_PRIMARY;
            
            localStorage.removeItem(STORAGE_KEY);
        });
    }

    // Função Helper para aplicar a cor
    // O parametro 'syncAccent' define se o verde deve mudar também
    function applyColor(color, syncAccent = false) {
        document.documentElement.style.setProperty('--primary-color', color);
        
        if (syncAccent) {
            document.documentElement.style.setProperty('--accent-color', color);
        }

        if(colorValue) colorValue.textContent = color.toUpperCase();
    }
}