import { Module } from '@nestjs/common';
import { GsController } from './gs.controller';
import { GsService } from './gs.service';
import { connection } from './connection';

@Module({
  controllers: [GsController],
  providers: [GsService, {
    provide: 'GOOGLE_CONNECTION',
    useValue: connection,
  }]
})
export class GsModule { }
