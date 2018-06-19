import { Module } from '@nestjs/common';
import { ImageModule } from './image';

@Module({
  imports: [ImageModule],
})
export class AppModule {}
