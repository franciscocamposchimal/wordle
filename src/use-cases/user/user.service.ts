import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Word } from '../../core/entities';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Word)
    private wordRepository: Repository<Word>,
  ) {}

  async findUserByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.createQueryBuilder('q').select(['q.id', 'q.email', 'q.password']).where(`q.email = '${email}'`).getOne();
  }

  async getProfile(userId: number): Promise<User | undefined> {
    const player = await this.userRepository.createQueryBuilder('u').select(['u.id', 'u.totalWordsCount', 'u.hitWordsCount']).where(`u.id = ${userId}`).getOne();
    if (!player) throw new NotFoundException('Player not found');
    return player;
  }

  async getTop(): Promise<User[]> {
    return await this.userRepository.createQueryBuilder('u').select(['u.id', 'u.totalWordsCount', 'u.hitWordsCount']).orderBy('u.hitWordsCount', 'DESC').take(10).getMany();
  }

  async getTopWords(): Promise<Word[]> {
    return await this.wordRepository.createQueryBuilder('w').select(['w.id', 'w.text', 'w.hitsCount', 'w.missCount']).orderBy('w.hitsCount', 'DESC').take(10).getMany();
  }
}
