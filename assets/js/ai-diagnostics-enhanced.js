// Advanced AI Diagnostics functionality with Machine Learning-like capabilities
document.addEventListener('DOMContentLoaded', function() {
    initializeDiagnostics();
    initializeAdvancedFeatures();
});

let currentStep = 1;
let diagnosticData = {
    laptopInfo: {},
    symptoms: [],
    analysisResults: null,
    systemHealth: {},
    diagnosticHistory: JSON.parse(localStorage.getItem('diagnosticHistory') || '[]'),
    realTimeMetrics: {
        temperature: 0,
        cpuUsage: 0,
        memoryUsage: 0,
        diskHealth: 100
    }
};

// Advanced AI Neural Network Simulation
class AdvancedDiagnosticAI {
    constructor() {
        this.neuralWeights = this.initializeWeights();
        this.learningRate = 0.1;
        this.trainingData = this.loadTrainingData();
        this.correlationMatrix = this.buildCorrelationMatrix();
        this.predictiveModels = this.initializePredictiveModels();
    }

    initializeWeights() {
        return {
            symptomWeights: {
                'screen-black': 0.95,
                'screen-flickering': 0.75,
                'screen-cracked': 0.90,
                'screen-dim': 0.70,
                'slow-performance': 0.60,
                'frequent-freezing': 0.85,
                'random-crashes': 0.90,
                'slow-startup': 0.45,
                'overheating': 0.80,
                'loud-fan': 0.65,
                'battery-issues': 0.70,
                'keyboard-issues': 0.55,
                'wifi-problems': 0.60,
                'usb-issues': 0.50,
                'audio-problems': 0.45,
                'bluetooth-issues': 0.40
            },
            contextWeights: {
                age: 0.3,
                usage: 0.25,
                brand: 0.15,
                environment: 0.2,
                maintenance: 0.1
            }
        };
    }

    loadTrainingData() {
        return {
            patterns: [
                { symptoms: ['overheating', 'loud-fan', 'slow-performance'], cause: 'thermal_throttling', confidence: 0.92 },
                { symptoms: ['screen-black', 'random-crashes'], cause: 'gpu_failure', confidence: 0.88 },
                { symptoms: ['frequent-freezing', 'slow-performance', 'random-crashes'], cause: 'ram_failure', confidence: 0.85 },
                { symptoms: ['battery-issues', 'slow-performance'], cause: 'power_management', confidence: 0.78 },
                { symptoms: ['screen-flickering', 'screen-dim'], cause: 'display_cable', confidence: 0.82 },
                { symptoms: ['wifi-problems', 'bluetooth-issues'], cause: 'wireless_module', confidence: 0.75 }
            ],
            correlations: {
                'overheating': ['loud-fan', 'slow-performance', 'random-crashes'],
                'screen-black': ['random-crashes', 'frequent-freezing'],
                'frequent-freezing': ['slow-performance', 'random-crashes'],
                'battery-issues': ['slow-performance', 'overheating']
            }
        };
    }

    buildCorrelationMatrix() {
        const symptoms = Object.keys(this.neuralWeights.symptomWeights);
        const matrix = {};
        
        symptoms.forEach(symptom1 => {
            matrix[symptom1] = {};
            symptoms.forEach(symptom2 => {
                if (symptom1 === symptom2) {
                    matrix[symptom1][symptom2] = 1.0;
                } else {
                    matrix[symptom1][symptom2] = this.calculateCorrelation(symptom1, symptom2);
                }
            });
        });
        
        return matrix;
    }

    calculateCorrelation(symptom1, symptom2) {
        const correlations = this.trainingData.correlations;
        
        if (correlations[symptom1] && correlations[symptom1].includes(symptom2)) {
            return 0.7 + Math.random() * 0.2;
        }
        
        if (correlations[symptom2] && correlations[symptom2].includes(symptom1)) {
            return 0.7 + Math.random() * 0.2;
        }
        
        const categories = {
            display: ['screen-black', 'screen-flickering', 'screen-cracked', 'screen-dim'],
            performance: ['slow-performance', 'frequent-freezing', 'random-crashes', 'slow-startup'],
            hardware: ['overheating', 'loud-fan', 'battery-issues', 'keyboard-issues'],
            connectivity: ['wifi-problems', 'usb-issues', 'audio-problems', 'bluetooth-issues']
        };
        
        for (const category in categories) {
            if (categories[category].includes(symptom1) && categories[category].includes(symptom2)) {
                return 0.4 + Math.random() * 0.3;
            }
        }
        
        return 0.1 + Math.random() * 0.2;
    }

    initializePredictiveModels() {
        return {
            failurePrediction: {
                'screen-black': { timeToFailure: 30, probability: 0.85 },
                'overheating': { timeToFailure: 60, probability: 0.75 },
                'battery-issues': { timeToFailure: 90, probability: 0.70 },
                'frequent-freezing': { timeToFailure: 45, probability: 0.80 }
            },
            maintenanceSchedule: {
                'overheating': { nextMaintenance: 30, type: 'cleaning' },
                'loud-fan': { nextMaintenance: 45, type: 'fan_replacement' },
                'slow-performance': { nextMaintenance: 60, type: 'optimization' }
            }
        };
    }

    analyzeSymptomCorrelations(symptoms) {
        const correlations = [];
        
        for (let i = 0; i < symptoms.length; i++) {
            for (let j = i + 1; j < symptoms.length; j++) {
                const correlation = this.correlationMatrix[symptoms[i]][symptoms[j]];
                if (correlation > 0.6) {
                    correlations.push({
                        symptoms: [symptoms[i], symptoms[j]],
                        strength: correlation,
                        implication: this.getCorrelationImplication(symptoms[i], symptoms[j])
                    });
                }
            }
        }
        
        return correlations.sort((a, b) => b.strength - a.strength);
    }

