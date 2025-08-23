// AI Diagnostics functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeDiagnostics();
});

let currentStep = 1;
let diagnosticData = {
    laptopInfo: {},
    symptoms: [],
    analysisResults: null
};

// Diagnostic problem database with AI-like analysis
const diagnosticDatabase = {
    'screen-black': {
        category: 'Display',
        severity: 'high',
        commonCauses: ['Graphics card failure', 'LCD panel failure', 'Motherboard issue', 'RAM problem'],
        solutions: ['Screen replacement', 'Graphics card repair', 'RAM testing'],
        estimatedCost: { min: 3000, max: 8000 },
        timeEstimate: '2-4 hours',
        urgency: 'high'
    },
    'screen-flickering': {
        category: 'Display',
        severity: 'medium',
        commonCauses: ['Loose display cable', 'Graphics driver issue', 'LCD panel degradation'],
        solutions: ['Cable reconnection', 'Driver update', 'Screen replacement'],
        estimatedCost: { min: 1500, max: 5000 },
        timeEstimate: '1-3 hours',
        urgency: 'medium'
    },
    'screen-cracked': {
        category: 'Display',
        severity: 'high',
        commonCauses: ['Physical damage', 'Impact damage'],
        solutions: ['Screen replacement', 'LCD panel replacement'],
        estimatedCost: { min: 4000, max: 7000 },
        timeEstimate: '2-3 hours',
        urgency: 'high'
    },
    'screen-dim': {
        category: 'Display',
        severity: 'medium',
        commonCauses: ['Backlight failure', 'Inverter issue', 'Display cable problem'],
        solutions: ['Backlight replacement', 'Inverter repair', 'Cable replacement'],
        estimatedCost: { min: 2000, max: 4500 },
        timeEstimate: '2-4 hours',
        urgency: 'medium'
    },
    'slow-performance': {
        category: 'Performance',
        severity: 'medium',
        commonCauses: ['Insufficient RAM', 'Hard drive issues', 'Malware', 'Background processes'],
        solutions: ['RAM upgrade', 'SSD installation', 'System cleanup', 'Malware removal'],
        estimatedCost: { min: 1000, max: 5000 },
        timeEstimate: '1-3 hours',
        urgency: 'low'
    },
    'frequent-freezing': {
        category: 'Performance',
        severity: 'high',
        commonCauses: ['RAM failure', 'Overheating', 'Hard drive failure', 'Software corruption'],
        solutions: ['RAM replacement', 'Cooling system repair', 'Hard drive replacement', 'OS reinstall'],
        estimatedCost: { min: 1500, max: 6000 },
        timeEstimate: '2-5 hours',
        urgency: 'high'
    },
    'random-crashes': {
        category: 'Performance',
        severity: 'high',
        commonCauses: ['Hardware failure', 'Driver issues', 'Overheating', 'Power supply problems'],
        solutions: ['Hardware diagnostics', 'Driver updates', 'Cooling repair', 'Power system check'],
        estimatedCost: { min: 2000, max: 7000 },
        timeEstimate: '3-6 hours',
        urgency: 'high'
    },
    'slow-startup': {
        category: 'Performance',
        severity: 'low',
        commonCauses: ['Hard drive fragmentation', 'Too many startup programs', 'Old hard drive'],
        solutions: ['Disk cleanup', 'Startup optimization', 'SSD upgrade'],
        estimatedCost: { min: 500, max: 4000 },
        timeEstimate: '1-2 hours',
        urgency: 'low'
    },
    'overheating': {
        category: 'Hardware',
        severity: 'high',
        commonCauses: ['Dust accumulation', 'Fan failure', 'Thermal paste degradation', 'Blocked vents'],
        solutions: ['Deep cleaning', 'Fan replacement', 'Thermal paste replacement', 'Vent cleaning'],
        estimatedCost: { min: 800, max: 3000 },
        timeEstimate: '1-3 hours',
        urgency: 'high'
    },
    'loud-fan': {
        category: 'Hardware',
        severity: 'medium',
        commonCauses: ['Dust in fan', 'Fan bearing wear', 'Overheating components'],
        solutions: ['Fan cleaning', 'Fan replacement', 'Thermal management'],
        estimatedCost: { min: 600, max: 2500 },
        timeEstimate: '1-2 hours',
        urgency: 'medium'
    },
    'battery-issues': {
        category: 'Hardware',
        severity: 'medium',
        commonCauses: ['Battery degradation', 'Charging circuit failure', 'Power adapter issues'],
        solutions: ['Battery replacement', 'Charging port repair', 'Power adapter replacement'],
        estimatedCost: { min: 1200, max: 4000 },
        timeEstimate: '1-2 hours',
        urgency: 'medium'
    },
    'keyboard-issues': {
        category: 'Hardware',
        severity: 'medium',
        commonCauses: ['Key mechanism failure', 'Liquid damage', 'Dust accumulation'],
        solutions: ['Key replacement', 'Keyboard replacement', 'Cleaning service'],
        estimatedCost: { min: 500, max: 3000 },
        timeEstimate: '1-2 hours',
        urgency: 'low'
    },
    'wifi-problems': {
        category: 'Connectivity',
        severity: 'medium',
        commonCauses: ['WiFi adapter failure', 'Driver issues', 'Antenna problems'],
        solutions: ['Driver update', 'WiFi adapter replacement', 'Antenna repair'],
        estimatedCost: { min: 800, max: 2500 },
        timeEstimate: '1-2 hours',
        urgency: 'medium'
    },
    'usb-issues': {
        category: 'Connectivity',
        severity: 'low',
        commonCauses: ['USB port damage', 'Driver issues', 'Power management settings'],
        solutions: ['USB port replacement', 'Driver reinstall', 'Power settings adjustment'],
        estimatedCost: { min: 600, max: 2000 },
        timeEstimate: '1-2 hours',
        urgency: 'low'
    },
    'audio-problems': {
        category: 'Connectivity',
        severity: 'low',
        commonCauses: ['Audio driver issues', 'Speaker failure', 'Audio jack problems'],
        solutions: ['Driver update', 'Speaker replacement', 'Audio jack repair'],
        estimatedCost: { min: 500, max: 2000 },
        timeEstimate: '1-2 hours',
        urgency: 'low'
    },
    'bluetooth-issues': {
        category: 'Connectivity',
        severity: 'low',
        commonCauses: ['Bluetooth adapter failure', 'Driver issues', 'Interference'],
        solutions: ['Driver update', 'Bluetooth adapter replacement', 'Interference troubleshooting'],
        estimatedCost: { min: 600, max: 1800 },
        timeEstimate: '1 hour',
        urgency: 'low'
    }
};

