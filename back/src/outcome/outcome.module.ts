import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Outcome } from './entities/outcome.entity';
import { CategoryOutcome } from './entities/categories-outcome.entity';
import { EntitiesOutcome } from './entities/entities-outcome.entity';
import { OutcomeResolver } from './outcome.resolver';
import { OutcomeService } from './outcome.service';
import { CategoryOutcomeResolver } from './category-outcome.resolver';
import { CategoryOutcomeService } from './category-outcome.service';
import { EntitiesOutcomeResolver } from './entities-outcome.resolver';
import { EntitiesOutcomeService } from './entities-outcome.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Outcome, CategoryOutcome, EntitiesOutcome]),
  ],
  providers: [
    OutcomeResolver,
    OutcomeService,
    CategoryOutcomeResolver,
    CategoryOutcomeService,
    EntitiesOutcomeResolver,
    EntitiesOutcomeService,
  ],
  exports: [TypeOrmModule, OutcomeService],
})
export class OutcomeModule {}
