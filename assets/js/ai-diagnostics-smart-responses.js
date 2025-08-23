// Smart AI Diagnostics Response Enhancement
document.addEventListener('DOMContentLoaded', function() {
    initializeSmartResponses();
});

// Smart Response Engine with Context Awareness
class SmartResponseEngine {
    constructor() {
        this.contextHistory = [];
        this.userBehavior = {
            hesitationPoints: [],
            quickSelections: [],
            timeSpent: {},
            preferredOptions: []
        };
        this.smartSuggestions = this.initializeSmartSuggestions();
        this.contextualHelp = this.initializeContextualHelp();
        this.proactiveResponses = this.initializeProactiveResponses();
    }

    initializeSmartSuggestions() {
        return {
            brandBased: {
                dell: [
                    "Dell laptops often have excellent diagnostic tools built-in. Have you tried running Dell SupportAssist?",
                    "Dell's thermal management is usually robust. If you're experiencing overheating, it might be dust accumulation.",
                    "Dell laptops typically have good warranty support. Check if your issue is covered!"
                ],
                hp: [
                    "HP laptops sometimes have specific driver quirks. Make sure all drivers are updated from HP's official site.",
                    "HP's cooling systems can be sensitive to dust. Regular cleaning helps maintain performance.",
                    "HP Support Assistant can provide additional diagnostics specific to your model."
                ],
                lenovo: [
                    "Lenovo ThinkPads are built for durability! Most issues are software-related and easily fixable.",
                    "Lenovo Vantage software provides excellent system optimization tools.",
                    "ThinkPad keyboards are legendary - if you're having key issues, it's usually just cleaning needed."
                ],
                apple: [
                    "MacBooks have excellent built-in diagnostics. Try holding D while starting up for Apple Diagnostics.",
                    "Apple's thermal design is precise - overheating usually indicates blocked vents or failing fans.",
                    "macOS has great built-in maintenance tools. Try First Aid in Disk Utility for storage issues."
                ]
            },
            symptomCombinations: {
                'overheating+loud-fan': [
                    "This combination strongly suggests thermal throttling. Your laptop is working hard to cool itself down.",
                    "I recommend immediate cleaning of vents and fans. This is often a quick fix that makes a huge difference.",
                    "Consider using a laptop cooling pad as a temporary solution while we address the root cause."
                ],
                'slow-performance+frequent-freezing': [
                    "These symptoms together often point to memory (RAM) issues or storage problems.",
                    "Try closing unnecessary programs and check if the issue persists in Safe Mode.",
                    "A memory test might be helpful - I can guide you through running one."
                ],
                'screen-black+random-crashes': [
                    "This combination is concerning and suggests possible graphics card or motherboard issues.",
                    "Try connecting an external monitor to see if the display works - this helps isolate the problem.",
                    "This might need professional attention, but let's gather more information first."
                ]
            },
            usagePatterns: {
                heavy: [
                    "Heavy usage puts stress on components. Regular maintenance becomes even more important.",
                    "Consider upgrading RAM or switching to an SSD if you haven't already - it makes a huge difference for heavy users.",
                    "Thermal management is crucial for heavy usage. Make sure vents are clean and airflow is unobstructed."
                ],
                professional: [
                    "Professional use requires reliability. I'll prioritize solutions that minimize downtime.",
                    "Consider having a backup plan ready while we address these issues.",
                    "Professional users often benefit from preventive maintenance schedules."
                ]
            }
        };
    }

    initializeContextualHelp() {
        return {
            stepSpecific: {
                1: {
                    hesitation: "Take your time! If you're not sure about your laptop's age, check the purchase date or look for a manufacturing sticker.",
                    encouragement: "Great start! This basic information helps me tailor my analysis to your specific laptop.",
                    tips: "💡 Tip: The more accurate this information, the better my diagnosis will be!"
                },
                2: {
                    hesitation: "Don't worry if you're not sure about technical terms. Just describe what you've noticed in your own words.",
                    encouragement: "Perfect! You're helping me understand exactly what's happening with your laptop.",
                    tips: "💡 Tip: Even small symptoms can be important clues. Select anything that seems unusual."
                },
                3: {
                    encouragement: "Excellent! Now I'm analyzing all this information using advanced AI algorithms.",
                    tips: "💡 Tip: This analysis considers thousands of similar cases to provide accurate results."
                }
            },
            commonQuestions: {
                "What if I'm not sure about a symptom?": "It's better to include it if you're unsure. I can determine relevance during analysis.",
                "How accurate are these diagnostics?": "My accuracy improves with more information. I'm typically 85-95% accurate with complete data.",
                "What if my laptop has multiple problems?": "That's common! I'm designed to identify multiple issues and their relationships.",
                "Should I try to fix things myself?": "I'll provide clear guidance on what's safe to try yourself vs. what needs professional help."
            }
        };
    }

