import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../types/user';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';

@ApiTags('Usuários')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Usuário criado com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email já está em uso',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Nome, email e senha são obrigatórios',
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lista todos os usuários' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de usuários retornada com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Nenhum usuário encontrado',
  })
  async findAll(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Get(':userId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Busca um usuário pelo ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuário encontrado com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuário não encontrado',
  })
  async findById(@Param('userId') userId: string): Promise<User | null> {
    return this.userService.findByUserId(userId);
  }

  @Put(':userId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualiza um usuário' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuário atualizado com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuário não encontrado',
  })
  async update(
    @Param('userId') userId: string,
    @Body() updateUserDto: Partial<CreateUserDto>,
    @Request() req,
  ): Promise<User> {
    const currentUser = req.user.userId;
    return this.userService.updateUser(currentUser, userId, updateUserDto);
  }

  @Delete(':userId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deleta um usuário' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Usuário deletado com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuário não encontrado',
  })
  async delete(@Param('userId') userId: string): Promise<void> {
    await this.userService.deleteUser(userId);
  }
}