    getCorrelationImplication(symptom1, symptom2) {
        const implications = {
            'overheating,loud-fan': 'Thermal management system failure - immediate attention required',
            'screen-black,random-crashes': 'Graphics subsystem failure - likely GPU or motherboard issue',
            'frequent-freezing,slow-performance': 'Memory or storage subsystem degradation',
            'battery-issues,overheating': 'Power delivery system malfunction',
            'wifi-problems,bluetooth-issues': 'Wireless module failure'
        };
        
        const key1 = symptom1 + ',' + symptom2;
        const key2 = symptom2 + ',' + symptom1;
        
        return implications[key1] || implications[key2] || 'Related symptoms detected - comprehensive diagnosis recommended';
    }

    predictFailures(symptoms, laptopInfo) {
        const predictions = [];
        
        symptoms.forEach(symptom => {
            if (this.predictiveModels.failurePrediction[symptom]) {
                const model = this.predictiveModels.failurePrediction[symptom];
                let adjustedProbability = model.probability;
                let adjustedTime = model.timeToFailure;
                
                if (laptopInfo.age === '5+') {
                    adjustedProbability += 0.1;
                    adjustedTime *= 0.7;
                } else if (laptopInfo.age === '0-1') {
                    adjustedProbability -= 0.15;
                    adjustedTime *= 1.5;
                }
                
                if (laptopInfo.usage === 'heavy' || laptopInfo.usage === 'professional') {
                    adjustedProbability += 0.05;
                    adjustedTime *= 0.8;
                }
                
                predictions.push({
                    symptom,
                    failureProbability: Math.min(adjustedProbability, 0.95),
                    estimatedTimeToFailure: Math.max(adjustedTime, 7),
                    severity: adjustedProbability > 0.8 ? 'critical' : adjustedProbability > 0.6 ? 'high' : 'medium',
                    recommendedAction: this.getFailureRecommendation(symptom, adjustedProbability)
                });
            }
        });
        
        return predictions.sort((a, b) => b.failureProbability - a.failureProbability);
    }

    getFailureRecommendation(symptom, probability) {
        if (probability > 0.8) {
            return 'Immediate professional service required - risk of complete failure';
        } else if (probability > 0.6) {
            return 'Schedule service within 2 weeks to prevent failure';
        } else {
            return 'Monitor closely and schedule preventive maintenance';
        }
    }

