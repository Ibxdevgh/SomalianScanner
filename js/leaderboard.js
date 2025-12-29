// =====================================================
// FraudScan - Leaderboard JavaScript
// =====================================================

let currentSort = 'fraud-desc';
let currentMinFraud = 0;

// Render leaderboard
function renderLeaderboard() {
    const container = document.getElementById('leaderboard-body');
    if (!container) return;
    
    const states = getSortedStates(currentSort, currentMinFraud);
    
    container.innerHTML = states.map((state, index) => `
        <div class="leaderboard-row">
            <span class="lb-col rank ${index < 3 ? 'top-3' : ''}">#${index + 1}</span>
            <span class="lb-col state">${state.name}</span>
            <span class="lb-col amount">${formatCurrency(state.fraudAmount)}</span>
            <span class="lb-col providers">${formatNumber(state.providerCount)}</span>
            <span class="lb-col action">
                <a href="database.html?state=${state.abbr}">View →</a>
            </span>
        </div>
    `).join('');
    
    updateSummary(states);
}

// Update summary stats
function updateSummary(states) {
    const totalFraud = states.reduce((sum, s) => sum + s.fraudAmount, 0);
    const totalProviders = states.reduce((sum, s) => sum + s.providerCount, 0);
    const avgPerState = states.length > 0 ? totalFraud / states.length : 0;
    
    document.getElementById('total-fraud').textContent = formatCurrency(totalFraud);
    document.getElementById('total-providers').textContent = formatNumber(totalProviders);
    document.getElementById('avg-per-state').textContent = formatCurrency(avgPerState);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    renderLeaderboard();
    
    document.getElementById('sort-select')?.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderLeaderboard();
    });
    
    document.getElementById('min-fraud-select')?.addEventListener('change', (e) => {
        currentMinFraud = parseInt(e.target.value);
        renderLeaderboard();
    });
});

