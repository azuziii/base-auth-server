import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('session')
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true, nullable: false })
  token: string;

  @Column({ type: 'text', nullable: false })
  user_id!: string;

  @Column({ type: 'timestamptz' })
  expires_at!: Date;

  @Column({ type: 'text', nullable: false })
  ip_address!: string;

  @Column({ type: 'text', nullable: false })
  user_agent!: string;

  isValid(): boolean {
    return new Date(this.expires_at).getTime() >= new Date().getTime();
  }

  expired() {
    this.expires_at = new Date();
  }
}
