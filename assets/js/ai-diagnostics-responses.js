// AI Diagnostics Interactive Response System
document.addEventListener('DOMContentLoaded', function() {
    initializeResponseSystem();
});

// Advanced AI Response Engine
class AIResponseEngine {
    constructor() {
        this.conversationHistory = [];
        this.userProfile = {
            techLevel: 'beginner', // beginner, intermediate, advanced
            preferredCommunication: 'friendly', // friendly, technical, concise
            previousInteractions: []
        };
        this.responseTemplates = this.initializeResponseTemplates();
        this.contextualResponses = this.initializeContextualResponses();
        this.voiceResponses = this.initializeVoiceResponses();
        this.currentContext = null;
    }

    initializeResponseTemplates() {
        return {
            greeting: [
                "Hello! I'm your AI diagnostic assistant. I'm here to help identify what's wrong with your laptop. Let's start by gathering some basic information about your device.",
                "Welcome to our advanced AI diagnostics! I'll guide you through a comprehensive analysis of your laptop. Don't worry, I'll explain everything in simple terms.",
                "Hi there! Ready to solve your laptop problems? I'm equipped with advanced diagnostic capabilities to help identify issues quickly and accurately."
            ],
            encouragement: [
                "Great choice! This information will help me provide more accurate diagnostics.",
                "Perfect! You're doing great. This data helps me understand your laptop better.",
                "Excellent! The more details you provide, the better I can help you.",
                "That's very helpful! I'm building a comprehensive profile of your system."
            ],
            symptomsGathering: [
                "Now, let's talk about what's been bothering you about your laptop. Don't worry if you're not sure about technical terms - just describe what you've noticed.",
                "Time to play detective! Tell me about any unusual behavior you've observed. Every detail matters, no matter how small it might seem.",
                "Let's identify the symptoms together. Think about recent changes in your laptop's performance, sounds, or appearance."
            ],
            analysisStart: [
                "Excellent! I have all the information I need. Now I'll analyze your laptop using advanced AI algorithms. This might take a moment, but I'll keep you updated on my progress.",
                "Perfect! Let me put on my detective hat and analyze these symptoms. I'll use multiple AI techniques including pattern recognition and predictive modeling.",
                "Great! Now comes the exciting part. I'll run your symptoms through my advanced diagnostic engine. Sit back and watch the magic happen!"
            ],
            resultsIntro: [
                "Analysis complete! I've identified several key findings about your laptop. Let me break this down for you in a way that's easy to understand.",
                "Diagnosis finished! I've discovered some interesting patterns in your laptop's behavior. Here's what I found and what it means for you.",
                "All done! My AI analysis has revealed the likely causes of your laptop's issues. Let me explain what's happening and what we can do about it."
            ]
        };
    }

    initializeContextualResponses() {
        return {
            brandSpecific: {
                dell: {
                    positive: "Dell laptops are known for their reliability! Let's see what we can do to get yours back to peak performance.",
                    concern: "I've seen this pattern with Dell laptops before. The good news is that most Dell issues are quite manageable."
                },
                hp: {
                    positive: "HP makes solid machines! Your laptop has good potential for a full recovery.",
                    concern: "HP laptops sometimes have specific quirks, but I know exactly how to handle them."
                },
                lenovo: {
                    positive: "Lenovo ThinkPads are legendary for their durability! Let's restore yours to its former glory.",
                    concern: "Lenovo laptops are built tough, so if there's an issue, we'll get to the bottom of it."
                },
                apple: {
                    positive: "MacBooks are beautifully engineered! Let's keep yours running smoothly.",
                    concern: "Apple products require special attention, but the results are always worth it."
                }
            },
            ageSpecific: {
                '0-1': "Since your laptop is relatively new, we should be able to resolve most issues quickly. New laptops often just need some optimization.",
                '1-2': "Your laptop is in its prime years! Most issues at this age are software-related and easily fixable.",
                '2-3': "This is a common age for laptops to need some TLC. Don't worry, most issues are preventable with proper maintenance.",
                '3-5': "Your laptop has served you well! At this age, some hardware refresh might be beneficial, but let's see what we can do first.",
                '5+': "Wow, your laptop is a veteran! These older machines often just need some expert care to keep running smoothly."
            },
            usageSpecific: {
                light: "Light usage is great for laptop longevity! Your issues are likely minor and easily resolved.",
                moderate: "Moderate usage is the sweet spot! Your laptop should respond well to our recommended fixes.",
                heavy: "Heavy usage can be demanding on laptops, but it also means you really depend on your machine. Let's make sure it can handle your workload.",
                professional: "Professional use requires peak performance! I'll make sure we address everything to keep your productivity high."
            }
        };
    }