    initializeProactiveResponses() {
        return {
            timeBasedTriggers: {
                longPause: "Take your time! If you need help understanding any of these options, just let me know.",
                quickSelection: "I see you're moving quickly! That's great - you seem to know what you're looking for.",
                backAndForth: "I notice you're reconsidering some options. That's perfectly normal - accuracy is more important than speed."
            },
            behaviorBasedTriggers: {
                manySymptoms: "I see you've selected quite a few symptoms. This actually helps me provide more accurate diagnostics!",
                fewSymptoms: "Even with just a few symptoms, I can often identify the root cause. Quality over quantity!",
                contradictorySymptoms: "Some of these symptoms seem contradictory. Let me help you think through what you're experiencing."
            }
        };
    }

    generateSmartResponse(context, data = {}) {
        let response = '';
        const { step, symptoms, laptopInfo, userBehavior } = data;

        switch (context) {
            case 'brandSpecificAdvice':
                response = this.getBrandSpecificAdvice(laptopInfo.brand);
                break;
            case 'symptomCombinationInsight':
                response = this.getSymptomCombinationInsight(symptoms);
                break;
            case 'proactiveHelp':
                response = this.getProactiveHelp(userBehavior);
                break;
            case 'contextualEncouragement':
                response = this.getContextualEncouragement(step, data);
                break;
            case 'smartSuggestion':
                response = this.getSmartSuggestion(data);
                break;
            default:
                response = this.getGenericHelpfulResponse();
        }

        this.contextHistory.push({ context, response, timestamp: Date.now(), data });
        return response;
    }

    getBrandSpecificAdvice(brand) {
        const advice = this.smartSuggestions.brandBased[brand];
        return advice ? advice[Math.floor(Math.random() * advice.length)] : '';
    }

    getSymptomCombinationInsight(symptoms) {
        // Check for common symptom combinations
        const combinations = Object.keys(this.smartSuggestions.symptomCombinations);
        
        for (const combo of combinations) {
            const comboSymptoms = combo.split('+');
            if (comboSymptoms.every(symptom => symptoms.includes(symptom))) {
                const insights = this.smartSuggestions.symptomCombinations[combo];
                return insights[Math.floor(Math.random() * insights.length)];
            }
        }
        
        return '';
    }

    getProactiveHelp(behavior) {
        if (behavior.hesitating) {
            return this.proactiveResponses.timeBasedTriggers.longPause;
        } else if (behavior.quick) {
            return this.proactiveResponses.timeBasedTriggers.quickSelection;
        }
        return '';
    }

    getContextualEncouragement(step, data) {
        const stepHelp = this.contextualHelp.stepSpecific[step];
        if (!stepHelp) return '';

        if (data.hesitating) {
            return stepHelp.hesitation;
        } else {
            return stepHelp.encouragement + ' ' + stepHelp.tips;
        }
    }

    getSmartSuggestion(data) {
        const suggestions = [];
        
        // Add usage-based suggestions
        if (data.laptopInfo && data.laptopInfo.usage) {
            const usageSuggestions = this.smartSuggestions.usagePatterns[data.laptopInfo.usage];
            if (usageSuggestions) {
                suggestions.push(...usageSuggestions);
            }
        }

        // Add symptom-based suggestions
        if (data.symptoms && data.symptoms.length > 0) {
            if (data.symptoms.includes('overheating')) {
                suggestions.push("🌡️ Overheating can cause permanent damage. Let's address this quickly!");
            }
            if (data.symptoms.includes('slow-performance')) {
                suggestions.push("⚡ Slow performance is often fixable with the right approach. Don't give up on your laptop yet!");
            }
        }

        return suggestions.length > 0 ? suggestions[Math.floor(Math.random() * suggestions.length)] : '';
    }

