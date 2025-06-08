import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../types/user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new BadRequestException(
        'Falha ao criar usuário. Este e-mail já está em uso.',
      );
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user: User = await this.userRepository.create(
      createUserDto,
      hashedPassword,
    );
    if (!user) {
      throw new BadRequestException(
        'Falha ao criar usuário. Tente novamente mais tarde.',
      );
    }

    return user;
  }

  async findAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    if (!users) {
      throw new BadRequestException('Nenhum usuário encontrado.');
    }
    return users;
  }

  async findByUserId(userId: string): Promise<User | null> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Usuário não encontrado.');
    }
    return user;
  }

  async updateUser(
    currentUserId: string,
    userId: string,
    updateData: Partial<CreateUserDto>,
  ): Promise<User> {
    const existingUser = await this.userRepository.findById(userId);
    if (!existingUser) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    if (currentUserId !== userId) {
      throw new BadRequestException(
        'Você não tem permissão para atualizar este usuário.',
      );
    }

    if (updateData.password !== null && updateData.password !== undefined) {
      const hashedPassword = await bcrypt.hash(updateData.password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await this.userRepository.update(userId, updateData);
    if (!updatedUser) {
      throw new BadRequestException(
        'Falha ao atualizar usuário. Tente novamente mais tarde.',
      );
    }

    return updatedUser;
  }

  async deleteUser(userId: string): Promise<void> {
    const existingUser = await this.userRepository.findById(userId);
    if (!existingUser) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    await this.userRepository.delete(userId);
  }
}
