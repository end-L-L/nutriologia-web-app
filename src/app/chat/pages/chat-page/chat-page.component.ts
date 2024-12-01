import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent implements OnInit {
  private socket = io(environment.CHAT_URL);
  private usersConnected: string[] = [];

  public currentDate = new Date();
  public messages: { text: string; ownerId: string; receptorId: string; date: Date; id: string }[] = [];
  public myId = window.localStorage.getItem('userId');

  ngOnInit(): void {
    this.socket.emit('join', {
      userId: window.localStorage.getItem('userId'),
      otherUserId: window.localStorage.getItem('otherUserId'),
    });

    this.socket.emit('users');

    this.socket.on('join', (data) => {
      this.messages = data.messages;
    });

    this.socket.on('users', (data) => {
      this.usersConnected = data.users;
    });

    this.socket.on('message', (data) => {
      const [message] = data;
      this.messages.push(message);
    });
  }

  public isConnected() {
    return this.socket.connected;
  }

  public isOtherUserConnected() {
    const otherUser = window.localStorage.getItem('otherUserId') ?? '';
    return this.usersConnected.includes(otherUser);
  }

  public getUsersConnected() {
    return this.usersConnected;
  }

  public sendMessage(e: SubmitEvent, input: HTMLInputElement): void {
    e.preventDefault();
    if (input.value.trim()) {
      this.socket.emit('message', {
        userId: window.localStorage.getItem('userId'),
        receptorId: window.localStorage.getItem('otherUserId'),
        message: input.value,
      });
      input.value = '';
    }
  }
}