    initializeVoiceResponses() {
        return {
            symptomsSelected: {
                1: "I see you've selected one symptom. That's a good start! Even single symptoms can tell us a lot about what's happening.",
                2: "Two symptoms selected. Interesting! These might be related - let me analyze the connection.",
                3: "Three symptoms - now we're getting a clearer picture! Multiple symptoms often point to specific root causes.",
                4: "Four symptoms detected. This is quite comprehensive data! I should be able to provide very accurate diagnostics.",
                5: "Five or more symptoms! Your laptop is really trying to tell us something. Don't worry, more data means better diagnosis."
            },
            urgencyLevels: {
                low: "Good news! The issues I've detected are not urgent. We have time to plan the best approach for your laptop.",
                medium: "I've identified some issues that need attention soon. Not an emergency, but let's not wait too long to address them.",
                high: "I've found some concerning issues that need prompt attention. Let's get your laptop the care it needs quickly."
            },
            confidenceLevels: {
                high: "I'm very confident in this diagnosis! The symptoms clearly point to specific issues.",
                medium: "I have good confidence in this analysis, though some additional testing might be helpful.",
                low: "While I have some insights, I'd recommend professional verification for the most accurate diagnosis."
            }
        };
    }

    generateResponse(context, data = {}) {
        this.currentContext = context;
        let response = '';

        switch (context) {
            case 'greeting':
                response = this.getRandomTemplate('greeting');
                break;
            case 'laptopInfoCollected':
                response = this.generateLaptopInfoResponse(data);
                break;
            case 'symptomsGathering':
                response = this.getRandomTemplate('symptomsGathering');
                break;
            case 'symptomsSelected':
                response = this.generateSymptomsResponse(data);
                break;
            case 'analysisStart':
                response = this.getRandomTemplate('analysisStart');
                break;
            case 'analysisProgress':
                response = this.generateProgressResponse(data);
                break;
            case 'resultsReady':
                response = this.generateResultsResponse(data);
                break;
            case 'recommendations':
                response = this.generateRecommendationsResponse(data);
                break;
            default:
                response = "I'm here to help! Let me know what you'd like to know about your laptop.";
        }

        this.addToHistory(context, response, data);
        return response;
    }

    generateLaptopInfoResponse(data) {
        const { brand, age, usage } = data;
        let response = this.getRandomTemplate('encouragement') + ' ';

        // Add brand-specific response
        if (this.contextualResponses.brandSpecific[brand]) {
            response += this.contextualResponses.brandSpecific[brand].positive + ' ';
        }

        // Add age-specific insight
        if (this.contextualResponses.ageSpecific[age]) {
            response += this.contextualResponses.ageSpecific[age] + ' ';
        }

        // Add usage-specific comment
        if (this.contextualResponses.usageSpecific[usage]) {
            response += this.contextualResponses.usageSpecific[usage];
        }

        return response;
    }

    generateSymptomsResponse(data) {
        const { symptoms } = data;
        const count = symptoms.length;
        
        let response = '';
        
        if (this.voiceResponses.symptomsSelected[count]) {
            response = this.voiceResponses.symptomsSelected[count];
        } else if (count > 5) {
            response = this.voiceResponses.symptomsSelected[5];
        }

        // Add specific symptom insights
        if (symptoms.includes('overheating') && symptoms.includes('loud-fan')) {
            response += " I notice you've selected both overheating and loud fan noise - these are definitely connected and suggest a thermal management issue.";
        }

        if (symptoms.filter(s => s.startsWith('screen-')).length > 1) {
            response += " Multiple display issues detected - this points to a comprehensive display system problem.";
        }

        return response;
    }

