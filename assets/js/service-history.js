// Service History Functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeServiceHistory();
});

// Sample service history data (in a real application, this would come from an API)
const serviceHistoryData = [
    {
        id: 'SRV-2024-001',
        date: '2024-03-15',
        device: 'Dell Inspiron 15',
        serviceType: 'repair',
        issue: 'Screen Replacement',
        description: 'Cracked LCD screen replacement with original Dell panel',
        technician: 'Rajesh Kumar',
        status: 'completed',
        cost: 4500,
        warranty: {
            duration: 6,
            expiryDate: '2024-09-15',
            active: true
        },
        parts: ['15.6" LCD Panel', 'Screen Bezel'],
        beforeImages: ['before1.jpg'],
        afterImages: ['after1.jpg'],
        notes: 'Screen replaced successfully. Customer advised to handle with care.',
        rating: 5,
        feedback: 'Excellent service! Screen looks perfect and technician was very professional.'
    },
    {
        id: 'SRV-2024-002',
        date: '2024-02-28',
        device: 'HP Pavilion',
        serviceType: 'upgrade',
        issue: 'RAM Upgrade',
        description: 'Upgraded from 8GB to 16GB DDR4 RAM for better performance',
        technician: 'Suresh Babu',
        status: 'completed',
        cost: 2800,
        warranty: {
            duration: 12,
            expiryDate: '2025-02-28',
            active: true
        },
        parts: ['16GB DDR4 RAM Module'],
        beforeImages: ['ram_before.jpg'],
        afterImages: ['ram_after.jpg'],
        notes: 'RAM upgrade completed. System performance significantly improved.',
        rating: 5,
        feedback: 'Great improvement in performance. Very satisfied with the service.'
    },
    {
        id: 'SRV-2024-003',
        date: '2024-01-10',
        device: 'Lenovo ThinkPad',
        serviceType: 'maintenance',
        issue: 'Virus Removal & OS Cleanup',
        description: 'Complete malware removal and system optimization',
        technician: 'Arun Kumar',
        status: 'completed',
        cost: 1200,
        warranty: {
            duration: 3,
            expiryDate: '2024-04-10',
            active: false
        },
        parts: [],
        beforeImages: [],
        afterImages: [],
        notes: 'System cleaned and optimized. Antivirus software installed.',
        rating: 4,
        feedback: 'Good service. System is running much faster now.'
    },
    {
        id: 'SRV-2023-015',
        date: '2023-12-05',
        device: 'ASUS VivoBook',
        serviceType: 'repair',
        issue: 'Keyboard Replacement',
        description: 'Replaced faulty keyboard with sticky keys',
        technician: 'Rajesh Kumar',
        status: 'completed',
        cost: 1800,
        warranty: {
            duration: 6,
            expiryDate: '2024-06-05',
            active: true
        },
        parts: ['Keyboard Assembly'],
        beforeImages: ['keyboard_before.jpg'],
        afterImages: ['keyboard_after.jpg'],
        notes: 'Keyboard replaced. All keys working properly.',
        rating: 5,
        feedback: 'Perfect replacement. Typing feels much better now.'
    },
    {
        id: 'SRV-2023-012',
        date: '2023-11-20',
        device: 'Dell Inspiron 15',
        serviceType: 'maintenance',
        issue: 'Overheating Fix',
        description: 'Cleaned cooling system and replaced thermal paste',
        technician: 'Suresh Babu',
        status: 'completed',
        cost: 1500,
        warranty: {
            duration: 3,
            expiryDate: '2024-02-20',
            active: false
        },
        parts: ['Thermal Paste'],
        beforeImages: ['cooling_before.jpg'],
        afterImages: ['cooling_after.jpg'],
        notes: 'Cooling system cleaned. Temperature reduced significantly.',
        rating: 4,
        feedback: 'Laptop runs much cooler now. Good service.'
    }
];

let filteredServices = [...serviceHistoryData];
let currentView = 'list';

function initializeServiceHistory() {
    updateServiceStats();
    renderServiceHistory();
    renderWarrantyCards();
    setupEventListeners();
}

