// Complete AI Diagnostics with Interactive Responses - Conflict-Free Version
document.addEventListener('DOMContentLoaded', function() {
    initializeCompleteDiagnostics();
});

// Global variables - declared once
let currentStep = 1;
let diagnosticData = {
    laptopInfo: {},
    symptoms: [],
    analysisResults: null
};

// AI Response Engine
class AIResponseEngine {
    constructor() {
        this.conversationHistory = [];
        this.responseTemplates = {
            greeting: [
                "Hello! I'm your AI diagnostic assistant. I'm here to help identify what's wrong with your laptop and guide you through the process.",
                "Welcome to our advanced AI diagnostics! I'll help you understand what's happening with your laptop in simple terms.",
                "Hi there! Ready to solve your laptop problems? Let's work together to identify and fix the issues."
            ],
            encouragement: [
                "Great choice! This information helps me provide more accurate diagnostics.",
                "Perfect! You're doing great. Every detail helps me understand your laptop better.",
                "Excellent! The more you tell me, the better I can help you."
            ],
            symptomsGathering: [
                "Now, let's identify what's been bothering you about your laptop. Don't worry about technical terms - just describe what you've noticed.",
                "Time to play detective! Tell me about any unusual behavior. Every detail matters.",
                "Let's work together to identify the symptoms. Think about recent changes in performance, sounds, or appearance."
            ],
            analysisStart: [
                "Perfect! I have everything I need. Now I'll analyze your laptop using advanced AI. This will take a moment.",
                "Excellent! Let me analyze these symptoms using multiple AI techniques. I'll keep you updated.",
                "Great! Now for the exciting part - I'll run comprehensive diagnostics on your laptop."
            ],
            resultsIntro: [
                "Analysis complete! I've identified the key issues with your laptop. Let me explain what I found.",
                "Diagnosis finished! Here's what my AI analysis discovered about your laptop's problems.",
                "All done! I've found the likely causes of your issues. Here's what's happening and what we can do."
            ]
        };
        
        this.contextualResponses = {
            brandSpecific: {
                dell: "Dell laptops are known for reliability! Let's get yours back to peak performance.",
                hp: "HP makes solid machines! Your laptop has good potential for recovery.",
                lenovo: "Lenovo laptops are built tough! Let's restore yours to full functionality.",
                apple: "MacBooks are beautifully engineered! Let's keep yours running smoothly."
            },
            ageSpecific: {
                '0-1': "Since your laptop is new, most issues are easily fixable!",
                '1-2': "Your laptop is in its prime! Most problems at this age are software-related.",
                '2-3': "This is a common age for laptops to need some care, but don't worry!",
                '3-5': "Your laptop has served you well! Let's see what we can do to keep it running.",
                '5+': "Your laptop is a veteran! These older machines often just need expert attention."
            }
        };
    }

    generateResponse(context, data = {}) {
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
            case 'resultsReady':
                response = this.getRandomTemplate('resultsIntro');
                break;
            default:
                response = "I'm here to help! Let me know what you'd like to know.";
        }
        
