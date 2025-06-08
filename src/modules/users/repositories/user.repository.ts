import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/infra/database/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User, userWithRelationsSelect } from '../types/user';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createUserDto: CreateUserDto,
    hashedPassword: string,
  ): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        fullName: createUserDto.fullName,
        atelierName: createUserDto.atelierName,
        password: hashedPassword,
      },
      select: userWithRelationsSelect,
    });

    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      select: userWithRelationsSelect,
    });
    return users;
  }

  async findById(userId: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: userWithRelationsSelect,
    });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: userWithRelationsSelect,
    });

    return user;
  }

  async update(
    userId: string,
    updateData: Partial<CreateUserDto>,
  ): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: userWithRelationsSelect,
    });

    return user;
  }

  async delete(userId: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