function updateServiceStats() {
    const totalServices = serviceHistoryData.length;
    const currentYear = new Date().getFullYear();
    const thisYearServices = serviceHistoryData.filter(service => 
        new Date(service.date).getFullYear() === currentYear
    ).length;
    const activeWarranties = serviceHistoryData.filter(service => 
        service.warranty.active
    ).length;

    document.getElementById('totalServices').textContent = totalServices;
    document.getElementById('thisYear').textContent = thisYearServices;
    document.getElementById('activeWarranties').textContent = activeWarranties;
}

function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('serviceSearch');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }

    // Filter functionality
    const filters = ['yearFilter', 'statusFilter', 'serviceTypeFilter'];
    filters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', applyFilters);
        }
    });

    // View toggle
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.dataset.view;
            switchView(view);
        });
    });
}

function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    applyFilters();
}

function applyFilters() {
    const searchTerm = document.getElementById('serviceSearch').value.toLowerCase();
    const yearFilter = document.getElementById('yearFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    const serviceTypeFilter = document.getElementById('serviceTypeFilter').value;

    filteredServices = serviceHistoryData.filter(service => {
        // Search filter
        const matchesSearch = !searchTerm || 
            service.device.toLowerCase().includes(searchTerm) ||
            service.issue.toLowerCase().includes(searchTerm) ||
            service.description.toLowerCase().includes(searchTerm) ||
            service.technician.toLowerCase().includes(searchTerm);

        // Year filter
        const serviceYear = new Date(service.date).getFullYear().toString();
        const matchesYear = !yearFilter || serviceYear === yearFilter;

        // Status filter
        let matchesStatus = true;
        if (statusFilter === 'warranty') {
            matchesStatus = service.warranty.active;
        } else if (statusFilter === 'expired') {
            matchesStatus = !service.warranty.active;
        } else if (statusFilter === 'completed') {
            matchesStatus = service.status === 'completed';
        }

        // Service type filter
        const matchesServiceType = !serviceTypeFilter || service.serviceType === serviceTypeFilter;

        return matchesSearch && matchesYear && matchesStatus && matchesServiceType;
    });

    renderServiceHistory();
}

function clearFilters() {
    document.getElementById('serviceSearch').value = '';
    document.getElementById('yearFilter').value = '';
    document.getElementById('statusFilter').value = '';
    document.getElementById('serviceTypeFilter').value = '';
    
    filteredServices = [...serviceHistoryData];
    renderServiceHistory();
}

function switchView(view) {
    currentView = view;
    
    // Update button states
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-view="${view}"]`).classList.add('active');
    
    // Show/hide views
    document.getElementById('listView').classList.toggle('active', view === 'list');
    document.getElementById('timelineView').classList.toggle('active', view === 'timeline');
    
    renderServiceHistory();
}

function renderServiceHistory() {
    if (filteredServices.length === 0) {
        document.getElementById('noServices').style.display = 'block';
        document.getElementById('listView').style.display = 'none';
        document.getElementById('timelineView').style.display = 'none';
        return;
    }

    document.getElementById('noServices').style.display = 'none';
    document.getElementById('listView').style.display = currentView === 'list' ? 'block' : 'none';
    document.getElementById('timelineView').style.display = currentView === 'timeline' ? 'block' : 'none';

    if (currentView === 'list') {
        renderListView();
    } else {
        renderTimelineView();
    }
}

function renderListView() {
    const container = document.getElementById('serviceHistoryList');
    container.innerHTML = '';

    filteredServices.forEach(service => {
        const serviceCard = createServiceCard(service);
        container.appendChild(serviceCard);
    });
}

function renderTimelineView() {
    const container = document.getElementById('serviceTimeline');
    container.innerHTML = '';

    // Group services by year
    const servicesByYear = {};
    filteredServices.forEach(service => {
        const year = new Date(service.date).getFullYear();
        if (!servicesByYear[year]) {
            servicesByYear[year] = [];
        }
        servicesByYear[year].push(service);
    });

    // Sort years in descending order
    const sortedYears = Object.keys(servicesByYear).sort((a, b) => b - a);

    sortedYears.forEach(year => {
        const yearSection = document.createElement('div');
        yearSection.className = 'timeline-year-section';
        
        const yearHeader = document.createElement('div');
        yearHeader.className = 'timeline-year-header';
        yearHeader.innerHTML = `
            <h3>${year}</h3>
            <span class="year-count">${servicesByYear[year].length} services</span>
        `;
        yearSection.appendChild(yearHeader);

        const yearServices = document.createElement('div');
        yearServices.className = 'timeline-year-services';

        servicesByYear[year]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .forEach(service => {
                const timelineItem = createTimelineItem(service);
                yearServices.appendChild(timelineItem);
            });

        yearSection.appendChild(yearServices);
        container.appendChild(yearSection);
    });
}

function createServiceCard(service) {
    const card = document.createElement('div');
    card.className = 'service-history-card';
    card.onclick = () => openServiceModal(service);

    const statusClass = getStatusClass(service);
    const warrantyStatus = service.warranty.active ? 'Under Warranty' : 'Warranty Expired';
    const warrantyClass = service.warranty.active ? 'warranty-active' : 'warranty-expired';

    card.innerHTML = `
        <div class="service-card-header">
            <div class="service-info">
                <h3>${service.issue}</h3>
                <p class="service-device">${service.device}</p>
                <p class="service-date">${formatDate(service.date)}</p>
            </div>
            <div class="service-status">
                <span class="status-badge ${statusClass}">${capitalizeFirst(service.status)}</span>
                <span class="warranty-badge ${warrantyClass}">${warrantyStatus}</span>
            </div>
        </div>
        
        <div class="service-card-body">
            <p class="service-description">${service.description}</p>
            <div class="service-meta">
                <div class="service-meta-item">
                    <i class="fas fa-user"></i>
                    <span>Technician: ${service.technician}</span>
                </div>
                <div class="service-meta-item">
                    <i class="fas fa-rupee-sign"></i>
                    <span>Cost: ₹${service.cost.toLocaleString()}</span>
                </div>
                ${service.warranty.active ? `
                <div class="service-meta-item">
                    <i class="fas fa-shield-alt"></i>
                    <span>Warranty until: ${formatDate(service.warranty.expiryDate)}</span>
                </div>
                ` : ''}
            </div>
        </div>
        
        <div class="service-card-footer">
            <div class="service-rating">
                ${generateStarRating(service.rating)}
                <span class="rating-text">${service.rating}/5</span>
            </div>
            <div class="service-actions">
                <button class="btn btn-outline btn-sm" onclick="event.stopPropagation(); downloadServiceReport('${service.id}')">
                    <i class="fas fa-download"></i> Report
                </button>
                <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); bookFollowUpService('${service.id}')">
                    <i class="fas fa-calendar-plus"></i> Follow-up
                </button>
            </div>
        </div>
    `;

    return card;
}

function createTimelineItem(service) {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.onclick = () => openServiceModal(service);

    const statusClass = getStatusClass(service);
    const serviceTypeIcon = getServiceTypeIcon(service.serviceType);

    item.innerHTML = `
        <div class="timeline-marker">
            <div class="timeline-icon ${service.serviceType}">
                <i class="${serviceTypeIcon}"></i>
            </div>
        </div>
        <div class="timeline-content">
            <div class="timeline-header">
                <h4>${service.issue}</h4>
                <span class="timeline-date">${formatDate(service.date)}</span>
            </div>
            <div class="timeline-body">
                <p class="timeline-device">${service.device}</p>
                <p class="timeline-description">${service.description}</p>
                <div class="timeline-meta">
                    <span class="timeline-technician">
                        <i class="fas fa-user"></i> ${service.technician}
                    </span>
                    <span class="timeline-cost">
                        <i class="fas fa-rupee-sign"></i> ₹${service.cost.toLocaleString()}
                    </span>
                    <span class="status-badge ${statusClass}">${capitalizeFirst(service.status)}</span>
                </div>
            </div>
        </div>
    `;

    return item;
}

function renderWarrantyCards() {
    const container = document.getElementById('warrantyCards');
    const activeWarranties = serviceHistoryData.filter(service => service.warranty.active);

    if (activeWarranties.length === 0) {
        container.innerHTML = `
            <div class="no-warranties">
                <i class="fas fa-shield-alt"></i>
                <h3>No Active Warranties</h3>
                <p>You don't have any active warranties at the moment.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = '';
    activeWarranties.forEach(service => {
        const warrantyCard = createWarrantyCard(service);
        container.appendChild(warrantyCard);
    });
}

