import { hash } from 'bcryptjs';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import IUserRepository from '../repositories/IUsersRepository';

interface Request {
  name: string;

  email: string;

  password: string;
}

class CreateUserService {
  constructor(private usersRepository: IUserRepository) {}

  async execute({ name, email, password }: Request): Promise<User> {
    const checkUsersExists = await this.usersRepository.findByEmail(email);

    if (checkUsersExists) {
      throw new AppError('Email address alredy used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
