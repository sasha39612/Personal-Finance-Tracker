import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntitiesOutcome } from './entities/entities-outcome.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EntitiesOutcomeService {
  constructor(
    @InjectRepository(EntitiesOutcome)
    private entitiesOutcomeRepository: Repository<EntitiesOutcome>,
  ) {}

  async createEntityOutcome(description: string, sum: number) {
    return this.entitiesOutcomeRepository.save({ description, sum });
  }

  async getEntityOutcomeById(id: number) {
    return await this.entitiesOutcomeRepository.findOneBy({
      id,
    });
  }

  async getAllEntitiesOutcome() {
    return await this.entitiesOutcomeRepository.find();
  }

  async updateEntityOutcome(entityOutcomeUpdated: {
    id: number;
    description: string;
    sum?: number;
  }) {
    const entity = await this.getEntityOutcomeById(entityOutcomeUpdated.id);

    if (entity?.id) {
      throw new NotFoundException(
        `Entity with ID ${entityOutcomeUpdated.id} not found`,
      );
    }

    if (entityOutcomeUpdated.description)
      entity.description = entityOutcomeUpdated.description;
    if (entityOutcomeUpdated.sum) entity.sum = entityOutcomeUpdated.sum;

    return this.entitiesOutcomeRepository.save(entity);
  }

  async deleteEntityOutcome(id: number) {
    const result = await this.entitiesOutcomeRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }

    return { id };
  }
}