        this.conversationHistory.push({ context, response, timestamp: Date.now() });
        return response;
    }

    generateLaptopInfoResponse(data) {
        const { brand, age } = data;
        let response = this.getRandomTemplate('encouragement') + ' ';
        
        if (this.contextualResponses.brandSpecific[brand]) {
            response += this.contextualResponses.brandSpecific[brand] + ' ';
        }
        
        if (this.contextualResponses.ageSpecific[age]) {
            response += this.contextualResponses.ageSpecific[age];
        }
        
        return response;
    }

    generateSymptomsResponse(data) {
        const { symptoms } = data;
        const count = symptoms.length;
        
        let response = '';
        
        if (count === 1) {
            response = "I see you've selected one symptom. That's a good start! Even single symptoms can tell us a lot.";
        } else if (count === 2) {
            response = "Two symptoms selected. Interesting! These might be related - let me analyze the connection.";
        } else if (count >= 3) {
            response = `${count} symptoms detected. This gives me comprehensive data for accurate diagnostics!`;
        }

        // Add specific insights
        if (symptoms.includes('overheating') && symptoms.includes('loud-fan')) {
            response += " I notice overheating and loud fan noise - these are definitely connected and suggest thermal issues.";
        }

        return response;
    }

    getRandomTemplate(category) {
        const templates = this.responseTemplates[category];
        return templates[Math.floor(Math.random() * templates.length)];
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

// Response Display System
class ResponseDisplaySystem {
    constructor() {
        this.responseContainer = null;
        this.typingSpeed = 30;
        this.isTyping = false;
    }

    initialize() {
        this.createResponseContainer();
    }

    createResponseContainer() {
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
                <div class="ai-response-actions" id="aiResponseActions"></div>
            </div>
        `;

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

        this.showTypingIndicator();
        await this.delay(800);
        await this.typeMessage(message);

        if (actions.length > 0) {
            this.displayActions(actions);
        }

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
}

// Menu Response System
class MenuResponseSystem {
    constructor() {
        this.menuStates = {
            main: {
                title: "How can I help you with your laptop today?",
                options: [
                    { text: "Start Laptop Diagnosis", action: "startDiagnosis", icon: "fa-stethoscope" },
                    { text: "Quick Performance Check", action: "quickCheck", icon: "fa-bolt" },
                    { text: "Get Help & Tips", action: "showHelp", icon: "fa-question-circle" },
                    { text: "Contact Support", action: "contactSupport", icon: "fa-headset" }
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
    }

    displayMenu(menuKey = 'main') {
        const menu = this.menuStates[menuKey];
        if (!menu) return;

        const actions = menu.options.map(option => ({
            text: option.text,
            icon: option.icon,
            style: option.action === 'startDiagnosis' ? 'btn-primary' : 'btn-outline',
            callback: () => this.handleMenuAction(option.action)
        }));

        if (window.responseDisplay) {
            window.responseDisplay.displayResponse(menu.title, actions);
        }
    }

    handleMenuAction(action) {
        switch (action) {
            case 'startDiagnosis':
                this.startDiagnosis();
                break;
            case 'quickCheck':
                this.startQuickCheck();
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
        }
    }

    startDiagnosis() {
        if (window.responseDisplay) {
            window.responseDisplay.displayResponse(
                "Perfect! Let's start with a comprehensive diagnosis. I'll guide you through each step to identify what's wrong with your laptop.",
                [{ text: "Let's Begin!", icon: "fa-play", style: "btn-primary", callback: () => this.beginDiagnosis() }]
            );
        }
    }

    startQuickCheck() {
        if (window.responseDisplay) {
            window.responseDisplay.displayResponse(
                "Great choice! Quick check will focus on the most common issues. This takes about 3 minutes.",
                [{ text: "Start Quick Check", icon: "fa-bolt", style: "btn-primary", callback: () => this.beginDiagnosis() }]
            );
        }
    }

    beginDiagnosis() {
        if (window.responseDisplay) {
            window.responseDisplay.hide();
        }
        
        const diagnosticsInterface = document.querySelector('.diagnostics-interface');
        if (diagnosticsInterface) {
            diagnosticsInterface.scrollIntoView({ behavior: 'smooth' });
        }

        setTimeout(() => {
            if (typeof showNotification === 'function') {
                showNotification('Starting diagnosis! Please fill in the form below.', 'info');
            }
        }, 1000);
    }

    showSymptomHelp() {
        const message = "When describing symptoms, think about: " +
            "🖥️ Display (flickering, black screen, cracks), " +
            "⚡ Performance (slow, freezing, crashes), " +
            "🔧 Hardware (overheating, loud fans, battery), " +
            "📡 Connectivity (WiFi, USB, audio). " +
            "Just describe what you notice - no technical terms needed!";

        if (window.responseDisplay) {
            window.responseDisplay.displayResponse(message, [
                { text: "Start Diagnosis", icon: "fa-play", style: "btn-primary", callback: () => this.startDiagnosis() }
            ]);
        }
    }

    showResultsHelp() {
        const message = "Results include: " +
            "🎯 Confidence (how sure I am), " +
            "⚠️ Urgency (how quickly to act), " +
            "💰 Cost estimates, " +
            "🔧 Solutions. " +
            "Higher confidence means more accurate diagnosis!";

        if (window.responseDisplay) {
            window.responseDisplay.displayResponse(message, [
                { text: "Run Diagnosis", icon: "fa-play", style: "btn-primary", callback: () => this.startDiagnosis() }
            ]);
        }
    }

    showMaintenanceHelp() {
        const message = "Keep your laptop healthy: " +
            "🧹 Clean vents monthly, " +
            "🔄 Restart regularly, " +
            "🌡️ Keep it cool, " +
            "💾 Back up data, " +
            "🔋 Don't drain battery completely. " +
            "Prevention is better than repair!";

        if (window.responseDisplay) {
            window.responseDisplay.displayResponse(message, [
                { text: "Check My Laptop", icon: "fa-stethoscope", style: "btn-primary", callback: () => this.startDiagnosis() }
            ]);
        }
    }

    contactSupport() {
        const message = "Need human help? Our experts are ready! " +
            "📞 Call +91 9884745432, " +
            "💬 WhatsApp for quick questions, " +
            "📧 Email for detailed queries. " +
            "We're here 24/7!";

        if (window.responseDisplay) {
            window.responseDisplay.displayResponse(message, [
                { text: "Call Now", icon: "fa-phone", style: "btn-primary", callback: () => window.open('tel:+919884745432') },
                { text: "WhatsApp", icon: "fa-whatsapp", callback: () => window.open('https://wa.me/919884745432') }
            ]);
        }
    }
}

// Diagnostic Database
const diagnosticDatabase = {
    'screen-black': {
        category: 'Display',
        severity: 'high',
        commonCauses: ['Graphics card failure', 'LCD panel failure', 'Motherboard issue'],
        solutions: ['Screen replacement', 'Graphics card repair', 'RAM testing'],
        estimatedCost: { min: 3000, max: 8000 },
        timeEstimate: '2-4 hours',
        urgency: 'high'
    },
    'screen-flickering': {
        category: 'Display',
        severity: 'medium',
        commonCauses: ['Loose display cable', 'Graphics driver issue', 'LCD degradation'],
        solutions: ['Cable reconnection', 'Driver update', 'Screen replacement'],
        estimatedCost: { min: 1500, max: 5000 },
        timeEstimate: '1-3 hours',
        urgency: 'medium'
    },
    'overheating': {
        category: 'Hardware',
        severity: 'high',
        commonCauses: ['Dust accumulation', 'Fan failure', 'Thermal paste degradation'],
        solutions: ['Deep cleaning', 'Fan replacement', 'Thermal paste replacement'],
        estimatedCost: { min: 800, max: 3000 },
        timeEstimate: '1-3 hours',
        urgency: 'high'
    },
    'slow-performance': {
        category: 'Performance',
        severity: 'medium',
        commonCauses: ['Insufficient RAM', 'Hard drive issues', 'Malware', 'Background processes'],
        solutions: ['RAM upgrade', 'SSD installation', 'System cleanup', 'Malware removal'],
        estimatedCost: { min: 1000, max: 5000 },
        timeEstimate: '1-3 hours',
        urgency: 'low'
    }
    // Add more as needed
};

// Initialize systems
const aiResponseEngine = new AIResponseEngine();
const responseDisplay = new ResponseDisplaySystem();
const menuResponseSystem = new MenuResponseSystem();

// Main initialization function
function initializeCompleteDiagnostics() {
    // Initialize response system
    responseDisplay.initialize();
    
    // Show greeting and menu after a delay
    setTimeout(() => {
        const greeting = aiResponseEngine.getPersonalizedGreeting();
        responseDisplay.displayResponse(greeting).then(() => {
            setTimeout(() => {
                menuResponseSystem.displayMenu('main');
            }, 2000);
        });
    }, 1000);

    // Initialize form functionality
    initializeDiagnosticForm();
    
    // Add styles
    addResponseStyles();
}

// Form functionality
function initializeDiagnosticForm() {
    setupFormValidation();
    setupSymptomSelection();
    updateStepIndicator();
}

function setupFormValidation() {
    const form = document.querySelector('.diagnostic-form');
    if (form) {
        const inputs = form.querySelectorAll('select, input');
        inputs.forEach(input => {
            input.addEventListener('change', validateCurrentStep);
        });
    }
}

function setupSymptomSelection() {
    const symptomCheckboxes = document.querySelectorAll('input[name="symptoms"]');
    symptomCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateSymptomSelection();
            validateCurrentStep();
        });
    });
}

function updateSymptomSelection() {
    const selectedSymptoms = document.querySelectorAll('input[name="symptoms"]:checked');
    const count = selectedSymptoms.length;
    
    const stepHeader = document.querySelector('#step-2 .step-header p');
    if (stepHeader) {
        if (count > 0) {
            stepHeader.textContent = `${count} symptom${count > 1 ? 's' : ''} selected - Great! ${count > 2 ? 'This gives me excellent detail for diagnosis.' : 'Add more if you notice other issues.'}`;
        } else {
            stepHeader.textContent = 'Select all symptoms that match your laptop\'s behavior';
        }
    }
}

function validateCurrentStep() {
    const currentStepElement = document.querySelector(`#step-${currentStep}`);
    const nextButton = currentStepElement?.querySelector('.btn-primary');
    
    let isValid = false;
    
    switch (currentStep) {
        case 1:
            const brand = document.getElementById('laptopBrand')?.value;
            const age = document.getElementById('laptopAge')?.value;
            const usage = document.getElementById('usagePattern')?.value;
            isValid = brand && age && usage;
            break;
        case 2:
            const selectedSymptoms = document.querySelectorAll('input[name="symptoms"]:checked');
            isValid = selectedSymptoms.length > 0;
            break;
        default:
            isValid = true;
    }
    
    if (nextButton) {
        nextButton.disabled = !isValid;
        nextButton.style.opacity = isValid ? '1' : '0.6';
    }
    
    return isValid;
}

function nextStep() {
    if (!validateCurrentStep()) {
        if (typeof showNotification === 'function') {
            showNotification('Please fill in all required fields before proceeding.', 'error');
        }
        return;
    }
    
    saveCurrentStepData();
    
    if (currentStep < 4) {
        currentStep++;
        updateStepDisplay();
        updateStepIndicator();
        
        // Add contextual responses
        if (currentStep === 2) {
            const response = aiResponseEngine.generateResponse('laptopInfoCollected', diagnosticData.laptopInfo);
            responseDisplay.displayResponse(response);
        } else if (currentStep === 3) {
            const response = aiResponseEngine.generateResponse('symptomsGathering');
            responseDisplay.displayResponse(response);
        }
    }
}

function previousStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStepDisplay();
        updateStepIndicator();
    }
}

