import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

export interface Config {
  APP_PORT: number;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
}

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NestConfigService) {
    this.getConfig();
  }

  getConfig(): Config {
    return {
      APP_PORT: +this.getRequired('APP_PORT'),
      DB_HOST: this.getRequired('DB_HOST'),
      DB_PORT: +this.getRequired('DB_PORT'),
      DB_USER: this.getRequired('DB_USER'),
      DB_PASSWORD: this.getRequired('DB_PASSWORD'),
      DB_NAME: this.getRequired('DB_NAME'),
    };
  }

  private getRequired(name: string) {
    const value = this.configService.get<string>(name);
    if (!value) {
      throw new Error(`You must provide ${name} env variable.`);
    }

    return value;
  }
}
