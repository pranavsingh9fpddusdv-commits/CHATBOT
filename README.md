# AI Chatbot App

A simple rule-based AI chatbot with a React Native mobile app, Node.js backend, conversation history, external API integration, and multi-language support.

## Features
- ✨ Rule-based chatbot engine
- 📱 React Native mobile app (iOS & Android)
- 💬 Conversation history
- 🌍 Multi-language support (English, Spanish, French)
- 🔌 External API integration (Weather, Translation)
- ⚡ Real-time responses

## Project Structure
```
CHATBOT/
├── server/                 # Node.js backend
│   ├── index.js           # Main server file
│   ├── chatbot.js         # Chatbot engine
│   ├── rules.js           # Chatbot rules
│   ├── apis/              # External API integrations
│   │   ├── weatherAPI.js
│   │   └── translationAPI.js
│   └── models/            # Data models
│       └── conversation.js
├── mobile/                # React Native mobile app
│   ├── App.js
│   ├── screens/
│   └── components/
└── package.json

```

## Setup Instructions

### Backend Setup
```bash
npm install
npm run dev
```

### Mobile App Setup
```bash
cd mobile
npm install
npm start
```

## Technologies
- **Backend:** Node.js, Express
- **Mobile:** React Native
- **Database:** SQLite (for conversation history)
- **APIs:** OpenWeatherMap, Google Translate

## License
MIT