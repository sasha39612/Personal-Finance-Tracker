import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Income } from './entities/income.entity';
import { Category } from './entities/categories.entity';
import { Entities } from './entities/entities.entity';
import { IncomeResolver } from './income.resolver';
import { IncomeService } from './income.service';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { EntitiesResolver } from './entities.resolver';
import { EntitiesService } from './entities.service';

@Module({
  imports: [TypeOrmModule.forFeature([Income, Category, Entities])],
  providers: [
    IncomeResolver,
    IncomeService,
    CategoryResolver,
    CategoryService,
    EntitiesResolver,
    EntitiesService,
  ],
  exports: [TypeOrmModule, IncomeService],
})
export class IncomeModule {}
