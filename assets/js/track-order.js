// Track Order Functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeTrackOrder();
});

// Sample order data (in a real application, this would come from an API)
const sampleOrders = {
    'ORD-2024-001': {
        orderNumber: 'ORD-2024-001',
        orderDate: 'March 25, 2024',
        status: 'processing',
        items: [
            {
                id: 1,
                name: '500GB SSD Drive',
                specs: 'SATA III, 2.5", 560MB/s Read Speed',
                quantity: 1,
                price: 4200,
                image: 'https://via.placeholder.com/80x80',
                status: 'processing'
            }
        ],
        shipping: {
            address: 'John Doe<br>123 Main Street, Apartment 4B<br>Chennai, Tamil Nadu 600001<br>India',
            method: 'Standard Delivery (3-5 business days)',
            trackingNumber: 'TRK123456789',
            estimatedDelivery: 'March 30, 2024'
        },
        summary: {
            subtotal: 4200,
            shipping: 100,
            tax: 387,
            total: 4687
        },
        timeline: [
            {
                status: 'confirmed',
                title: 'Order Confirmed',
                description: 'Your order has been received and confirmed',
                timestamp: 'March 25, 2024 - 10:30 AM',
                completed: true
            },
            {
                status: 'payment',
                title: 'Payment Verified',
                description: 'Payment has been processed successfully',
                timestamp: 'March 25, 2024 - 10:35 AM',
                completed: true
            },
            {
                status: 'processing',
                title: 'Processing',
                description: 'Your order is being prepared for shipment',
                timestamp: 'In Progress',
                completed: false,
                active: true
            },
            {
                status: 'shipped',
                title: 'Shipped',
                description: 'Your order is on the way',
                timestamp: 'Pending',
                completed: false
            },
            {
                status: 'delivered',
                title: 'Delivered',
                description: 'Order delivered to your address',
                timestamp: 'Pending',
                completed: false
            }
        ]
    },
    'ORD-2024-002': {
        orderNumber: 'ORD-2024-002',
        orderDate: 'March 20, 2024',
        status: 'delivered',
        items: [
            {
                id: 2,
                name: '16GB DDR4 RAM Module',
                specs: '3200MHz, PC4-25600, CL22',
                quantity: 1,
                price: 3500,
                image: 'https://via.placeholder.com/80x80',
                status: 'delivered'
            }
        ],
        shipping: {
            address: 'John Doe<br>123 Main Street, Apartment 4B<br>Chennai, Tamil Nadu 600001<br>India',
            method: 'Express Delivery (1-2 business days)',
            trackingNumber: 'TRK123456788',
            estimatedDelivery: 'March 22, 2024',
            actualDelivery: 'March 21, 2024'
        },
        summary: {
            subtotal: 3500,
            shipping: 150,
            tax: 328,
            total: 3978
        },
        timeline: [
            {
                status: 'confirmed',
                title: 'Order Confirmed',
                description: 'Your order has been received and confirmed',
                timestamp: 'March 20, 2024 - 09:15 AM',
                completed: true
            },
            {
                status: 'payment',
                title: 'Payment Verified',
                description: 'Payment has been processed successfully',
                timestamp: 'March 20, 2024 - 09:20 AM',
                completed: true
            },
            {
                status: 'processing',
                title: 'Processing',
                description: 'Your order was prepared for shipment',
                timestamp: 'March 20, 2024 - 02:30 PM',
                completed: true
            },
            {
                status: 'shipped',
                title: 'Shipped',
                description: 'Your order was dispatched',
                timestamp: 'March 20, 2024 - 06:45 PM',
                completed: true
            },
            {
                status: 'delivered',
                title: 'Delivered',
                description: 'Order delivered successfully',
                timestamp: 'March 21, 2024 - 11:30 AM',
                completed: true,
                active: true
            }
        ]
    }
};

function initializeTrackOrder() {
    const trackForm = document.getElementById('trackOrderForm');
    const orderInput = document.getElementById('orderNumber');
    
    if (trackForm) {
        trackForm.addEventListener('submit', handleTrackOrder);
    }
    
    // Auto-focus on order input
    if (orderInput) {
        orderInput.focus();
    }
    
    // Check URL parameters for order number
    const urlParams = new URLSearchParams(window.location.search);
    const orderParam = urlParams.get('order');
    if (orderParam) {
        orderInput.value = orderParam;
        trackOrder(orderParam);
    }
    
    // Add input formatting
    if (orderInput) {
        orderInput.addEventListener('input', formatOrderNumber);
    }
}

