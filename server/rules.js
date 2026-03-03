/**
 * Rule-based chatbot rules
 * Each rule contains patterns to match and responses in multiple languages
 */

const rules = [
  {
    name: 'greeting',
    patterns: ['hello', 'hi', 'hey', 'greetings'],
    responses: {
      en: [
        'Hello! How can I help you today?',
        'Hi there! What can I do for you?',
        'Hey! How are you?'
      ],
      es: [
        '¡Hola! ¿Cómo puedo ayudarte hoy?',
        '¡Hola! ¿Qué puedo hacer por ti?',
        '¡Hola! ¿Cómo estás?'
      ],
      fr: [
        'Bonjour! Comment puis-je vous aider?',
        'Salut! Que puis-je faire pour vous?',
        'Bonjour! Comment allez-vous?'
      ]
    }
  },
  {
    name: 'goodbye',
    patterns: ['bye', 'goodbye', 'see you', 'farewell'],
    responses: {
      en: [
        'Goodbye! Have a great day!',
        'See you later!',
        'Bye! Thanks for chatting!'
      ],
      es: [
        '¡Adiós! ¡Que tengas un gran día!',
        '¡Hasta luego!',
        '¡Adiós! ¡Gracias por conversar!'
      ],
      fr: [
        'Au revoir! Passez une bonne journée!',
        'À bientôt!',
        'Au revoir! Merci de discuter!'
      ]
    }
  },
  {
    name: 'how_are_you',
    patterns: ['how are you', 'how do you do', 'how\'s it going'],
    responses: {
      en: [
        'I\'m doing great, thanks for asking!',
        'I\'m good, how about you?',
        'All systems operational!'
      ],
      es: [
        '¡Me va muy bien, gracias por preguntar!',
        'Estoy bien, ¿y tú?',
        '¡Todos los sistemas funcionan!'
      ],
      fr: [
        'Je vais très bien, merci de demander!',
        'Ça va bien, et toi?',
        'Tous les systèmes sont opérationnels!'
      ]
    }
  },
  {
    name: 'thanks',
    patterns: ['thank you', 'thanks', 'appreciate', 'thanx'],
    responses: {
      en: [
        'You\'re welcome!',
        'Happy to help!',
        'Anytime!'
      ],
      es: [
        '¡De nada!',
        '¡Encantado de ayudarte!',
        '¡En cualquier momento!'
      ],
      fr: [
        'De rien!',
        'Heureux de pouvoir aider!',
        'N\'importe quand!'
      ]
    }
  },
  {
    name: 'what_is_your_name',
    patterns: ['what is your name', 'who are you', 'what\'s your name'],
    responses: {
      en: [
        'I\'m an AI Chatbot! Nice to meet you!',
        'You can call me ChatBot!',
        'I\'m your friendly AI assistant!'
      ],
      es: [
        '¡Soy un Chatbot de IA! ¡Mucho gusto!',
        '¡Puedes llamarme ChatBot!',
        '¡Soy tu asistente de IA amigable!'
      ],
      fr: [
        'Je suis un Chatbot IA! Enchanté!',
        'Vous pouvez m\'appeler ChatBot!',
        'Je suis votre assistant IA sympathique!'
      ]
    }
  },
  {
    name: 'what_can_you_do',
    patterns: ['what can you do', 'capabilities', 'features', 'help'],
    responses: {
      en: [
        'I can chat with you, check the weather, translate text, and more!',
        'I can answer questions, provide information, and help with various tasks.',
        'Try asking me about the weather, or ask me to translate something!'
      ],
      es: [
        '¡Puedo conversar contigo, verificar el clima, traducir texto y más!',
        'Puedo responder preguntas, proporcionar información y ayudarte con varias tareas.',
        '¡Intenta preguntarme sobre el clima, o pídeme que traduzca algo!'
      ],
      fr: [
        'Je peux discuter avec vous, vérifier la météo, traduire du texte et plus encore!',
        'Je peux répondre à des questions, fournir des informations et vous aider avec diverses tâches.',
        'Essayez de me poser une question sur la météo ou demandez-moi de traduire quelque chose!'
      ]
    }
  }
];

module.exports = rules;