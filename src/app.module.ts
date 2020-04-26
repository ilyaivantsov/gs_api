import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GsModule } from './gs/gs.module';

@Module({
  imports: [GsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