function saveCurrentStepData() {
    switch (currentStep) {
        case 1:
            diagnosticData.laptopInfo = {
                brand: document.getElementById('laptopBrand')?.value,
                age: document.getElementById('laptopAge')?.value,
                model: document.getElementById('laptopModel')?.value,
                usage: document.getElementById('usagePattern')?.value
            };
            break;
        case 2:
            const selectedSymptoms = document.querySelectorAll('input[name="symptoms"]:checked');
            diagnosticData.symptoms = Array.from(selectedSymptoms).map(cb => cb.value);
            break;
    }
}

function updateStepDisplay() {
    document.querySelectorAll('.diagnostic-step').forEach(step => {
        step.classList.remove('active');
    });
    
    const currentStepElement = document.querySelector(`#step-${currentStep}`);
    if (currentStepElement) {
        currentStepElement.classList.add('active');
    }
    
    setTimeout(validateCurrentStep, 100);
}

function updateStepIndicator() {
    document.querySelectorAll('.step').forEach((step, index) => {
        const stepNumber = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNumber < currentStep) {
            step.classList.add('completed');
        } else if (stepNumber === currentStep) {
            step.classList.add('active');
        }
    });
}

function startAnalysis() {
    if (!validateCurrentStep()) {
        if (typeof showNotification === 'function') {
            showNotification('Please select at least one symptom to continue.', 'error');
        }
        return;
    }
    
    saveCurrentStepData();
    
    // Show response about starting analysis
    const symptomsResponse = aiResponseEngine.generateResponse('symptomsSelected', { symptoms: diagnosticData.symptoms });
    responseDisplay.displayResponse(symptomsResponse);

    setTimeout(() => {
        const analysisResponse = aiResponseEngine.generateResponse('analysisStart');
        responseDisplay.displayResponse(analysisResponse);
        
        setTimeout(() => {
            currentStep = 3;
            updateStepDisplay();
            updateStepIndicator();
            runAIAnalysis();
        }, 2000);
    }, 3000);
}

