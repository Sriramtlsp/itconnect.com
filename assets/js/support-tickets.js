// Support Tickets JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeSupportTickets();
});

// Sample support tickets data
const supportTicketsData = [
    {
        id: 'TKT-2024-001',
        subject: 'Laptop screen flickering issue',
        description: 'My Dell Inspiron 15 screen has been flickering intermittently for the past week. The issue occurs mainly when opening applications or during video playback.',
        status: 'in-progress',
        priority: 'high',
        category: 'technical',
        device: 'Dell Inspiron 15',
        createdDate: '2024-01-15',
        lastUpdate: '2024-01-18',
        assignedTo: 'Tech Support Team',
        responses: [
            {
                id: 1,
                author: 'Support Agent',
                message: 'Thank you for contacting us. We have received your ticket and our technical team is reviewing the issue.',
                timestamp: '2024-01-15 10:30 AM',
                type: 'agent'
            },
            {
                id: 2,
                author: 'Tech Specialist',
                message: 'Based on your description, this could be a display driver issue or hardware problem. Please try updating your graphics drivers first.',
                timestamp: '2024-01-16 02:15 PM',
                type: 'agent'
            },
            {
                id: 3,
                author: 'Customer',
                message: 'I updated the drivers but the issue persists. The flickering is getting worse.',
                timestamp: '2024-01-17 09:45 AM',
                type: 'customer'
            },
            {
                id: 4,
                author: 'Tech Specialist',
                message: 'We will schedule a home visit for hardware diagnosis. Our technician will contact you within 24 hours.',
                timestamp: '2024-01-18 11:20 AM',
                type: 'agent'
            }
        ],
        attachments: ['screenshot_flickering.jpg']
    },
    {
        id: 'TKT-2024-002',
        subject: 'Billing inquiry for service charge',
        description: 'I have a question about the service charge on my recent invoice. The amount seems higher than the initial quote.',
        status: 'waiting',
        priority: 'medium',
        category: 'billing',
        device: 'HP Pavilion',
        createdDate: '2024-01-20',
        lastUpdate: '2024-01-21',
        assignedTo: 'Billing Department',
        responses: [
            {
                id: 1,
                author: 'Billing Support',
                message: 'We have received your billing inquiry. Our billing team is reviewing your invoice and will respond within 24 hours.',
                timestamp: '2024-01-20 03:45 PM',
                type: 'agent'
            },
            {
                id: 2,
                author: 'Billing Manager',
                message: 'The additional charge was for replacement parts that were needed during the repair. We have sent you a detailed breakdown via email.',
                timestamp: '2024-01-21 10:30 AM',
                type: 'agent'
            }
        ],
        attachments: ['invoice_breakdown.pdf']
    },
    {
        id: 'TKT-2024-003',
        subject: 'Keyboard keys not working properly',
        description: 'Several keys on my laptop keyboard are not responding. Keys affected: A, S, D, and spacebar.',
        status: 'resolved',
        priority: 'medium',
        category: 'technical',
        device: 'Lenovo ThinkPad',
        createdDate: '2024-01-10',
        lastUpdate: '2024-01-14',
        assignedTo: 'Hardware Team',
        responses: [
            {
                id: 1,
                author: 'Support Agent',
                message: 'Thank you for reporting this issue. This appears to be a keyboard hardware problem.',
                timestamp: '2024-01-10 11:15 AM',
                type: 'agent'
            },
            {
                id: 2,
                author: 'Technician',
                message: 'We have scheduled a home visit for keyboard replacement. Our technician will arrive tomorrow between 2-4 PM.',
                timestamp: '2024-01-11 09:30 AM',
                type: 'agent'
            },
            {
                id: 3,
                author: 'Technician',
                message: 'Keyboard replacement completed successfully. All keys are now functioning properly. Issue resolved.',
                timestamp: '2024-01-12 03:45 PM',
                type: 'agent'
            },
            {
                id: 4,
                author: 'Customer',
                message: 'Thank you! The keyboard is working perfectly now. Great service!',
                timestamp: '2024-01-14 08:20 AM',
                type: 'customer'
            }
        ],
        attachments: []
    },
    {
        id: 'TKT-2024-004',
        subject: 'Laptop overheating during gaming',
        description: 'My gaming laptop gets extremely hot during gameplay and sometimes shuts down automatically.',
        status: 'open',
        priority: 'high',
        category: 'technical',
        device: 'ASUS ROG Strix',
        createdDate: '2024-01-22',
        lastUpdate: '2024-01-22',
        assignedTo: 'Technical Team',
        responses: [
            {
                id: 1,
                author: 'Support Agent',
                message: 'We have received your ticket regarding overheating issues. Our technical team will review this shortly.',
                timestamp: '2024-01-22 04:20 PM',
                type: 'agent'
            }
        ],
        attachments: ['temperature_readings.png']
    },
    {
        id: 'TKT-2024-005',
        subject: 'Warranty claim for battery replacement',
        description: 'My laptop battery is not holding charge properly. The laptop is still under warranty.',
        status: 'closed',
        priority: 'medium',
        category: 'warranty',
        device: 'MacBook Pro',
        createdDate: '2024-01-05',
        lastUpdate: '2024-01-12',
        assignedTo: 'Warranty Team',
        responses: [
            {
                id: 1,
                author: 'Warranty Specialist',
                message: 'We have verified your warranty status. Your device is eligible for battery replacement.',
                timestamp: '2024-01-05 02:30 PM',
                type: 'agent'
            },
            {
                id: 2,
                author: 'Technician',
                message: 'Battery replacement completed under warranty. No charges applied.',
                timestamp: '2024-01-08 11:45 AM',
                type: 'agent'
            },
            {
                id: 3,
                author: 'Customer',
                message: 'Excellent service! Battery life is back to normal. Thank you!',
                timestamp: '2024-01-12 09:15 AM',
                type: 'customer'
            }
        ],
        attachments: ['warranty_certificate.pdf']
    },
    {
        id: 'TKT-2024-006',
        subject: 'Software installation assistance needed',
        description: 'I need help installing professional software on my laptop for work purposes.',
        status: 'resolved',
        priority: 'low',
        category: 'service',
        device: 'Dell XPS 13',
        createdDate: '2024-01-08',
        lastUpdate: '2024-01-10',
        assignedTo: 'Software Team',
        responses: [
            {
                id: 1,
                author: 'Software Specialist',
                message: 'We can help you with software installation. Please provide the list of software you need installed.',
                timestamp: '2024-01-08 01:20 PM',
                type: 'agent'
            },
            {
                id: 2,
                author: 'Customer',
                message: 'I need Adobe Creative Suite, AutoCAD, and Microsoft Office Professional installed.',
                timestamp: '2024-01-08 03:45 PM',
                type: 'customer'
            },
            {
                id: 3,
                author: 'Software Specialist',
                message: 'All software has been installed and configured successfully. Remote session completed.',
                timestamp: '2024-01-10 10:30 AM',
                type: 'agent'
            }
        ],
        attachments: []
    },
    {
        id: 'TKT-2024-007',
        subject: 'Feedback on recent service experience',
        description: 'I wanted to provide feedback on the excellent service I received for my laptop repair.',
        status: 'closed',
        priority: 'low',
        category: 'feedback',
        device: 'HP Envy',
        createdDate: '2024-01-18',
        lastUpdate: '2024-01-19',
        assignedTo: 'Customer Service',
        responses: [
            {
                id: 1,
                author: 'Customer Service',
                message: 'Thank you for taking the time to provide feedback. We appreciate your kind words!',
                timestamp: '2024-01-18 04:15 PM',
                type: 'agent'
            },
            {
                id: 2,
                author: 'Manager',
                message: 'Your feedback has been shared with our technical team. We are glad you had a positive experience!',
                timestamp: '2024-01-19 09:30 AM',
                type: 'agent'
            }
        ],
        attachments: []
    },
    {
        id: 'TKT-2024-008',
        subject: 'Request for pickup service',
        description: 'I need to schedule a pickup for my laptop that requires motherboard repair.',
        status: 'resolved',
        priority: 'medium',
        category: 'service',
        device: 'Acer Aspire',
        createdDate: '2024-01-12',
        lastUpdate: '2024-01-16',
        assignedTo: 'Logistics Team',
        responses: [
            {
                id: 1,
                author: 'Logistics Coordinator',
                message: 'We have scheduled a pickup for tomorrow between 10 AM - 12 PM. Please keep your laptop ready.',
                timestamp: '2024-01-12 02:45 PM',
                type: 'agent'
            },
            {
                id: 2,
                author: 'Pickup Agent',
                message: 'Laptop picked up successfully. Repair work will begin shortly.',
                timestamp: '2024-01-13 11:20 AM',
                type: 'agent'
            },
            {
                id: 3,
                author: 'Technician',
                message: 'Motherboard repair completed. Laptop is ready for delivery.',
                timestamp: '2024-01-16 03:30 PM',
                type: 'agent'
            }
        ],
        attachments: ['pickup_receipt.pdf']
    }
];

