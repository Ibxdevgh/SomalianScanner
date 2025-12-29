// =====================================================
// FraudScan - Sample Data
// Replace with real data from APIs/databases
// =====================================================

const stateData = {
    "MN": {
        name: "Minnesota",
        abbr: "MN",
        fraudAmount: 35010000,
        providerCount: 7193,
        hasFraudData: true
    },
    "OH": {
        name: "Ohio",
        abbr: "OH",
        fraudAmount: 28450000,
        providerCount: 6842,
        hasFraudData: true
    },
    "TX": {
        name: "Texas",
        abbr: "TX",
        fraudAmount: 24780000,
        providerCount: 12450,
        hasFraudData: true
    },
    "FL": {
        name: "Florida",
        abbr: "FL",
        fraudAmount: 22340000,
        providerCount: 9876,
        hasFraudData: true
    },
    "CA": {
        name: "California",
        abbr: "CA",
        fraudAmount: 19870000,
        providerCount: 15234,
        hasFraudData: true
    },
    "NY": {
        name: "New York",
        abbr: "NY",
        fraudAmount: 18920000,
        providerCount: 11023,
        hasFraudData: true
    },
    "PA": {
        name: "Pennsylvania",
        abbr: "PA",
        fraudAmount: 14560000,
        providerCount: 5678,
        hasFraudData: true
    },
    "MI": {
        name: "Michigan",
        abbr: "MI",
        fraudAmount: 12340000,
        providerCount: 4521,
        hasFraudData: true
    },
    "IL": {
        name: "Illinois",
        abbr: "IL",
        fraudAmount: 11890000,
        providerCount: 6234,
        hasFraudData: true
    },
    "GA": {
        name: "Georgia",
        abbr: "GA",
        fraudAmount: 9870000,
        providerCount: 4123,
        hasFraudData: true
    },
    "NC": {
        name: "North Carolina",
        abbr: "NC",
        fraudAmount: 8450000,
        providerCount: 3567,
        hasFraudData: true
    },
    "NJ": {
        name: "New Jersey",
        abbr: "NJ",
        fraudAmount: 7890000,
        providerCount: 3892,
        hasFraudData: true
    },
    "AZ": {
        name: "Arizona",
        abbr: "AZ",
        fraudAmount: 6780000,
        providerCount: 2987,
        hasFraudData: true
    },
    "WA": {
        name: "Washington",
        abbr: "WA",
        fraudAmount: 5670000,
        providerCount: 2456,
        hasFraudData: true
    },
    "CO": {
        name: "Colorado",
        abbr: "CO",
        fraudAmount: 4890000,
        providerCount: 2134,
        hasFraudData: true
    },
    // States with only provider tracking (no fraud data yet)
    "VA": {
        name: "Virginia",
        abbr: "VA",
        fraudAmount: 0,
        providerCount: 4567,
        hasFraudData: false
    },
    "MA": {
        name: "Massachusetts",
        abbr: "MA",
        fraudAmount: 0,
        providerCount: 3892,
        hasFraudData: false
    },
    "TN": {
        name: "Tennessee",
        abbr: "TN",
        fraudAmount: 0,
        providerCount: 3234,
        hasFraudData: false
    },
    "WI": {
        name: "Wisconsin",
        abbr: "WI",
        fraudAmount: 0,
        providerCount: 2567,
        hasFraudData: false
    },
    "MD": {
        name: "Maryland",
        abbr: "MD",
        fraudAmount: 0,
        providerCount: 2890,
        hasFraudData: false
    }
};

// Provider types with display names
const providerTypes = {
    "physician": "Physician",
    "nurse": "Nurse Practitioner",
    "pharmacy": "Pharmacy",
    "clinic": "Clinic/Facility",
    "dme": "DME Supplier",
    "home_health": "Home Health",
    "mental_health": "Mental Health"
};

// Status types with display info
const statusTypes = {
    "excluded": { label: "Excluded", class: "excluded" },
    "sanctioned": { label: "Sanctioned", class: "sanctioned" },
    "under_investigation": { label: "Under Investigation", class: "under_investigation" },
    "settled": { label: "Settled", class: "settled" }
};

// Violation descriptions for random generation
const violationDescriptions = [
    "Submitted false claims for services not rendered",
    "Billed for medically unnecessary services",
    "Upcoding - billing for more expensive services than provided",
    "Kickback scheme involving patient referrals",
    "Identity theft and fraudulent billing",
    "Phantom billing for deceased patients",
    "Unbundling services to increase reimbursement",
    "Prescription fraud and controlled substance diversion",
    "False certification of home health services",
    "Falsifying patient records to justify claims",
    "Billing for brand-name drugs while dispensing generics",
    "Operating unlicensed medical facility",
    "Submitting duplicate claims for same service",
    "DME fraud - billing for equipment not provided",
    "Mental health billing fraud - phantom sessions"
];