function runAIAnalysis() {
    const analysisSteps = [
        { id: 'analysis-1', duration: 2000 },
        { id: 'analysis-2', duration: 1500 },
        { id: 'analysis-3', duration: 2500 },
        { id: 'analysis-4', duration: 1800 }
    ];
    
    let currentAnalysisStep = 0;
    let totalProgress = 0;
    
    function runNextAnalysisStep() {
        if (currentAnalysisStep < analysisSteps.length) {
            const step = analysisSteps[currentAnalysisStep];
            const stepElement = document.getElementById(step.id);
            
            if (stepElement) {
                const statusIcon = stepElement.querySelector('.step-status i');
                statusIcon.className = 'fas fa-spinner fa-spin';
                
                setTimeout(() => {
                    statusIcon.className = 'fas fa-check';
                    statusIcon.style.color = '#22c55e';
                    
                    totalProgress = ((currentAnalysisStep + 1) / analysisSteps.length) * 100;
                    updateAnalysisProgress(totalProgress);
                    
                    currentAnalysisStep++;
                    
                    if (currentAnalysisStep < analysisSteps.length) {
                        runNextAnalysisStep();
                    } else {
                        setTimeout(() => {
                            completeAnalysis();
                        }, 500);
                    }
                }, step.duration);
            }
        }
    }
    
    runNextAnalysisStep();
}

