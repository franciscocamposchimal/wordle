import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseTable } from './base-entity';
import { Game } from './game.entity';
import { Word } from './word.entity';

@Entity({ name: 'users' })
export class User extends BaseTable {
  @Column({ unique: true, type: 'varchar', length: 120 })
  public email: string;

  @Column({ type: 'varchar', length: 120 })
  public password: string;

  @Column({ type: 'int', default: 0 })
  public totalWordsCount: number;

  @Column({ type: 'int', default: 0 })
  public hitWordsCount: number;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
  /**
   * Relationships
   */
  @OneToMany(() => Game, game => game.player)
  games: Game[];

  @ManyToMany(() => Word, word => word.players)
  @JoinTable({ name: 'words_players' })
  words: Word[];
}