    generateAdvancedRecommendations(symptoms, laptopInfo, correlations, predictions) {
        const recommendations = [];
        
        correlations.forEach(corr => {
            if (corr.strength > 0.8) {
                recommendations.push({
                    type: 'correlation',
                    priority: 'high',
                    title: 'Strong Symptom Correlation Detected',
                    description: corr.implication,
                    action: 'Comprehensive system diagnosis recommended',
                    confidence: corr.strength
                });
            }
        });
        
        predictions.forEach(pred => {
            if (pred.severity === 'critical') {
                recommendations.push({
                    type: 'predictive',
                    priority: 'urgent',
                    title: 'Critical Failure Prediction: ' + this.getSymptomDisplayName(pred.symptom),
                    description: Math.round(pred.failureProbability * 100) + '% probability of failure within ' + pred.estimatedTimeToFailure + ' days',
                    action: pred.recommendedAction,
                    confidence: pred.failureProbability
                });
            }
        });
        
        const patterns = this.detectPatterns(symptoms, laptopInfo);
        patterns.forEach(pattern => {
            recommendations.push({
                type: 'pattern',
                priority: pattern.severity,
                title: pattern.title,
                description: pattern.description,
                action: pattern.action,
                confidence: pattern.confidence
            });
        });
        
        return recommendations.sort((a, b) => {
            const priorityOrder = { urgent: 3, high: 2, medium: 1, low: 0 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
    }

    detectPatterns(symptoms, laptopInfo) {
        const patterns = [];
        
        if (symptoms.includes('overheating') && symptoms.includes('loud-fan') && 
            (laptopInfo.usage === 'heavy' || laptopInfo.usage === 'professional')) {
            patterns.push({
                title: 'Gaming/Professional Laptop Thermal Pattern',
                description: 'High-performance usage combined with thermal issues indicates inadequate cooling system',
                action: 'Thermal paste replacement and deep cleaning recommended',
                severity: 'high',
                confidence: 0.88
            });
        }
        
        if (laptopInfo.age === '5+' && symptoms.length >= 3) {
            patterns.push({
                title: 'Aging Hardware Degradation Pattern',
                description: 'Multiple symptoms in older laptop suggest widespread component degradation',
                action: 'Consider hardware upgrade or replacement evaluation',
                severity: 'medium',
                confidence: 0.75
            });
        }
        
        if (symptoms.filter(s => s.startsWith('screen-')).length >= 2) {
            patterns.push({
                title: 'Display Subsystem Failure Pattern',
                description: 'Multiple display-related issues indicate comprehensive display system failure',
                action: 'Complete display assembly diagnosis required',
                severity: 'high',
                confidence: 0.85
            });
        }
        
        return patterns;
    }

    getSymptomDisplayName(symptom) {
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
}

// Initialize Advanced AI
const advancedAI = new AdvancedDiagnosticAI();

// Real-time System Health Monitoring
class SystemHealthMonitor {
    constructor() {
        this.isMonitoring = false;
        this.metrics = {
            temperature: { current: 45, threshold: 80, status: 'normal' },
            cpuUsage: { current: 25, threshold: 85, status: 'normal' },
            memoryUsage: { current: 60, threshold: 90, status: 'normal' },
            diskHealth: { current: 95, threshold: 70, status: 'good' },
            batteryHealth: { current: 85, threshold: 50, status: 'good' }
        };
        this.alerts = [];
    }

    startMonitoring() {
        if (this.isMonitoring) return;
        
        this.isMonitoring = true;
        this.monitoringInterval = setInterval(() => {
            this.updateMetrics();
            this.checkThresholds();
            this.updateUI();
        }, 2000);
        
        if (typeof showNotification === 'function') {
            showNotification('Real-time system monitoring started', 'info');
        }
    }

    stopMonitoring() {
        if (!this.isMonitoring) return;
        
        this.isMonitoring = false;
        clearInterval(this.monitoringInterval);
        if (typeof showNotification === 'function') {
            showNotification('System monitoring stopped', 'info');
        }
    }

    updateMetrics() {
        this.metrics.temperature.current = Math.max(35, Math.min(95, 
            this.metrics.temperature.current + (Math.random() - 0.5) * 5));
        
        this.metrics.cpuUsage.current = Math.max(10, Math.min(100, 
            this.metrics.cpuUsage.current + (Math.random() - 0.5) * 15));
        
        this.metrics.memoryUsage.current = Math.max(30, Math.min(95, 
            this.metrics.memoryUsage.current + (Math.random() - 0.5) * 8));
        
        this.metrics.diskHealth.current = Math.max(50, Math.min(100, 
            this.metrics.diskHealth.current + (Math.random() - 0.5) * 2));
        
        this.metrics.batteryHealth.current = Math.max(20, Math.min(100, 
            this.metrics.batteryHealth.current + (Math.random() - 0.5) * 1));
    }

    checkThresholds() {
        Object.keys(this.metrics).forEach(metric => {
            const data = this.metrics[metric];
            const isAboveThreshold = metric === 'diskHealth' || metric === 'batteryHealth' 
                ? data.current < data.threshold 
                : data.current > data.threshold;
            
            if (isAboveThreshold && data.status !== 'critical') {
                data.status = 'critical';
                this.alerts.push({
                    metric,
                    message: metric + ' threshold exceeded: ' + Math.round(data.current),
                    timestamp: new Date(),
                    severity: 'high'
                });
                
                if (typeof showNotification === 'function') {
                    showNotification('Warning: ' + metric + ' threshold exceeded!', 'warning');
                }
            } else if (!isAboveThreshold && data.status === 'critical') {
                data.status = 'normal';
            }
        });
    }

    updateUI() {
        const monitoringContainer = document.getElementById('systemHealthMonitoring');
        if (!monitoringContainer) return;

        let html = '<div class="health-metrics-grid">';
        
        Object.entries(this.metrics).forEach(([key, data]) => {
            html += '<div class="health-metric ' + data.status + '">' +
                '<div class="metric-icon">' +
                '<i class="fas ' + this.getMetricIcon(key) + '"></i>' +
                '</div>' +
                '<div class="metric-info">' +
                '<h4>' + this.getMetricLabel(key) + '</h4>' +
                '<div class="metric-value">' + Math.round(data.current) + this.getMetricUnit(key) + '</div>' +
                '<div class="metric-status ' + data.status + '">' + data.status.toUpperCase() + '</div>' +
                '</div>' +
                '<div class="metric-chart">' +
                '<div class="progress-bar">' +
                '<div class="progress-fill ' + data.status + '" style="width: ' + this.getProgressWidth(key, data) + '%"></div>' +
                '</div>' +
                '</div>' +
                '</div>';
        });
        
        html += '</div>';
        
        if (this.alerts.length > 0) {
            html += '<div class="health-alerts">' +
                '<h4><i class="fas fa-exclamation-triangle"></i> System Alerts</h4>' +
                '<div class="alerts-list">';
            
            this.alerts.slice(-3).forEach(alert => {
                html += '<div class="alert-item ' + alert.severity + '">' +
                    '<span class="alert-message">' + alert.message + '</span>' +
                    '<span class="alert-time">' + alert.timestamp.toLocaleTimeString() + '</span>' +
                    '</div>';
            });
            
            html += '</div></div>';
        }

        monitoringContainer.innerHTML = html;
    }

    getMetricIcon(metric) {
        const icons = {
            temperature: 'fa-thermometer-half',
            cpuUsage: 'fa-microchip',
            memoryUsage: 'fa-memory',
            diskHealth: 'fa-hdd',
            batteryHealth: 'fa-battery-three-quarters'
        };
        return icons[metric] || 'fa-chart-line';
    }

    getMetricLabel(metric) {
        const labels = {
            temperature: 'Temperature',
            cpuUsage: 'CPU Usage',
            memoryUsage: 'Memory Usage',
            diskHealth: 'Disk Health',
            batteryHealth: 'Battery Health'
        };
        return labels[metric] || metric;
    }

    getMetricUnit(metric) {
        const units = {
            temperature: '°C',
            cpuUsage: '%',
            memoryUsage: '%',
            diskHealth: '%',
            batteryHealth: '%'
        };
        return units[metric] || '';
    }

    getProgressWidth(metric, data) {
        if (metric === 'diskHealth' || metric === 'batteryHealth') {
            return data.current;
        }
        return Math.min(100, (data.current / data.threshold) * 100);
    }

    getHealthSummary() {
        const criticalCount = Object.values(this.metrics).filter(m => m.status === 'critical').length;
        const overallHealth = criticalCount === 0 ? 'good' : criticalCount <= 2 ? 'warning' : 'critical';
        
        return {
            overallHealth,
            criticalIssues: criticalCount,
            metrics: this.metrics,
            alerts: this.alerts
        };
    }
}

// Initialize System Health Monitor
const systemHealthMonitor = new SystemHealthMonitor();

// Diagnostic History Manager
class DiagnosticHistoryManager {
    constructor() {
        this.maxHistoryItems = 10;
    }

    saveDiagnosis(diagnosticData) {
        const historyItem = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            laptopInfo: diagnosticData.laptopInfo,
            symptoms: diagnosticData.symptoms,
            results: {
                primaryIssues: diagnosticData.analysisResults.primaryIssues.length,
                confidence: diagnosticData.analysisResults.confidence,
                urgency: diagnosticData.analysisResults.urgency,
                estimatedCost: diagnosticData.analysisResults.totalCostEstimate
            },
            systemHealth: systemHealthMonitor.getHealthSummary()
        };

        let history = JSON.parse(localStorage.getItem('diagnosticHistory') || '[]');
        history.unshift(historyItem);
        
        if (history.length > this.maxHistoryItems) {
            history = history.slice(0, this.maxHistoryItems);
        }
        
        localStorage.setItem('diagnosticHistory', JSON.stringify(history));
        diagnosticData.diagnosticHistory = history;
        
        return historyItem;
    }

    getHistory() {
        return JSON.parse(localStorage.getItem('diagnosticHistory') || '[]');
    }

    analyzeTrends() {
        const history = this.getHistory();
        if (history.length < 2) return null;

        const trends = {
            degradationTrend: this.calculateDegradationTrend(history),
            commonIssues: this.findCommonIssues(history),
            costTrend: this.calculateCostTrend(history),
            recommendations: []
        };

        if (trends.degradationTrend > 0.2) {
            trends.recommendations.push({
                type: 'trend',
                priority: 'high',
                title: 'Accelerating Hardware Degradation Detected',
                description: 'Your laptop shows signs of accelerating hardware degradation based on diagnostic history',
                action: 'Consider comprehensive maintenance or hardware upgrade evaluation'
            });
        }

        return trends;
    }

    calculateDegradationTrend(history) {
        if (history.length < 3) return 0;
        
        const recentAvg = history.slice(0, 3).reduce((sum, item) => sum + item.results.primaryIssues, 0) / 3;
        const olderAvg = history.slice(-3).reduce((sum, item) => sum + item.results.primaryIssues, 0) / 3;
        
        return (recentAvg - olderAvg) / Math.max(olderAvg, 1);
    }

    findCommonIssues(history) {
        const issueCount = {};
        
        history.forEach(item => {
            item.symptoms.forEach(symptom => {
                issueCount[symptom] = (issueCount[symptom] || 0) + 1;
            });
        });

        return Object.entries(issueCount)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([symptom, count]) => ({
                symptom,
                frequency: count,
                percentage: Math.round((count / history.length) * 100)
            }));
    }

    calculateCostTrend(history) {
        if (history.length < 2) return 0;
        
        const costs = history.map(item => (item.results.estimatedCost.min + item.results.estimatedCost.max) / 2);
        const recent = costs.slice(0, Math.ceil(costs.length / 2));
        const older = costs.slice(Math.ceil(costs.length / 2));
        
        const recentAvg = recent.reduce((sum, cost) => sum + cost, 0) / recent.length;
        const olderAvg = older.reduce((sum, cost) => sum + cost, 0) / older.length;
        
        return (recentAvg - olderAvg) / Math.max(olderAvg, 1);
    }
}

// Initialize Diagnostic History Manager
const historyManager = new DiagnosticHistoryManager();

// Enhanced initialization function
function initializeAdvancedFeatures() {
    addSystemHealthMonitoring();
    addEnhancedStyles();
    enhanceAnalysisStep();
    startMetricsSimulation();
}

function addSystemHealthMonitoring() {
    const analysisContainer = document.querySelector('.analysis-container');
    if (!analysisContainer) return;

    const monitoringSection = document.createElement('div');
    monitoringSection.className = 'system-health-section';
    monitoringSection.innerHTML = 
        '<div class="health-header">' +
        '<h3><i class="fas fa-heartbeat"></i> Real-time System Health</h3>' +
        '<button class="btn btn-outline btn-sm" id="toggleMonitoring">' +
        '<i class="fas fa-play"></i> Start Monitoring' +
        '</button>' +
        '</div>' +
        '<div id="systemHealthMonitoring" class="health-monitoring-container">' +
        '<p class="text-center text-muted">Click "Start Monitoring" to begin real-time system health analysis</p>' +
        '</div>';

    analysisContainer.appendChild(monitoringSection);

    document.getElementById('toggleMonitoring').addEventListener('click', function() {
        if (systemHealthMonitor.isMonitoring) {
            systemHealthMonitor.stopMonitoring();
            this.innerHTML = '<i class="fas fa-play"></i> Start Monitoring';
            this.classList.remove('btn-secondary');
            this.classList.add('btn-outline');
        } else {
            systemHealthMonitor.startMonitoring();
            this.innerHTML = '<i class="fas fa-stop"></i> Stop Monitoring';
            this.classList.remove('btn-outline');
            this.classList.add('btn-secondary');
        }
    });
}

function enhanceAnalysisStep() {
    const analysisSteps = document.querySelector('.analysis-steps');
    if (!analysisSteps) return;

    const advancedSteps = [
        { id: 'analysis-5', icon: 'fa-project-diagram', text: 'Analyzing symptom correlations...', duration: 2200 },
        { id: 'analysis-6', icon: 'fa-brain', text: 'Running predictive failure analysis...', duration: 1800 },
        { id: 'analysis-7', icon: 'fa-chart-line', text: 'Generating trend analysis...', duration: 1500 }
    ];

    advancedSteps.forEach(step => {
        const stepElement = document.createElement('div');
        stepElement.className = 'analysis-step';
        stepElement.id = step.id;
        stepElement.innerHTML = 
            '<i class="fas ' + step.icon + '"></i>' +
            '<span>' + step.text + '</span>' +
            '<div class="step-status"><i class="fas fa-clock"></i></div>';
        
        analysisSteps.appendChild(stepElement);
    });
}

function startMetricsSimulation() {
    setInterval(() => {
        diagnosticData.realTimeMetrics = {
            temperature: 40 + Math.random() * 40,
            cpuUsage: 20 + Math.random() * 60,
            memoryUsage: 50 + Math.random() * 40,
            diskHealth: 80 + Math.random() * 20
        };
    }, 3000);
}

// Enhanced analysis functions
function generateAdvancedAIResults() {
    const symptoms = diagnosticData.symptoms;
    const laptopInfo = diagnosticData.laptopInfo;
    
    const correlations = advancedAI.analyzeSymptomCorrelations(symptoms);
    const predictions = advancedAI.predictFailures(symptoms, laptopInfo);
    const patterns = advancedAI.detectPatterns(symptoms, laptopInfo);
    const trends = historyManager.analyzeTrends();
    
    const results = generateAIResults();
    
    results.advancedAnalysis = {
        correlations: correlations,
        predictions: predictions,
        patterns: patterns,
        trends: trends,
        systemHealth: systemHealthMonitor.getHealthSummary(),
        riskAssessment: calculateRiskAssessment(symptoms, laptopInfo, correlations, predictions)
    };
    
    results.advancedRecommendations = advancedAI.generateAdvancedRecommendations(
        symptoms, laptopInfo, correlations, predictions
    );
    
    results.confidence = calculateAdvancedConfidence(results);
    
    return results;
}

function calculateRiskAssessment(symptoms, laptopInfo, correlations, predictions) {
    let riskScore = 0;
    let riskFactors = [];
    
    symptoms.forEach(symptom => {
        const weight = advancedAI.neuralWeights.symptomWeights[symptom] || 0.5;
        riskScore += weight * 0.3;
    });
    
    correlations.forEach(corr => {
        if (corr.strength > 0.8) {
            riskScore += 0.2;
            riskFactors.push('High correlation: ' + corr.implication);
        }
    });
    
    predictions.forEach(pred => {
        if (pred.severity === 'critical') {
            riskScore += 0.3;
            riskFactors.push('Critical failure risk: ' + pred.symptom);
        }
    });
    
    if (laptopInfo.age === '5+') {
        riskScore += 0.15;
        riskFactors.push('Aging hardware increases failure risk');
    }
    
    if (laptopInfo.usage === 'heavy' || laptopInfo.usage === 'professional') {
        riskScore += 0.1;
        riskFactors.push('Heavy usage pattern increases wear');
    }
    
    const riskLevel = riskScore > 0.8 ? 'critical' : riskScore > 0.6 ? 'high' : riskScore > 0.4 ? 'medium' : 'low';
    
    return {
        score: Math.min(riskScore, 1.0),
        level: riskLevel,
        factors: riskFactors,
        recommendation: getRiskRecommendation(riskLevel, riskScore)
    };
}

function getRiskRecommendation(level, score) {
    switch (level) {
        case 'critical':
            return 'Immediate professional service required. High risk of complete system failure.';
        case 'high':
            return 'Schedule professional service within 1-2 weeks to prevent major issues.';
        case 'medium':
            return 'Monitor system closely and schedule maintenance within a month.';
        default:
            return 'System appears stable. Continue regular maintenance schedule.';
    }
}

function calculateAdvancedConfidence(results) {
    let confidence = results.confidence;
    
    if (results.advancedAnalysis.correlations.length > 0) {
        const avgCorrelation = results.advancedAnalysis.correlations.reduce((sum, corr) => sum + corr.strength, 0) / results.advancedAnalysis.correlations.length;
        confidence += avgCorrelation * 0.1;
    }
    
    if (results.advancedAnalysis.predictions.length > 0) {
        const avgPrediction = results.advancedAnalysis.predictions.reduce((sum, pred) => sum + pred.failureProbability, 0) / results.advancedAnalysis.predictions.length;
        confidence += avgPrediction * 0.05;
    }
    
    if (results.advancedAnalysis.trends) {
        confidence += 0.05;
    }
    
    return Math.min(confidence, 0.98);
}

function runAdvancedAIAnalysis() {
    const analysisSteps = [
        { id: 'analysis-1', duration: 2000 },
        { id: 'analysis-2', duration: 1500 },
        { id: 'analysis-3', duration: 2500 },
        { id: 'analysis-4', duration: 1800 },
        { id: 'analysis-5', duration: 2200 },
        { id: 'analysis-6', duration: 1800 },
        { id: 'analysis-7', duration: 1500 }
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
                    if (typeof updateAnalysisProgress === 'function') {
                        updateAnalysisProgress(totalProgress);
                    }
                    
                    currentAnalysisStep++;
                    
                    if (currentAnalysisStep < analysisSteps.length) {
                        runNextAnalysisStep();
                    } else {
                        setTimeout(() => {
                            completeAdvancedAnalysis();
                        }, 500);
                    }
                }, step.duration);
            }
        }
    }
    
    runNextAnalysisStep();
}