// Cities by state for realistic data
const citiesByState = {
    "MN": ["Minneapolis", "St. Paul", "Rochester", "Bloomington", "Duluth", "Brooklyn Park", "Plymouth", "Maple Grove", "Woodbury", "St. Cloud"],
    "OH": ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron", "Dayton", "Parma", "Canton", "Youngstown", "Lorain"],
    "TX": ["Houston", "Dallas", "San Antonio", "Austin", "Fort Worth", "El Paso", "Arlington", "Plano", "Laredo", "Lubbock"],
    "FL": ["Miami", "Jacksonville", "Tampa", "Orlando", "St. Petersburg", "Hialeah", "Tallahassee", "Fort Lauderdale", "Port St. Lucie", "Cape Coral"],
    "CA": ["Los Angeles", "San Diego", "San Jose", "San Francisco", "Fresno", "Sacramento", "Long Beach", "Oakland", "Bakersfield", "Anaheim"],
    "NY": ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse", "Albany", "New Rochelle", "Mount Vernon", "Schenectady", "Utica"],
    "PA": ["Philadelphia", "Pittsburgh", "Allentown", "Reading", "Scranton", "Bethlehem", "Lancaster", "Harrisburg", "Altoona", "Erie"],
    "MI": ["Detroit", "Grand Rapids", "Warren", "Sterling Heights", "Ann Arbor", "Lansing", "Flint", "Dearborn", "Livonia", "Troy"],
    "IL": ["Chicago", "Aurora", "Naperville", "Joliet", "Rockford", "Springfield", "Elgin", "Peoria", "Champaign", "Waukegan"],
    "GA": ["Atlanta", "Augusta", "Columbus", "Macon", "Savannah", "Athens", "Sandy Springs", "Roswell", "Johns Creek", "Albany"],
    "NC": ["Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem", "Fayetteville", "Cary", "Wilmington", "High Point", "Concord"],
    "NJ": ["Newark", "Jersey City", "Paterson", "Elizabeth", "Edison", "Woodbridge", "Lakewood", "Toms River", "Hamilton", "Trenton"],
    "AZ": ["Phoenix", "Tucson", "Mesa", "Chandler", "Scottsdale", "Glendale", "Gilbert", "Tempe", "Peoria", "Surprise"],
    "WA": ["Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue", "Kent", "Everett", "Renton", "Spokane Valley", "Federal Way"],
    "CO": ["Denver", "Colorado Springs", "Aurora", "Fort Collins", "Lakewood", "Thornton", "Arvada", "Westminster", "Pueblo", "Centennial"],
    "VA": ["Virginia Beach", "Norfolk", "Chesapeake", "Richmond", "Newport News", "Alexandria", "Hampton", "Roanoke", "Portsmouth", "Suffolk"],
    "MA": ["Boston", "Worcester", "Springfield", "Lowell", "Cambridge", "New Bedford", "Brockton", "Quincy", "Lynn", "Fall River"],
    "TN": ["Nashville", "Memphis", "Knoxville", "Chattanooga", "Clarksville", "Murfreesboro", "Franklin", "Jackson", "Johnson City", "Bartlett"],
    "WI": ["Milwaukee", "Madison", "Green Bay", "Kenosha", "Racine", "Appleton", "Waukesha", "Eau Claire", "Oshkosh", "Janesville"],
    "MD": ["Baltimore", "Frederick", "Rockville", "Gaithersburg", "Bowie", "Hagerstown", "Annapolis", "College Park", "Salisbury", "Laurel"]
};

// First names for random generation
const firstNames = [
    "Ahmed", "Abdi", "Mohamed", "Fatima", "Amina", "Hassan", "Ismail", "Zahra", "Yusuf", "Khadija",
    "James", "John", "Robert", "Michael", "David", "Mary", "Patricia", "Jennifer", "Linda", "Elizabeth",
    "Omar", "Ali", "Ibrahim", "Aisha", "Maryam", "Khalid", "Noor", "Safia", "Hamza", "Layla",
    "William", "Richard", "Joseph", "Thomas", "Charles", "Barbara", "Susan", "Jessica", "Sarah", "Karen"
];

// Last names for random generation
const lastNames = [
    "Mohamed", "Ahmed", "Ali", "Hassan", "Ibrahim", "Omar", "Yusuf", "Abdi", "Nur", "Osman",
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
    "Farah", "Jama", "Aden", "Warsame", "Hussein", "Ismail", "Salah", "Egal", "Hashi", "Mohamud",
    "Wilson", "Anderson", "Taylor", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Robinson"
];