function initializeDiagnostics() {
    // Initialize form validation
    setupFormValidation();
    
    // Initialize symptom selection
    setupSymptomSelection();
    
    // Set up step navigation
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
    
    // Update UI to show selection count
    const stepHeader = document.querySelector('#step-2 .step-header p');
    if (stepHeader) {
        if (count > 0) {
            stepHeader.textContent = `${count} symptom${count > 1 ? 's' : ''} selected - Select all that apply`;
        } else {
            stepHeader.textContent = 'Select all symptoms that match your laptop\'s behavior';
        }
    }
}

function validateCurrentStep() {
    const currentStepElement = document.querySelector(`#step-${currentStep}`);
    const nextButton = currentStepElement.querySelector('.btn-primary');
    
    let isValid = false;
    
    switch (currentStep) {
        case 1:
            const brand = document.getElementById('laptopBrand').value;
            const age = document.getElementById('laptopAge').value;
            const usage = document.getElementById('usagePattern').value;
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
        showNotification('Please fill in all required fields before proceeding.', 'error');
        return;
    }
    
    // Save current step data
    saveCurrentStepData();
    
    // Move to next step
    if (currentStep < 4) {
        currentStep++;
        updateStepDisplay();
        updateStepIndicator();
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
                brand: document.getElementById('laptopBrand').value,
                age: document.getElementById('laptopAge').value,
                model: document.getElementById('laptopModel').value,
                usage: document.getElementById('usagePattern').value
            };
            break;
            
        case 2:
            const selectedSymptoms = document.querySelectorAll('input[name="symptoms"]:checked');
            diagnosticData.symptoms = Array.from(selectedSymptoms).map(cb => cb.value);
            break;
    }
}

