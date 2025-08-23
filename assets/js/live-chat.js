// Live Chat Support System
class LiveChatWidget {
    constructor() {
        this.isOpen = false;
        this.isMinimized = false;
        this.messages = [];
        this.unreadCount = 0;
        this.isTyping = false;
        this.currentUser = this.getCurrentUser();
        this.supportAgents = [
            { id: 1, name: 'Sarah', avatar: 'fas fa-user-circle', status: 'online' },
            { id: 2, name: 'Mike', avatar: 'fas fa-user-circle', status: 'online' },
            { id: 3, name: 'Priya', avatar: 'fas fa-user-circle', status: 'online' }
        ];
        this.currentAgent = this.supportAgents[0];
        this.chatId = this.generateChatId();
        
        this.init();
    }

    init() {
        this.createChatWidget();
        this.bindEvents();
        this.loadChatHistory();
        this.simulateAgentPresence();
        
        // Show welcome message after a delay
        setTimeout(() => {
            if (this.messages.length === 0) {
                this.addWelcomeMessage();
            }
        }, 3000);
    }

    getCurrentUser() {
        const userSession = this.getUserSession();
        return userSession && userSession.isLoggedIn 
            ? { name: userSession.name, email: userSession.email }
            : { name: 'Guest', email: null };
    }

    getUserSession() {
        try {
            const sessionData = localStorage.getItem('userSession');
            return sessionData ? JSON.parse(sessionData) : null;
        } catch (error) {
            return null;
        }
    }