function completeAdvancedAnalysis() {
    diagnosticData.analysisResults = generateAdvancedAIResults();
    historyManager.saveDiagnosis(diagnosticData);
    
    currentStep = 4;
    if (typeof updateStepDisplay === 'function') {
        updateStepDisplay();
    }
    if (typeof updateStepIndicator === 'function') {
        updateStepIndicator();
    }
    
    displayAdvancedResults();
}

function displayAdvancedResults() {
    const resultsContainer = document.getElementById('resultsContainer');
    const results = diagnosticData.analysisResults;
    
    if (!resultsContainer || !results) return;
    
    let html = '<div class="results-summary">' +
        '<div class="summary-card">' +
        '<div class="summary-icon ' + results.urgency + '">' +
        '<i class="fas ' + (typeof getUrgencyIcon === 'function' ? getUrgencyIcon(results.urgency) : 'fa-info-circle') + '"></i>' +
        '</div>' +
        '<div class="summary-info">' +
        '<h3>Advanced AI Diagnosis Complete</h3>' +
        '<p class="confidence-score">AI Confidence: ' + Math.round(results.confidence * 100) + '%</p>' +
        '<p class="urgency-level ' + results.urgency + '">Priority: ' + results.urgency.toUpperCase() + '</p>' +
        '</div>' +
        '</div>' +
        '<div class="cost-estimate">' +
        '<h4><i class="fas fa-rupee-sign"></i> Estimated Cost</h4>' +
        '<div class="cost-range">' +
        '<span class="cost-min">₹' + results.totalCostEstimate.min.toLocaleString() + '</span>' +
        '<span class="cost-separator">-</span>' +
        '<span class="cost-max">₹' + results.totalCostEstimate.max.toLocaleString() + '</span>' +
        '</div>' +
        '<small>Estimated repair time: ' + results.estimatedRepairTime + '</small>' +
        '</div>' +
        '</div>';
    
    // Risk Assessment
    if (results.advancedAnalysis && results.advancedAnalysis.riskAssessment) {
        const risk = results.advancedAnalysis.riskAssessment;
        html += '<div class="risk-assessment-section">' +
            '<h3><i class="fas fa-shield-alt"></i> Risk Assessment</h3>' +
            '<div class="risk-card ' + risk.level + '">' +
            '<div class="risk-score">' +
            '<div class="risk-meter">' +
            '<div class="risk-fill ' + risk.level + '" style="width: ' + (risk.score * 100) + '%"></div>' +
            '</div>' +
            '<span class="risk-label">Risk Level: ' + risk.level.toUpperCase() + '</span>' +
            '</div>' +
            '<div class="risk-details">' +
            '<p class="risk-recommendation">' + risk.recommendation + '</p>';
        
        if (risk.factors.length > 0) {
            html += '<div class="risk-factors">' +
                '<strong>Risk Factors:</strong>' +
                '<ul>';
            risk.factors.forEach(factor => {
                html += '<li>' + factor + '</li>';
            });
            html += '</ul></div>';
        }
        
        html += '</div></div></div>';
    }
    
    // Symptom Correlations
    if (results.advancedAnalysis && results.advancedAnalysis.correlations && results.advancedAnalysis.correlations.length > 0) {
        html += '<div class="correlations-section">' +
            '<h3><i class="fas fa-project-diagram"></i> Symptom Correlations</h3>' +
            '<div class="correlations-list">';
        
        results.advancedAnalysis.correlations.forEach(corr => {
            html += '<div class="correlation-card">' +
                '<div class="correlation-strength">' +
                '<div class="strength-meter">' +
                '<div class="strength-fill" style="width: ' + (corr.strength * 100) + '%"></div>' +
                '</div>' +
                '<span>' + Math.round(corr.strength * 100) + '% correlation</span>' +
                '</div>' +
                '<div class="correlation-details">' +
                '<h4>Related Symptoms</h4>' +
                '<p class="correlation-symptoms">' +
                corr.symptoms.map(s => advancedAI.getSymptomDisplayName(s)).join(' ↔ ') +
                '</p>' +
                '<p class="correlation-implication">' + corr.implication + '</p>' +
                '</div>' +
                '</div>';
        });
        
        html += '</div></div>';
    }
    
    // Failure Predictions
    if (results.advancedAnalysis && results.advancedAnalysis.predictions && results.advancedAnalysis.predictions.length > 0) {
        html += '<div class="predictions-section">' +
            '<h3><i class="fas fa-crystal-ball"></i> Failure Predictions</h3>' +
            '<div class="predictions-list">';
        
        results.advancedAnalysis.predictions.forEach(pred => {
            html += '<div class="prediction-card ' + pred.severity + '">' +
                '<div class="prediction-header">' +
                '<h4>' + advancedAI.getSymptomDisplayName(pred.symptom) + '</h4>' +
                '<span class="severity-badge ' + pred.severity + '">' + pred.severity.toUpperCase() + '</span>' +
                '</div>' +
                '<div class="prediction-details">' +
                '<div class="prediction-probability">' +
                '<strong>' + Math.round(pred.failureProbability * 100) + '%</strong>' +
                '<span>failure probability</span>' +
                '</div>' +
                '<div class="prediction-timeline">' +
                '<strong>' + pred.estimatedTimeToFailure + ' days</strong>' +
                '<span>estimated time to failure</span>' +
                '</div>' +
                '</div>' +
                '<p class="prediction-action">' + pred.recommendedAction + '</p>' +
                '</div>';
        });
        
        html += '</div></div>';
    }
    
    // Primary Issues
    if (results.primaryIssues && results.primaryIssues.length > 0) {
        html += '<div class="issues-section">' +
            '<h3><i class="fas fa-exclamation-triangle"></i> Primary Issues Detected</h3>' +
            '<div class="issues-list">';
        
        results.primaryIssues.forEach(issue => {
            if (typeof createIssueCard === 'function') {
                html += createIssueCard(issue, true);
            }
        });
        
        html += '</div></div>';
    }
    
    // Advanced Recommendations
    if (results.advancedRecommendations && results.advancedRecommendations.length > 0) {
        html += '<div class="recommendations-section">' +
            '<h3><i class="fas fa-robot"></i> AI Recommendations</h3>' +
            '<div class="recommendations-list">';
        
        results.advancedRecommendations.forEach(rec => {
            html += '<div class="recommendation-card ' + rec.type + ' ' + rec.priority + '">' +
                '<div class="rec-icon">' +
                '<i class="fas ' + (typeof getRecommendationIcon === 'function' ? getRecommendationIcon(rec.type) : 'fa-lightbulb') + '"></i>' +
                '</div>' +
                '<div class="rec-content">' +
                '<h4>' + rec.title + '</h4>' +
                '<p>' + rec.description + '</p>' +
                '<div class="rec-confidence">' +
                '<span class="confidence-badge">' + Math.round(rec.confidence * 100) + '% confidence</span>' +
                '<span class="priority-badge ' + rec.priority + '">' + rec.priority.toUpperCase() + '</span>' +
                '</div>' +
                '<button class="btn btn-sm btn-outline" onclick="handleRecommendationAction(\'' + rec.action + '\')">' +
                rec.action +
                '</button>' +
                '</div>' +
                '</div>';
        });
        
        html += '</div></div>';
    }
    
    resultsContainer.innerHTML = html;
    
    // Add diagnostic history
    addDiagnosticHistory();
}

