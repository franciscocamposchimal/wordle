import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseTable } from './base-entity';
import { User } from './user.entity';

@Entity({ name: 'games' })
export class Game extends BaseTable {
  @Column({ type: 'varchar', length: 5 })
  public word: string;

  @Column('jsonb', { nullable: true, default: [] })
  public attempts: object[];

  @Column({ type: 'int', default: 0 })
  public attemptCount: number;

  @Column({ type: 'boolean', default: false })
  public isOpen: boolean;

  @Column({ type: 'boolean', default: false })
  public isWon: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  public dueTime: Date;

  @Column({ type: 'timestamptz', nullable: true })
  public endTime: Date;
  /**
   * Relationships
   */
  @ManyToOne(() => User, user => user.games)
  @JoinColumn({ name: 'playerId', referencedColumnName: 'id' })
  player: User;

  @Column({ nullable: true })
  playerId: number;
}
