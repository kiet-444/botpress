import { Body, Controller, Post } from '@nestjs/common'
import { ChatService } from './chat.service'

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('message')
  async receive(@Body() body: any) {
    const { userId, message, conversation } = body

    await this.chatService.saveMessage(userId, message, 'user')

    const botReply = 'Hello, this is MVP bot reply '

    await this.chatService.saveMessage(userId, botReply, 'bot')

    return {
      reply: botReply,
      conversation,
    }
  }
}
