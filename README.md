# Currency Checker

<div align="center"">
  <img src="./icon.png" style="wight: 240px;" />
</div>

A simple Chrome extension that displays real-time exchange rates from USD and EUR to BRL (Brazilian Real).

## Features

- 📊 Real-time exchange rates for USD → BRL and EUR → BRL
- 🔄 Auto-refresh functionality
- ⏱️ 30-minute cache to minimize API calls
- 📱 Clean, responsive UI
- 🕒 "Last updated" timestamp with relative time

## Screenshot
<div align="center"">
  <img src="https://i.imgur.com/KWNQkHs.png"/>
</div>

## Installation

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top-right corner)
4. Click "Load unpacked" and select the extension directory
5. The extension icon should appear in your browser toolbar

## Usage

1. Click on the Currency Checker icon in your Chrome toolbar
2. View the current USD and EUR to BRL exchange rates
3. Click the refresh button to get the latest rates

## Technical Details

- Uses the [Exchange Rate API](https://open.er-api.com) for current exchange rates
- Caches data for 30 minutes to avoid unnecessary API calls
- Built with vanilla JavaScript, HTML, and CSS

## Project Structure

```
.
├── icon.png         # Extension icon
├── manifest.json    # Extension manifest file
├── popup.html       # Main UI HTML
├── popup.js         # Extension functionality
└── style.css        # UI styling
```

## API Reference

This extension uses the Exchange Rate API:
- Base URL: `https://open.er-api.com/v6/latest`
- Endpoint example: `https://open.er-api.com/v6/latest/USD`

## Development

### Prerequisites
- Basic knowledge of HTML, CSS, and JavaScript
- Chrome browser

### Modifying the Extension
1. Edit the files as needed
2. Save your changes
3. Go to `chrome://extensions/`
4. Click the refresh icon on the Currency Checker card
5. Click the extension icon to see your changes

## Privacy

This extension:
- Only makes API calls to get exchange rates
- Stores exchange rate data locally in your browser
- Does not collect any personal information
- Does not track your browsing activity

## License

[MIT License](LICENSE)

## Buy Me a Ko-Fi
[![Ko-Fi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/verivi)

---

© 2025 VERAS. All rights reserved.
