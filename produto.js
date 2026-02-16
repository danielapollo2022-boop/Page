// =========================================
// 1. BANCO DE DADOS MOCK (Simulação)
// =========================================
// A ordem (ID) deve ser IDÊNTICA à dos cards na index.html

const productsData = [
    {
        id: 0,
        brand: "Nike",
        model: "Air Jordan 1 High Green",
        oldPrice: 1299.00,
        price: 1039.00,
        description: "O Air Jordan 1 High Green traz uma estética vintage com tecnologia moderna de amortecimento. Couro premium e design icônico para elevar seu outfit. A unidade Air-Sole encapsulada no calcanhar fornece amortecimento leve, testado e aprovado pelas lendas das quadras.",
        images: [
            "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        sizes: [38, 39, 40, 41, 42, 43]
    },
    {
        id: 1,
        brand: "Nike",
        model: "Nike Air Max Red Edition",
        oldPrice: 899.00,
        price: 699.00,
        description: "Intenso e ousado. O Air Max Red Edition combina malha respirável com amortecimento Max Air visível para conforto o dia todo. O design vermelho vibrante garante que você se destaque em qualquer lugar.",
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        sizes: [38, 39, 40, 41]
    },
    {
        id: 2,
        brand: "Nike",
        model: "Nike React Vision",
        oldPrice: 799.00,
        price: 679.00,
        description: "Inspirado no surrealismo dos sonhos, o Nike React Vision oferece conforto inigualável com a espuma Nike React. As texturas em camadas e formas divertidas criam um visual futurista e único.",
        images: [
            "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        sizes: [39, 40, 41, 42, 44]
    },
    {
        id: 3,
        brand: "Mizuno",
        model: "Mizuno Wave Prophecy",
        oldPrice: 1599.00,
        price: 999.00,
        description: "A evolução da tecnologia Infinity Wave. O Prophecy oferece o máximo de amortecimento e estabilidade para corredores de alta performance ou para quem busca um estilo agressivo e tecnológico.",
        images: [
            "https://images.unsplash.com/photo-1514989940723-e8875ea6ab7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        sizes: [39, 40, 41, 42, 43, 44]
    },
    {
        id: 4,
        brand: "Nike",
        model: "Nike Air Force 1 Shadow",
        oldPrice: 699.00,
        price: 489.00,
        description: "Tudo em dobro. O AF1 Shadow dá um toque divertido a um design clássico de basquete, com sobreposições em camadas e o dobro de logos. A entressola exagerada destaca o DNA AF1.",
        images: [
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        sizes: [35, 36, 37, 38]
    },
    {
        id: 5,
        brand: "Mizuno",
        model: "Mizuno Wave Sky 4",
        oldPrice: 999.00,
        price: 899.00,
        description: "Sinta como se estivesse flutuando. O Wave Sky 4 introduz a tecnologia MIZUNO ENERZY para um retorno de energia incrível e uma sensação de maciez extrema a cada passada.",
        images: [
            "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1514989940723-e8875ea6ab7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        sizes: [40, 41, 42, 43]
    }
];

// =========================================
// 2. INICIALIZAÇÃO
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    // Captura o ID da URL
    const params = new URLSearchParams(window.location.search);
    let productId = parseInt(params.get('id'));

    // Fallback: Se não tiver ID válido, carrega o primeiro
    if (isNaN(productId) || !productsData[productId]) {
        productId = 0;
    }

    const product = productsData[productId];
    
    renderProduct(product);
    initGallery();
    initSizeSelector();
    initAddToCart(product);
    
    // Inicializa ícones
    lucide.createIcons();
});

// =========================================
// 3. FUNÇÕES DE RENDERIZAÇÃO
// =========================================
function renderProduct(product) {
    // SEO e Títulos
    document.title = `SNEAKER DROP | ${product.model}`;
    const breadcrumb = document.getElementById('breadcrumbModel');
    if(breadcrumb) breadcrumb.textContent = product.model;

    // Info do Produto
    document.getElementById('brandTag').textContent = product.brand;
    document.getElementById('productName').textContent = product.model;
    document.getElementById('productDescription').textContent = product.description;
    
    // Preços
    document.getElementById('oldPrice').textContent = product.oldPrice.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    document.getElementById('newPrice').textContent = product.price.toLocaleString('pt-BR', {minimumFractionDigits: 2});
    
    // Parcelamento
    const parcela = (product.price / 10).toLocaleString('pt-BR', {minimumFractionDigits: 2});
    document.getElementById('installmentsInfo').textContent = `em até 10x de R$ ${parcela} sem juros`;

    // Imagem Principal
    document.getElementById('mainImage').src = product.images[0];

    // Gerar Miniaturas
    const thumbsContainer = document.getElementById('thumbnailsContainer');
    thumbsContainer.innerHTML = ''; // Limpa anteriores
    
    product.images.forEach((imgSrc, index) => {
        const thumb = document.createElement('div');
        thumb.className = `thumb-btn ${index === 0 ? 'active' : ''}`;
        thumb.innerHTML = `<img src="${imgSrc}" alt="Thumbnail ${index + 1}">`;
        thumb.dataset.src = imgSrc;
        thumbsContainer.appendChild(thumb);
    });

    // Gerar Botões de Tamanho
    const sizeContainer = document.getElementById('sizeContainer');
    sizeContainer.innerHTML = ''; // Limpa anteriores
    
    product.sizes.forEach(size => {
        const btn = document.createElement('button');
        btn.className = 'size-btn';
        btn.textContent = size;
        sizeContainer.appendChild(btn);
    });

    // CRO: Visualizadores
    const viewers = document.getElementById('viewersCount');
    if(viewers) viewers.textContent = Math.floor(Math.random() * (30 - 10) + 10);
}

// =========================================
// 4. INTERATIVIDADE
// =========================================

// Variável para guardar o tamanho escolhido
let selectedSize = null;

function initGallery() {
    const mainImage = document.getElementById('mainImage');
    const thumbsContainer = document.getElementById('thumbnailsContainer');

    // Usamos delegação de evento para garantir que funcione com elementos criados dinamicamente
    thumbsContainer.addEventListener('click', (e) => {
        const thumbBtn = e.target.closest('.thumb-btn');
        if (!thumbBtn) return;

        // Remove active de todos e adiciona no atual
        document.querySelectorAll('.thumb-btn').forEach(t => t.classList.remove('active'));
        thumbBtn.classList.add('active');

        // Troca imagem com fade
        const newSrc = thumbBtn.dataset.src;
        mainImage.style.opacity = '0.5';
        setTimeout(() => {
            mainImage.src = newSrc;
            mainImage.style.opacity = '1';
        }, 200);
    });
}

function initSizeSelector() {
    const sizeContainer = document.getElementById('sizeContainer');
    const errorMsg = document.getElementById('sizeError');

    sizeContainer.addEventListener('click', (e) => {
        if (!e.target.classList.contains('size-btn')) return;

        const btn = e.target;
        
        // Remove seleção anterior
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
        
        // Seleciona atual
        btn.classList.add('selected');
        selectedSize = btn.textContent;
        
        // Remove mensagem de erro
        errorMsg.style.opacity = '0';
    });
}

// AQUI OCORRE A INTEGRAÇÃO COM O SCRIPT.JS GLOBAL
function initAddToCart(product) {
    const btn = document.getElementById('addToCartBtn');
    const errorMsg = document.getElementById('sizeError');

    btn.addEventListener('click', () => {
        // 1. Validação: Usuário escolheu tamanho?
        if (!selectedSize) {
            errorMsg.style.opacity = '1';
            // Animação de "shake"
            errorMsg.style.transform = 'translateX(5px)';
            setTimeout(() => errorMsg.style.transform = 'translateX(0)', 100);
            return;
        }

        // 2. Prepara o objeto para o carrinho
        const cartItem = {
            id: product.id, 
            name: `${product.model} (Tam: ${selectedSize})`, // Inclui tamanho no nome
            price: product.price,
            image: product.images[0],
            quantity: 1
        };

        // 3. Tenta usar a função global window.addToCart (do script.js)
        if (window.addToCart) {
            window.addToCart(cartItem);
        } else {
            console.error('Função window.addToCart não encontrada! Verifique o script.js');
            alert('Item adicionado (Simulação - Erro de Integração)');
        }

        // 4. Feedback Visual no Botão
        const originalText = btn.innerHTML;
        btn.innerHTML = `Adicionado! <i data-lucide="check"></i>`;
        btn.style.background = 'var(--accent-color)';
        btn.style.color = '#000'; // Contraste melhor
        btn.style.borderColor = 'var(--accent-color)';
        lucide.createIcons();

        // 5. Abre o Carrinho Lateral (usando a função global)
        setTimeout(() => {
            if (window.toggleCart) {
                window.toggleCart();
            }
        }, 500);

        // 6. Reseta o botão após 2s
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.style.color = '';
            btn.style.borderColor = '';
            lucide.createIcons();
        }, 2000);
    });
}