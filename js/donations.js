// =====================================================
// FraudScan - Political Donations Database
// Campaign finance tracking by state
// =====================================================

// Sample campaign finance data
const donationsData = {
    "MN": {
        name: "Minnesota",
        totalContributions: 695740000,
        totalDonations: 461992,
        recipientCount: 2401,
        contributorCount: 76206,
        recipients: [
            { name: "MN DFL State Central Committee", type: "Party", total: 92460000 },
            { name: "Alliance for a Better Minnesota Action Fund", type: "Committee", total: 42210000 },
            { name: "DFL House Caucus", type: "Party", total: 38460000 },
            { name: "DGA Victory Fund", type: "Committee", total: 38250000 },
            { name: "DFL Senate Caucus", type: "Party", total: 28260000 },
            { name: "Education Minn PAC", type: "Committee", total: 25670000 },
            { name: "2024 Fund", type: "Committee", total: 20640000 },
            { name: "HRCC", type: "Party", total: 16950000 },
            { name: "WIN Minnesota Political Action Fund", type: "Committee", total: 15800000 },
            { name: "Walz, Tim Gov Committee", type: "Candidate", total: 13450000 },
            { name: "Senate Victory Fund (SVF)", type: "Party", total: 12730000 },
            { name: "DLCC Victory Fund", type: "Committee", total: 10470000 },
            { name: "Republican Party of Minn", type: "Party", total: 8630000 },
            { name: "IBEW - COPE", type: "Committee", total: 7920000 },
            { name: "Planned Parenthood of Minn Pol Action Fund", type: "Committee", total: 7720000 }
        ],
        contributors: [
            { name: "Education Minnesota", employer: "", total: 23510000 },
            { name: "MN DFL Senate Caucus", employer: "", total: 22630000 },
            { name: "House DFL Caucus", employer: "", total: 17110000 },
            { name: "WIN Minnesota Political Action Fund", employer: "", total: 12970000 },
            { name: "Education Minn PAC", employer: "", total: 12930000 },
            { name: "AFSCME", employer: "", total: 12730000 },
            { name: "Messinger, Alida R", employer: "Unemployed", total: 9550000 },
            { name: "Laborers' District Council MN & ND", employer: "", total: 9470000 },
            { name: "2022 Fund (fka 2018 Fund)", employer: "", total: 8490000 },
            { name: "AFSCME Council 5", employer: "", total: 7870000 },
            { name: "SEIU International", employer: "", total: 7810000 },
            { name: "DGA Action", employer: "", total: 7150000 },
            { name: "Shakopee Mdewakanton Sioux Community", employer: "", total: 4340000 },
            { name: "MN Business Partnership", employer: "", total: 4330000 },
            { name: "Xcel Energy", employer: "", total: 3210000 }
        ],
        recentDonations: [
            { date: "Oct 20, 2025", contributor: "Freedom Club", recipient: "Excellence Minnesota", amount: 25000 },
            { date: "Oct 20, 2025", contributor: "Education Minn PAC", recipient: "UTSWC", amount: 7367.84 },
            { date: "Oct 20, 2025", contributor: "Education Minn PAC", recipient: "Political Fund of BFT", amount: 6350.10 },
            { date: "Oct 20, 2025", contributor: "Move MN Action Fund", recipient: "Move Minnesota Action", amount: 5637.57 },
            { date: "Oct 20, 2025", contributor: "TakeAction Minnesota", recipient: "Duluth Right to Repair Fund", amount: 5442.68 },
            { date: "Oct 20, 2025", contributor: "IBEW Local 292 Political Education Fund", recipient: "MN DFL State Central Committee", amount: 5000 },
            { date: "Oct 20, 2025", contributor: "Laborers District Council of Minn & ND", recipient: "Vote Yes For a Fairer St. Paul", amount: 5000 },
            { date: "Oct 20, 2025", contributor: "Education Minn PAC", recipient: "Hopkins Education Association", amount: 4494.76 },
            { date: "Oct 20, 2025", contributor: "Education Minn PAC", recipient: "Mounds View Educators for Political Action", amount: 4455.06 },
            { date: "Oct 20, 2025", contributor: "Education Minn PAC", recipient: "AHEM Political Fund", amount: 3619.88 }
        ]
    },
    "TX": {
        name: "Texas",
        totalContributions: 892450000,
        totalDonations: 567432,
        recipientCount: 3245,
        contributorCount: 89234,
        recipients: [
            { name: "Republican Party of Texas", type: "Party", total: 78450000 },
            { name: "Texans for Greg Abbott", type: "Candidate", total: 45230000 },
            { name: "Texas Democratic Party", type: "Party", total: 38760000 },
            { name: "Empower Texans PAC", type: "Committee", total: 28900000 },
            { name: "Texas House Republican Caucus", type: "Party", total: 22340000 }
        ],
        contributors: [
            { name: "Texans for Lawsuit Reform", employer: "", total: 34560000 },
            { name: "AT&T Inc", employer: "", total: 18790000 },
            { name: "Energy Transfer Partners", employer: "", total: 15670000 },
            { name: "Koch Industries", employer: "", total: 12340000 },
            { name: "Texas Association of Realtors", employer: "", total: 9870000 }
        ],
        recentDonations: [
            { date: "Oct 19, 2025", contributor: "AT&T Inc", recipient: "Republican Party of Texas", amount: 50000 },
            { date: "Oct 19, 2025", contributor: "Energy Transfer Partners", recipient: "Texans for Greg Abbott", amount: 25000 },
            { date: "Oct 18, 2025", contributor: "Texas Trial Lawyers Assoc", recipient: "Texas Democratic Party", amount: 15000 }
        ]
    },
    "CA": {
        name: "California",
        totalContributions: 1234560000,
        totalDonations: 892341,
        recipientCount: 4567,
        contributorCount: 123456,
        recipients: [
            { name: "California Democratic Party", type: "Party", total: 156780000 },
            { name: "Gavin Newsom for Governor", type: "Candidate", total: 89450000 },
            { name: "California Republican Party", type: "Party", total: 45670000 },
            { name: "California Teachers Association", type: "Committee", total: 34560000 },
            { name: "SEIU California State Council", type: "Committee", total: 28900000 }
        ],
        contributors: [
            { name: "Netflix Inc", employer: "", total: 45670000 },
            { name: "Google LLC", employer: "", total: 34560000 },
            { name: "California Teachers Association", employer: "", total: 28900000 },
            { name: "SEIU California", employer: "", total: 23450000 },
            { name: "Chevron Corporation", employer: "", total: 18760000 }
        ],
        recentDonations: [
            { date: "Oct 20, 2025", contributor: "Netflix Inc", recipient: "California Democratic Party", amount: 100000 },
            { date: "Oct 19, 2025", contributor: "Google LLC", recipient: "California Democratic Party", amount: 75000 }
        ]
    },
    "FL": {
        name: "Florida",
        totalContributions: 567890000,
        totalDonations: 345678,
        recipientCount: 2890,
        contributorCount: 67890,
        recipients: [
            { name: "Republican Party of Florida", type: "Party", total: 89670000 },
            { name: "Ron DeSantis for Governor", type: "Candidate", total: 67890000 },
            { name: "Florida Democratic Party", type: "Party", total: 34560000 }
        ],
        contributors: [
            { name: "Disney Worldwide Services", employer: "", total: 23450000 },
            { name: "Florida Power & Light", employer: "", total: 18900000 },
            { name: "Publix Super Markets", employer: "", total: 12340000 }
        ],
        recentDonations: [
            { date: "Oct 20, 2025", contributor: "Florida Power & Light", recipient: "Republican Party of Florida", amount: 50000 }
        ]
    },
    "NY": {
        name: "New York",
        totalContributions: 987650000,
        totalDonations: 678234,
        recipientCount: 3456,
        contributorCount: 98765,
        recipients: [
            { name: "New York State Democratic Committee", type: "Party", total: 123450000 },
            { name: "Kathy Hochul for Governor", type: "Candidate", total: 56780000 },
            { name: "New York Republican State Committee", type: "Party", total: 34560000 }
        ],
        contributors: [
            { name: "1199 SEIU United Healthcare Workers", employer: "", total: 34560000 },
            { name: "Real Estate Board of New York", employer: "", total: 23450000 },
            { name: "Goldman Sachs", employer: "", total: 18900000 }
        ],
        recentDonations: [
            { date: "Oct 20, 2025", contributor: "1199 SEIU", recipient: "New York State Democratic Committee", amount: 75000 }
        ]
    }
};