// Generate a random NPI (National Provider Identifier)
function generateNPI() {
    let npi = "1";
    for (let i = 0; i < 9; i++) {
        npi += Math.floor(Math.random() * 10);
    }
    return npi;
}

// Generate a random date within the last 5 years
function generateDate() {
    const start = new Date(2019, 0, 1);
    const end = new Date();
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
}

// Generate providers for a state
function generateProviders(stateAbbr, count) {
    const providers = [];
    const state = stateData[stateAbbr];
    if (!state) return providers;
    
    const cities = citiesByState[stateAbbr] || ["Unknown City"];
    const types = Object.keys(providerTypes);
    const statuses = Object.keys(statusTypes);
    const sources = ["State Licensing Board", "OIG Exclusion List", "Court Records", "Medicare Fraud Database", "State Attorney General"];
    
    for (let i = 0; i < count; i++) {
        const isOrg = Math.random() > 0.6;
        const type = types[Math.floor(Math.random() * types.length)];
        
        let name;
        if (isOrg) {
            const orgPrefixes = ["Advanced", "Premier", "Quality", "Community", "Metro", "Regional", "United", "Care", "Health", "Medical"];
            const orgSuffixes = ["Healthcare", "Medical Group", "Clinic", "Services", "Associates", "Partners", "Care Center", "Health Services"];
            name = `${orgPrefixes[Math.floor(Math.random() * orgPrefixes.length)]} ${orgSuffixes[Math.floor(Math.random() * orgSuffixes.length)]}`;
        } else {
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            const suffix = Math.random() > 0.5 ? ", MD" : (Math.random() > 0.5 ? ", NP" : ", DO");
            name = `${firstName} ${lastName}${suffix}`;
        }
        
        // Fraud amount - exponential distribution for realistic spread
        const fraudAmount = state.hasFraudData 
            ? Math.floor(Math.pow(10, 3 + Math.random() * 4)) 
            : 0;
        
        providers.push({
            id: `${stateAbbr}-${i + 1}`,
            name: name,
            npi: generateNPI(),
            type: type,
            state: stateAbbr,
            stateName: state.name,
            city: cities[Math.floor(Math.random() * cities.length)],
            fraudAmount: fraudAmount,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            violation: violationDescriptions[Math.floor(Math.random() * violationDescriptions.length)],
            date: generateDate(),
            source: sources[Math.floor(Math.random() * sources.length)]
        });
    }
    
    return providers;
}

// Generate all providers
function generateAllProviders() {
    let allProviders = [];
    
    for (const abbr in stateData) {
        // Generate proportional number of providers per state
        const count = Math.min(Math.floor(stateData[abbr].providerCount / 100), 200);
        allProviders = allProviders.concat(generateProviders(abbr, count));
    }
    
    // Sort by fraud amount descending
    allProviders.sort((a, b) => b.fraudAmount - a.fraudAmount);
    
    return allProviders;
}

// Cache providers
let providersCache = null;

function getProviders() {
    if (!providersCache) {
        providersCache = generateAllProviders();
    }
    return providersCache;
}

// Get sorted states for leaderboard
function getSortedStates(sortBy = 'fraud-desc', minFraud = 0) {
    let states = Object.values(stateData).filter(s => s.fraudAmount >= minFraud);
    
    switch (sortBy) {
        case 'fraud-desc':
            states.sort((a, b) => b.fraudAmount - a.fraudAmount);
            break;
        case 'fraud-asc':
            states.sort((a, b) => a.fraudAmount - b.fraudAmount);
            break;
        case 'providers-desc':
            states.sort((a, b) => b.providerCount - a.providerCount);
            break;
        case 'providers-asc':
            states.sort((a, b) => a.providerCount - b.providerCount);
            break;
        case 'name-asc':
            states.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    
    return states;
}

// Get totals
function getTotals() {
    const states = Object.values(stateData);
    return {
        totalFraud: states.reduce((sum, s) => sum + s.fraudAmount, 0),
        totalProviders: states.reduce((sum, s) => sum + s.providerCount, 0),
        statesWithFraud: states.filter(s => s.hasFraudData).length,
        totalStates: states.length
    };
}

// Format currency
function formatCurrency(amount) {
    if (amount >= 1000000) {
        return '$' + (amount / 1000000).toFixed(2) + 'M';
    } else if (amount >= 1000) {
        return '$' + (amount / 1000).toFixed(1) + 'K';
    }
    return '$' + amount.toLocaleString();
}

// Format full currency
function formatFullCurrency(amount) {
    return '$' + amount.toLocaleString();
}

// Format number with commas
function formatNumber(num) {
    return num.toLocaleString();
}