    generateProgressResponse(data) {
        const { step, progress } = data;
        const responses = [
            "I'm analyzing your symptoms using advanced pattern recognition...",
            "Cross-referencing with my database of similar cases...",
            "Running predictive algorithms to identify root causes...",
            "Calculating confidence levels and repair estimates...",
            "Almost done! Generating personalized recommendations...",
            "Finalizing diagnosis and preparing detailed report..."
        ];

        return responses[step - 1] || "Processing your diagnostic data...";
    }

    generateResultsResponse(data) {
        const { confidence, urgency, issueCount } = data;
        
        let response = this.getRandomTemplate('resultsIntro') + ' ';

        // Add confidence-based response
        if (confidence > 0.8) {
            response += this.voiceResponses.confidenceLevels.high + ' ';
        } else if (confidence > 0.6) {
            response += this.voiceResponses.confidenceLevels.medium + ' ';
        } else {
            response += this.voiceResponses.confidenceLevels.low + ' ';
        }

        // Add urgency-based response
        response += this.voiceResponses.urgencyLevels[urgency] + ' ';

        // Add issue count context
        if (issueCount === 1) {
            response += "I've identified one primary issue that's causing your problems.";
        } else {
            response += `I've found ${issueCount} primary issues that need attention.`;
        }

        return response;
    }

    generateRecommendationsResponse(data) {
        const { recommendations } = data;
        
        let response = "Based on my analysis, here are my personalized recommendations for your laptop: ";

        if (recommendations.some(r => r.type === 'urgent')) {
            response += "I've identified some urgent actions that need immediate attention. ";
        }

        if (recommendations.some(r => r.type === 'upgrade')) {
            response += "I've also included some upgrade suggestions that could significantly improve your laptop's performance. ";
        }

        response += "Each recommendation includes my confidence level and reasoning, so you can make informed decisions about your laptop's care.";

        return response;
    }

    getRandomTemplate(category) {
        const templates = this.responseTemplates[category];
        return templates[Math.floor(Math.random() * templates.length)];
    }

    addToHistory(context, response, data) {
        this.conversationHistory.push({
            timestamp: new Date(),
            context,
            response,
            data
        });
    }

    getPersonalizedGreeting() {
        const hour = new Date().getHours();
        let timeGreeting = '';
        
        if (hour < 12) {
            timeGreeting = 'Good morning!';
        } else if (hour < 17) {
            timeGreeting = 'Good afternoon!';
        } else {
            timeGreeting = 'Good evening!';
        }

        return `${timeGreeting} ${this.getRandomTemplate('greeting')}`;
    }
}

// Interactive Response Display System
class ResponseDisplaySystem {
    constructor() {
        this.responseContainer = null;
        this.typingSpeed = 50; // milliseconds per character
        this.isTyping = false;
        this.currentMessage = '';
    }

    initialize() {
        this.createResponseContainer();
    }

    createResponseContainer() {
        // Check if container already exists
        if (document.getElementById('aiResponseContainer')) return;

        const container = document.createElement('div');
        container.id = 'aiResponseContainer';
        container.className = 'ai-response-container';
        container.innerHTML = `
            <div class="ai-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="ai-response-content">
                <div class="ai-response-text" id="aiResponseText">
                    <div class="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div class="ai-response-actions" id="aiResponseActions">
                    <!-- Dynamic action buttons will be added here -->
                </div>
            </div>
        `;

        // Insert after the hero section
        const heroSection = document.querySelector('.ai-diagnostics-hero');
        if (heroSection) {
            heroSection.insertAdjacentElement('afterend', container);
        }

        this.responseContainer = container;
    }

    async displayResponse(message, actions = []) {
        if (!this.responseContainer) this.initialize();

        const textElement = document.getElementById('aiResponseText');
        const actionsElement = document.getElementById('aiResponseActions');

        // Show typing indicator
        this.showTypingIndicator();

        // Wait a moment for realism
        await this.delay(1000);

        // Type out the message
        await this.typeMessage(message);

        // Add action buttons if provided
        if (actions.length > 0) {
            this.displayActions(actions);
        }

        // Scroll to response
        this.scrollToResponse();
    }