    getGenericHelpfulResponse() {
        const responses = [
            "I'm here to help you understand what's happening with your laptop.",
            "Every piece of information you provide helps me give you better advice.",
            "Don't worry - most laptop issues are more common than you think and often fixable!"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

// Interactive Guidance System
class InteractiveGuidanceSystem {
    constructor() {
        this.currentStep = 1;
        this.userInteractionTimes = {};
        this.hesitationThreshold = 30000; // 30 seconds
        this.guidanceActive = true;
        this.smartEngine = new SmartResponseEngine();
    }

    trackUserInteraction(step, action) {
        const now = Date.now();
        
        if (!this.userInteractionTimes[step]) {
            this.userInteractionTimes[step] = { start: now, actions: [] };
        }
        
        this.userInteractionTimes[step].actions.push({
            action,
            timestamp: now,
            timeFromStart: now - this.userInteractionTimes[step].start
        });

        this.analyzeUserBehavior(step);
    }

    analyzeUserBehavior(step) {
        const stepData = this.userInteractionTimes[step];
        if (!stepData) return;

        const timeSpent = Date.now() - stepData.start;
        const actionCount = stepData.actions.length;

        // Detect hesitation
        if (timeSpent > this.hesitationThreshold && actionCount < 2) {
            this.offerContextualHelp(step, 'hesitation');
        }

        // Detect quick progression
        if (timeSpent < 5000 && actionCount > 3) {
            this.offerContextualHelp(step, 'quick');
        }

        // Detect back-and-forth behavior
        if (actionCount > 5 && timeSpent > 20000) {
            this.offerContextualHelp(step, 'indecision');
        }
    }

    offerContextualHelp(step, behaviorType) {
        if (!this.guidanceActive) return;

        const helpData = {
            step,
            hesitating: behaviorType === 'hesitation',
            quick: behaviorType === 'quick',
            indecisive: behaviorType === 'indecision'
        };

        const response = this.smartEngine.generateSmartResponse('contextualEncouragement', helpData);
        
        if (response && window.responseDisplay) {
            window.responseDisplay.displayResponse(response, [
                { text: "Thanks, I'm good!", icon: "fa-thumbs-up", callback: () => this.dismissHelp() },
                { text: "I need more help", icon: "fa-question", callback: () => this.showDetailedHelp(step) }
            ]);
        }
    }

    showDetailedHelp(step) {
        const helpContent = this.getDetailedHelpForStep(step);
        if (window.responseDisplay) {
            window.responseDisplay.displayResponse(helpContent.message, helpContent.actions);
        }
    }

    getDetailedHelpForStep(step) {
        const helpContent = {
            1: {
                message: "Let me help you with the basic information: " +
                    "🏷️ Brand: Look for the logo on your laptop (Dell, HP, Lenovo, etc.) " +
                    "📅 Age: Check your purchase receipt or look for a manufacturing date sticker " +
                    "💻 Model: Often found on a sticker on the bottom of your laptop " +
                    "🎯 Usage: Think about what you primarily use your laptop for",
                actions: [
                    { text: "I found the info!", icon: "fa-check", callback: () => this.dismissHelp() },
                    { text: "Still need help", icon: "fa-headset", callback: () => this.contactSupport() }
                ]
            },
            2: {
                message: "Symptom selection tips: " +
                    "🔍 Look for patterns: Do problems happen at specific times? " +
                    "👂 Listen: Unusual sounds, fan noise, clicking " +
                    "👀 Observe: Screen issues, slow responses, error messages " +
                    "🤚 Feel: Excessive heat, vibrations, loose parts " +
                    "Remember: It's better to include a symptom you're unsure about than to miss an important clue!",
                actions: [
                    { text: "That helps!", icon: "fa-lightbulb", callback: () => this.dismissHelp() },
                    { text: "Show examples", icon: "fa-list", callback: () => this.showSymptomExamples() }
                ]
            }
        };

        return helpContent[step] || {
            message: "I'm here to help! What specific question do you have?",
            actions: [{ text: "Continue", icon: "fa-arrow-right", callback: () => this.dismissHelp() }]
        };
    }

    showSymptomExamples() {
        const examples = "Here are some common symptom examples: " +
            "🖥️ Display: 'Screen goes black randomly', 'Colors look weird', 'Screen has lines' " +
            "⚡ Performance: 'Takes forever to start', 'Freezes when I open programs', 'Very slow typing response' " +
            "🔧 Hardware: 'Gets very hot on my lap', 'Fan sounds like a jet engine', 'Battery dies quickly' " +
            "📡 Connectivity: 'WiFi keeps disconnecting', 'USB devices don't work', 'No sound from speakers'";

        if (window.responseDisplay) {
            window.responseDisplay.displayResponse(examples, [
                { text: "Now I understand!", icon: "fa-check", style: "btn-primary", callback: () => this.dismissHelp() }
            ]);
        }
    }

    dismissHelp() {
        this.guidanceActive = false;
        setTimeout(() => { this.guidanceActive = true; }, 60000); // Re-enable after 1 minute
        if (window.responseDisplay) {
            window.responseDisplay.hide();
        }
    }

    contactSupport() {
        if (window.menuResponseSystem) {
            window.menuResponseSystem.contactSupport();
        }
    }
}

// Enhanced Form Interaction Tracker
class FormInteractionTracker {
    constructor() {
        this.interactions = {};
        this.guidanceSystem = new InteractiveGuidanceSystem();
        this.smartEngine = new SmartResponseEngine();
    }

    initialize() {
        this.trackFormInteractions();
        this.addSmartValidation();
        this.addContextualHints();
    }

    trackFormInteractions() {
        // Track laptop info form
        const laptopForm = document.querySelector('#step-1 .diagnostic-form');
        if (laptopForm) {
            laptopForm.addEventListener('change', (e) => {
                this.guidanceSystem.trackUserInteraction(1, 'form_change');
                this.handleLaptopInfoChange(e);
            });
        }

        // Track symptom selection
        const symptomCheckboxes = document.querySelectorAll('input[name="symptoms"]');
        symptomCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.guidanceSystem.trackUserInteraction(2, 'symptom_change');
                this.handleSymptomChange(e);
            });
        });
    }

    handleLaptopInfoChange(event) {
        const formData = this.getCurrentFormData();
        
        // Provide brand-specific advice when brand is selected
        if (event.target.id === 'laptopBrand' && event.target.value) {
            const advice = this.smartEngine.generateSmartResponse('brandSpecificAdvice', { 
                laptopInfo: { brand: event.target.value } 
            });
            
            if (advice && window.responseDisplay) {
                setTimeout(() => {
                    window.responseDisplay.displayResponse(advice);
                }, 1000);
            }
        }

        // Provide usage-specific suggestions
        if (event.target.id === 'usagePattern' && event.target.value) {
            const suggestion = this.smartEngine.generateSmartResponse('smartSuggestion', {
                laptopInfo: { usage: event.target.value }
            });
            
            if (suggestion && window.responseDisplay) {
                setTimeout(() => {
                    window.responseDisplay.displayResponse(suggestion);
                }, 1500);
            }
        }
    }

    handleSymptomChange(event) {
        const selectedSymptoms = Array.from(document.querySelectorAll('input[name="symptoms"]:checked'))
            .map(cb => cb.value);

        // Provide insights for symptom combinations
        if (selectedSymptoms.length >= 2) {
            const insight = this.smartEngine.generateSmartResponse('symptomCombinationInsight', {
                symptoms: selectedSymptoms
            });
            
            if (insight && window.responseDisplay) {
                setTimeout(() => {
                    window.responseDisplay.displayResponse(insight);
                }, 2000);
            }
        }

        // Update symptom count with encouraging message
        this.updateSymptomCount(selectedSymptoms.length);
    }

    updateSymptomCount(count) {
        const stepHeader = document.querySelector('#step-2 .step-header p');
        if (stepHeader) {
            let message = '';
            if (count === 0) {
                message = 'Select all symptoms that match your laptop\'s behavior';
            } else if (count === 1) {
                message = '1 symptom selected - Great start! Add more if you notice other issues';
            } else if (count <= 3) {
                message = `${count} symptoms selected - Perfect! This gives me good insight`;
            } else if (count <= 5) {
                message = `${count} symptoms selected - Excellent detail! This helps ensure accurate diagnosis`;
            } else {
                message = `${count} symptoms selected - Very comprehensive! I should be able to provide precise results`;
            }
            stepHeader.textContent = message;
        }
    }

    addSmartValidation() {
        // Add intelligent validation messages
        const nextButtons = document.querySelectorAll('.btn-primary');
        nextButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (button.disabled) {
                    this.showSmartValidationMessage(e);
                }
            });
        });
    }

    showSmartValidationMessage(event) {
        const step = this.getCurrentStep();
        let message = '';

        if (step === 1) {
            message = "I need a bit more information to provide accurate diagnostics. Please fill in the required fields - it only takes a moment!";
        } else if (step === 2) {
            message = "Please select at least one symptom so I can help diagnose your laptop. Even if you're not sure, it's better to include symptoms you've noticed.";
        }

        if (message && window.responseDisplay) {
            window.responseDisplay.displayResponse(message, [
                { text: "I'll fill it out", icon: "fa-edit", style: "btn-primary", callback: () => window.responseDisplay.hide() }
            ]);
        }
    }

    addContextualHints() {
        // Add helpful hints that appear on focus
        const inputs = document.querySelectorAll('select, input');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                this.showContextualHint(input);
            });
        });
    }

    showContextualHint(input) {
        const hints = {
            'laptopBrand': 'Look for the brand logo on your laptop lid or keyboard area',
            'laptopAge': 'Check your purchase receipt or estimate based on when you bought it',
            'laptopModel': 'Often found on a sticker on the bottom of your laptop (optional but helpful)',
            'usagePattern': 'Think about your typical daily laptop activities'
        };

        const hint = hints[input.id];
        if (hint) {
            // Show hint as a tooltip or small message
            this.showTooltip(input, hint);
        }
    }

    showTooltip(element, message) {
        // Create and show a temporary tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'smart-tooltip';
        tooltip.textContent = message;
        tooltip.style.cssText = `
            position: absolute;
            background: #333;
            color: white;
            padding: 0.5rem;
            border-radius: 4px;
            font-size: 0.8rem;
            z-index: 1000;
            max-width: 200px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;

        document.body.appendChild(tooltip);

        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.bottom + 5) + 'px';

        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 3000);
    }

    getCurrentFormData() {
        return {
            brand: document.getElementById('laptopBrand')?.value,
            age: document.getElementById('laptopAge')?.value,
            model: document.getElementById('laptopModel')?.value,
            usage: document.getElementById('usagePattern')?.value
        };
    }

    getCurrentStep() {
        const activeStep = document.querySelector('.diagnostic-step.active');
        return activeStep ? parseInt(activeStep.id.split('-')[1]) : 1;
    }
}

// Initialize smart response system
const smartResponseEngine = new SmartResponseEngine();
const interactiveGuidance = new InteractiveGuidanceSystem();
const formTracker = new FormInteractionTracker();

function initializeSmartResponses() {
    // Initialize form tracking
    formTracker.initialize();
    
    // Add smart response styles
    addSmartResponseStyles();
    
    // Enhance existing response system
    enhanceExistingResponses();
}

function enhanceExistingResponses() {
    // Enhance the existing response system with smart features
    if (window.aiResponseEngine) {
        // Add smart suggestions to existing responses
        const originalGenerateResponse = window.aiResponseEngine.generateResponse;
        window.aiResponseEngine.generateResponse = function(context, data) {
            let response = originalGenerateResponse.call(this, context, data);
            
            // Add smart enhancements
            const smartAddition = smartResponseEngine.generateSmartResponse(context, data);
            if (smartAddition) {
                response += ' ' + smartAddition;
            }
            
            return response;
        };
    }
}

function addSmartResponseStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .smart-tooltip {
            animation: fadeInUp 0.3s ease;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .symptom-option:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transition: all 0.2s ease;
        }
        
        .diagnostic-form select:focus,
        .diagnostic-form input:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            outline: none;
        }
        
        .step-header p {
            transition: all 0.3s ease;
            font-weight: 500;
        }
        
        .ai-response-container.smart-mode {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border-left: 4px solid #0ea5e9;
        }
    `;
    
    document.head.appendChild(style);
}

// Export for global access
window.smartResponseEngine = smartResponseEngine;
window.interactiveGuidance = interactiveGuidance;
window.formTracker = formTracker;
window.initializeSmartResponses = initializeSmartResponses;