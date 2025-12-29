// =====================================================
// FraudScan - Database JavaScript
// =====================================================

let allProviders = [];
let filteredProviders = [];
let currentPage = 1;
const itemsPerPage = 25;

// Initialize database
function initDatabase() {
    allProviders = getProviders();
    filteredProviders = [...allProviders];
    
    // Populate state filter
    const stateFilter = document.getElementById('state-filter');
    if (stateFilter) {
        const states = Object.values(stateData).sort((a, b) => a.name.localeCompare(b.name));
        states.forEach(state => {
            const option = document.createElement('option');
            option.value = state.abbr;
            option.textContent = state.name;
            stateFilter.appendChild(option);
        });
    }
    
    // Check URL params for state filter
    const urlParams = new URLSearchParams(window.location.search);
    const stateParam = urlParams.get('state');
    if (stateParam && stateFilter) {
        stateFilter.value = stateParam;
        applyFilters();
    }
    
    renderProviders();
    updateDbCount();
}

// Apply filters
function applyFilters() {
    const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
    const stateFilter = document.getElementById('state-filter')?.value || '';
    const typeFilter = document.getElementById('type-filter')?.value || '';
    const fraudFilter = parseInt(document.getElementById('fraud-filter')?.value) || 0;
    const statusFilter = document.getElementById('status-filter')?.value || '';
    
    filteredProviders = allProviders.filter(provider => {
        // Search filter
        if (searchTerm) {
            const matchesSearch = 
                provider.name.toLowerCase().includes(searchTerm) ||
                provider.npi.includes(searchTerm) ||
                provider.city.toLowerCase().includes(searchTerm) ||
                provider.stateName.toLowerCase().includes(searchTerm);
            if (!matchesSearch) return false;
        }
        
        // State filter
        if (stateFilter && provider.state !== stateFilter) return false;
        
        // Type filter
        if (typeFilter && provider.type !== typeFilter) return false;
        
        // Fraud amount filter
        if (fraudFilter && provider.fraudAmount < fraudFilter) return false;
        
        // Status filter
        if (statusFilter && provider.status !== statusFilter) return false;
        
        return true;
    });
    
    currentPage = 1;
    renderProviders();
}

// Render providers table
function renderProviders() {
    const tbody = document.getElementById('providers-table');
    if (!tbody) return;
    
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageProviders = filteredProviders.slice(start, end);
    
    tbody.innerHTML = pageProviders.map(provider => `
        <tr>
            <td>${provider.name}</td>
            <td style="font-family: 'JetBrains Mono', monospace; font-size: 0.85rem;">${provider.npi}</td>
            <td>${providerTypes[provider.type] || provider.type}</td>
            <td>${provider.stateName}</td>
            <td class="fraud-amount">${formatCurrency(provider.fraudAmount)}</td>
            <td><span class="status ${provider.status}">${statusTypes[provider.status]?.label || provider.status}</span></td>
            <td><button class="details-btn" onclick="showProviderDetails('${provider.id}')">Details</button></td>
        </tr>
    `).join('');
    
    updateResultsInfo();
    updatePagination();
}

// Update results count
function updateResultsInfo() {
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
        const start = (currentPage - 1) * itemsPerPage + 1;
        const end = Math.min(currentPage * itemsPerPage, filteredProviders.length);
        resultsCount.textContent = `Showing ${start}-${end} of ${filteredProviders.length} results`;
    }
}

// Update pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredProviders.length / itemsPerPage);
    
    document.getElementById('page-info').textContent = `Page ${currentPage} of ${totalPages || 1}`;
    document.getElementById('prev-btn').disabled = currentPage <= 1;
    document.getElementById('next-btn').disabled = currentPage >= totalPages;
}

// Change page
function changePage(delta) {
    const totalPages = Math.ceil(filteredProviders.length / itemsPerPage);
    currentPage = Math.max(1, Math.min(totalPages, currentPage + delta));
    renderProviders();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show provider details modal
function showProviderDetails(id) {
    const provider = allProviders.find(p => p.id === id);
    if (!provider) return;
    
    document.getElementById('modal-name').textContent = provider.name;
    document.getElementById('modal-npi').textContent = provider.npi;
    document.getElementById('modal-type').textContent = providerTypes[provider.type] || provider.type;
    document.getElementById('modal-state').textContent = provider.stateName;
    document.getElementById('modal-city').textContent = provider.city;
    document.getElementById('modal-fraud').textContent = formatFullCurrency(provider.fraudAmount);
    document.getElementById('modal-status').textContent = statusTypes[provider.status]?.label || provider.status;
    document.getElementById('modal-violation').textContent = provider.violation;
    document.getElementById('modal-date').textContent = provider.date;
    document.getElementById('modal-source').textContent = provider.source;
    
    document.getElementById('provider-modal').classList.remove('hidden');
}

// Close modal
function closeModal() {
    document.getElementById('provider-modal')?.classList.add('hidden');
}

// View toggle
function setView(view) {
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });
}

// Search function
function performSearch() {
    applyFilters();
}

// Update database count
function updateDbCount() {
    const countEl = document.getElementById('db-count');
    if (countEl) {
        countEl.textContent = formatNumber(allProviders.length);
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initDatabase();
    
    // Filter change handlers
    ['state-filter', 'type-filter', 'fraud-filter', 'status-filter'].forEach(id => {
        document.getElementById(id)?.addEventListener('change', applyFilters);
    });
    
    // Search on enter
    document.getElementById('search-input')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') applyFilters();
    });
    
    // Close modal on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});