function updateStepDisplay() {
    // Hide all steps
    document.querySelectorAll('.diagnostic-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show current step
    const currentStepElement = document.querySelector(`#step-${currentStep}`);
    if (currentStepElement) {
        currentStepElement.classList.add('active');
    }
    
    // Validate current step
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
        showNotification('Please select at least one symptom to continue.', 'error');
        return;
    }
    
    // Save symptoms data
    saveCurrentStepData();
    
    // Move to analysis step
    currentStep = 3;
    updateStepDisplay();
    updateStepIndicator();
    
    // Start the analysis animation
    runAIAnalysis();
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
            
            // Update step status to processing
            const statusIcon = stepElement.querySelector('.step-status i');
            statusIcon.className = 'fas fa-spinner fa-spin';
            
            setTimeout(() => {
                // Complete current step
                statusIcon.className = 'fas fa-check';
                statusIcon.style.color = '#22c55e';
                
                // Update progress
                totalProgress = ((currentAnalysisStep + 1) / analysisSteps.length) * 100;
                updateAnalysisProgress(totalProgress);
                
                currentAnalysisStep++;
                
                if (currentAnalysisStep < analysisSteps.length) {
                    runNextAnalysisStep();
                } else {
                    // Analysis complete
                    setTimeout(() => {
                        completeAnalysis();
                    }, 500);
                }
            }, step.duration);
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
    // Generate AI analysis results
    diagnosticData.analysisResults = generateAIResults();
    
    // Move to results step
    currentStep = 4;
    updateStepDisplay();
    updateStepIndicator();
    
    // Display results
    displayResults();
}

function generateAIResults() {
    const symptoms = diagnosticData.symptoms;
    const laptopInfo = diagnosticData.laptopInfo;
    
    // AI-like analysis logic
    let primaryIssues = [];
    let secondaryIssues = [];
    let totalCostMin = 0;
    let totalCostMax = 0;
    let maxTimeEstimate = 0;
    let highestUrgency = 'low';
    
    // Analyze each symptom
    symptoms.forEach(symptom => {
        const issue = diagnosticDatabase[symptom];
        if (issue) {
            const analysisResult = {
                symptom: symptom,
                ...issue,
                confidence: calculateConfidence(symptom, laptopInfo)
            };
            
            if (analysisResult.confidence > 0.7) {
                primaryIssues.push(analysisResult);
            } else {
                secondaryIssues.push(analysisResult);
            }
            
            totalCostMin += issue.estimatedCost.min;
            totalCostMax += issue.estimatedCost.max;
            
            // Update urgency
            if (issue.urgency === 'high') highestUrgency = 'high';
            else if (issue.urgency === 'medium' && highestUrgency !== 'high') highestUrgency = 'medium';
        }
    });
    
    // Sort by confidence
    primaryIssues.sort((a, b) => b.confidence - a.confidence);
    secondaryIssues.sort((a, b) => b.confidence - a.confidence);
    
    // Generate recommendations
    const recommendations = generateRecommendations(primaryIssues, laptopInfo);
    
    return {
        primaryIssues,
        secondaryIssues,
        totalCostEstimate: { min: totalCostMin, max: totalCostMax },
        urgency: highestUrgency,
        recommendations,
        confidence: calculateOverallConfidence(primaryIssues),
        estimatedRepairTime: calculateTotalTime(primaryIssues)
    };
}