function createWarrantyCard(service) {
    const card = document.createElement('div');
    card.className = 'warranty-card';

    const daysLeft = Math.ceil((new Date(service.warranty.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
    const isExpiringSoon = daysLeft <= 30;

    card.innerHTML = `
        <div class="warranty-header">
            <div class="warranty-info">
                <h4>${service.issue}</h4>
                <p>${service.device}</p>
            </div>
            <div class="warranty-status ${isExpiringSoon ? 'expiring-soon' : 'active'}">
                <i class="fas fa-shield-alt"></i>
                <span>${isExpiringSoon ? 'Expiring Soon' : 'Active'}</span>
            </div>
        </div>
        <div class="warranty-details">
            <div class="warranty-item">
                <strong>Service Date:</strong>
                <span>${formatDate(service.date)}</span>
            </div>
            <div class="warranty-item">
                <strong>Warranty Period:</strong>
                <span>${service.warranty.duration} months</span>
            </div>
            <div class="warranty-item">
                <strong>Expires On:</strong>
                <span>${formatDate(service.warranty.expiryDate)}</span>
            </div>
            <div class="warranty-item">
                <strong>Days Remaining:</strong>
                <span class="${isExpiringSoon ? 'text-warning' : 'text-success'}">${daysLeft} days</span>
            </div>
        </div>
        <div class="warranty-actions">
            <button class="btn btn-outline btn-sm" onclick="claimWarranty('${service.id}')">
                <i class="fas fa-file-contract"></i> Claim Warranty
            </button>
            <button class="btn btn-secondary btn-sm" onclick="extendWarranty('${service.id}')">
                <i class="fas fa-plus"></i> Extend
            </button>
        </div>
    `;

    return card;
}

function openServiceModal(service) {
    const modal = document.getElementById('serviceModal');
    const title = document.getElementById('modalServiceTitle');
    const body = document.getElementById('modalServiceBody');

    title.textContent = `${service.issue} - ${service.device}`;
    
    body.innerHTML = `
        <div class="modal-service-details">
            <div class="modal-section">
                <h4><i class="fas fa-info-circle"></i> Service Information</h4>
                <div class="detail-grid">
                    <div class="detail-item">
                        <strong>Service ID:</strong>
                        <span>${service.id}</span>
                    </div>
                    <div class="detail-item">
                        <strong>Date:</strong>
                        <span>${formatDate(service.date)}</span>
                    </div>
                    <div class="detail-item">
                        <strong>Device:</strong>
                        <span>${service.device}</span>
                    </div>
                    <div class="detail-item">
                        <strong>Service Type:</strong>
                        <span>${capitalizeFirst(service.serviceType)}</span>
                    </div>
                    <div class="detail-item">
                        <strong>Technician:</strong>
                        <span>${service.technician}</span>
                    </div>
                    <div class="detail-item">
                        <strong>Cost:</strong>
                        <span>₹${service.cost.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            <div class="modal-section">
                <h4><i class="fas fa-clipboard-list"></i> Description</h4>
                <p>${service.description}</p>
            </div>

            ${service.parts.length > 0 ? `
            <div class="modal-section">
                <h4><i class="fas fa-cogs"></i> Parts Used</h4>
                <ul class="parts-list">
                    ${service.parts.map(part => `<li>${part}</li>`).join('')}
                </ul>
            </div>
            ` : ''}

            <div class="modal-section">
                <h4><i class="fas fa-shield-alt"></i> Warranty Information</h4>
                <div class="warranty-info-modal">
                    <div class="warranty-status-modal ${service.warranty.active ? 'active' : 'expired'}">
                        <i class="fas fa-shield-alt"></i>
                        <span>${service.warranty.active ? 'Active Warranty' : 'Warranty Expired'}</span>
                    </div>
                    <div class="warranty-details-modal">
                        <p><strong>Duration:</strong> ${service.warranty.duration} months</p>
                        <p><strong>Expires:</strong> ${formatDate(service.warranty.expiryDate)}</p>
                        ${service.warranty.active ? `
                        <p><strong>Days Remaining:</strong> ${Math.ceil((new Date(service.warranty.expiryDate) - new Date()) / (1000 * 60 * 60 * 24))} days</p>
                        ` : ''}
                    </div>
                </div>
            </div>

            ${service.notes ? `
            <div class="modal-section">
                <h4><i class="fas fa-sticky-note"></i> Technician Notes</h4>
                <p class="technician-notes">${service.notes}</p>
            </div>
            ` : ''}

            ${service.feedback ? `
            <div class="modal-section">
                <h4><i class="fas fa-star"></i> Your Feedback</h4>
                <div class="feedback-section">
                    <div class="rating-display">
                        ${generateStarRating(service.rating)}
                        <span class="rating-text">${service.rating}/5</span>
                    </div>
                    <p class="feedback-text">${service.feedback}</p>
                </div>
            </div>
            ` : ''}
        </div>
    `;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// Utility functions
function getStatusClass(service) {
    const statusClasses = {
        'completed': 'completed',
        'in-progress': 'in-progress',
        'pending': 'pending',
        'cancelled': 'cancelled'
    };
    return statusClasses[service.status] || 'pending';
}

function getServiceTypeIcon(serviceType) {
    const icons = {
        'repair': 'fas fa-wrench',
        'maintenance': 'fas fa-broom',
        'upgrade': 'fas fa-arrow-up',
        'diagnostic': 'fas fa-search'
    };
    return icons[serviceType] || 'fas fa-tools';
}

function generateStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Action functions
function downloadServiceReport(serviceId) {
    const service = serviceHistoryData.find(s => s.id === serviceId);
    if (service) {
        showNotification(`Downloading service report for ${service.issue}...`, 'info');
        // In a real application, this would generate and download a PDF report
        setTimeout(() => {
            showNotification('Service report downloaded successfully!', 'success');
        }, 2000);
    }
}

function bookFollowUpService(serviceId) {
    const service = serviceHistoryData.find(s => s.id === serviceId);
    if (service) {
        const message = `Hi IT Connect! I would like to book a follow-up service for my ${service.device}. Previous service: ${service.issue} (${service.id})`;
        const whatsappUrl = `https://wa.me/+918667018453?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }
}

function claimWarranty(serviceId) {
    const service = serviceHistoryData.find(s => s.id === serviceId);
    if (service) {
        const message = `Hi IT Connect! I need to claim warranty for my ${service.device}. Service ID: ${service.id}, Issue: ${service.issue}. Please assist me with the warranty claim process.`;
        const whatsappUrl = `https://wa.me/+918667018453?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }
}

function extendWarranty(serviceId) {
    const service = serviceHistoryData.find(s => s.id === serviceId);
    if (service) {
        const message = `Hi IT Connect! I would like to extend the warranty for my ${service.device}. Service ID: ${service.id}. Please provide information about warranty extension options.`;
        const whatsappUrl = `https://wa.me/+918667018453?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }
}

function exportHistory() {
    showNotification('Exporting service history...', 'info');
    // In a real application, this would generate and download a CSV/PDF file
    setTimeout(() => {
        showNotification('Service history exported successfully!', 'success');
    }, 2000);
}

function learnMore(serviceType) {
    const messages = {
        'cleaning': 'Regular laptop cleaning removes dust and debris that can cause overheating and performance issues. Our cleaning service includes keyboard cleaning, screen cleaning, internal dust removal, and fan cleaning.',
        'thermal-paste': 'Thermal paste helps transfer heat from your CPU to the cooling system. Over time, it dries out and becomes less effective. Replacing it can significantly improve cooling performance.',
        'ssd-upgrade': 'Upgrading to an SSD (Solid State Drive) can dramatically improve your laptop\'s performance with faster boot times, quicker file access, and better overall responsiveness.'
    };
    
    showNotification(messages[serviceType] || 'Learn more about our services by contacting us!', 'info');
}

function bookService(serviceType) {
    const serviceNames = {
        'cleaning': 'Laptop Cleaning Service',
        'thermal-paste': 'Thermal Paste Replacement',
        'ssd-upgrade': 'SSD Upgrade Service'
    };
    
    const serviceName = serviceNames[serviceType] || 'Service';
    const message = `Hi IT Connect! I'm interested in booking ${serviceName} for my laptop. Please provide more information and schedule a visit.`;
    const whatsappUrl = `https://wa.me/+918667018453?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('serviceModal');
    if (event.target === modal) {
        closeServiceModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeServiceModal();
    }
});

// Export functions for global use
window.clearFilters = clearFilters;
window.exportHistory = exportHistory;
window.downloadServiceReport = downloadServiceReport;
window.bookFollowUpService = bookFollowUpService;
window.closeServiceModal = closeServiceModal;
window.claimWarranty = claimWarranty;
window.extendWarranty = extendWarranty;
window.learnMore = learnMore;
window.bookService = bookService;