let filteredTickets = [...supportTicketsData];
let currentView = 'cards';

// Initialize support tickets functionality
function initializeSupportTickets() {
    updateTicketStats();
    renderTickets();
    setupEventListeners();
    setupViewToggle();
    setupFilters();
}

// Update ticket statistics
function updateTicketStats() {
    const totalTickets = supportTicketsData.length;
    const openTickets = supportTicketsData.filter(ticket => 
        ticket.status === 'open' || ticket.status === 'in-progress' || ticket.status === 'waiting'
    ).length;
    const resolvedTickets = supportTicketsData.filter(ticket => 
        ticket.status === 'resolved' || ticket.status === 'closed'
    ).length;

    document.getElementById('totalTickets').textContent = totalTickets;
    document.getElementById('openTickets').textContent = openTickets;
    document.getElementById('resolvedTickets').textContent = resolvedTickets;
}

// Setup event listeners
function setupEventListeners() {
    // Create ticket form
    const newTicketForm = document.getElementById('newTicketForm');
    if (newTicketForm) {
        newTicketForm.addEventListener('submit', handleCreateTicket);
    }

    // File upload
    const fileInput = document.getElementById('ticketAttachment');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }

    // Search functionality
    const searchInput = document.getElementById('ticketSearch');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
}

// Setup view toggle
function setupViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const view = this.dataset.view;
            switchView(view);
        });
    });
}