function calculateConfidence(symptom, laptopInfo) {
    let confidence = 0.8; // Base confidence
    
    // Adjust based on laptop age
    const age = laptopInfo.age;
    if (age === '5+') {
        confidence += 0.1; // Older laptops more likely to have hardware issues
    } else if (age === '0-1') {
        confidence -= 0.1; // Newer laptops less likely to have hardware failures
    }
    
    // Adjust based on usage pattern
    const usage = laptopInfo.usage;
    if (usage === 'heavy' || usage === 'professional') {
        confidence += 0.05; // Heavy usage increases wear
    }
    
    // Symptom-specific adjustments
    if (symptom.includes('screen') && laptopInfo.age === '5+') {
        confidence += 0.1;
    }
    
    if (symptom.includes('performance') && usage === 'heavy') {
        confidence += 0.1;
    }
    
    return Math.min(confidence, 0.95); // Cap at 95%
}

function calculateOverallConfidence(primaryIssues) {
    if (primaryIssues.length === 0) return 0.5;
    
    const avgConfidence = primaryIssues.reduce((sum, issue) => sum + issue.confidence, 0) / primaryIssues.length;
    return avgConfidence;
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

function generateRecommendations(issues, laptopInfo) {
    const recommendations = [];
    
    // Priority-based recommendations
    if (issues.some(issue => issue.urgency === 'high')) {
        recommendations.push({
            type: 'urgent',
            title: 'Immediate Attention Required',
            description: 'Your laptop has critical issues that need immediate professional attention to prevent further damage.',
            action: 'Book emergency service'
        });
    }
    
    // Age-based recommendations
    if (laptopInfo.age === '5+') {
        recommendations.push({
            type: 'upgrade',
            title: 'Consider Hardware Upgrade',
            description: 'Given your laptop\'s age, upgrading key components like RAM or SSD could significantly improve performance.',
            action: 'View upgrade options'
        });
    }
    
    // Usage-based recommendations
    if (laptopInfo.usage === 'heavy' && issues.some(issue => issue.category === 'Performance')) {
        recommendations.push({
            type: 'maintenance',
            title: 'Regular Maintenance Recommended',
            description: 'Heavy usage requires regular maintenance to prevent performance issues and extend laptop life.',
            action: 'Schedule maintenance'
        });
    }
    
    return recommendations;
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
                    <h3>Diagnosis Complete</h3>
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
    
    // Primary Issues
    if (results.primaryIssues.length > 0) {
        html += `
            <div class="issues-section">
                <h3><i class="fas fa-exclamation-triangle"></i> Primary Issues Detected</h3>
                <div class="issues-list">
        `;
        
        results.primaryIssues.forEach(issue => {
            html += createIssueCard(issue, true);
        });
        
        html += `</div></div>`;
    }
    
    // Secondary Issues
    if (results.secondaryIssues.length > 0) {
        html += `
            <div class="issues-section">
                <h3><i class="fas fa-info-circle"></i> Possible Related Issues</h3>
                <div class="issues-list">
        `;
        
        results.secondaryIssues.forEach(issue => {
            html += createIssueCard(issue, false);
        });
        
        html += `</div></div>`;
    }
    
    // Recommendations
    if (results.recommendations.length > 0) {
        html += `
            <div class="recommendations-section">
                <h3><i class="fas fa-lightbulb"></i> AI Recommendations</h3>
                <div class="recommendations-list">
        `;
        
        results.recommendations.forEach(rec => {
            html += `
                <div class="recommendation-card ${rec.type}">
                    <div class="rec-icon">
                        <i class="fas ${getRecommendationIcon(rec.type)}"></i>
                    </div>
                    <div class="rec-content">
                        <h4>${rec.title}</h4>
                        <p>${rec.description}</p>
                        <button class="btn btn-sm btn-outline" onclick="handleRecommendationAction('${rec.action}')">
                            ${rec.action}
                        </button>
                    </div>
                </div>
            `;
        });
        
        html += `</div></div>`;
    }
    
    resultsContainer.innerHTML = html;
}

function createIssueCard(issue, isPrimary) {
    const symptomName = getSymptomDisplayName(issue.symptom);
    const confidencePercentage = Math.round(issue.confidence * 100);
    
    return `
        <div class="issue-card ${isPrimary ? 'primary' : 'secondary'}">
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

function getRecommendationIcon(type) {
    switch (type) {
        case 'urgent': return 'fa-exclamation-triangle';
        case 'upgrade': return 'fa-arrow-up';
        case 'maintenance': return 'fa-tools';
        default: return 'fa-lightbulb';
    }
}

function bookService() {
    // Create a summary of the diagnosis for the booking
    const results = diagnosticData.analysisResults;
    const summary = {
        symptoms: diagnosticData.symptoms,
        laptopInfo: diagnosticData.laptopInfo,
        primaryIssues: results.primaryIssues.map(issue => getSymptomDisplayName(issue.symptom)),
        estimatedCost: results.totalCostEstimate,
        urgency: results.urgency
    };
    
    // Store diagnosis summary for booking form
    localStorage.setItem('diagnosticSummary', JSON.stringify(summary));
    
    // Redirect to contact form with pre-filled information
    const message = `AI Diagnosis Results:
    
Laptop: ${diagnosticData.laptopInfo.brand} ${diagnosticData.laptopInfo.model || ''}
Age: ${diagnosticData.laptopInfo.age} years
Usage: ${diagnosticData.laptopInfo.usage}

Primary Issues Detected:
${results.primaryIssues.map(issue => `• ${getSymptomDisplayName(issue.symptom)} (${Math.round(issue.confidence * 100)}% confidence)`).join('\n')}

Estimated Cost: ₹${results.totalCostEstimate.min.toLocaleString()} - ₹${results.totalCostEstimate.max.toLocaleString()}
Priority: ${results.urgency.toUpperCase()}

Please schedule a technician visit for professional repair.`;
    
    // Send to WhatsApp with diagnosis summary
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/918667018453?text=${encodedMessage}`, '_blank');
    
    showNotification('Diagnosis summary sent! Our team will contact you shortly.', 'success');
}