    showTypingIndicator() {
        const textElement = document.getElementById('aiResponseText');
        textElement.innerHTML = `
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        this.responseContainer.classList.add('active');
    }

    async typeMessage(message) {
        const textElement = document.getElementById('aiResponseText');
        textElement.innerHTML = '';
        
        this.isTyping = true;
        this.currentMessage = message;

        for (let i = 0; i < message.length; i++) {
            if (!this.isTyping) break;
            
            textElement.textContent += message[i];
            await this.delay(this.typingSpeed);
        }

        this.isTyping = false;
    }

    displayActions(actions) {
        const actionsElement = document.getElementById('aiResponseActions');
        actionsElement.innerHTML = '';

        actions.forEach(action => {
            const button = document.createElement('button');
            button.className = `btn btn-sm ${action.style || 'btn-outline'}`;
            button.innerHTML = `<i class="fas ${action.icon || 'fa-arrow-right'}"></i> ${action.text}`;
            button.onclick = action.callback;
            actionsElement.appendChild(button);
        });
    }

    scrollToResponse() {
        this.responseContainer.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    hide() {
        if (this.responseContainer) {
            this.responseContainer.classList.remove('active');
        }
    }

    clear() {
        const textElement = document.getElementById('aiResponseText');
        const actionsElement = document.getElementById('aiResponseActions');
        
        if (textElement) textElement.innerHTML = '';
        if (actionsElement) actionsElement.innerHTML = '';
    }
}

// Menu Response System
class MenuResponseSystem {
    constructor() {
        this.menuStates = {
            main: {
                title: "How can I help you today?",
                options: [
                    { text: "Start New Diagnosis", action: "startDiagnosis", icon: "fa-stethoscope" },
                    { text: "View Previous Results", action: "viewHistory", icon: "fa-history" },
                    { text: "Get Help & Tips", action: "showHelp", icon: "fa-question-circle" },
                    { text: "Contact Support", action: "contactSupport", icon: "fa-headset" }
                ]
            },
            diagnosis: {
                title: "What type of diagnosis would you like?",
                options: [
                    { text: "Quick Diagnosis (5 min)", action: "quickDiagnosis", icon: "fa-bolt" },
                    { text: "Comprehensive Analysis (10 min)", action: "fullDiagnosis", icon: "fa-microscope" },
                    { text: "Performance Check", action: "performanceCheck", icon: "fa-tachometer-alt" },
                    { text: "Hardware Scan", action: "hardwareScan", icon: "fa-microchip" }
                ]
            },
            help: {
                title: "What would you like help with?",
                options: [
                    { text: "How to describe symptoms", action: "symptomHelp", icon: "fa-info-circle" },
                    { text: "Understanding results", action: "resultsHelp", icon: "fa-chart-line" },
                    { text: "Maintenance tips", action: "maintenanceHelp", icon: "fa-tools" },
                    { text: "Back to main menu", action: "mainMenu", icon: "fa-arrow-left" }
                ]
            }
        };
        this.currentMenu = 'main';
    }

    displayMenu(menuKey = 'main') {
        this.currentMenu = menuKey;
        const menu = this.menuStates[menuKey];
        
        if (!menu) return;

        const actions = menu.options.map(option => ({
            text: option.text,
            icon: option.icon,
            style: option.action === 'startDiagnosis' ? 'btn-primary' : 'btn-outline',
            callback: () => this.handleMenuAction(option.action)
        }));

        responseDisplay.displayResponse(menu.title, actions);
    }

    handleMenuAction(action) {
        switch (action) {
            case 'startDiagnosis':
                this.displayMenu('diagnosis');
                break;
            case 'quickDiagnosis':
                this.startQuickDiagnosis();
                break;
            case 'fullDiagnosis':
                this.startFullDiagnosis();
                break;
            case 'performanceCheck':
                this.startPerformanceCheck();
                break;
            case 'hardwareScan':
                this.startHardwareScan();
                break;
            case 'viewHistory':
                this.showDiagnosticHistory();
                break;
            case 'showHelp':
                this.displayMenu('help');
                break;
            case 'symptomHelp':
                this.showSymptomHelp();
                break;
            case 'resultsHelp':
                this.showResultsHelp();
                break;
            case 'maintenanceHelp':
                this.showMaintenanceHelp();
                break;
            case 'contactSupport':
                this.contactSupport();
                break;
            case 'mainMenu':
                this.displayMenu('main');
                break;
            default:
                responseDisplay.displayResponse("I'm not sure how to handle that request. Let me show you the main menu again.");
                this.displayMenu('main');
        }
    }

    startQuickDiagnosis() {
        responseDisplay.displayResponse(
            "Great choice! Quick diagnosis will focus on the most common issues. This will take about 5 minutes and cover essential system checks.",
            [{ text: "Let's Begin", icon: "fa-play", style: "btn-primary", callback: () => this.beginDiagnosis('quick') }]
        );
    }

    startFullDiagnosis() {
        responseDisplay.displayResponse(
            "Excellent! Comprehensive analysis will give you the most detailed insights about your laptop. This thorough examination takes about 10 minutes but provides complete system analysis.",
            [{ text: "Start Analysis", icon: "fa-play", style: "btn-primary", callback: () => this.beginDiagnosis('full') }]
        );
    }

    startPerformanceCheck() {
        responseDisplay.displayResponse(
            "Performance check will analyze your laptop's speed, responsiveness, and efficiency. Perfect for identifying slowdowns and optimization opportunities.",
            [{ text: "Check Performance", icon: "fa-play", style: "btn-primary", callback: () => this.beginDiagnosis('performance') }]
        );
    }

    startHardwareScan() {
        responseDisplay.displayResponse(
            "Hardware scan will examine your laptop's physical components including CPU, RAM, storage, and other critical hardware. Ideal for detecting hardware-related issues.",
            [{ text: "Scan Hardware", icon: "fa-play", style: "btn-primary", callback: () => this.beginDiagnosis('hardware') }]
        );
    }

    beginDiagnosis(type) {
        // Hide the response container and start the actual diagnosis
        responseDisplay.hide();
        
        // Scroll to the diagnosis form
        const diagnosticsInterface = document.querySelector('.diagnostics-interface');
        if (diagnosticsInterface) {
            diagnosticsInterface.scrollIntoView({ behavior: 'smooth' });
        }

        // Show a final encouraging message
        setTimeout(() => {
            if (typeof showNotification === 'function') {
                showNotification(`Starting ${type} diagnosis! Please fill in the form below.`, 'info');
            }
        }, 1000);
    }

    showDiagnosticHistory() {
        const history = JSON.parse(localStorage.getItem('diagnosticHistory') || '[]');
        
        if (history.length === 0) {
            responseDisplay.displayResponse(
                "You haven't run any diagnostics yet. Would you like to start your first diagnosis?",
                [{ text: "Start First Diagnosis", icon: "fa-play", style: "btn-primary", callback: () => this.displayMenu('diagnosis') }]
            );
            return;
        }

        let message = `I found ${history.length} previous diagnostic${history.length > 1 ? 's' : ''} in your history. `;
        message += "Your most recent diagnosis was on " + new Date(history[0].timestamp).toLocaleDateString() + ". ";
        message += "Would you like to view the details or start a new diagnosis?";

        responseDisplay.displayResponse(message, [
            { text: "View Last Results", icon: "fa-eye", callback: () => this.showLastResults() },
            { text: "New Diagnosis", icon: "fa-plus", style: "btn-primary", callback: () => this.displayMenu('diagnosis') }
        ]);
    }

    showLastResults() {
        const history = JSON.parse(localStorage.getItem('diagnosticHistory') || '[]');
        if (history.length > 0) {
            const lastResult = history[0];
            let message = `Your last diagnosis found ${lastResult.results.primaryIssues} primary issue${lastResult.results.primaryIssues !== 1 ? 's' : ''} `;
            message += `with ${Math.round(lastResult.results.confidence * 100)}% confidence. `;
            message += `The estimated cost was ₹${lastResult.results.estimatedCost.min.toLocaleString()} - ₹${lastResult.results.estimatedCost.max.toLocaleString()}.`;

            responseDisplay.displayResponse(message, [
                { text: "Run New Diagnosis", icon: "fa-redo", style: "btn-primary", callback: () => this.displayMenu('diagnosis') },
                { text: "Back to Menu", icon: "fa-arrow-left", callback: () => this.displayMenu('main') }
            ]);
        }
    }

    showSymptomHelp() {
        const message = "When describing symptoms, think about these categories: " +
            "🖥️ Display issues (flickering, black screen, cracks), " +
            "⚡ Performance problems (slow, freezing, crashes), " +
            "🔧 Hardware issues (overheating, loud fans, battery), " +
            "📡 Connectivity problems (WiFi, USB, audio). " +
            "Don't worry about technical terms - just describe what you notice!";

        responseDisplay.displayResponse(message, [
            { text: "Start Diagnosis", icon: "fa-play", style: "btn-primary", callback: () => this.displayMenu('diagnosis') },
            { text: "More Help", icon: "fa-question", callback: () => this.displayMenu('help') }
        ]);
    }

    showResultsHelp() {
        const message = "Diagnostic results include: " +
            "🎯 Confidence level (how sure I am about the diagnosis), " +
            "⚠️ Urgency level (how quickly you need to act), " +
            "💰 Cost estimates (expected repair costs), " +
            "🔧 Recommended solutions (what needs to be done). " +
            "Higher confidence means more accurate diagnosis!";

        responseDisplay.displayResponse(message, [
            { text: "Run Diagnosis", icon: "fa-play", style: "btn-primary", callback: () => this.displayMenu('diagnosis') },
            { text: "Back to Help", icon: "fa-arrow-left", callback: () => this.displayMenu('help') }
        ]);
    }

    showMaintenanceHelp() {
        const message = "Keep your laptop healthy with these tips: " +
            "🧹 Clean vents and keyboard monthly, " +
            "🔄 Restart regularly and install updates, " +
            "🌡️ Keep it cool and avoid blocking vents, " +
            "💾 Back up important data regularly, " +
            "🔋 Don't let battery drain completely. " +
            "Regular maintenance prevents most issues!";

        responseDisplay.displayResponse(message, [
            { text: "Check My Laptop", icon: "fa-stethoscope", style: "btn-primary", callback: () => this.displayMenu('diagnosis') },
            { text: "Back to Help", icon: "fa-arrow-left", callback: () => this.displayMenu('help') }
        ]);
    }

    contactSupport() {
        const message = "Need human help? Our expert technicians are ready to assist you! " +
            "📞 Call us at +91 9884745432 for immediate support, " +
            "💬 WhatsApp us for quick questions, " +
            "📧 Email for detailed technical queries. " +
            "We're here 24/7 to help with your laptop needs!";

        responseDisplay.displayResponse(message, [
            { text: "Call Now", icon: "fa-phone", style: "btn-primary", callback: () => window.open('tel:+919884745432') },
            { text: "WhatsApp", icon: "fa-whatsapp", callback: () => window.open('https://wa.me/919884745432') },
            { text: "Back to Menu", icon: "fa-arrow-left", callback: () => this.displayMenu('main') }
        ]);
    }
}

// Initialize systems
const aiResponseEngine = new AIResponseEngine();
const responseDisplay = new ResponseDisplaySystem();
const menuResponseSystem = new MenuResponseSystem();

// Enhanced initialization
function initializeResponseSystem() {
    // Initialize display system
    responseDisplay.initialize();
    
    // Show initial greeting and menu
    setTimeout(() => {
        const greeting = aiResponseEngine.getPersonalizedGreeting();
        responseDisplay.displayResponse(greeting).then(() => {
            setTimeout(() => {
                menuResponseSystem.displayMenu('main');
            }, 2000);
        });
    }, 1000);

    // Enhance existing diagnostic flow
    enhanceDiagnosticFlow();
    
    // Add response styles
    addResponseStyles();
}

function enhanceDiagnosticFlow() {
    // Override existing functions to add responses
    const originalNextStep = window.nextStep;
    const originalStartAnalysis = window.startAnalysis;
    const originalCompleteAnalysis = window.completeAnalysis;

    // Enhance step transitions
    window.nextStep = function() {
        if (originalNextStep) originalNextStep();
        
        // Add contextual responses
        if (currentStep === 2) {
            const laptopInfo = diagnosticData.laptopInfo;
            const response = aiResponseEngine.generateResponse('laptopInfoCollected', laptopInfo);
            responseDisplay.displayResponse(response);
        } else if (currentStep === 3) {
            const response = aiResponseEngine.generateResponse('symptomsGathering');
            responseDisplay.displayResponse(response);
        }
    };

    // Enhance analysis start
    window.startAnalysis = function() {
        const symptoms = Array.from(document.querySelectorAll('input[name="symptoms"]:checked')).map(cb => cb.value);
        const symptomsResponse = aiResponseEngine.generateResponse('symptomsSelected', { symptoms });
        responseDisplay.displayResponse(symptomsResponse);

        setTimeout(() => {
            const analysisResponse = aiResponseEngine.generateResponse('analysisStart');
            responseDisplay.displayResponse(analysisResponse);
            
            setTimeout(() => {
                if (originalStartAnalysis) originalStartAnalysis();
            }, 2000);
        }, 3000);
    };

    // Add progress responses during analysis
    const originalUpdateAnalysisProgress = window.updateAnalysisProgress;
    window.updateAnalysisProgress = function(percentage) {
        if (originalUpdateAnalysisProgress) originalUpdateAnalysisProgress(percentage);
        
        // Add progress responses at key milestones
        if (percentage === 25 || percentage === 50 || percentage === 75) {
            const step = Math.floor(percentage / 25);
            const response = aiResponseEngine.generateProgressResponse({ step, progress: percentage });
            responseDisplay.displayResponse(response);
        }
    };
}

function addResponseStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .ai-response-container {
            max-width: 800px;
            margin: 2rem auto;
            padding: 0 1rem;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.5s ease;
        }
        
        .ai-response-container.active {
            opacity: 1;
            transform: translateY(0);
        }
        
        .ai-response-container {
            display: flex;
            gap: 1rem;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            border: 1px solid #e2e8f0;
        }
        
        .ai-avatar {
            flex-shrink: 0;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.5rem;
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }
        
        .ai-response-content {
            flex: 1;
        }
        
        .ai-response-text {
            background: white;
            border-radius: 15px;
            padding: 1.5rem;
            margin-bottom: 1rem;
            font-size: 1.1rem;
            line-height: 1.6;
            color: #2d3748;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8f0;
        }
        
        .ai-response-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        
        .ai-response-actions .btn {
            border-radius: 20px;
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        }
        
        .ai-response-actions .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .typing-indicator {
            display: flex;
            align-items: center;
            gap: 0.25rem;
        }
        
        .typing-indicator span {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #667eea;
            animation: typing 1.4s infinite ease-in-out;
        }
        
        .typing-indicator span:nth-child(1) {
            animation-delay: -0.32s;
        }
        
        .typing-indicator span:nth-child(2) {
            animation-delay: -0.16s;
        }
        
        @keyframes typing {
            0%, 80%, 100% {
                transform: scale(0.8);
                opacity: 0.5;
            }
            40% {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        @media (max-width: 768px) {
            .ai-response-container {
                flex-direction: column;
                text-align: center;
                padding: 1.5rem;
            }
            
            .ai-avatar {
                align-self: center;
                margin-bottom: 1rem;
            }
            
            .ai-response-actions {
                justify-content: center;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Export functions for global access
window.aiResponseEngine = aiResponseEngine;
window.responseDisplay = responseDisplay;
window.menuResponseSystem = menuResponseSystem;
window.initializeResponseSystem = initializeResponseSystem;