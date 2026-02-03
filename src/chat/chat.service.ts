import { PrismaService } from '../prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async ensureUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      await this.prisma.user.create({
        data: { id: userId },
      })
    }
  }

  async saveMessage(userId: string, content: string, role: 'user' | 'bot') {
    await this.ensureUser(userId)

    return this.prisma.message.create({
      data: {
        userId,
        content,
        role,
      },
    })
  }
}
