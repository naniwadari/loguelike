import { MessageLength, MessageType } from "../config";

interface IMessage {
  text: string;
  type: MessageType;
}

export class MessageList {
  list: IMessage[] = [];

  add(message: IMessage) {
    this.list.push(message);
    while (this.list.length > MessageLength.limit) {
      this.list.shift();
    }
  }
}
export class Message implements IMessage {
  text: string;
  type: MessageType;

  constructor(text: string, type: MessageType) {
    this.text = text;
    this.type = type;
  }
}