function restartDiagnostics() {
    // Reset all data
    currentStep = 1;
    diagnosticData = {
        laptopInfo: {},
        symptoms: [],
        analysisResults: null
    };
    
    // Reset form
    document.querySelectorAll('input, select').forEach(input => {
        if (input.type === 'checkbox') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });
    
    // Reset UI
    updateStepDisplay();
    updateStepIndicator();
    updateSymptomSelection();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    showNotification('Diagnostics reset. You can start a new analysis.', 'info');
}

function shareResults() {
    const results = diagnosticData.analysisResults;
    
    if (navigator.share) {
        // Use native sharing if available
        navigator.share({
            title: 'AI Laptop Diagnostics Results',
            text: `My laptop diagnosis shows ${results.primaryIssues.length} primary issues with ${Math.round(results.confidence * 100)}% AI confidence.`,
            url: window.location.href
        });
    } else {
        // Fallback to copying to clipboard
        const shareText = `AI Laptop Diagnostics Results:
        
${results.primaryIssues.length} primary issues detected
AI Confidence: ${Math.round(results.confidence * 100)}%
Estimated Cost: ₹${results.totalCostEstimate.min.toLocaleString()} - ₹${results.totalCostEstimate.max.toLocaleString()}
Priority: ${results.urgency.toUpperCase()}

Get your laptop diagnosed at: ${window.location.origin}`;
        
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('Results copied to clipboard!', 'success');
        }).catch(() => {
            showNotification('Unable to copy results. Please try again.', 'error');
        });
    }
}

function handleRecommendationAction(action) {
    switch (action) {
        case 'Book emergency service':
            bookService();
            break;
        case 'View upgrade options':
            window.open('store.html', '_blank');
            break;
        case 'Schedule maintenance':
            showNotification('Maintenance scheduling will be available soon!', 'info');
            break;
        default:
            showNotification(`${action} feature coming soon!`, 'info');
    }
}

// Export functions for global access
window.nextStep = nextStep;
window.previousStep = previousStep;
window.startAnalysis = startAnalysis;
window.bookService = bookService;
window.restartDiagnostics = restartDiagnostics;
window.shareResults = shareResults;
window.handleRecommendationAction = handleRecommendationAction;