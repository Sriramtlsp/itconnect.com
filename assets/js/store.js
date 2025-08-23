// Product Data
const products = [
    {
        id: 1,
        name: "8GB DDR4 RAM",
        price: 2500,
        category: "memory",
        image: "assets/images/ram-8gb.jpg",
        rating: 4.8,
        description: "High-performance 8GB DDR4 RAM for laptops. Compatible with most modern laptops.",
        specifications: ["DDR4-2666MHz", "260-pin SO-DIMM", "1.2V", "CL19"],
        inStock: true,
        warranty: "Lifetime warranty"
    },
    {
        id: 2,
        name: "16GB DDR4 RAM",
        price: 4500,
        category: "memory",
        image: "assets/images/ram-16gb.jpg",
        rating: 4.9,
        description: "Premium 16GB DDR4 RAM for high-performance laptops and gaming.",
        specifications: ["DDR4-3200MHz", "260-pin SO-DIMM", "1.2V", "CL22"],
        inStock: true,
        warranty: "Lifetime warranty"
    },
    {
        id: 3,
        name: "256GB NVMe SSD",
        price: 3200,
        category: "storage",
        image: "assets/images/ssd-256gb.jpg",
        rating: 4.7,
        description: "Fast 256GB NVMe SSD for improved laptop performance and boot times.",
        specifications: ["M.2 2280", "PCIe 3.0", "Read: 3500MB/s", "Write: 3000MB/s"],
        inStock: true,
        warranty: "5 years warranty"
    },
    {
        id: 4,
        name: "512GB NVMe SSD",
        price: 5800,
        category: "storage",
        image: "assets/images/ssd-512gb.jpg",
        rating: 4.8,
        description: "High-capacity 512GB NVMe SSD for professionals and content creators.",
        specifications: ["M.2 2280", "PCIe 4.0", "Read: 7000MB/s", "Write: 6500MB/s"],
        inStock: true,
        warranty: "5 years warranty"
    },
    {
        id: 5,
        name: "1TB SATA SSD",
        price: 7500,
        category: "storage",
        image: "assets/images/ssd-1tb.jpg",
        rating: 4.6,
        description: "Large capacity 1TB SATA SSD for maximum storage and reliability.",
        specifications: ["2.5 inch SATA III", "Read: 560MB/s", "Write: 530MB/s", "7mm thick"],
        inStock: true,
        warranty: "3 years warranty"
    },
    {
        id: 6,
        name: "15.6\" Full HD Screen",
        price: 4500,
        category: "screen",
        image: "assets/images/screen-15.6.jpg",
        rating: 4.5,
        description: "Replacement 15.6 inch Full HD LCD screen for most laptop brands.",
        specifications: ["1920x1080 resolution", "IPS panel", "Anti-glare coating", "LED backlight"],
        inStock: true,
        warranty: "6 months warranty"
    },
    {
        id: 7,
        name: "14\" HD Screen",
        price: 3500,
        category: "screen",
        image: "assets/images/screen-14.jpg",
        rating: 4.4,
        description: "Quality 14 inch HD LCD screen replacement for compact laptops.",
        specifications: ["1366x768 resolution", "TN panel", "Matte finish", "CCFL backlight"],
        inStock: true,
        warranty: "6 months warranty"
    },
    {
        id: 8,
        name: "Laptop Battery - Dell",
        price: 2800,
        category: "battery",
        image: "assets/images/battery-dell.jpg",
        rating: 4.3,
        description: "Compatible replacement battery for Dell Inspiron and Latitude series.",
        specifications: ["Li-ion 6-cell", "4400mAh", "11.1V", "48.84Wh"],
        inStock: true,
        warranty: "1 year warranty"
    },
    {
        id: 9,
        name: "Laptop Battery - HP",
        price: 2600,
        category: "battery",
        image: "assets/images/battery-hp.jpg",
        rating: 4.2,
        description: "High-quality replacement battery for HP Pavilion and ProBook series.",
        specifications: ["Li-ion 4-cell", "3950mAh", "14.8V", "58.44Wh"],
        inStock: true,
        warranty: "1 year warranty"
    },
    {
        id: 10,
        name: "Laptop Battery - Lenovo",
        price: 3000,
        category: "battery",
        image: "assets/images/battery-lenovo.jpg",
        rating: 4.4,
        description: "Premium replacement battery for Lenovo ThinkPad and IdeaPad series.",
        specifications: ["Li-ion 6-cell", "4400mAh", "10.8V", "47.52Wh"],
        inStock: true,
        warranty: "1 year warranty"
    },
    {
        id: 11,
        name: "Dell Keyboard",
        price: 1200,
        category: "keyboard",
        image: "assets/images/keyboard-dell.jpg",
        rating: 4.1,
        description: "Replacement keyboard for Dell Inspiron laptops with backlight.",
        specifications: ["US layout", "Backlit keys", "Black color", "Ribbon cable included"],
        inStock: true,
        warranty: "6 months warranty"
    },
    {
        id: 12,
        name: "HP Keyboard",
        price: 1100,
        category: "keyboard",
        image: "assets/images/keyboard-hp.jpg",
        rating: 4.0,
        description: "Quality replacement keyboard for HP Pavilion and ProBook laptops.",
        specifications: ["US layout", "Standard keys", "Black color", "Easy installation"],
        inStock: true,
        warranty: "6 months warranty"
    }
];