    generateChatId() {
        return 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    createChatWidget() {
        const chatWidget = document.createElement('div');
        chatWidget.className = 'live-chat-widget';
        chatWidget.innerHTML = `
            <!-- Chat Toggle Button -->
            <div class="chat-toggle-btn" id="chatToggleBtn">
                <div class="chat-icon">
                    <i class="fas fa-comments"></i>
                </div>
                <div class="chat-notification-badge" id="chatNotificationBadge">0</div>
                <div class="chat-status-indicator online"></div>
            </div>

            <!-- Chat Window -->
            <div class="chat-window" id="chatWindow">
                <!-- Chat Header -->
                <div class="chat-header">
                    <div class="chat-agent-info">
                        <div class="agent-avatar">
                            <i class="${this.currentAgent.avatar}"></i>
                            <div class="agent-status ${this.currentAgent.status}"></div>
                        </div>
                        <div class="agent-details">
                            <h4>${this.currentAgent.name}</h4>
                            <span class="agent-status-text">Online • Typically replies in minutes</span>
                        </div>
                    </div>
                    <div class="chat-controls">
                        <button class="chat-minimize-btn" id="chatMinimizeBtn" title="Minimize">
                            <i class="fas fa-minus"></i>
                        </button>
                        <button class="chat-close-btn" id="chatCloseBtn" title="Close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>

                <!-- Chat Messages -->
                <div class="chat-messages" id="chatMessages">
                    <div class="chat-welcome">
                        <div class="welcome-avatar">
                            <i class="fas fa-laptop"></i>
                        </div>
                        <h3>Welcome to IT Connect Support!</h3>
                        <p>Hi there! 👋 How can we help you with your laptop today?</p>
                    </div>
                </div>

                <!-- Typing Indicator -->
                <div class="typing-indicator" id="typingIndicator">
                    <div class="typing-avatar">
                        <i class="${this.currentAgent.avatar}"></i>
                    </div>
                    <div class="typing-text">
                        <span>${this.currentAgent.name} is typing</span>
                        <div class="typing-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>

                <!-- Chat Input -->
                <div class="chat-input-container">
                    <div class="chat-quick-replies" id="chatQuickReplies">
                        <button class="quick-reply-btn" data-message="I need help with screen repair">Screen Repair</button>
                        <button class="quick-reply-btn" data-message="My laptop is overheating">Overheating Issue</button>
                        <button class="quick-reply-btn" data-message="I want to upgrade my RAM">RAM Upgrade</button>
                        <button class="quick-reply-btn" data-message="Software installation help">Software Help</button>
                    </div>
                    <div class="chat-input-wrapper">
                        <input type="text" class="chat-input" id="chatInput" placeholder="Type your message..." maxlength="500">
                        <button class="chat-send-btn" id="chatSendBtn" disabled>
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                    <div class="chat-input-footer">
                        <small>Press Enter to send • We typically reply within 2 minutes</small>
                    </div>
                </div>
            </div>

            <!-- Chat Minimized State -->
            <div class="chat-minimized" id="chatMinimized">
                <div class="minimized-content">
                    <div class="minimized-avatar">
                        <i class="${this.currentAgent.avatar}"></i>
                    </div>
                    <div class="minimized-text">
                        <span>Chat with ${this.currentAgent.name}</span>
                        <small id="minimizedUnreadCount">0 new messages</small>
                    </div>
                </div>
                <button class="minimized-close-btn" id="minimizedCloseBtn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(chatWidget);
        this.chatWidget = chatWidget;
    }

    bindEvents() {
        const toggleBtn = document.getElementById('chatToggleBtn');
        const closeBtn = document.getElementById('chatCloseBtn');
        const minimizeBtn = document.getElementById('chatMinimizeBtn');
        const minimizedCloseBtn = document.getElementById('minimizedCloseBtn');
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('chatSendBtn');
        const quickReplies = document.querySelectorAll('.quick-reply-btn');
        const chatMinimized = document.getElementById('chatMinimized');

        // Toggle chat
        toggleBtn.addEventListener('click', () => this.toggleChat());
        
        // Close chat
        closeBtn.addEventListener('click', () => this.closeChat());
        minimizedCloseBtn.addEventListener('click', () => this.closeChat());
        
        // Minimize/restore chat
        minimizeBtn.addEventListener('click', () => this.minimizeChat());
        chatMinimized.addEventListener('click', () => this.restoreChat());
        
        // Send message
        sendBtn.addEventListener('click', () => this.sendMessage());
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Enable/disable send button
        chatInput.addEventListener('input', (e) => {
            const hasText = e.target.value.trim().length > 0;
            sendBtn.disabled = !hasText;
            sendBtn.classList.toggle('active', hasText);
        });
        
        // Quick replies
        quickReplies.forEach(btn => {
            btn.addEventListener('click', () => {
                const message = btn.dataset.message;
                this.sendUserMessage(message);
                this.hideQuickReplies();
            });
        });

        // Close chat when clicking outside (optional)
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.chatWidget.contains(e.target)) {
                // Uncomment to close chat when clicking outside
                // this.closeChat();
            }
        });
    }

    toggleChat() {
        if (this.isMinimized) {
            this.restoreChat();
        } else if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        this.isOpen = true;
        this.isMinimized = false;
        this.chatWidget.classList.add('chat-open');
        this.chatWidget.classList.remove('chat-minimized-state');
        
        // Focus input
        setTimeout(() => {
            const chatInput = document.getElementById('chatInput');
            if (chatInput) chatInput.focus();
        }, 300);
        
        // Mark messages as read
        this.markMessagesAsRead();
        
        // Track chat open event
        this.trackEvent('chat_opened');
    }

    closeChat() {
        this.isOpen = false;
        this.isMinimized = false;
        this.chatWidget.classList.remove('chat-open', 'chat-minimized-state');
        
        // Track chat close event
        this.trackEvent('chat_closed');
    }

    minimizeChat() {
        this.isMinimized = true;
        this.chatWidget.classList.add('chat-minimized-state');
        this.chatWidget.classList.remove('chat-open');
        
        // Track chat minimize event
        this.trackEvent('chat_minimized');
    }

    restoreChat() {
        this.isMinimized = false;
        this.isOpen = true;
        this.chatWidget.classList.add('chat-open');
        this.chatWidget.classList.remove('chat-minimized-state');
        
        // Focus input
        setTimeout(() => {
            const chatInput = document.getElementById('chatInput');
            if (chatInput) chatInput.focus();
        }, 300);
        
        // Mark messages as read
        this.markMessagesAsRead();
    }

    sendMessage() {
        const chatInput = document.getElementById('chatInput');
        const message = chatInput.value.trim();
        
        if (message) {
            this.sendUserMessage(message);
            chatInput.value = '';
            chatInput.focus();
            
            // Disable send button
            const sendBtn = document.getElementById('chatSendBtn');
            sendBtn.disabled = true;
            sendBtn.classList.remove('active');
        }
    }

    sendUserMessage(message) {
        const messageObj = {
            id: this.generateMessageId(),
            type: 'user',
            message: message,
            timestamp: new Date(),
            sender: this.currentUser.name
        };
        
        this.addMessage(messageObj);
        this.hideQuickReplies();
        
        // Simulate agent response
        this.simulateAgentResponse(message);
        
        // Track message sent
        this.trackEvent('message_sent', { message_length: message.length });
    }

    addMessage(messageObj) {
        this.messages.push(messageObj);
        this.renderMessage(messageObj);
        this.scrollToBottom();
        this.saveChatHistory();
        
        // Update unread count if chat is not open
        if (!this.isOpen || this.isMinimized) {
            if (messageObj.type === 'agent') {
                this.unreadCount++;
                this.updateNotificationBadge();
            }
        }
    }

    renderMessage(messageObj) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${messageObj.type}-message`;
        messageElement.dataset.messageId = messageObj.id;
        
        const timeString = this.formatTime(messageObj.timestamp);
        
        if (messageObj.type === 'user') {
            messageElement.innerHTML = `
                <div class="message-content">
                    <div class="message-bubble">
                        <p>${this.escapeHtml(messageObj.message)}</p>
                        <div class="message-time">${timeString}</div>
                    </div>
                </div>
            `;
        } else {
            messageElement.innerHTML = `
                <div class="message-avatar">
                    <i class="${this.currentAgent.avatar}"></i>
                </div>
                <div class="message-content">
                    <div class="message-sender">${messageObj.sender || this.currentAgent.name}</div>
                    <div class="message-bubble">
                        <p>${this.escapeHtml(messageObj.message)}</p>
                        <div class="message-time">${timeString}</div>
                    </div>
                </div>
            `;
        }
        
        messagesContainer.appendChild(messageElement);
        
        // Animate message appearance
        setTimeout(() => {
            messageElement.classList.add('message-appear');
        }, 50);
    }

    simulateAgentResponse(userMessage) {
        // Show typing indicator
        this.showTypingIndicator();
        
        // Generate response based on user message
        const response = this.generateAgentResponse(userMessage);
        
        // Simulate typing delay
        const typingDelay = Math.min(response.length * 50 + 1000, 4000);
        
        setTimeout(() => {
            this.hideTypingIndicator();
            
            const messageObj = {
                id: this.generateMessageId(),
                type: 'agent',
                message: response,
                timestamp: new Date(),
                sender: this.currentAgent.name
            };
            
            this.addMessage(messageObj);
            
            // Sometimes show quick actions after agent response
            if (Math.random() > 0.7) {
                setTimeout(() => this.showQuickActions(), 1000);
            }
            
        }, typingDelay);
    }

    generateAgentResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Greeting responses
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return `Hello ${this.currentUser.name}! 👋 Welcome to IT Connect. I'm here to help you with any laptop issues you might have. What can I assist you with today?`;
        }
        
