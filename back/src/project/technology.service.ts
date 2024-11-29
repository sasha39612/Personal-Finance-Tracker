import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Technology } from './entities/technology.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TechnologyService {
  constructor(
    @InjectRepository(Technology)
    private technologyRepository: Repository<Technology>,
  ) {}

  async createTechnology(title: string, tag: string) {
    return this.technologyRepository.save({ title, tag });
  }

  async getTechnologyById(id: number) {
    const technology = await this.technologyRepository.findOneBy({ id });
    if (technology) {
      return {
        ...technology,
        fullTitle: `${technology.tag}: ${technology.title}`,
      };
    }
  }

  async getAllTechnologies() {
    const technologies = await this.technologyRepository.find();
    return technologies.map((tech) => ({
      ...tech,
      fullTitle: `${tech.tag}: ${tech.title}`,
    }));
  }

  async updateTechnology(technologyUpdated: {
    id: number;
    title?: string;
    tag?: string;
  }) {
    const technology = await this.getTechnologyById(technologyUpdated.id);

    if (technology?.id) {
      throw new NotFoundException(
        `Technology with ID ${technologyUpdated.id} not found`,
      );
    }

    if (technologyUpdated.title) technology.title = technologyUpdated.title;
    if (technologyUpdated.tag) technology.tag = technologyUpdated.tag;

    return this.technologyRepository.save(technology);
  }

  async deleteTechnology(id: number) {
    const result = await this.technologyRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Technology with ID ${id} not found`);
    }

    return { id };
  }
}
