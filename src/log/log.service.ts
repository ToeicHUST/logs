import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from './entities/log.entity'; // Đường dẫn tới file entity của bạn

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
  ) {}

  async create(createLogDto: any) {
    // Ánh xạ dữ liệu từ JSON đầu vào sang Entity
    const log =   this.logRepository.create({
      client_ip: createLogDto.client_ip,
      uri: createLogDto.request?.uri,
      method: createLogDto.request?.method,
      host: createLogDto.request?.headers?.host,
      url: createLogDto.request?.url,
      status: createLogDto.response?.status,
      // Lưu toàn bộ JSON gốc vào metadata để sau này cần tra cứu thêm
      metadata: createLogDto 
    });

    return await this.logRepository.save(log);
  }

  // findAll() {
  //   return `This action returns all log`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} log`;
  // }

  // update(id: number, updateLogDto: UpdateLogDto) {
  //   return `This action updates a #${id} log`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} log`;
  // }
}
