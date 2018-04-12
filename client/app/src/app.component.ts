import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import io from 'socket.io-client';
import SocketIOClient from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
  public textMessage: string;
  public socket: SocketIOClient.Socket;
  @ViewChild('newMessageEle') newMessageEle: ElementRef;
  constructor()
  {
  }

  ngOnInit()
  {
    this.socket = io('http://localhost:3000');
    this.socket.on("new message received", (chatMessage) =>
    {
      this.appendNewMessage( chatMessage, false );
    });
  }

  public appendNewMessage( chatMessage, rightSide ): void
  {
    var node = document.createElement("h3");
    node.style.padding = "5px";
    node.style.borderRadius = "5px";
    node.style.display = "inline-block";
    node.style.maxWidth = "200px";
    if( rightSide === true )
    {
      node.style.clear = "both";
      node.style.backgroundColor = "lightgreen";
      node.style.cssFloat = "right";
    }
    else
    {
      node.style.clear = "both";
      node.style.backgroundColor = "white";
      node.style.cssFloat = "left";
    }
    var textnode = document.createTextNode(chatMessage);
    node.appendChild(textnode);
    this.newMessageEle.nativeElement.appendChild(node);
  }

  public sendMessage(): void
  {
    if( this.textMessage !== "" )
    {
      this.socket.emit("new message", this.textMessage);
      this.appendNewMessage( this.textMessage, true );
      this.textMessage = "";
    }
  }

  public handleEnterKey( event ): void
  {
    if( event.keyCode === 13 )
    {
      this.sendMessage();
    }
  }
}
