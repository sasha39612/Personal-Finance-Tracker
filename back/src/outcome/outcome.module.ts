import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Outcome } from './entities/outcome.entity';
import { CategoryOutcome } from './entities/categories-outcome.entity';
import { EntitiesOutcome } from './entities/entities-outcome.entity';
import { OutcomeResolver } from './outcome.resolver';
import { OutcomeService } from './outcome.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Outcome, CategoryOutcome, EntitiesOutcome]),
  ],
  providers: [
    OutcomeResolver,
    OutcomeService,
  ],
  exports: [TypeOrmModule, OutcomeService],
})
export class OutcomeModule {}