// Setup filters
function setupFilters() {
    const filters = ['statusFilter', 'priorityFilter', 'categoryFilter'];
    filters.forEach(filterId => {
        const filterElement = document.getElementById(filterId);
        if (filterElement) {
            filterElement.addEventListener('change', applyFilters);
        }
    });
}

// Toggle create ticket form
function toggleCreateTicket() {
    const form = document.getElementById('createTicketForm');
    const isVisible = form.style.display !== 'none';
    
    if (isVisible) {
        form.style.display = 'none';
        document.getElementById('newTicketForm').reset();
        document.getElementById('uploadedFiles').innerHTML = '';
    } else {
        form.style.display = 'block';
        document.getElementById('ticketSubject').focus();
    }
}

// Handle create ticket form submission
function handleCreateTicket(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const ticketData = {
        id: `TKT-2024-${String(supportTicketsData.length + 1).padStart(3, '0')}`,
        subject: formData.get('subject'),
        description: formData.get('description'),
        priority: formData.get('priority'),
        category: formData.get('category'),
        device: formData.get('device') || 'Not specified',
        status: 'open',
        createdDate: new Date().toISOString().split('T')[0],
        lastUpdate: new Date().toISOString().split('T')[0],
        assignedTo: 'Support Team',
        responses: [
            {
                id: 1,
                author: 'Support Agent',
                message: 'Thank you for contacting us. We have received your ticket and will respond shortly.',
                timestamp: new Date().toLocaleString(),
                type: 'agent'
            }
        ],
        attachments: []
    };

    // Add ticket to data
    supportTicketsData.unshift(ticketData);
    filteredTickets = [...supportTicketsData];
    
    // Update UI
    updateTicketStats();
    renderTickets();
    toggleCreateTicket();
    
    // Show success notification
    showNotification('Ticket created successfully! We will respond to your inquiry shortly.', 'success');
    
    // Send WhatsApp notification
    setTimeout(() => {
        const whatsappMessage = `New support ticket created: ${ticketData.subject}. Ticket ID: ${ticketData.id}`;
        const whatsappUrl = `https://wa.me/+918667018453?text=${encodeURIComponent(whatsappMessage)}`;
        
        if (confirm('Would you like to receive updates via WhatsApp?')) {
            window.open(whatsappUrl, '_blank');
        }
    }, 1000);
}

