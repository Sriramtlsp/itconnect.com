// Checkout functionality
document.addEventListener('DOMContentLoaded', function() {
    let currentStep = 1;
    let orderData = {
        items: [],
        shipping: {},
        payment: {},
        totals: {
            subtotal: 0,
            shipping: 150,
            tax: 0,
            discount: 0,
            total: 0
        }
    };

    // Initialize checkout
    initializeCheckout();
    setupEventListeners();
    loadCartItems();
    updateOrderSummary();

    function initializeCheckout() {
        // Load cart data from localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        orderData.items = cart;
        
        // Calculate initial totals
        calculateTotals();
        
        // Show first step
        showStep(1);
    }

    function setupEventListeners() {
        // Payment method selection
        document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
            radio.addEventListener('change', function() {
                selectPaymentMethod(this.value);
            });
        });

        // UPI type selection
        document.querySelectorAll('input[name="upiType"]').forEach(radio => {
            radio.addEventListener('change', function() {
                toggleUpiSection(this.value);
            });
        });

        // Delivery option selection
        document.querySelectorAll('input[name="delivery"]').forEach(radio => {
            radio.addEventListener('change', function() {
                updateShippingCost(this.value);
            });
        });

        // Card number formatting
        const cardNumberInput = document.getElementById('cardNumber');
        if (cardNumberInput) {
            cardNumberInput.addEventListener('input', formatCardNumber);
            cardNumberInput.addEventListener('input', detectCardType);
        }

        // Expiry date formatting
        const expiryInput = document.getElementById('expiryDate');
        if (expiryInput) {
            expiryInput.addEventListener('input', formatExpiryDate);
        }

        // CVV validation
        const cvvInput = document.getElementById('cvv');
        if (cvvInput) {
            cvvInput.addEventListener('input', function() {
                this.value = this.value.replace(/\D/g, '');
            });
        }

        // Promo code application
        const applyPromoBtn = document.getElementById('applyPromo');
        if (applyPromoBtn) {
            applyPromoBtn.addEventListener('click', applyPromoCode);
        }

        // Wallet selection
        document.querySelectorAll('.wallet-option').forEach(option => {
            option.addEventListener('click', function() {
                selectWallet(this.dataset.wallet);
            });
        });

        // Form validation
        setupFormValidation();
    }

    function loadCartItems() {
        const cartItemsContainer = document.getElementById('checkoutCartItems');
        const summaryItemsContainer = document.getElementById('summaryItems');
        
        if (!cartItemsContainer || !summaryItemsContainer) return;

        if (orderData.items.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Your cart is empty</h3>
                    <p>Add some items to your cart to proceed with checkout.</p>
                    <a href="store.html" class="btn btn-primary">
                        <i class="fas fa-shopping-bag"></i> Shop Now
                    </a>
                </div>
            `;
            return;
        }

        // Render cart items for review
        cartItemsContainer.innerHTML = orderData.items.map(item => `
            <div class="checkout-item">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}" onerror="this.src='assets/images/laptop-repair-hero.jpg'">
                </div>
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <div class="item-price">₹${item.price.toLocaleString()}</div>
                    <div class="item-quantity">
                        <button class="quantity-btn" onclick="updateItemQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateItemQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <div class="item-total">₹${(item.price * item.quantity).toLocaleString()}</div>
                <button class="remove-item" onclick="removeItem(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        // Render summary items
        summaryItemsContainer.innerHTML = orderData.items.map(item => `
            <div class="summary-item">
                <div class="item-info">
                    <span class="item-name">${item.name}</span>
                    <span class="item-qty">x${item.quantity}</span>
                </div>
                <div class="item-price">₹${(item.price * item.quantity).toLocaleString()}</div>
            </div>
        `).join('');
    }

    function calculateTotals() {
        const subtotal = orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = Math.round(subtotal * 0.18); // 18% GST
        const total = subtotal + orderData.totals.shipping + tax - orderData.totals.discount;

        orderData.totals.subtotal = subtotal;
        orderData.totals.tax = tax;
        orderData.totals.total = total;

        updateOrderSummary();
    }

    function updateOrderSummary() {
        const subtotalEl = document.getElementById('subtotal');
        const shippingEl = document.getElementById('shippingCost');
        const taxEl = document.getElementById('taxAmount');
        const discountEl = document.getElementById('discountAmount');
        const totalEl = document.getElementById('totalAmount');
        const discountRow = document.getElementById('discountRow');

        if (subtotalEl) subtotalEl.textContent = `₹${orderData.totals.subtotal.toLocaleString()}`;
        if (shippingEl) shippingEl.textContent = orderData.totals.shipping === 0 ? 'Free' : `₹${orderData.totals.shipping}`;
        if (taxEl) taxEl.textContent = `₹${orderData.totals.tax.toLocaleString()}`;
        if (totalEl) totalEl.textContent = `₹${orderData.totals.total.toLocaleString()}`;

        if (orderData.totals.discount > 0) {
            if (discountEl) discountEl.textContent = `-₹${orderData.totals.discount.toLocaleString()}`;
            if (discountRow) discountRow.style.display = 'flex';
        } else {
            if (discountRow) discountRow.style.display = 'none';
        }
    }

    function showStep(step) {
        // Hide all steps
        document.querySelectorAll('.checkout-step').forEach(stepEl => {
            stepEl.classList.remove('active');
        });

        // Show current step
        const currentStepEl = document.getElementById(`step-${step}`);
        if (currentStepEl) {
            currentStepEl.classList.add('active');
        }

        // Update step indicators
        document.querySelectorAll('.step').forEach((stepEl, index) => {
            stepEl.classList.remove('active', 'completed');
            if (index + 1 < step) {
                stepEl.classList.add('completed');
            } else if (index + 1 === step) {
                stepEl.classList.add('active');
            }
        });

        currentStep = step;
    }

    function nextStep(step) {
        if (validateCurrentStep()) {
            showStep(step);
        }
    }

    function prevStep(step) {
        showStep(step);
    }

    function validateCurrentStep() {
        switch (currentStep) {
            case 1:
                return orderData.items.length > 0;
            case 2:
                return validateShippingForm();
            case 3:
                return validatePaymentForm();
            default:
                return true;
        }
    }

    function validateShippingForm() {
        const form = document.getElementById('shippingForm');
        if (!form) return false;

        const requiredFields = form.querySelectorAll('input[required], select[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('invalid');
                isValid = false;
            } else {
                field.classList.remove('invalid');
            }
        });

        if (isValid) {
            // Save shipping data
            const formData = new FormData(form);
            orderData.shipping = Object.fromEntries(formData);
        }

        return isValid;
    }

    function validatePaymentForm() {
        const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');
        if (!selectedMethod) return false;

        const method = selectedMethod.value;
        let isValid = true;

        switch (method) {
            case 'card':
                isValid = validateCardForm();
                break;
            case 'upi':
                isValid = validateUpiForm();
                break;
            case 'netbanking':
                isValid = validateNetbankingForm();
                break;
            case 'wallet':
                isValid = validateWalletSelection();
                break;
            case 'cod':
                isValid = true; // COD doesn't need validation
                break;
        }

        if (isValid) {
            orderData.payment.method = method;
        }

        return isValid;
    }

    function validateCardForm() {
        const cardNumber = document.getElementById('cardNumber');
        const cardName = document.getElementById('cardName');
        const expiryDate = document.getElementById('expiryDate');
        const cvv = document.getElementById('cvv');

        let isValid = true;

        // Validate card number (basic Luhn algorithm)
        if (!cardNumber.value || !isValidCardNumber(cardNumber.value.replace(/\s/g, ''))) {
            cardNumber.classList.add('invalid');
            isValid = false;
        } else {
            cardNumber.classList.remove('invalid');
        }

        // Validate cardholder name
        if (!cardName.value.trim()) {
            cardName.classList.add('invalid');
            isValid = false;
        } else {
            cardName.classList.remove('invalid');
        }

        // Validate expiry date
        if (!expiryDate.value || !isValidExpiryDate(expiryDate.value)) {
            expiryDate.classList.add('invalid');
            isValid = false;
        } else {
            expiryDate.classList.remove('invalid');
        }

        // Validate CVV
        if (!cvv.value || cvv.value.length < 3) {
            cvv.classList.add('invalid');
            isValid = false;
        } else {
            cvv.classList.remove('invalid');
        }

        return isValid;
    }

    function validateUpiForm() {
        const upiType = document.querySelector('input[name="upiType"]:checked');
        if (!upiType) return false;

        if (upiType.value === 'upiId') {
            const upiId = document.getElementById('upiIdInput');
            if (!upiId.value || !isValidUpiId(upiId.value)) {
                upiId.classList.add('invalid');
                return false;
            } else {
                upiId.classList.remove('invalid');
            }
        }

        return true;
    }

    function validateNetbankingForm() {
        const bankSelect = document.getElementById('bankSelect');
        if (!bankSelect.value) {
            bankSelect.classList.add('invalid');
            return false;
        } else {
            bankSelect.classList.remove('invalid');
        }
        return true;
    }

    function validateWalletSelection() {
        const selectedWallet = document.querySelector('.wallet-option.selected');
        return selectedWallet !== null;
    }

    function selectPaymentMethod(method) {
        // Hide all payment method contents
        document.querySelectorAll('.payment-method').forEach(methodEl => {
            methodEl.classList.remove('active');
        });

        // Show selected method content
        const selectedMethod = document.querySelector(`[data-method="${method}"]`);
        if (selectedMethod) {
            selectedMethod.classList.add('active');
        }
    }

    function toggleUpiSection(type) {
        const upiIdSection = document.getElementById('upiIdSection');
        const upiQrSection = document.getElementById('upiQrSection');

        if (type === 'upiId') {
            upiIdSection.style.display = 'block';
            upiQrSection.style.display = 'none';
        } else {
            upiIdSection.style.display = 'none';
            upiQrSection.style.display = 'block';
            generateQRCode();
        }
    }

    function generateQRCode() {
        // Simulate QR code generation
        const qrContainer = document.querySelector('.qr-code');
        if (qrContainer) {
            qrContainer.innerHTML = `
                <div class="qr-placeholder">
                    <i class="fas fa-qrcode"></i>
                    <p>QR Code Generated</p>
                    <small>Amount: ₹${orderData.totals.total.toLocaleString()}</small>
                </div>
            `;
        }
    }

    function selectWallet(wallet) {
        // Remove previous selection
        document.querySelectorAll('.wallet-option').forEach(option => {
            option.classList.remove('selected');
        });

        // Select current wallet
        const selectedOption = document.querySelector(`[data-wallet="${wallet}"]`);
        if (selectedOption) {
            selectedOption.classList.add('selected');
        }

        orderData.payment.wallet = wallet;
    }

    function updateShippingCost(deliveryType) {
        let shippingCost = 150; // Default standard delivery

        switch (deliveryType) {
            case 'standard':
                shippingCost = orderData.totals.subtotal >= 2000 ? 0 : 150;
                break;
            case 'express':
                shippingCost = 300;
                break;
            case 'sameday':
                shippingCost = 500;
                break;
        }

        orderData.totals.shipping = shippingCost;
        calculateTotals();
    }

    function applyPromoCode() {
        const promoInput = document.getElementById('promoCode');
        const promoCode = promoInput.value.trim().toUpperCase();

        // Predefined promo codes
        const promoCodes = {
            'WELCOME10': { type: 'percentage', value: 10, minOrder: 1000 },
            'SAVE500': { type: 'fixed', value: 500, minOrder: 2000 },
            'FIRSTORDER': { type: 'percentage', value: 15, minOrder: 1500 },
            'STUDENT20': { type: 'percentage', value: 20, minOrder: 1000 }
        };

        if (promoCodes[promoCode]) {
            const promo = promoCodes[promoCode];
            
            if (orderData.totals.subtotal >= promo.minOrder) {
                let discount = 0;
                
                if (promo.type === 'percentage') {
                    discount = Math.round(orderData.totals.subtotal * (promo.value / 100));
                } else {
                    discount = promo.value;
                }

                orderData.totals.discount = discount;
                calculateTotals();
                
                showNotification(`Promo code applied! You saved ₹${discount}`, 'success');
                promoInput.disabled = true;
                document.getElementById('applyPromo').textContent = 'Applied';
                document.getElementById('applyPromo').disabled = true;
            } else {
                showNotification(`Minimum order value ₹${promo.minOrder} required for this promo code`, 'error');
            }
        } else {
            showNotification('Invalid promo code', 'error');
        }
    }

    function processPayment() {
        if (!validateCurrentStep()) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Show loading state
        const paymentBtn = document.querySelector('.step-actions .btn-primary');
        const originalText = paymentBtn.innerHTML;
        paymentBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        paymentBtn.disabled = true;

        // Simulate payment processing
        setTimeout(() => {
            // Generate order number
            const orderNumber = 'ITC-' + new Date().getFullYear() + '-' + Math.random().toString(36).substr(2, 6).toUpperCase();
            document.getElementById('orderNumber').textContent = orderNumber;

            // Set estimated delivery based on shipping method
            const deliveryMethod = document.querySelector('input[name="delivery"]:checked').value;
            let estimatedDelivery = '3-5 business days';
            
            switch (deliveryMethod) {
                case 'express':
                    estimatedDelivery = '1-2 business days';
                    break;
                case 'sameday':
                    estimatedDelivery = 'Same day delivery';
                    break;
            }
            
            document.getElementById('estimatedDelivery').textContent = estimatedDelivery;

            // Clear cart
            localStorage.removeItem('cart');
            
            // Update cart count
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                cartCount.textContent = '0';
                cartCount.style.display = 'none';
            }

            // Show confirmation step
            showStep(4);
            
            // Reset button
            paymentBtn.innerHTML = originalText;
            paymentBtn.disabled = false;

            // Show success notification
            showNotification('Payment successful! Order confirmed.', 'success');

            // Send confirmation email (simulate)
            setTimeout(() => {
                showNotification('Confirmation email sent to your registered email address', 'info');
            }, 2000);

        }, 3000);
    }

    // Utility functions
    function formatCardNumber(e) {
        let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
        let formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
        
        if (formattedValue.length > 19) {
            formattedValue = formattedValue.substr(0, 19);
        }
        
        e.target.value = formattedValue;
    }

    function detectCardType(e) {
        const cardNumber = e.target.value.replace(/\s/g, '');
        const cardTypeIcon = document.getElementById('cardTypeIcon');
        
        if (!cardTypeIcon) return;

        let cardType = '';
        
        if (/^4/.test(cardNumber)) {
            cardType = 'visa';
        } else if (/^5[1-5]/.test(cardNumber)) {
            cardType = 'mastercard';
        } else if (/^3[47]/.test(cardNumber)) {
            cardType = 'amex';
        }

        cardTypeIcon.className = cardType ? `fab fa-cc-${cardType}` : '';
    }

    function formatExpiryDate(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        
        e.target.value = value;
    }

    function isValidCardNumber(cardNumber) {
        // Basic Luhn algorithm implementation
        let sum = 0;
        let alternate = false;
        
        for (let i = cardNumber.length - 1; i >= 0; i--) {
            let n = parseInt(cardNumber.charAt(i), 10);
            
            if (alternate) {
                n *= 2;
                if (n > 9) {
                    n = (n % 10) + 1;
                }
            }
            
            sum += n;
            alternate = !alternate;
        }
        
        return (sum % 10 === 0) && cardNumber.length >= 13;
    }

    function isValidExpiryDate(expiry) {
        const [month, year] = expiry.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;
        
        const expMonth = parseInt(month, 10);
        const expYear = parseInt(year, 10);
        
        if (expMonth < 1 || expMonth > 12) return false;
        if (expYear < currentYear) return false;
        if (expYear === currentYear && expMonth < currentMonth) return false;
        
        return true;
    }

    function isValidUpiId(upiId) {
        const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
        return upiRegex.test(upiId);
    }

    function updateItemQuantity(itemId, newQuantity) {
        if (newQuantity <= 0) {
            removeItem(itemId);
            return;
        }

        const itemIndex = orderData.items.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
            orderData.items[itemIndex].quantity = newQuantity;
            
            // Update localStorage
            localStorage.setItem('cart', JSON.stringify(orderData.items));
            
            // Reload items and recalculate
            loadCartItems();
            calculateTotals();
        }
    }

    function removeItem(itemId) {
        orderData.items = orderData.items.filter(item => item.id !== itemId);
        
        // Update localStorage
        localStorage.setItem('cart', JSON.stringify(orderData.items));
        
        // Reload items and recalculate
        loadCartItems();
        calculateTotals();
        
        showNotification('Item removed from cart', 'info');
    }

    function setupFormValidation() {
        // Real-time validation for form fields
        const inputs = document.querySelectorAll('input, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.classList.add('invalid');
                } else {
                    this.classList.remove('invalid');
                }
            });

            input.addEventListener('input', function() {
                if (this.classList.contains('invalid') && this.value.trim()) {
                    this.classList.remove('invalid');
                }
            });
        });
    }

    // Make functions globally available
    window.nextStep = nextStep;
    window.prevStep = prevStep;
    window.processPayment = processPayment;
    window.updateItemQuantity = updateItemQuantity;
    window.removeItem = removeItem;
});

// Notification function (if not already defined in script.js)
if (typeof showNotification === 'undefined') {
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const iconMap = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="${iconMap[type]}"></i>
                <span class="notification-message">${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
        
        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
    }
    
    window.showNotification = showNotification;
}