// =====================================================
// FraudScan - Main JavaScript
// =====================================================

// Animate stat counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat-value[data-target]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const prefix = counter.getAttribute('data-prefix') || '';
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 2000;
        const steps = 60;
        const stepTime = duration / steps;
        let current = 0;
        
        const increment = target / steps;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            let displayValue;
            if (target >= 1000000) {
                displayValue = (current / 1000000).toFixed(2) + 'M';
            } else if (target >= 1000) {
                displayValue = Math.floor(current).toLocaleString();
            } else {
                displayValue = Math.floor(current);
            }
            
            counter.textContent = prefix + displayValue + suffix;
        }, stepTime);
    });
}

// Populate top states preview
function populateTopStates() {
    const container = document.getElementById('top-states-preview');
    if (!container) return;
    
    const states = getSortedStates('fraud-desc').slice(0, 5);
    
    container.innerHTML = states.map((state, index) => `
        <a href="database.html?state=${state.abbr}" class="preview-item">
            <div class="preview-state">
                <span class="preview-rank">#${index + 1}</span>
                <span class="preview-name">${state.name}</span>
            </div>
            <div class="preview-stats">
                <span class="preview-fraud">${formatCurrency(state.fraudAmount)}</span>
                <span class="preview-providers">${formatNumber(state.providerCount)} providers</span>
            </div>
        </a>
    `).join('');
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Animate counters when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats-container');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // Populate preview
    populateTopStates();
});