function addDiagnosticHistory() {
    const resultsContainer = document.getElementById('resultsContainer');
    if (!resultsContainer) return;

    const history = historyManager.getHistory();
    if (history.length === 0) return;

    const historySection = document.createElement('div');
    historySection.className = 'diagnostic-history-section';
    
    let html = '<h3><i class="fas fa-history"></i> Diagnostic History</h3>' +
        '<div class="history-summary">' +
        '<div class="history-stats">' +
        '<div class="stat-item">' +
        '<span class="stat-number">' + history.length + '</span>' +
        '<span class="stat-label">Total Diagnoses</span>' +
        '</div>' +
        '<div class="stat-item">' +
        '<span class="stat-number">' + Math.round(history.reduce((sum, item) => sum + item.results.confidence, 0) / history.length * 100) + '%</span>' +
        '<span class="stat-label">Avg Confidence</span>' +
        '</div>' +
        '<div class="stat-item">' +
        '<span class="stat-number">₹' + Math.round(history.reduce((sum, item) => sum + (item.results.estimatedCost.min + item.results.estimatedCost.max) / 2, 0) / history.length).toLocaleString() + '</span>' +
        '<span class="stat-label">Avg Cost</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="history-timeline">';
    
    history.slice(0, 3).forEach(item => {
        html += '<div class="history-item">' +
            '<div class="history-date">' + new Date(item.timestamp).toLocaleDateString() + '</div>' +
            '<div class="history-details">' +
            '<strong>' + item.symptoms.length + ' symptoms detected</strong>' +
            '<span class="confidence-badge">' + Math.round(item.results.confidence * 100) + '% confidence</span>' +
            '<div class="history-symptoms">';
        
        item.symptoms.slice(0, 3).forEach(symptom => {
            html += '<span class="symptom-tag">' + advancedAI.getSymptomDisplayName(symptom) + '</span>';
        });
        
        if (item.symptoms.length > 3) {
            html += '<span class="more-symptoms">+' + (item.symptoms.length - 3) + ' more</span>';
        }
        
        html += '</div></div></div>';
    });
    
    html += '</div>';
    historySection.innerHTML = html;
    resultsContainer.appendChild(historySection);
}

