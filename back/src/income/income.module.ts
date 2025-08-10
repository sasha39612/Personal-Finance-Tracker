import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Income } from './entities/income.entity';
import { Category } from './entities/categories.entity';
import { Entities } from './entities/entities.entity';
import { IncomeResolver } from './income.resolver';
import { IncomeService } from './income.service';
import { CategoryIncomeResolver } from './category-income.resolver';
import { CategoryIncomeService } from './category-income.service';
import { EntitiesIncomeResolver } from './entities-income.resolver';
import { EntitiesIncomeService } from './entities-income.service';

@Module({
  imports: [TypeOrmModule.forFeature([Income, Category, Entities])],
  providers: [
    IncomeResolver,
    IncomeService,
    CategoryIncomeResolver,
    CategoryIncomeService,
    EntitiesIncomeResolver,
    EntitiesIncomeService,
  ],
  exports: [TypeOrmModule, IncomeService],
})
export class IncomeModule {}