// Add summary data for states without detailed donations data
const statesWithDonations = ["MN", "TX", "CA", "FL", "NY", "OH", "PA", "IL", "GA", "NC"];

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Check URL for state parameter
    const urlParams = new URLSearchParams(window.location.search);
    const stateParam = urlParams.get('state');
    
    if (stateParam && donationsData[stateParam]) {
        showStateDetail(stateParam);
    } else {
        showStateGrid();
    }
});

// Show state selection grid
function showStateGrid() {
    document.getElementById('state-selection').classList.remove('hidden');
    document.getElementById('state-grid-section').classList.remove('hidden');
    document.getElementById('state-detail').classList.add('hidden');
    
    const grid = document.getElementById('donations-state-grid');
    
    // Get states with donations data
    const statesHtml = Object.entries(donationsData).map(([abbr, data]) => `
        <a href="donations.html?state=${abbr}" class="state-card" onclick="showStateDetail('${abbr}'); return false;">
            <h3>${data.name}</h3>
            <div class="state-card-stats">
                <span class="state-amount">${formatCurrency(data.totalContributions)}</span>
                <span class="state-count">${formatNumber(data.totalDonations)} donations</span>
            </div>
        </a>
    `).join('');
    
    // Add placeholder states
    const placeholderStates = ["OH", "PA", "IL", "GA", "NC", "MI", "NJ", "VA", "WA", "AZ"];
    const placeholderHtml = placeholderStates
        .filter(s => !donationsData[s])
        .map(abbr => {
            const state = stateData[abbr];
            if (!state) return '';
            return `
                <div class="state-card disabled">
                    <h3>${state.name}</h3>
                    <div class="state-card-stats">
                        <span class="state-count">Coming soon</span>
                    </div>
                </div>
            `;
        }).join('');
    
    grid.innerHTML = statesHtml + placeholderHtml;
}