function formatOrderNumber(event) {
    let value = event.target.value.toUpperCase();
    // Remove any non-alphanumeric characters except hyphens
    value = value.replace(/[^A-Z0-9-]/g, '');
    event.target.value = value;
}

function handleTrackOrder(event) {
    event.preventDefault();
    const orderNumber = document.getElementById('orderNumber').value.trim().toUpperCase();
    
    if (!orderNumber) {
        showNotification('Please enter an order number.', 'error');
        return;
    }
    
    trackOrder(orderNumber);
}

function trackOrder(orderNumber) {
    // Show loading state
    showLoadingState();
    
    // Simulate API call delay
    setTimeout(() => {
        const order = sampleOrders[orderNumber];
        
        if (order) {
            displayOrderDetails(order);
            // Update URL without page reload
            const newUrl = new URL(window.location);
            newUrl.searchParams.set('order', orderNumber);
            window.history.pushState({}, '', newUrl);
        } else {
            showOrderNotFound();
        }
    }, 1500);
}

function showLoadingState() {
    const container = document.getElementById('orderDetailsContainer');
    const notFound = document.getElementById('orderNotFound');
    
    // Hide existing content
    container.style.display = 'none';
    notFound.style.display = 'none';
    
    // Show loading message
    if (!document.getElementById('loadingState')) {
        const loading = document.createElement('div');
        loading.id = 'loadingState';
        loading.className = 'loading-state';
        loading.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner">
                    <i class="fas fa-spinner fa-spin"></i>
                </div>
                <h3>Tracking Your Order...</h3>
                <p>Please wait while we fetch your order details</p>
            </div>
        `;
        
        container.parentNode.insertBefore(loading, container);
    }
    
    document.getElementById('loadingState').style.display = 'block';
}

function hideLoadingState() {
    const loading = document.getElementById('loadingState');
    if (loading) {
        loading.style.display = 'none';
    }
}

function showOrderNotFound() {
    hideLoadingState();
    document.getElementById('orderNotFound').style.display = 'block';
    document.getElementById('orderDetailsContainer').style.display = 'none';
}

function displayOrderDetails(order) {
    hideLoadingState();
    
    // Update order header
    document.getElementById('orderTitle').textContent = `Order #${order.orderNumber}`;
    document.getElementById('orderDate').textContent = `Placed on ${order.orderDate}`;
    
    // Update status badge
    const statusBadge = document.getElementById('orderStatusBadge');
    statusBadge.textContent = capitalizeFirst(order.status);
    statusBadge.className = `order-status-badge ${order.status}`;
    
    // Update timeline
    updateTimeline(order.timeline);
    
    // Update order items
    updateOrderItems(order.items);
    
    // Update shipping information
    updateShippingInfo(order.shipping);
    
    // Update order summary
    updateOrderSummary(order.summary);
    
    // Show order details
    document.getElementById('orderNotFound').style.display = 'none';
    document.getElementById('orderDetailsContainer').style.display = 'block';
    
    // Scroll to results
    document.getElementById('orderDetailsContainer').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

function updateTimeline(timeline) {
    const timelineContainer = document.getElementById('progressTimeline');
    timelineContainer.innerHTML = '';
    
    timeline.forEach(step => {
        const stepElement = document.createElement('div');
        stepElement.className = `timeline-step ${step.completed ? 'completed' : 'pending'} ${step.active ? 'active' : ''}`;
        
        const iconClass = getTimelineIcon(step.status);
        
        stepElement.innerHTML = `
            <div class="step-icon">
                <i class="${step.completed ? 'fas fa-check' : iconClass}"></i>
            </div>
            <div class="step-content">
                <h4>${step.title}</h4>
                <p>${step.description}</p>
                <span class="step-time">${step.timestamp}</span>
            </div>
        `;
        
        timelineContainer.appendChild(stepElement);
    });
}

function getTimelineIcon(status) {
    const icons = {
        'confirmed': 'fas fa-clipboard-check',
        'payment': 'fas fa-credit-card',
        'processing': 'fas fa-box',
        'shipped': 'fas fa-truck',
        'delivered': 'fas fa-home'
    };
    return icons[status] || 'fas fa-circle';
}

function updateOrderItems(items) {
    const itemsList = document.getElementById('orderItemsList');
    itemsList.innerHTML = '';
    
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item';
        
        itemElement.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-details">
                <h4>${item.name}</h4>
                <p class="item-specs">${item.specs}</p>
                <div class="item-meta">
                    <span class="item-quantity">Qty: ${item.quantity}</span>
                    <span class="item-price">₹${item.price.toLocaleString()}</span>
                </div>
            </div>
            <div class="item-status">
                <span class="status-badge ${item.status}">${capitalizeFirst(item.status)}</span>
            </div>
        `;
        
        itemsList.appendChild(itemElement);
    });
}

function updateShippingInfo(shipping) {
    document.getElementById('shippingAddress').innerHTML = shipping.address;
    document.getElementById('deliveryMethod').textContent = shipping.method;
    document.getElementById('trackingNumber').textContent = shipping.trackingNumber;
    
    const deliveryText = shipping.actualDelivery 
        ? `Delivered on ${shipping.actualDelivery}`
        : shipping.estimatedDelivery;
    document.getElementById('estimatedDelivery').textContent = deliveryText;
}

function updateOrderSummary(summary) {
    document.getElementById('orderSubtotal').textContent = `₹${summary.subtotal.toLocaleString()}`;
    document.getElementById('orderShipping').textContent = `₹${summary.shipping.toLocaleString()}`;
    document.getElementById('orderTax').textContent = `₹${summary.tax.toLocaleString()}`;
    document.getElementById('orderTotal').textContent = `₹${summary.total.toLocaleString()}`;
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Support functions
function contactSupport(type) {
    const orderNumber = document.getElementById('orderTitle')?.textContent || 'Unknown Order';
    let message = '';
    
    switch (type) {
        case 'order-issue':
            message = `Hi IT Connect! I need help with ${orderNumber}. I'm experiencing an issue with my order.`;
            break;
        case 'delivery-update':
            message = `Hi IT Connect! I need to update delivery details for ${orderNumber}.`;
            break;
        case 'cancel-order':
            message = `Hi IT Connect! I would like to cancel ${orderNumber}. Please assist me with the cancellation process.`;
            break;
        case 'general-help':
            message = `Hi IT Connect! I have a question about ${orderNumber}. Please help me.`;
            break;
        default:
            message = `Hi IT Connect! I need assistance with ${orderNumber}.`;
    }
    
    // Send WhatsApp message
    const whatsappUrl = `https://wa.me/+918667018453?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function shareOrder() {
    const orderNumber = document.getElementById('orderTitle')?.textContent || 'Order';
    const orderUrl = `${window.location.origin}${window.location.pathname}?order=${orderNumber.replace('Order #', '')}`;
    
    if (navigator.share) {
        navigator.share({
            title: `${orderNumber} - IT Connect`,
            text: `Track my IT Connect order: ${orderNumber}`,
            url: orderUrl
        }).catch(console.error);
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(orderUrl).then(() => {
            showNotification('Order tracking link copied to clipboard!', 'success');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = orderUrl;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('Order tracking link copied to clipboard!', 'success');
        });
    }
}

// Auto-refresh order status (every 30 seconds)
let autoRefreshInterval;

function startAutoRefresh() {
    const orderNumber = new URLSearchParams(window.location.search).get('order');
    if (orderNumber && document.getElementById('orderDetailsContainer').style.display !== 'none') {
        autoRefreshInterval = setInterval(() => {
            // In a real application, this would make an API call to check for updates
            console.log('Auto-refreshing order status...');
        }, 30000);
    }
}

function stopAutoRefresh() {
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
        autoRefreshInterval = null;
    }
}

// Start auto-refresh when order is displayed
document.addEventListener('DOMContentLoaded', function() {
    // Start auto-refresh after initial load
    setTimeout(startAutoRefresh, 2000);
});

// Stop auto-refresh when page is hidden
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        stopAutoRefresh();
    } else {
        startAutoRefresh();
    }
});

// Notification for order updates
function checkForOrderUpdates() {
    // This would typically check with the server for updates
    // For demo purposes, we'll simulate an update notification
    const hasUpdates = Math.random() < 0.1; // 10% chance of update
    
    if (hasUpdates) {
        showNotification('Your order status has been updated!', 'info');
    }
}

// Export functions for global use
window.trackOrder = trackOrder;
window.contactSupport = contactSupport;
window.shareOrder = shareOrder;