// Store functionality
document.addEventListener('DOMContentLoaded', function() {
    let currentCategory = 'all';
    let currentSort = 'name';

    // Initialize store
    renderProducts();
    setupEventListeners();
    updateCartUI();

    function renderProducts() {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;

        let filteredProducts = products;

        // Filter by category
        if (currentCategory !== 'all') {
            filteredProducts = products.filter(product => product.category === currentCategory);
        }

        // Sort products
        filteredProducts.sort((a, b) => {
            switch (currentSort) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                case 'name':
                default:
                    return a.name.localeCompare(b.name);
            }
        });

        productsGrid.innerHTML = filteredProducts.map(product => `
            <div class="product-card" data-category="${product.category}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='assets/images/laptop-repair-hero.jpg'">
                    ${!product.inStock ? '<div class="out-of-stock">Out of Stock</div>' : ''}
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-rating">
                        ${generateStars(product.rating)}
                        <span class="rating-text">(${product.rating})</span>
                    </div>
                    <p class="product-description">${product.description}</p>
                    <div class="product-specs">
                        <strong>Key Features:</strong>
                        <ul>
                            ${product.specifications.map(spec => `<li>${spec}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="product-warranty">
                        <i class="fas fa-shield-alt"></i> ${product.warranty}
                    </div>
                </div>
                <div class="product-footer">
                    <div class="product-price">₹${product.price.toLocaleString()}</div>
                    <button class="btn btn-primary add-to-cart" 
                            data-product-id="${product.id}" 
                            ${!product.inStock ? 'disabled' : ''}>
                        <i class="fas fa-cart-plus"></i> 
                        ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        `).join('');
    }

    function generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }

        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }

        return stars;
    }

    function setupEventListeners() {
        // Category filters
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', function() {
                currentCategory = this.dataset.category;
                
                // Update active category
                document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                
                renderProducts();
            });
        });

        // Sort dropdown
        const sortSelect = document.getElementById('sortProducts');
        if (sortSelect) {
            sortSelect.addEventListener('change', function() {
                currentSort = this.value;
                renderProducts();
            });
        }

        // Add to cart buttons
        document.addEventListener('click', function(e) {
            if (e.target.closest('.add-to-cart')) {
                const productId = parseInt(e.target.closest('.add-to-cart').dataset.productId);
                const product = products.find(p => p.id === productId);
                if (product && product.inStock) {
                    // Check if addToCart function exists, if not define it locally
                    if (typeof window.addToCart === 'function') {
                        window.addToCart(product);
                    } else if (typeof addToCart === 'function') {
                        addToCart(product);
                    } else {
                        // Fallback: define addToCart function locally
                        addToCartLocal(product);
                    }
                }
            }
        });

        // Cart toggle
        const cartToggle = document.getElementById('cartToggle');
        const cartSidebar = document.getElementById('cartSidebar');
        const cartOverlay = document.getElementById('cartOverlay');
        const cartClose = document.getElementById('cartClose');

        if (cartToggle) {
            cartToggle.addEventListener('click', function(e) {
                e.preventDefault();
                openCart();
            });
        }

        if (cartClose) {
            cartClose.addEventListener('click', closeCart);
        }

        if (cartOverlay) {
            cartOverlay.addEventListener('click', closeCart);
        }

        // Checkout button
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function() {
                const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
                if (currentCart.length === 0) {
                    showNotification('Your cart is empty!', 'error');
                    return;
                }
                
                // Redirect to checkout page
                window.location.href = 'checkout.html';
                closeCart();
            });
        }
    }

    function openCart() {
        const cartSidebar = document.getElementById('cartSidebar');
        const cartOverlay = document.getElementById('cartOverlay');
        
        if (cartSidebar && cartOverlay) {
            cartSidebar.classList.add('active');
            cartOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            updateCartUI();
        }
    }

    function closeCart() {
        const cartSidebar = document.getElementById('cartSidebar');
        const cartOverlay = document.getElementById('cartOverlay');
        
        if (cartSidebar && cartOverlay) {
            cartSidebar.classList.remove('active');
            cartOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    function updateCartUI() {
        // Always get fresh cart data from localStorage
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        
        if (!cartItems || !cartTotal) return;

        if (currentCart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart"><i class="fas fa-shopping-cart"></i><p>Your cart is empty</p></div>';
            cartTotal.textContent = '0';
            return;
        }

        cartItems.innerHTML = currentCart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='assets/images/laptop-repair-hero.jpg'">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        // Calculate total from current cart data
        const total = currentCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toLocaleString();
    }

    function generateOrderMessage() {
        // Always get fresh cart data from localStorage
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        let message = "🛒 *New Order from IT Connect Store*\n\n";
        message += "*Items:*\n";
        
        currentCart.forEach(item => {
            message += `• ${item.name} x${item.quantity} - ₹${(item.price * item.quantity).toLocaleString()}\n`;
        });
        
        const total = currentCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        message += `\n*Total: ₹${total.toLocaleString()}*\n\n`;
        message += "Please confirm this order and provide delivery details.\n";
        message += "Thank you for choosing IT Connect!";
        
        return message;
    }

    // Local cart functions as fallback
    function addToCartLocal(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update global cart variable if it exists
        if (typeof window.cart !== 'undefined') {
            window.cart = cart;
        }
        
        updateCartCountLocal();
        showNotificationLocal(`${product.name} added to cart!`, 'success');
        
        // Update cart UI
        updateCartUI();
    }
    
    function updateCartCountLocal() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }
    
    function showNotificationLocal(message, type = 'info') {
        // Use global showNotification if available, otherwise create a simple alert
        if (typeof window.showNotification === 'function') {
            window.showNotification(message, type);
        } else if (typeof showNotification === 'function') {
            showNotification(message, type);
        } else {
            // Simple fallback notification
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #22c55e;
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                z-index: 10000;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            `;
            notification.textContent = message;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 3000);
        }
    }

    // Make functions globally available
    window.updateCartUI = updateCartUI;
    window.addToCartLocal = addToCartLocal;
    window.updateCartCountLocal = updateCartCountLocal;
});