        // Screen repair
        if (message.includes('screen') || message.includes('display') || message.includes('cracked')) {
            return "I can definitely help you with screen repair! 🖥️ We offer professional screen replacement services starting at ₹4000. Our technicians can come to your location within 2 hours. Would you like me to schedule a free diagnosis?";
        }
        
        // Overheating issues
        if (message.includes('overheat') || message.includes('hot') || message.includes('fan')) {
            return "Overheating is a common issue we can fix! 🌡️ This usually involves cleaning the cooling system and replacing thermal paste. Our service starts at ₹750. I can arrange for a technician to visit you today. What's your location?";
        }
        
        // RAM/Memory upgrade
        if (message.includes('ram') || message.includes('memory') || message.includes('upgrade') || message.includes('slow')) {
            return "Great choice! RAM upgrades can significantly improve your laptop's performance. 🚀 We offer various RAM options starting at ₹1000 including installation. What's your laptop model? I can check compatibility for you.";
        }
        
        // Software issues
        if (message.includes('software') || message.includes('virus') || message.includes('windows') || message.includes('install')) {
            return "I can help with software issues! 💻 We handle virus removal, OS installation, and software troubleshooting starting at ₹1000. Our technicians can remote in or visit you. What specific software issue are you experiencing?";
        }
        
        // Battery issues
        if (message.includes('battery') || message.includes('charging') || message.includes('power')) {
            return "Battery issues can be frustrating! 🔋 We provide battery replacement services with genuine parts starting at ₹1000. Most replacements can be done within an hour. What symptoms are you experiencing with your battery?";
        }
        