function updateAnalysisProgress(percentage) {
    const progressFill = document.getElementById('analysisProgress');
    const progressText = document.getElementById('progressPercentage');
    
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }
    if (progressText) {
        progressText.textContent = Math.round(percentage) + '%';
    }
}

function completeAnalysis() {
    diagnosticData.analysisResults = generateAIResults();
    
    currentStep = 4;
    updateStepDisplay();
    updateStepIndicator();
    
    // Show results response
    const resultsResponse = aiResponseEngine.generateResponse('resultsReady');
    responseDisplay.displayResponse(resultsResponse);
    
    setTimeout(() => {
        displayResults();
    }, 2000);
}

function generateAIResults() {
    const symptoms = diagnosticData.symptoms;
    const laptopInfo = diagnosticData.laptopInfo;
    
    let primaryIssues = [];
    let totalCostMin = 0;
    let totalCostMax = 0;
    let highestUrgency = 'low';
    
    symptoms.forEach(symptom => {
        const issue = diagnosticDatabase[symptom];
        if (issue) {
            const analysisResult = {
                symptom: symptom,
                ...issue,
                confidence: calculateConfidence(symptom, laptopInfo)
            };
            
            primaryIssues.push(analysisResult);
            totalCostMin += issue.estimatedCost.min;
            totalCostMax += issue.estimatedCost.max;
            
            if (issue.urgency === 'high') highestUrgency = 'high';
            else if (issue.urgency === 'medium' && highestUrgency !== 'high') highestUrgency = 'medium';
        }
    });
    
    primaryIssues.sort((a, b) => b.confidence - a.confidence);
    
    return {
        primaryIssues,
        totalCostEstimate: { min: totalCostMin, max: totalCostMax },
        urgency: highestUrgency,
        confidence: calculateOverallConfidence(primaryIssues),
        estimatedRepairTime: calculateTotalTime(primaryIssues)
    };
}

