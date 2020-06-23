import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import IUserRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;

  email: string;

  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('usersRepository')
    private usersRepository: IUserRepository,
  ) {}

  async execute({ name, email, password }: IRequest): Promise<User> {
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