        // Pricing inquiries
        if (message.includes('price') || message.includes('cost') || message.includes('charge')) {
            return "Our pricing is very competitive! 💰 We offer free diagnosis and transparent pricing. Most common repairs range from ₹750-₹4000. The exact cost depends on your specific issue. Would you like me to schedule a free assessment?";
        }
        
        // Location/service area
        if (message.includes('location') || message.includes('area') || message.includes('visit') || message.includes('come')) {
            return "We provide home service across Chennai and surrounding areas! 📍 Our technicians can reach you within 2 hours. We're based in Adyar but cover the entire metro area. What's your location?";
        }
        
        // Warranty questions
        if (message.includes('warranty') || message.includes('guarantee')) {
            return "All our repairs come with a 6-month warranty! ✅ We stand behind our work and use only genuine or high-quality compatible parts. If any issue occurs within the warranty period, we'll fix it free of charge.";
        }
        
        // Emergency/urgent
        if (message.includes('urgent') || message.includes('emergency') || message.includes('asap')) {
            return "I understand this is urgent! ⚡ We offer emergency service with priority scheduling. Our technicians can reach you within 1 hour for urgent cases. There's a small emergency fee, but we'll get your laptop fixed quickly. Shall I arrange this?";
        }
        
        // Booking/appointment
        if (message.includes('book') || message.includes('schedule') || message.includes('appointment')) {
            return "I'd be happy to schedule a service appointment for you! 📅 I can arrange for a technician to visit you today or at your preferred time. What time works best for you? Also, could you share your contact number and address?";
        }
        
