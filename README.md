# SomalianScanner - Healthcare Provider Fraud Tracker

A public transparency platform for tracking healthcare provider fraud across the United States. This is a clone/recreation of [SomaliScan.com](https://somaliscan.com).

## Features

- **Interactive US Map** - Click on states to view fraud statistics and provider data
- **Statistics Dashboard** - Real-time totals with animated counters
- **Searchable Database** - Filter 100K+ providers by name, NPI, state, type, fraud amount, and status
- **State Leaderboard** - Rankings by fraud amount with sorting and filtering
- **Donation Portal** - Full donation flow UI (demo mode)

## Getting Started

### Option 1: Open Directly
Simply open `index.html` in your browser. No build process required.

### Option 2: Local Server (Recommended)
For best experience, use a local server:

```bash
# Using Python 3
python -m http.server 8080

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8080
```

Then visit `http://localhost:8080`

## Project Structure

```
somaliscan/
├── index.html          # Main page with map
├── leaderboard.html    # State rankings
├── database.html       # Provider search
├── donations.html      # Donation portal
├── css/
│   └── style.css       # All styles (dark theme)
└── js/
    ├── data.js         # Sample data & utilities
    ├── map.js          # US map SVG & interactions
    ├── main.js         # Homepage logic
    ├── leaderboard.js  # Leaderboard logic
    ├── database.js     # Database search/filter
    └── donations.js    # Donation form handling
```

## Data Sources

The current implementation uses **sample/generated data** for demonstration. To use real data, replace the data in `js/data.js` with actual records from:

### Public Data Sources
1. **OIG LEIE** (List of Excluded Individuals/Entities)
   - Free download: https://oig.hhs.gov/exclusions/exclusions_list.asp
   
2. **CMS Open Payments**
   - API/Download: https://openpaymentsdata.cms.gov/
   
3. **State Licensing Boards**
   - Each state has public disciplinary records
   
4. **Mendeley Healthcare Fraud Dataset**
   - Medicare fraud data: https://data.mendeley.com/

### Data Format
Providers should follow this structure:
```javascript
{
    id: "MN-1",
    name: "Provider Name",
    npi: "1234567890",
    type: "physician", // physician, nurse, pharmacy, clinic, dme, home_health, mental_health
    state: "MN",
    stateName: "Minnesota",
    city: "Minneapolis",
    fraudAmount: 50000,
    status: "excluded", // excluded, sanctioned, under_investigation, settled
    violation: "Description of violation",
    date: "2024-01-15",
    source: "State Licensing Board"
}
```

## Customization

### Branding
- Update logo in navbar (search for "SomalianScanner" in HTML files)
- Modify colors in `css/style.css` `:root` variables

### Adding States
Add state data to `stateData` object in `js/data.js`:
```javascript
"XX": {
    name: "State Name",
    abbr: "XX",
    fraudAmount: 1000000,
    providerCount: 500,
    hasFraudData: true
}
```

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript** - No frameworks, ES6+
- **Fonts** - Outfit (display), JetBrains Mono (code/numbers)

## License

MIT License - Feel free to use and modify.

## Contact

For questions or data submissions: tips@fraudscan.com

