import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:5000/api/chat';

export default function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    loadChatHistory();
  }, []);

  const loadChatHistory = async () => {
    try {
      const savedChat = await AsyncStorage.getItem('chatHistory');
      if (savedChat) {
        setChat(JSON.parse(savedChat));
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const saveChatHistory = async (newChat) => {
    try {
      await AsyncStorage.setItem('chatHistory', JSON.stringify(newChat));
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { sender: 'user', text: message, language };
    const newChat = [...chat, userMessage];
    setChat(newChat);
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/message`, {
        message: message.trim(),
        language
      });

      const botMessage = {
        sender: 'bot',
        text: response.data.response,
        language
      };

      const updatedChat = [...newChat, botMessage];
      setChat(updatedChat);
      saveChatHistory(updatedChat);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        sender: 'bot',
        text: 'Sorry, I encountered an error. Please try again.',
        language
      };
      setChat([...newChat, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = async () => {
    setChat([]);
    await AsyncStorage.removeItem('chatHistory');
    try {
      await axios.delete(`${API_URL}/history`);
    } catch (error) {
      console.error('Error clearing chat:', error);
    }
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>AI Chatbot</Text>
        <View style={styles.languageSelector}>
          {['en', 'es', 'fr'].map((lang) => (
            <TouchableOpacity
              key={lang}
              style={[styles.langButton, language === lang && styles.langButtonActive]}
              onPress={() => changeLanguage(lang)}
            >
              <Text style={styles.langButtonText}>{lang.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Chat Messages */}
      <ScrollView style={styles.chatContainer} contentContainerStyle={{ flexGrow: 1 }}>
        {chat.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Start a conversation!</Text>
          </View>
        ) : (
          chat.map((msg, index) => (
            <View
              key={index}
              style={[styles.messageWrapper, msg.sender === 'user' ? styles.userMessage : styles.botMessage]}
            >
              <Text style={styles.messageText}>{msg.text}</Text>
            </View>
          ))
        )}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor="#999"
          value={message}
          onChangeText={setMessage}
          editable={!loading}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage} disabled={loading}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>

      {/* Clear Button */}
      {chat.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={clearChat}>
          <Text style={styles.clearButtonText}>Clear Chat</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  languageSelector: {
    flexDirection: 'row',
    gap: 10,
  },
  langButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 5,
  },
  langButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  langButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#999',
  },
  messageWrapper: {
    marginVertical: 8,
    paddingHorizontal: 10,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  botMessage: {
    alignItems: 'flex-start',
  },
  messageText: {
    maxWidth: '85%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 14,
    overflow: 'hidden',
  },
  userMessageBubble: {
    backgroundColor: '#007AFF',
    color: 'white',
  },
  botMessageBubble: {
    backgroundColor: '#e0e0e0',
    color: 'black',
  },
  loadingContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 14,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  clearButton: {
    backgroundColor: '#FF3B30',
    margin: 10,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});