        // Default responses
        const defaultResponses = [
            "Thanks for reaching out! I'm here to help with any laptop repair needs. Could you tell me more about the specific issue you're experiencing?",
            "I'd be happy to assist you with that! Can you provide more details about your laptop problem so I can give you the best solution?",
            "That's something we can definitely help with! Let me connect you with the right solution. What's your laptop model and what exactly is happening?",
            "Great question! Our expert technicians handle all types of laptop issues. Could you describe the problem in more detail?",
            "I'm here to help! 😊 To provide you with the most accurate assistance, could you tell me more about your laptop issue?"
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    showTypingIndicator() {
        this.isTyping = true;
        const typingIndicator = document.getElementById('typingIndicator');
        typingIndicator.classList.add('show');
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typingIndicator');
        typingIndicator.classList.remove('show');
    }

    showQuickActions() {
        const messagesContainer = document.getElementById('chatMessages');
        const quickActions = document.createElement('div');
        quickActions.className = 'quick-actions';
        quickActions.innerHTML = `
            <div class="quick-actions-title">Quick Actions:</div>
            <div class="quick-actions-buttons">
                <button class="quick-action-btn" onclick="liveChatWidget.sendUserMessage('Schedule a home visit')">
                    <i class="fas fa-calendar"></i> Schedule Visit
                </button>
                <button class="quick-action-btn" onclick="liveChatWidget.sendUserMessage('Get a quote for my repair')">
                    <i class="fas fa-calculator"></i> Get Quote
                </button>
                <button class="quick-action-btn" onclick="liveChatWidget.sendUserMessage('Call me back')">
                    <i class="fas fa-phone"></i> Call Back
                </button>
            </div>
        `;
        
        messagesContainer.appendChild(quickActions);
        this.scrollToBottom();
    }

    hideQuickReplies() {
        const quickReplies = document.getElementById('chatQuickReplies');
        if (quickReplies && this.messages.length > 0) {
            quickReplies.style.display = 'none';
        }
    }

    addWelcomeMessage() {
        const welcomeMessage = {
            id: this.generateMessageId(),
            type: 'agent',
            message: `Hi ${this.currentUser.name}! 👋 Welcome to IT Connect support. I'm ${this.currentAgent.name}, and I'm here to help you with any laptop issues. How can I assist you today?`,
            timestamp: new Date(),
            sender: this.currentAgent.name
        };
        
        this.addMessage(welcomeMessage);
    }

    markMessagesAsRead() {
        this.unreadCount = 0;
        this.updateNotificationBadge();
        this.updateMinimizedBadge();
    }

    updateNotificationBadge() {
        const badge = document.getElementById('chatNotificationBadge');
        if (badge) {
            badge.textContent = this.unreadCount;
            badge.style.display = this.unreadCount > 0 ? 'flex' : 'none';
        }
    }

    updateMinimizedBadge() {
        const minimizedCount = document.getElementById('minimizedUnreadCount');
        if (minimizedCount) {
            minimizedCount.textContent = this.unreadCount > 0 
                ? `${this.unreadCount} new message${this.unreadCount > 1 ? 's' : ''}`
                : 'No new messages';
        }
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatMessages');
        if (messagesContainer) {
            setTimeout(() => {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 100);
        }
    }

    simulateAgentPresence() {
        // Randomly change agent status
        setInterval(() => {
            if (Math.random() > 0.95) {
                const statuses = ['online', 'away'];
                const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
                this.updateAgentStatus(newStatus);
            }
        }, 30000);
    }

    updateAgentStatus(status) {
        this.currentAgent.status = status;
        const statusIndicator = document.querySelector('.chat-status-indicator');
        const agentStatus = document.querySelector('.agent-status');
        const statusText = document.querySelector('.agent-status-text');
        
        if (statusIndicator) {
            statusIndicator.className = `chat-status-indicator ${status}`;
        }
        
        if (agentStatus) {
            agentStatus.className = `agent-status ${status}`;
        }
        
        if (statusText) {
            const statusTexts = {
                online: 'Online • Typically replies in minutes',
                away: 'Away • Will reply soon',
                offline: 'Offline • Will reply when back'
            };
            statusText.textContent = statusTexts[status] || statusTexts.online;
        }
    }

    // Utility functions
    generateMessageId() {
        return 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    formatTime(date) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Storage functions
    saveChatHistory() {
        try {
            const chatData = {
                messages: this.messages,
                chatId: this.chatId,
                lastActivity: new Date().toISOString()
            };
            localStorage.setItem('liveChatHistory', JSON.stringify(chatData));
        } catch (error) {
            console.warn('Could not save chat history:', error);
        }
    }

    loadChatHistory() {
        try {
            const chatData = localStorage.getItem('liveChatHistory');
            if (chatData) {
                const parsed = JSON.parse(chatData);
                const lastActivity = new Date(parsed.lastActivity);
                const now = new Date();
                const hoursSinceLastActivity = (now - lastActivity) / (1000 * 60 * 60);
                
                // Load history if it's less than 24 hours old
                if (hoursSinceLastActivity < 24) {
                    this.messages = parsed.messages || [];
                    this.chatId = parsed.chatId || this.chatId;
                    
                    // Render existing messages
                    this.messages.forEach(message => {
                        message.timestamp = new Date(message.timestamp);
                        this.renderMessage(message);
                    });
                    
                    if (this.messages.length > 0) {
                        this.hideQuickReplies();
                    }
                }
            }
        } catch (error) {
            console.warn('Could not load chat history:', error);
        }
    }

    // Analytics tracking
    trackEvent(eventName, properties = {}) {
        try {
            // Google Analytics tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', eventName, {
                    event_category: 'live_chat',
                    ...properties
                });
            }
            
            // Custom analytics
            console.log('Chat Event:', eventName, properties);
        } catch (error) {
            console.warn('Analytics tracking error:', error);
        }
    }

    // Public methods for external integration
    openChatWithMessage(message) {
        this.openChat();
        setTimeout(() => {
            const chatInput = document.getElementById('chatInput');
            if (chatInput) {
                chatInput.value = message;
                chatInput.focus();
                
                // Enable send button
                const sendBtn = document.getElementById('chatSendBtn');
                sendBtn.disabled = false;
                sendBtn.classList.add('active');
            }
        }, 500);
    }

    sendSystemMessage(message) {
        const messageObj = {
            id: this.generateMessageId(),
            type: 'system',
            message: message,
            timestamp: new Date(),
            sender: 'System'
        };
        
        this.addMessage(messageObj);
    }
}

// Initialize Live Chat Widget
let liveChatWidget;
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure all other scripts are loaded
    setTimeout(() => {
        liveChatWidget = new LiveChatWidget();
        
        // Make it globally available
        window.liveChatWidget = liveChatWidget;
        
        // Integration with existing notification system
        if (typeof showNotification === 'function') {
            // Show chat availability notification after some time
            setTimeout(() => {
                if (!liveChatWidget.isOpen && liveChatWidget.messages.length === 0) {
                    showNotification('💬 Need help? Our live chat support is available!', 'info');
                }
            }, 30000); // Show after 30 seconds
        }
    }, 1000);
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LiveChatWidget;
}