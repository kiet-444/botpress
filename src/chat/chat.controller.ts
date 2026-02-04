import { Body, Controller, Post, Get, Param, Query } from '@nestjs/common'
import { ChatService } from './chat.service'

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('message')
  async receive(@Body() body: any) {

    const { userId, message } = body

    if (!userId || !message) {
      throw new Error('Invalid request: missing userId or message')
    }

    await this.chatService.saveMessage(userId, message, 'user')

    const botReply = 'Hello, this is MVP bot reply '

    await this.chatService.saveMessage(userId, botReply, 'bot')

    return { reply: botReply }
  }

  @Get('history/:userId')
  async history(
    @Param('userId') userId: string,
    @Query('limit') limit = 20,
  ) {
    const history = await this.chatService.getHistory(userId, Number(limit) || 20)
    return { history }
  }
}