function calculateConfidence(symptom, laptopInfo) {
    let confidence = 0.8;
    
    if (laptopInfo.age === '5+') {
        confidence += 0.1;
    } else if (laptopInfo.age === '0-1') {
        confidence -= 0.1;
    }
    
    if (laptopInfo.usage === 'heavy' || laptopInfo.usage === 'professional') {
        confidence += 0.05;
    }
    
    return Math.min(confidence, 0.95);
}

function calculateOverallConfidence(primaryIssues) {
    if (primaryIssues.length === 0) return 0.5;
    return primaryIssues.reduce((sum, issue) => sum + issue.confidence, 0) / primaryIssues.length;
}

function calculateTotalTime(issues) {
    let maxHours = 0;
    issues.forEach(issue => {
        const timeStr = issue.timeEstimate;
        const hours = parseInt(timeStr.split('-')[1] || timeStr.split(' ')[0]);
        maxHours = Math.max(maxHours, hours);
    });
    return maxHours + ' hours';
}

function displayResults() {
    const resultsContainer = document.getElementById('resultsContainer');
    const results = diagnosticData.analysisResults;
    
    if (!resultsContainer || !results) return;
    
    let html = `
        <div class="results-summary">
            <div class="summary-card">
                <div class="summary-icon ${results.urgency}">
                    <i class="fas ${getUrgencyIcon(results.urgency)}"></i>
                </div>
                <div class="summary-info">
                    <h3>AI Diagnosis Complete</h3>
                    <p class="confidence-score">AI Confidence: ${Math.round(results.confidence * 100)}%</p>
                    <p class="urgency-level ${results.urgency}">Priority: ${results.urgency.toUpperCase()}</p>
                </div>
            </div>
            
            <div class="cost-estimate">
                <h4><i class="fas fa-rupee-sign"></i> Estimated Cost</h4>
                <div class="cost-range">
                    <span class="cost-min">₹${results.totalCostEstimate.min.toLocaleString()}</span>
                    <span class="cost-separator">-</span>
                    <span class="cost-max">₹${results.totalCostEstimate.max.toLocaleString()}</span>
                </div>
                <small>Estimated repair time: ${results.estimatedRepairTime}</small>
            </div>
        </div>
    `;
    
    if (results.primaryIssues.length > 0) {
        html += `
            <div class="issues-section">
                <h3><i class="fas fa-exclamation-triangle"></i> Issues Detected</h3>
                <div class="issues-list">
        `;
        
        results.primaryIssues.forEach(issue => {
            html += createIssueCard(issue);
        });
        
        html += `</div></div>`;
    }
    
    resultsContainer.innerHTML = html;
}

