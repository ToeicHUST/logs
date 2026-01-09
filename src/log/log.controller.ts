import { Controller, Post, Body, UseGuards } from '@nestjs/common'; // Thêm UseGuards
import { CreateLogDto } from './dto/create-log.dto';
import { LogService } from './log.service';
import { AuthGuard } from './auth.guard'; // Import Guard vừa tạo

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post()
  @UseGuards(AuthGuard) // Chỉ áp dụng bảo mật cho phương thức POST này
  async create(@Body() createLogDto: CreateLogDto) {
    return await this.logService.create(createLogDto);
  }

  // @Get()
  // findAll() {
  //   return this.logService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.logService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLogDto: UpdateLogDto) {
  //   return this.logService.update(+id, updateLogDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.logService.remove(+id);
  // }
}
