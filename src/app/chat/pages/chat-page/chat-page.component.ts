import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent {
  currentDate = new Date();
  messages = [
    {
      text: '¡Hola! 👋 Bienvenido a tu sesión de nutrición. ¿Cómo puedo ayudarte hoy?',
      sender: 'bot',
    },
    {
      text: 'Hola, me gustaría obtener consejos para una dieta balanceada 😊',
      sender: 'user',
    },
    {
      text: 'Claro, estaré encantado de ayudarte. Para empezar, ¿podrías decirme cuáles son tus objetivos principales? 🎯',
      sender: 'bot',
    },
  ];

  sendMessage(input: HTMLInputElement): void {
    if (input.value.trim()) {
      this.messages.push({ text: input.value, sender: 'user' });
      input.value = '';
    }
  }
}
