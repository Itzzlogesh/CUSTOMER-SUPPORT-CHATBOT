// Customer Support Chatbot using Google Gemini API
class CustomerSupportChatbot {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userInput');
        this.sendButton = document.getElementById('sendButton');
        this.typingIndicator = document.getElementById('typingIndicator');
        
        this.initializeEventListeners();
        this.enableChat();
    }
    
    initializeEventListeners() {
        // Send button click
        this.sendButton.addEventListener('click', () => this.handleSendMessage());
        
        // Enter key press
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSendMessage();
            }
        });
        
        // Input validation
        this.userInput.addEventListener('input', () => {
            const hasText = this.userInput.value.trim().length > 0;
            this.sendButton.disabled = !hasText;
            this.sendButton.style.opacity = hasText ? '1' : '0.5';
        });
    }
    
    enableChat() {
        this.userInput.disabled = false;
        this.userInput.placeholder = 'Type your message here...';
        this.userInput.focus();
    }
    
    async handleSendMessage() {
        const message = this.userInput.value.trim();
        if (!message) return;
        
        // Clear input and disable temporarily
        this.userInput.value = '';
        this.sendButton.disabled = true;
        this.sendButton.style.opacity = '0.5';
        
        // Add user message to chat
        this.addMessage(message, 'user');
        
        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            // Get bot response
            const botResponse = await this.getBotResponse(message);
            this.hideTypingIndicator();
            this.addMessage(botResponse, 'bot');
        } catch (error) {
            console.error('Error getting bot response:', error);
            this.hideTypingIndicator();
            this.addMessage('Sorry, I encountered an error. Please try again.', 'bot');
        }
    }
    
    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = text;
        
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = this.getCurrentTime();
        
        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);
        
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    showTypingIndicator() {
        this.typingIndicator.style.display = 'flex';
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        this.typingIndicator.style.display = 'none';
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    getCurrentTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    }
    
    async getBotResponse(userMessage) {
        try {
            // Create the prompt for customer support context
            const systemPrompt = `You are a helpful customer support assistant for an e-commerce store. 
            You should be friendly, professional, and knowledgeable about products, orders, shipping, returns, and general customer inquiries.
            Always provide accurate and helpful information. If you're not sure about something, be honest about it.
            
            Common topics you should be prepared to handle:
            - Product information and recommendations
            - Order status and tracking
            - Shipping and delivery questions
            - Returns and exchanges
            - Payment and billing issues
            - Account and login help
            - General store policies
            
            User question: ${userMessage}`;
            
            const requestBody = {
                contents: [{
                    parts: [{
                        text: systemPrompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            };
            
            // Use local API proxy to avoid CORS issues
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });
            
            if (!response.ok) {
                throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Extract the response text from the API response
            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                const parts = data.candidates[0].content.parts;
                if (parts && parts.length > 0) {
                    return parts[0].text.trim();
                }
            }
            
            throw new Error('Unexpected API response format');
            
        } catch (error) {
            console.error('Error calling chat API:', error);
            throw error;
        }
    }
}

// Initialize the chatbot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CustomerSupportChatbot();
});

// Add some additional utility functions for better UX
function addMessageToChat(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;
    
    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-time';
    timeDiv.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.appendChild(contentDiv);
    messageDiv.appendChild(timeDiv);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
