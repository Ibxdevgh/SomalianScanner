// =====================================================
// FraudScan - US Map using TopoJSON
// =====================================================

// Load and render US map
async function initMap() {
    const svg = document.getElementById('us-map');
    if (!svg) return;
    
    // Use D3 geo projection for proper rendering
    const width = 959;
    const height = 593;
    
    try {
        // Fetch US states GeoJSON
        const response = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json');
        const us = await response.json();
        
        // Convert TopoJSON to GeoJSON
        const states = topojson.feature(us, us.objects.states);
        
        // Create projection
        const projection = d3.geoAlbersUsa()
            .scale(1280)
            .translate([width / 2, height / 2]);
        
        const path = d3.geoPath().projection(projection);
        
        // State FIPS to abbreviation mapping
        const fipsToAbbr = {
            "01": "AL", "02": "AK", "04": "AZ", "05": "AR", "06": "CA",
            "08": "CO", "09": "CT", "10": "DE", "11": "DC", "12": "FL",
            "13": "GA", "15": "HI", "16": "ID", "17": "IL", "18": "IN",
            "19": "IA", "20": "KS", "21": "KY", "22": "LA", "23": "ME",
            "24": "MD", "25": "MA", "26": "MI", "27": "MN", "28": "MS",
            "29": "MO", "30": "MT", "31": "NE", "32": "NV", "33": "NH",
            "34": "NJ", "35": "NM", "36": "NY", "37": "NC", "38": "ND",
            "39": "OH", "40": "OK", "41": "OR", "42": "PA", "44": "RI",
            "45": "SC", "46": "SD", "47": "TN", "48": "TX", "49": "UT",
            "50": "VT", "51": "VA", "53": "WA", "54": "WV", "55": "WI",
            "56": "WY", "72": "PR"
        };
        
        // Clear SVG
        svg.innerHTML = '';
        
        // Create group for states
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        svg.appendChild(g);
        
        // Draw each state
        states.features.forEach(feature => {
            const fips = feature.id.toString().padStart(2, '0');
            const abbr = fipsToAbbr[fips];
            if (!abbr) return;
            
            const pathData = path(feature);
            if (!pathData) return;
            
            const stateEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
            stateEl.setAttribute("d", pathData);
            stateEl.setAttribute("id", `state-${abbr}`);
            stateEl.setAttribute("data-state", abbr);
            
            // Add class based on data availability
            const data = stateData[abbr];
            if (data) {
                if (data.hasFraudData) {
                    stateEl.classList.add("has-fraud");
                } else if (data.providerCount > 0) {
                    stateEl.classList.add("has-providers");
                }
            }
            
            // Add click handler
            stateEl.addEventListener("click", () => showStatePopup(abbr));
            
            // Add hover effects
            stateEl.addEventListener("mouseenter", (e) => showTooltip(e, abbr));
            stateEl.addEventListener("mouseleave", hideTooltip);
            
            g.appendChild(stateEl);
        });
        
    } catch (error) {
        console.error('Failed to load map:', error);
        // Fallback to simple message
        svg.innerHTML = `<text x="50%" y="50%" text-anchor="middle" fill="#64748b">Map loading failed. Please refresh.</text>`;
    }
}

// Tooltip element
let tooltip = null;

function showTooltip(event, abbr) {
    const data = stateData[abbr];
    if (!data) return;
    
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.className = 'map-tooltip';
        tooltip.style.cssText = `
            position: fixed;
            background: #1a2235;
            border: 1px solid #2a3548;
            border-radius: 8px;
            padding: 0.75rem 1rem;
            pointer-events: none;
            z-index: 1000;
            font-size: 0.9rem;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        `;
        document.body.appendChild(tooltip);
    }
    
    tooltip.innerHTML = `
        <strong style="color: #f0f4f8;">${data.name}</strong><br>
        <span style="color: #22c55e; font-family: 'JetBrains Mono', monospace;">${formatCurrency(data.fraudAmount)}</span>
        <span style="color: #64748b;"> fraud</span><br>
        <span style="color: #94a3b8;">${formatNumber(data.providerCount)} providers</span>
    `;
    
    tooltip.style.left = (event.clientX + 15) + 'px';
    tooltip.style.top = (event.clientY + 15) + 'px';
    tooltip.style.display = 'block';
}

function hideTooltip() {
    if (tooltip) {
        tooltip.style.display = 'none';
    }
}

// Show state popup
function showStatePopup(abbr) {
    const data = stateData[abbr];
    if (!data) return;
    
    const popup = document.getElementById('state-popup');
    document.getElementById('popup-state-name').textContent = data.name;
    document.getElementById('popup-fraud-amount').textContent = formatCurrency(data.fraudAmount);
    document.getElementById('popup-provider-count').textContent = formatNumber(data.providerCount);
    document.getElementById('popup-link').href = `database.html?state=${abbr}`;
    
    popup.classList.remove('hidden');
}

// Close popup
function closePopup() {
    const popup = document.getElementById('state-popup');
    if (popup) {
        popup.classList.add('hidden');
    }
}

// Close popup on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePopup();
    }
});

// Initialize on load
document.addEventListener('DOMContentLoaded', initMap);
