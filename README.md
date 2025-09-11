# 🔴 Red Team Extension - Advanced APT Simulation

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-blue.svg)](https://developer.chrome.com/docs/extensions/)
[![Red Team](https://img.shields.io/badge/Purpose-Red%20Team-red.svg)](https://en.wikipedia.org/wiki/Red_team)

> **⚠️ WARNING: This extension is designed for authorized red team exercises and security testing only. Use only in isolated lab environments with proper authorization.**

## 📋 Overview

This Chrome extension simulates advanced persistent threat (APT) behavior for red team exercises and authorized security testing. It demonstrates common information stealing techniques used by malicious actors to help security professionals understand attack vectors and improve defensive measures.

## 🎯 Features

- **🍪 Cookie Harvesting**: Extracts stored cookies with detailed metadata
- **🕘 Browser History**: Collects browsing history with timestamps
- **🧩 Tab Information**: Gathers data about currently open tabs
- **📋 Clipboard Access**: Retrieves clipboard content
- **🧠 Device Fingerprinting**: Collects browser and system information
- **📡 Multiple Exfiltration Methods**: 
  - Telegram Bot API
  - Discord Webhooks
  - Google Forms
- **⏰ Randomized Execution**: Random delays and execution patterns to avoid detection
- **🔄 Event-Driven Collection**: Triggers on extension startup and installation

## 🛠️ Installation

### Prerequisites

- Chrome browser (Manifest V3 compatible)
- Authorization to perform red team testing
- Isolated testing environment

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Infostealer-Extension.git
   cd Infostealer-Extension
   ```

2. **Configure exfiltration endpoints** (Edit `background.js`)
   ```javascript
   const TELEGRAM_BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN";
   const TELEGRAM_CHAT_ID = "YOUR_CHAT_ID";
   const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/WEBHOOK_ID/WEBHOOK_TOKEN";
   const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/YOURTOKEN/formResponse";
   ```

3. **Load the extension in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the project directory

## 🔧 Configuration

### Exfiltration Endpoints

The extension supports three data exfiltration methods:

#### Telegram Bot
1. Create a Telegram bot via [@BotFather](https://t.me/botfather)
2. Get your bot token and chat ID
3. Update the constants in `background.js`

#### Discord Webhook
1. Create a Discord webhook in your server settings
2. Copy the webhook URL
3. Update the `DISCORD_WEBHOOK_URL` constant

#### Google Forms
1. Create a Google Form
2. Get the form submission URL from the form's action attribute
3. Update the `GOOGLE_FORM_URL` and `FORM_COOKIE_FIELD` constants

## 📊 Data Collected

| Data Type | Description | Sample Output |
|-----------|-------------|---------------|
| **Device Fingerprint** | Browser and system information | User agent, timezone, platform |
| **Cookies** | Stored authentication cookies | Domain, name, value, security flags |
| **Browser History** | Recent browsing activity | URLs with timestamps |
| **Open Tabs** | Current tab information | Titles and URLs |
| **Clipboard** | Clipboard content | Text data |

## 🎭 Red Team Use Cases

- **Social Engineering Simulations**: Demonstrate how malicious extensions can harvest data
- **Security Awareness Training**: Show real-world attack techniques
- **Defense Testing**: Validate detection capabilities and response procedures
- **APT Simulation**: Mimic advanced persistent threat behaviors

## 🛡️ Security Considerations

### For Red Team Operators
- ✅ Use only in authorized testing environments
- ✅ Ensure proper isolation from production systems
- ✅ Document all testing activities
- ✅ Follow responsible disclosure practices

### For Defenders
- 🔍 Monitor for suspicious extension permissions
- 🔍 Implement behavioral detection for data exfiltration
- 🔍 Regular security awareness training
- 🔍 Network monitoring for suspicious outbound connections

## 📝 Permissions Explained

| Permission | Purpose | Risk Level |
|------------|---------|------------|
| `cookies` | Access stored cookies | High |
| `history` | Read browser history | Medium |
| `tabs` | Access tab information | Medium |
| `clipboardRead` | Read clipboard content | High |
| `storage` | Store extension data | Low |
| `<all_urls>` | Access all websites | Critical |

## 🚨 Detection Indicators

### Behavioral Indicators
- Extension requesting excessive permissions
- Random delays in network requests
- Multiple exfiltration channels
- Clipboard access attempts

### Network Indicators
- Connections to Telegram API
- Discord webhook calls
- Google Forms submissions
- Unusual data transmission patterns

## 📚 Educational Value

This extension serves as a learning tool for:
- Understanding browser extension attack vectors
- Recognizing malicious extension behaviors
- Implementing defensive measures
- Training security teams on APT techniques

## ⚖️ Legal Disclaimer

**IMPORTANT**: This software is provided for educational and authorized testing purposes only. Users are responsible for:

- Obtaining proper authorization before use
- Complying with all applicable laws and regulations
- Using only in isolated testing environments
- Not using for malicious purposes

The authors are not responsible for any misuse of this software.

## 🤝 Contributing

Contributions are welcome for educational and security research purposes:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Resources

- [Chrome Extension Developer Guide](https://developer.chrome.com/docs/extensions/)
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [Red Team Framework](https://github.com/redcanaryco/atomic-red-team)

## 📞 Contact

For questions about authorized use or security research:
- Create an issue in this repository
- Follow responsible disclosure practices

---

**Remember**: With great power comes great responsibility. Use this tool ethically and legally! 🛡️
