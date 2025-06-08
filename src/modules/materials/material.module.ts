import { Module } from '@nestjs/common';
import { MaterialController } from './controllers/material.controller';
import { MaterialService } from './services/material.service';
import { MaterialRepository } from './repositories/material.repository';

@Module({
  imports: [],
  controllers: [MaterialController],
  providers: [MaterialService, MaterialRepository],
  exports: [],
})
export class MaterialModule {}