// Handle file upload
function handleFileUpload(e) {
    const files = Array.from(e.target.files);
    const uploadedFilesContainer = document.getElementById('uploadedFiles');
    
    uploadedFilesContainer.innerHTML = '';
    
    files.forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.className = 'uploaded-file-item';
        fileItem.innerHTML = `
            <i class="fas fa-file"></i>
            <span>${file.name}</span>
            <span class="file-size">(${formatFileSize(file.size)})</span>
            <button type="button" onclick="removeFile(this)" class="remove-file">
                <i class="fas fa-times"></i>
            </button>
        `;
        uploadedFilesContainer.appendChild(fileItem);
    });
}

// Remove uploaded file
function removeFile(button) {
    button.parentElement.remove();
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Switch between card and table view
function switchView(view) {
    currentView = view;
    
    // Update active button
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-view="${view}"]`).classList.add('active');
    
    // Show/hide views
    const cardsView = document.getElementById('cardsView');
    const tableView = document.getElementById('tableView');
    
    if (view === 'cards') {
        cardsView.classList.add('active');
        tableView.classList.remove('active');
    } else {
        cardsView.classList.remove('active');
        tableView.classList.add('active');
    }
    
    renderTickets();
}

// Render tickets based on current view
function renderTickets() {
    if (currentView === 'cards') {
        renderTicketCards();
    } else {
        renderTicketTable();
    }
    
    // Show/hide no tickets message
    const noTicketsElement = document.getElementById('noTickets');
    if (filteredTickets.length === 0) {
        noTicketsElement.style.display = 'block';
    } else {
        noTicketsElement.style.display = 'none';
    }
}

// Render ticket cards
function renderTicketCards() {
    const ticketsList = document.getElementById('ticketsList');
    
    if (filteredTickets.length === 0) {
        ticketsList.innerHTML = '';
        return;
    }
    
    ticketsList.innerHTML = filteredTickets.map(ticket => `
        <div class="ticket-card" data-ticket-id="${ticket.id}">
            <div class="ticket-card-header">
                <div class="ticket-id">${ticket.id}</div>
                <div class="ticket-status status-${ticket.status}">${formatStatus(ticket.status)}</div>
            </div>
            
            <div class="ticket-card-content">
                <h3 class="ticket-subject">${ticket.subject}</h3>
                <p class="ticket-description">${truncateText(ticket.description, 120)}</p>
                
                <div class="ticket-meta">
                    <div class="ticket-priority priority-${ticket.priority}">
                        <i class="fas fa-flag"></i>
                        ${formatPriority(ticket.priority)}
                    </div>
                    <div class="ticket-category">
                        <i class="fas fa-tag"></i>
                        ${formatCategory(ticket.category)}
                    </div>
                    <div class="ticket-device">
                        <i class="fas fa-laptop"></i>
                        ${ticket.device}
                    </div>
                </div>
                
                <div class="ticket-dates">
                    <div class="ticket-created">
                        <i class="fas fa-calendar-plus"></i>
                        Created: ${formatDate(ticket.createdDate)}
                    </div>
                    <div class="ticket-updated">
                        <i class="fas fa-clock"></i>
                        Updated: ${formatDate(ticket.lastUpdate)}
                    </div>
                </div>
                
                <div class="ticket-responses-count">
                    <i class="fas fa-comments"></i>
                    ${ticket.responses.length} response${ticket.responses.length !== 1 ? 's' : ''}
                </div>
            </div>
            
            <div class="ticket-card-actions">
                <button class="btn btn-outline btn-sm" onclick="viewTicketDetails('${ticket.id}')">
                    <i class="fas fa-eye"></i> View Details
                </button>
                <button class="btn btn-primary btn-sm" onclick="addTicketReply('${ticket.id}')">
                    <i class="fas fa-reply"></i> Reply
                </button>
                <button class="btn btn-secondary btn-sm" onclick="contactSupport('${ticket.id}')">
                    <i class="fab fa-whatsapp"></i> WhatsApp
                </button>
            </div>
        </div>
    `).join('');
}

// Render ticket table
function renderTicketTable() {
    const tableBody = document.getElementById('ticketsTableBody');
    
    if (filteredTickets.length === 0) {
        tableBody.innerHTML = '';
        return;
    }
    
    tableBody.innerHTML = filteredTickets.map(ticket => `
        <tr data-ticket-id="${ticket.id}">
            <td class="ticket-id-cell">${ticket.id}</td>
            <td class="ticket-subject-cell">
                <div class="subject-content">
                    <span class="subject-text">${ticket.subject}</span>
                    <small class="device-text">${ticket.device}</small>
                </div>
            </td>
            <td class="ticket-status-cell">
                <span class="status-badge status-${ticket.status}">${formatStatus(ticket.status)}</span>
            </td>
            <td class="ticket-priority-cell">
                <span class="priority-badge priority-${ticket.priority}">${formatPriority(ticket.priority)}</span>
            </td>
            <td class="ticket-category-cell">${formatCategory(ticket.category)}</td>
            <td class="ticket-date-cell">${formatDate(ticket.createdDate)}</td>
            <td class="ticket-date-cell">${formatDate(ticket.lastUpdate)}</td>
            <td class="ticket-actions-cell">
                <div class="table-actions">
                    <button class="btn-icon" onclick="viewTicketDetails('${ticket.id}')" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon" onclick="addTicketReply('${ticket.id}')" title="Reply">
                        <i class="fas fa-reply"></i>
                    </button>
                    <button class="btn-icon" onclick="contactSupport('${ticket.id}')" title="WhatsApp">
                        <i class="fab fa-whatsapp"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Apply filters
function applyFilters() {
    const statusFilter = document.getElementById('statusFilter').value;
    const priorityFilter = document.getElementById('priorityFilter').value;
    const categoryFilter = document.getElementById('categoryFilter').value;
    const searchTerm = document.getElementById('ticketSearch').value.toLowerCase();
    
    filteredTickets = supportTicketsData.filter(ticket => {
        const matchesStatus = !statusFilter || ticket.status === statusFilter;
        const matchesPriority = !priorityFilter || ticket.priority === priorityFilter;
        const matchesCategory = !categoryFilter || ticket.category === categoryFilter;
        const matchesSearch = !searchTerm || 
            ticket.subject.toLowerCase().includes(searchTerm) ||
            ticket.description.toLowerCase().includes(searchTerm) ||
            ticket.id.toLowerCase().includes(searchTerm) ||
            ticket.device.toLowerCase().includes(searchTerm);
        
        return matchesStatus && matchesPriority && matchesCategory && matchesSearch;
    });
    
    renderTickets();
}

// Handle search
function handleSearch() {
    applyFilters();
}

// Clear all filters
function clearTicketFilters() {
    document.getElementById('statusFilter').value = '';
    document.getElementById('priorityFilter').value = '';
    document.getElementById('categoryFilter').value = '';
    document.getElementById('ticketSearch').value = '';
    
    filteredTickets = [...supportTicketsData];
    renderTickets();
}

// View ticket details
function viewTicketDetails(ticketId) {
    const ticket = supportTicketsData.find(t => t.id === ticketId);
    if (!ticket) return;
    
    const modal = document.getElementById('ticketModal');
    const modalTitle = document.getElementById('modalTicketTitle');
    const modalBody = document.getElementById('modalTicketBody');
    
    modalTitle.textContent = `${ticket.id} - ${ticket.subject}`;
    
    modalBody.innerHTML = `
        <div class="ticket-details">
            <div class="ticket-info-grid">
                <div class="info-item">
                    <label>Status:</label>
                    <span class="status-badge status-${ticket.status}">${formatStatus(ticket.status)}</span>
                </div>
                <div class="info-item">
                    <label>Priority:</label>
                    <span class="priority-badge priority-${ticket.priority}">${formatPriority(ticket.priority)}</span>
                </div>
                <div class="info-item">
                    <label>Category:</label>
                    <span>${formatCategory(ticket.category)}</span>
                </div>
                <div class="info-item">
                    <label>Device:</label>
                    <span>${ticket.device}</span>
                </div>
                <div class="info-item">
                    <label>Created:</label>
                    <span>${formatDate(ticket.createdDate)}</span>
                </div>
                <div class="info-item">
                    <label>Last Update:</label>
                    <span>${formatDate(ticket.lastUpdate)}</span>
                </div>
                <div class="info-item">
                    <label>Assigned To:</label>
                    <span>${ticket.assignedTo}</span>
                </div>
            </div>
            
            <div class="ticket-description-section">
                <h4>Description</h4>
                <p>${ticket.description}</p>
            </div>
            
            ${ticket.attachments.length > 0 ? `
                <div class="ticket-attachments-section">
                    <h4>Attachments</h4>
                    <div class="attachments-list">
                        ${ticket.attachments.map(attachment => `
                            <div class="attachment-item">
                                <i class="fas fa-file"></i>
                                <span>${attachment}</span>
                                <button class="btn-link">Download</button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            
            <div class="ticket-responses-section">
                <h4>Conversation (${ticket.responses.length} messages)</h4>
                <div class="responses-list">
                    ${ticket.responses.map(response => `
                        <div class="response-item ${response.type}">
                            <div class="response-header">
                                <div class="response-author">
                                    <i class="fas fa-${response.type === 'customer' ? 'user' : 'headset'}"></i>
                                    ${response.author}
                                </div>
                                <div class="response-timestamp">${response.timestamp}</div>
                            </div>
                            <div class="response-message">${response.message}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close ticket modal
function closeTicketModal() {
    const modal = document.getElementById('ticketModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Add ticket reply
function addTicketReply(ticketId = null) {
    if (ticketId) {
        // If called with specific ticket ID, open that ticket's details first
        viewTicketDetails(ticketId);
    }
    
    const replyText = prompt('Enter your reply:');
    if (replyText && replyText.trim()) {
        const ticket = supportTicketsData.find(t => t.id === (ticketId || getCurrentTicketId()));
        if (ticket) {
            const newResponse = {
                id: ticket.responses.length + 1,
                author: 'Customer',
                message: replyText.trim(),
                timestamp: new Date().toLocaleString(),
                type: 'customer'
            };
            
            ticket.responses.push(newResponse);
            ticket.lastUpdate = new Date().toISOString().split('T')[0];
            ticket.status = 'waiting';
            
            // Refresh the modal if it's open
            if (document.getElementById('ticketModal').style.display === 'flex') {
                viewTicketDetails(ticket.id);
            }
            
            renderTickets();
            showNotification('Reply added successfully!', 'success');
        }
    }
}

// Get current ticket ID from modal
function getCurrentTicketId() {
    const modalTitle = document.getElementById('modalTicketTitle').textContent;
    return modalTitle.split(' - ')[0];
}

// Print ticket
function printTicket() {
    window.print();
}

// Contact support via WhatsApp
function contactSupport(ticketId) {
    const ticket = supportTicketsData.find(t => t.id === ticketId);
    const message = `Hi, I need help with my support ticket ${ticketId}: ${ticket ? ticket.subject : 'Support Request'}`;
    const whatsappUrl = `https://wa.me/+918667018453?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Export tickets
function exportTickets() {
    const csvContent = generateTicketsCSV();
    downloadCSV(csvContent, 'support-tickets.csv');
    showNotification('Tickets exported successfully!', 'success');
}

// Generate CSV content
function generateTicketsCSV() {
    const headers = ['Ticket ID', 'Subject', 'Status', 'Priority', 'Category', 'Device', 'Created Date', 'Last Update'];
    const rows = filteredTickets.map(ticket => [
        ticket.id,
        ticket.subject,
        formatStatus(ticket.status),
        formatPriority(ticket.priority),
        formatCategory(ticket.category),
        ticket.device,
        ticket.createdDate,
        ticket.lastUpdate
    ]);
    
    const csvContent = [headers, ...rows]
        .map(row => row.map(field => `"${field}"`).join(','))
        .join('\n');
    
    return csvContent;
}

// Download CSV file
function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Utility functions
function formatStatus(status) {
    const statusMap = {
        'open': 'Open',
        'in-progress': 'In Progress',
        'waiting': 'Waiting for Response',
        'resolved': 'Resolved',
        'closed': 'Closed'
    };
    return statusMap[status] || status;
}

function formatPriority(priority) {
    const priorityMap = {
        'low': 'Low',
        'medium': 'Medium',
        'high': 'High',
        'critical': 'Critical'
    };
    return priorityMap[priority] || priority;
}

function formatCategory(category) {
    const categoryMap = {
        'technical': 'Technical Support',
        'billing': 'Billing & Payment',
        'service': 'Service Request',
        'warranty': 'Warranty Claim',
        'feedback': 'Feedback',
        'other': 'Other'
    };
    return categoryMap[category] || category;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
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

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('ticketModal');
    if (e.target === modal) {
        closeTicketModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('ticketModal');
        if (modal.style.display === 'flex') {
            closeTicketModal();
        }
    }
});