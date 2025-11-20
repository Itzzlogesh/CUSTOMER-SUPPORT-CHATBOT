# Customer Support Chatbot

A modern, AI-powered customer support chatbot built with HTML, CSS, JavaScript, and Google Gemini API.

## Features

- 🤖 **AI-Powered Responses**: Uses Google Gemini 2.0 Flash model for intelligent customer support responses
- 💬 **Real-time Chat Interface**: Modern, responsive chat UI with typing indicators
- 🔒 **Secure API Proxy**: Local server proxy to avoid CORS issues when calling Gemini API
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚡ **Fast & Lightweight**: Optimized for quick load times and smooth interactions

## Files Structure

```
├── index.html      # Main HTML file with chat interface
├── styles.css      # CSS styling for the chat UI
├── script.js       # JavaScript for chat functionality and API integration
├── server.js       # Node.js server with API proxy
└── README.md       # This documentation file
```

## Setup & Installation

1. **Clone or download the project files**
2. **Navigate to the project directory**
3. **Install dependencies (if using npm)**:
   ```bash
   npm init -y
   npm install express  # Only needed if using Express version
   ```
4. **Start the server**:
   ```bash
   node server.js
   ```
5. **Open your browser** and go to `http://localhost:3000`

## Usage

1. **Start chatting**: Type your message in the input field at the bottom
2. **Send messages**: Click the send button or press Enter
3. **Get AI responses**: The chatbot will respond using Google Gemini AI
4. **Ask anything**: Inquire about products, orders, shipping, returns, or general questions

## API Configuration

The chatbot uses the Google Gemini API with the following settings:
- **Model**: Gemini 2.0 Flash
- **Temperature**: 0.7 (balanced creativity and consistency)
- **Max Tokens**: 1024
- **Context**: Customer support focused prompts

## Customization

### Modifying the System Prompt
Edit the `systemPrompt` variable in `script.js` to customize the chatbot's personality and knowledge base:

```javascript
const systemPrompt = `You are a helpful customer support assistant for [YOUR STORE NAME]. 
You should be friendly, professional, and knowledgeable about [SPECIFIC TOPICS]...`;
```

### Styling
Modify `styles.css` to customize the appearance:
- Colors and gradients
- Typography
- Layout and spacing
- Responsive breakpoints

## Troubleshooting

**Common Issues:**

1. **Server won't start**: Ensure Node.js is installed and you're in the correct directory
2. **API errors**: Check your internet connection and API key validity
3. **CORS issues**: The included server proxy should handle this automatically
4. **Styling issues**: Clear browser cache or check for CSS conflicts

**Debug Mode**: Check the browser console for detailed error messages.

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## Security Note

⚠️ **Important**: The API key is currently embedded in the server code for demonstration purposes. In production, use environment variables or secure key management.

## Contributing

Feel free to enhance the chatbot by:
- Adding more sophisticated UI features
- Implementing chat history persistence
- Adding support for multiple languages
- Integrating with customer databases
- Adding analytics and monitoring

## License

This project is open source and available under the [MIT License](LICENSE).
