import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import { Game, User, Word } from '../../core/entities';
import { GameDto } from '../../core/dto/game.dto';
import { compareWords } from '../utils/compareWords';

@Injectable()
export class GameService {
  private readonly logger = new Logger(GameService.name);
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    @InjectRepository(Word)
    private wordRepository: Repository<Word>,
  ) {}

  async getGame(userId: number): Promise<GameDto> {
    const user = await this.currentPlayer(userId);

    if (!user) throw new NotFoundException('Player not found');

    const words = user.words.map(w => w.id);
    const isGameOpen = await this.getGameOpen(user.id);

    if (isGameOpen) {
      const dueTime = moment(isGameOpen.dueTime);
      const current = moment(new Date());
      const duration = dueTime.diff(current, 'seconds');
      if (duration < 0) {
        isGameOpen.isWon = false;
        isGameOpen.isOpen = false;
        isGameOpen.endTime = dueTime.add(5, 'm').toDate();
        await isGameOpen.save();

        const getPreviousWord = await Word.findOne({
          where: { text: isGameOpen.word },
        });
        getPreviousWord.missCount += 1;
        await getPreviousWord.save();

        const randomWord = await this.getRandomWord(words);
        user.words.push(randomWord);
        user.totalWordsCount += 1;
        await user.save();
        return await this.createNewGame(user, randomWord.text);
      } else {
        const { id, word, isWon, attempts, attemptCount } = isGameOpen;
        const { totalWordsCount, hitWordsCount } = user;
        console.log({ id, isWon, attempts, attemptCount });
        return {
          id,
          word,
          isWon,
          attempts,
          attemptCount,
          dueTime: dueTime.local().format('DD/MM/YYYY HH:mm:ss'),
          statistics: {
            totalWordsCount,
            hitWordsCount,
          },
        };
      }
    }

    const randomWord = await this.getRandomWord(words);
    user.words.push(randomWord);
    user.totalWordsCount += 1;
    await user.save();
    return await this.createNewGame(user, randomWord.text);
  }

  async tryToGess(userId: number, userWord: string): Promise<GameDto> {
    const user = await this.currentPlayer(userId);
    const attempt = userWord.trim().toLowerCase();

    if (!user) throw new NotFoundException('Player not found');

    const isGameOpen = await this.getGameOpen(user.id);

    if (isGameOpen) {
      const dueTime = moment(isGameOpen.dueTime);
      const current = moment(new Date());
      const duration = dueTime.diff(current, 'seconds');
      if (duration < 0) {
        isGameOpen.isWon = false;
        isGameOpen.isOpen = false;
        isGameOpen.endTime = dueTime.add(5, 'm').toDate();
        await isGameOpen.save();

        const getPreviousWord = await Word.findOne({
          where: { text: isGameOpen.word },
        });
        getPreviousWord.missCount += 1;
        await getPreviousWord.save();

        throw new BadRequestException('Game ended, please play again');
      } else {
        const maxAttempts = isGameOpen.attemptCount + 1;
        if (maxAttempts > 5) {
          throw new BadRequestException('Max attempts reached, please play again');
        }

        const isSameword = isGameOpen.word === attempt;

        if (isSameword) {
          isGameOpen.isWon = true;
          isGameOpen.isOpen = false;
          isGameOpen.endTime = moment().toDate();

          user.hitWordsCount += 1;
          await user.save();

          const getPreviousWord = await Word.findOne({
            where: { text: isGameOpen.word },
          });
          getPreviousWord.hitsCount += 1;
          await getPreviousWord.save();
        }

        if (maxAttempts === 5) {
          isGameOpen.isOpen = false;
          isGameOpen.endTime = moment().toDate();
        }

        isGameOpen.attemptCount = maxAttempts;
        isGameOpen.attempts = [
          ...isGameOpen.attempts,
          {
            userWord: attempt,
            result: compareWords(isGameOpen.word, attempt),
          },
        ];

        await isGameOpen.save();
        const { id, word, isWon, attempts, attemptCount } = isGameOpen;
        const { totalWordsCount, hitWordsCount } = user;
        return {
          id,
          word,
          isWon,
          attempts,
          attemptCount,
          dueTime: dueTime.local().format('DD/MM/YYYY HH:mm:ss'),
          statistics: {
            totalWordsCount,
            hitWordsCount,
          },
        };
      }
    } else {
      throw new BadRequestException('Game ended, please play again');
    }
  }

  private async currentPlayer(userId: number): Promise<User | undefined> {
    return await this.userRepository
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.words', 'words')
      .select(['u.id', 'u.totalWordsCount', 'u.hitWordsCount', 'words.id'])
      .where(`u.id = ${userId}`)
      .getOne();
  }

  private async getGameOpen(userId: number): Promise<Game | undefined> {
    return await this.gameRepository
      .createQueryBuilder('q')
      .select(['q.id', 'q.word', 'q.isWon', 'q.isOpen', 'q.attempts', 'q.attemptCount', 'q.dueTime'])
      .where(`q.isOpen = true`)
      .andWhere(`q.playerId = ${userId}`)
      .getOne();
  }

  private async getRandomWord(words: number[]): Promise<Word> {
    const qb = this.wordRepository.createQueryBuilder('w').select(['w.id', 'w.text']);
    if (words.length > 0) {
      qb.where('w.id NOT IN (:...words)', { words });
    }
    return await qb.orderBy('RANDOM()').getOne();
  }

  private async createNewGame(player: User, word: string): Promise<GameDto> {
    try {
      const newGame = new Game();
      newGame.word = word;
      newGame.isOpen = true;
      newGame.playerId = player.id;
      newGame.dueTime = moment().add(5, 'm').toDate();
      await newGame.save();
      const { id, isWon, attempts, attemptCount, dueTime } = newGame;
      const { totalWordsCount, hitWordsCount } = player;
      return {
        id,
        word,
        isWon,
        attempts,
        attemptCount,
        dueTime: moment(dueTime).local().format('DD/MM/YYYY HH:mm:ss'),
        statistics: {
          totalWordsCount,
          hitWordsCount,
        },
      };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Game could not save');
    }
  }
}