// Show state detail view
function showStateDetail(abbr) {
    const data = donationsData[abbr];
    if (!data) return;
    
    // Update URL without reload
    history.pushState({}, '', `donations.html?state=${abbr}`);
    
    document.getElementById('state-selection').classList.add('hidden');
    document.getElementById('state-grid-section').classList.add('hidden');
    document.getElementById('state-detail').classList.remove('hidden');
    
    // Update header
    document.getElementById('state-title').textContent = `${data.name} Political Donations`;
    
    // Update stats
    document.getElementById('total-contributions').textContent = formatCurrency(data.totalContributions);
    document.getElementById('total-donations').textContent = formatNumber(data.totalDonations);
    document.getElementById('total-recipients').textContent = formatNumber(data.recipientCount);
    document.getElementById('total-contributors').textContent = formatNumber(data.contributorCount);
    
    // Render tables
    renderRecipientsTable(data.recipients);
    renderContributorsTable(data.contributors);
    renderRecentDonations(data.recentDonations);
    
    // Setup search
    document.getElementById('donations-search').addEventListener('input', (e) => {
        filterDonationsTables(e.target.value, data);
    });
}

// Render recipients table
function renderRecipientsTable(recipients) {
    const tbody = document.getElementById('recipients-table');
    tbody.innerHTML = recipients.map((r, i) => `
        <tr>
            <td class="rank-col">${i + 1}</td>
            <td>
                <a href="#" class="entity-link">${r.name}</a>
            </td>
            <td><span class="type-badge ${r.type.toLowerCase()}">${r.type}</span></td>
            <td class="amount-col">${formatCurrency(r.total)}</td>
        </tr>
    `).join('');
}

// Render contributors table
function renderContributorsTable(contributors) {
    const tbody = document.getElementById('contributors-table');
    tbody.innerHTML = contributors.map((c, i) => `
        <tr>
            <td class="rank-col">${i + 1}</td>
            <td>
                <a href="#" class="entity-link">${c.name}</a>
                ${c.employer ? `<span class="employer">${c.employer}</span>` : ''}
            </td>
            <td class="amount-col">${formatCurrency(c.total)}</td>
        </tr>
    `).join('');
}

// Render recent donations
function renderRecentDonations(donations) {
    const tbody = document.getElementById('recent-donations-table');
    tbody.innerHTML = donations.map(d => `
        <tr>
            <td class="date-col">${d.date}</td>
            <td><a href="#" class="entity-link">${d.contributor}</a></td>
            <td><a href="#" class="entity-link">${d.recipient}</a></td>
            <td class="amount-col">${formatDonationAmount(d.amount)}</td>
        </tr>
    `).join('');
}

// Filter tables by search
function filterDonationsTables(query, data) {
    const q = query.toLowerCase();
    
    const filteredRecipients = data.recipients.filter(r => 
        r.name.toLowerCase().includes(q)
    );
    const filteredContributors = data.contributors.filter(c => 
        c.name.toLowerCase().includes(q)
    );
    const filteredDonations = data.recentDonations.filter(d =>
        d.contributor.toLowerCase().includes(q) || d.recipient.toLowerCase().includes(q)
    );
    
    renderRecipientsTable(filteredRecipients);
    renderContributorsTable(filteredContributors);
    renderRecentDonations(filteredDonations);
}

// Format donation amount
function formatDonationAmount(amount) {
    if (amount >= 1000000) {
        return '$' + (amount / 1000000).toFixed(2) + 'M';
    }
    return '$' + amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

// Handle back navigation
window.addEventListener('popstate', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const stateParam = urlParams.get('state');
    
    if (stateParam && donationsData[stateParam]) {
        showStateDetail(stateParam);
    } else {
        showStateGrid();
    }
});
