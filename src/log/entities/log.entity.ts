import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Log {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  client_ip: string;

  @Column({ nullable: true })
  uri: string;

  @Column({ nullable: true })
  method: string;

  @Column({ nullable: true })
  host: string;

  @Column({ type: 'text', nullable: true }) // Dùng text vì URL có thể rất dài
  url: string;

  @Column({ type: 'int', nullable: true })
  status: number;

  @Column({ type: 'json', nullable: true })
  metadata: Record<string, any> | null;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;
}