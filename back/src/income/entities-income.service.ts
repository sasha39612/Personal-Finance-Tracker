import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entities } from './entities/entities.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EntitiesIncomeService {
  constructor(
    @InjectRepository(Entities)
    private entitiesRepository: Repository<Entities>,
  ) {}

  async createEntity(description: string, tooltip: string, sum: number) {
    return this.entitiesRepository.save({ description, tooltip, sum });
  }

  async getEntityById(id: number) {
    return await this.entitiesRepository.findOneBy({
      id,
    });
  }

  async getAllEntities() {
    return await this.entitiesRepository.find();
  }

  async updateEntity(entityUpdated: {
    id: number;
    description: string;
    tooltip: string;
    sum?: number;
  }) {
    const entity = await this.getEntityById(entityUpdated.id);

    if (entity?.id) {
      throw new NotFoundException(
        `Entity with ID ${entityUpdated.id} not found`,
      );
    }

    if (entityUpdated.description)
      entity.description = entityUpdated.description;
    if (entityUpdated.tooltip) entity.tooltip = entityUpdated.tooltip;
    if (entityUpdated.sum) entity.sum = entityUpdated.sum;

    return this.entitiesRepository.save(entity);
  }

  async deleteEntity(id: number) {
    const result = await this.entitiesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }

    return { id };
  }
}