// Override the original analysis function
function startAnalysis() {
    if (typeof validateCurrentStep === 'function' && !validateCurrentStep()) {
        if (typeof showNotification === 'function') {
            showNotification('Please select at least one symptom to continue.', 'error');
        }
        return;
    }
    
    if (typeof saveCurrentStepData === 'function') {
        saveCurrentStepData();
    }
    
    currentStep = 3;
    if (typeof updateStepDisplay === 'function') {
        updateStepDisplay();
    }
    if (typeof updateStepIndicator === 'function') {
        updateStepIndicator();
    }
    
    runAdvancedAIAnalysis();
}

// Add CSS for enhanced features
function addEnhancedStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .system-health-section {
            margin: 2rem 0;
            padding: 2rem;
            background: #f8fafc;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
        }
        
        .health-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }
        
        .health-header h3 {
            color: #1e293b;
            margin: 0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .health-metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        
        .health-metric {
            background: white;
            padding: 1rem;
            border-radius: 8px;
            border-left: 4px solid #e2e8f0;
            transition: all 0.3s ease;
        }
        
        .health-metric.normal {
            border-left-color: #22c55e;
        }
        
        .health-metric.critical {
            border-left-color: #ef4444;
            background: #fef2f2;
        }
        
        .health-metric .metric-icon {
            font-size: 1.5rem;
            color: #2563eb;
            margin-bottom: 0.5rem;
        }
        
        .metric-info h4 {
            margin: 0 0 0.25rem 0;
            color: #1e293b;
            font-size: 0.9rem;
        }
        
        .metric-value {
            font-size: 1.2rem;
            font-weight: 600;
            color: #2563eb;
        }
        
        .metric-status {
            font-size: 0.8rem;
            font-weight: 500;
            text-transform: uppercase;
            margin-top: 0.25rem;
        }
        
        .metric-status.normal {
            color: #22c55e;
        }
        
        .metric-status.critical {
            color: #ef4444;
        }
        
        .health-alerts {
            background: white;
            padding: 1rem;
            border-radius: 8px;
            border-left: 4px solid #f59e0b;
        }
        
        .health-alerts h4 {
            color: #1e293b;
            margin: 0 0 1rem 0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .alert-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem;
            margin-bottom: 0.5rem;
            background: #fffbeb;
            border-radius: 4px;
        }
        
        .alert-item.high {
            background: #fef2f2;
            color: #dc2626;
        }
        
        .diagnostic-history-section {
            margin: 2rem 0;
            padding: 2rem;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        
        .diagnostic-history-section h3 {
            color: #1e293b;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .history-stats {
            display: flex;
            gap: 2rem;
            margin-bottom: 1.5rem;
        }
        
        .stat-item {
            text-align: center;
        }
        
        .stat-number {
            display: block;
            font-size: 1.5rem;
            font-weight: 700;
            color: #2563eb;
        }
        
        .stat-label {
            font-size: 0.9rem;
            color: #64748b;
        }
        
        .history-timeline {
            border-left: 2px solid #e2e8f0;
            padding-left: 1rem;
        }
        
        .history-item {
            position: relative;
            margin-bottom: 1rem;
            padding-left: 1rem;
        }
        
        .history-item::before {
            content: '';
            position: absolute;
            left: -1.25rem;
            top: 0.5rem;
            width: 8px;
            height: 8px;
            background: #2563eb;
            border-radius: 50%;
        }
        
        .history-date {
            font-size: 0.8rem;
            color: #64748b;
            margin-bottom: 0.25rem;
        }
        
        .history-symptoms {
            margin-top: 0.5rem;
        }
        
        .symptom-tag {
            display: inline-block;
            background: #e0e7ff;
            color: #3730a3;
            padding: 0.2rem 0.5rem;
            border-radius: 12px;
            font-size: 0.75rem;
            margin-right: 0.25rem;
            margin-bottom: 0.25rem;
        }
        
        .more-symptoms {
            color: #64748b;
            font-size: 0.8rem;
        }
        
        .risk-assessment-section {
            margin: 2rem 0;
        }
        
        .risk-card {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            border-left: 4px solid #e2e8f0;
        }
        
        .risk-card.critical {
            border-left-color: #ef4444;
            background: linear-gradient(135deg, #fef2f2 0%, #ffffff 100%);
        }
        
        .risk-card.high {
            border-left-color: #f59e0b;
            background: linear-gradient(135deg, #fffbeb 0%, #ffffff 100%);
        }
        
        .risk-card.medium {
            border-left-color: #3b82f6;
            background: linear-gradient(135deg, #eff6ff 0%, #ffffff 100%);
        }
        
        .risk-card.low {
            border-left-color: #22c55e;
            background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%);
        }
        
        .risk-score {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        
        .risk-meter {
            flex: 1;
            height: 8px;
            background: #e2e8f0;
            border-radius: 4px;
            overflow: hidden;
        }
        
        .risk-fill {
            height: 100%;
            transition: width 0.5s ease;
        }
        
        .risk-fill.critical {
            background: linear-gradient(135deg, #ef4444, #dc2626);
        }
        
        .risk-fill.high {
            background: linear-gradient(135deg, #f59e0b, #d97706);
        }
        
        .risk-fill.medium {
            background: linear-gradient(135deg, #3b82f6, #2563eb);
        }
        
        .risk-fill.low {
            background: linear-gradient(135deg, #22c55e, #16a34a);
        }
        
        .risk-label {
            font-weight: 600;
            color: #1e293b;
        }
        
        .risk-recommendation {
            font-weight: 500;
            color: #1e293b;
            margin-bottom: 1rem;
        }
        
        .risk-factors ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .risk-factors li {
            padding: 0.25rem 0;
            position: relative;
            padding-left: 1.5rem;
            color: #64748b;
            font-size: 0.9rem;
        }
        
        .risk-factors li::before {
            content: '⚠';
            position: absolute;
            left: 0;
            color: #f59e0b;
        }
        
        .correlations-section,
        .predictions-section {
            margin: 2rem 0;
        }
        
        .correlation-card,
        .prediction-card {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            margin-bottom: 1rem;
            border-left: 4px solid #2563eb;
        }
        
        .correlation-strength,
        .prediction-details {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        
        .strength-meter {
            flex: 1;
            height: 6px;
            background: #e2e8f0;
            border-radius: 3px;
            overflow: hidden;
        }
        
        .strength-fill {
            height: 100%;
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            transition: width 0.5s ease;
        }
        
        .correlation-symptoms {
            font-weight: 600;
            color: #2563eb;
            margin-bottom: 0.5rem;
        }
        
        .correlation-implication {
            color: #64748b;
            font-style: italic;
        }
        
        .prediction-card.critical {
            border-left-color: #ef4444;
        }
        
        .prediction-card.high {
            border-left-color: #f59e0b;
        }
        
        .prediction-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }
        
        .prediction-probability,
        .prediction-timeline {
            text-align: center;
        }
        
        .prediction-probability strong,
        .prediction-timeline strong {
            display: block;
            font-size: 1.2rem;
            color: #2563eb;
        }
        
        .prediction-action {
            background: #f8fafc;
            padding: 1rem;
            border-radius: 8px;
            margin-top: 1rem;
            font-weight: 500;
            color: #1e293b;
        }
        
        .rec-confidence {
            display: flex;
            gap: 0.5rem;
            margin: 0.5rem 0;
        }
        
        .confidence-badge {
            background: #e0e7ff;
            color: #3730a3;
            padding: 0.2rem 0.5rem;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 600;
        }
        
        .priority-badge {
            padding: 0.2rem 0.5rem;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
        }
        
        .priority-badge.urgent {
            background: #fef2f2;
            color: #dc2626;
        }
        
        .priority-badge.high {
            background: #fffbeb;
            color: #d97706;
        }
        
        .priority-badge.medium {
            background: #eff6ff;
            color: #2563eb;
        }
        
        .priority-badge.low {
            background: #f0fdf4;
            color: #16a34a;
        }
        
        @media (max-width: 768px) {
            .health-metrics-grid {
                grid-template-columns: 1fr;
            }
            
            .history-stats {
                flex-direction: column;
                gap: 1rem;
            }
            
            .risk-score {
                flex-direction: column;
                align-items: stretch;
            }
            
            .prediction-details {
                flex-direction: column;
                gap: 0.5rem;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Export enhanced functions for global access
window.startAnalysis = startAnalysis;
window.runAdvancedAIAnalysis = runAdvancedAIAnalysis;
window.displayAdvancedResults = displayAdvancedResults;