function createIssueCard(issue) {
    const symptomName = getSymptomDisplayName(issue.symptom);
    const confidencePercentage = Math.round(issue.confidence * 100);
    
    return `
        <div class="issue-card primary">
            <div class="issue-header">
                <div class="issue-title">
                    <h4>${symptomName}</h4>
                    <span class="confidence-badge">${confidencePercentage}% confidence</span>
                </div>
                <div class="severity-badge ${issue.severity}">
                    ${issue.severity.toUpperCase()}
                </div>
            </div>
            
            <div class="issue-details">
                <div class="detail-section">
                    <strong>Likely Causes:</strong>
                    <ul>
                        ${issue.commonCauses.map(cause => `<li>${cause}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="detail-section">
                    <strong>Recommended Solutions:</strong>
                    <ul>
                        ${issue.solutions.map(solution => `<li>${solution}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="issue-footer">
                    <div class="cost-info">
                        <i class="fas fa-rupee-sign"></i>
                        ₹${issue.estimatedCost.min.toLocaleString()} - ₹${issue.estimatedCost.max.toLocaleString()}
                    </div>
                    <div class="time-info">
                        <i class="fas fa-clock"></i>
                        ${issue.timeEstimate}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getSymptomDisplayName(symptom) {
    const displayNames = {
        'screen-black': 'Black/Blank Screen',
        'screen-flickering': 'Screen Flickering',
        'screen-cracked': 'Cracked Screen',
        'screen-dim': 'Dim Display',
        'slow-performance': 'Slow Performance',
        'frequent-freezing': 'Frequent Freezing',
        'random-crashes': 'Random Crashes',
        'slow-startup': 'Slow Startup',
        'overheating': 'Overheating',
        'loud-fan': 'Loud Fan Noise',
        'battery-issues': 'Battery Problems',
        'keyboard-issues': 'Keyboard Issues',
        'wifi-problems': 'WiFi Problems',
        'usb-issues': 'USB Issues',
        'audio-problems': 'Audio Problems',
        'bluetooth-issues': 'Bluetooth Issues'
    };
    
    return displayNames[symptom] || symptom;
}

function getUrgencyIcon(urgency) {
    switch (urgency) {
        case 'high': return 'fa-exclamation-triangle';
        case 'medium': return 'fa-exclamation-circle';
        default: return 'fa-info-circle';
    }
}

function bookService() {
    const results = diagnosticData.analysisResults;
    const message = `AI Diagnosis Results:
    
Laptop: ${diagnosticData.laptopInfo.brand} ${diagnosticData.laptopInfo.model || ''}
Age: ${diagnosticData.laptopInfo.age} years
Usage: ${diagnosticData.laptopInfo.usage}

Primary Issues Detected:
${results.primaryIssues.map(issue => `• ${getSymptomDisplayName(issue.symptom)} (${Math.round(issue.confidence * 100)}% confidence)`).join('\n')}

Estimated Cost: ₹${results.totalCostEstimate.min.toLocaleString()} - ₹${results.totalCostEstimate.max.toLocaleString()}
Priority: ${results.urgency.toUpperCase()}

Please schedule a technician visit for professional repair.`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/918667018453?text=${encodedMessage}`, '_blank');
    
    if (typeof showNotification === 'function') {
        showNotification('Diagnosis summary sent! Our team will contact you shortly.', 'success');
    }
}

function restartDiagnostics() {
    currentStep = 1;
    diagnosticData = {
        laptopInfo: {},
        symptoms: [],
        analysisResults: null
    };
    
    document.querySelectorAll('input, select').forEach(input => {
        if (input.type === 'checkbox') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });
    
    updateStepDisplay();
    updateStepIndicator();
    updateSymptomSelection();
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (typeof showNotification === 'function') {
        showNotification('Diagnostics reset. You can start a new analysis.', 'info');
    }
}

function shareResults() {
    const results = diagnosticData.analysisResults;
    
    if (navigator.share) {
        navigator.share({
            title: 'AI Laptop Diagnostics Results',
            text: `My laptop diagnosis shows ${results.primaryIssues.length} primary issues with ${Math.round(results.confidence * 100)}% AI confidence.`,
            url: window.location.href
        });
    } else {
        const shareText = `AI Laptop Diagnostics Results:
        
${results.primaryIssues.length} primary issues detected
AI Confidence: ${Math.round(results.confidence * 100)}%
Estimated Cost: ₹${results.totalCostEstimate.min.toLocaleString()} - ₹${results.totalCostEstimate.max.toLocaleString()}
Priority: ${results.urgency.toUpperCase()}

Get your laptop diagnosed at: ${window.location.origin}`;
        
        navigator.clipboard.writeText(shareText).then(() => {
            if (typeof showNotification === 'function') {
                showNotification('Results copied to clipboard!', 'success');
            }
        }).catch(() => {
            if (typeof showNotification === 'function') {
                showNotification('Unable to copy results. Please try again.', 'error');
            }
        });
    }
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
window.nextStep = nextStep;
window.previousStep = previousStep;
window.startAnalysis = startAnalysis;
window.bookService = bookService;
window.restartDiagnostics = restartDiagnostics;
window.shareResults = shareResults;
window.responseDisplay = responseDisplay;
window.menuResponseSystem = menuResponseSystem;
window.aiResponseEngine = aiResponseEngine;