import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseTable } from './base-entity';
import { User } from './user.entity';

@Entity({ name: 'words' })
export class Word extends BaseTable {
  @Column({ type: 'varchar', length: 120 })
  public text: string;

  @Column({ type: 'int', default: 0 })
  public hitsCount: number;

  @Column({ type: 'int', default: 0 })
  public missCount: number;
  /**
   * Relationships
   */
  @ManyToMany(() => User, user => user.words)
  @JoinTable({ name: 'words_players' })
  players: User[];
}
