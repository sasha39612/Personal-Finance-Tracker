import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';
import request from 'supertest';
import {
  getOutcomes,
  getOutcomesCharts,
  createOutcomeMutation,
} from './queries';

describe('Outcome Module GraphQL e2e', () => {
  let app: INestApplication;
  let dataSource: DataSource;

 beforeAll(async () => {
  jest.setTimeout(30000);

  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();

  dataSource = app.get(DataSource);

  // Clean DB safely in TEST mode
  if (process.env.MODE_ENV === 'TEST') {
    await dataSource.query(
      `TRUNCATE TABLE outcome, category, entities RESTART IDENTITY CASCADE`
    );
  }
});

  afterAll(async () => {
    if (app) await app.close();
  });


  describe('Outcome GraphQL', () => {
    it('should fetch outcomes with categories and entities', async () => {
      const variables = {
        startDate: "2025-08-07T09:46:00.000Z",
        endDate: "2025-08-07T09:46:00.000Z",
      };

      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: getOutcomes, variables });
      
      const outcomes = res.body.data.outcome;
    
      expect(Array.isArray(outcomes)).toBe(true);
      if (outcomes.length > 0) {
        expect(outcomes[0].categories_outcome).toBeDefined();
        if (outcomes[0].categories_outcome.length > 0) {
          expect(outcomes[0].categories_outcome[0].entities_outcome).toBeDefined();
        }
      }
    });
  })

  describe('OutcomeCharts GraphQL', () => {
    it('should fetch outComeChart with categories and entities', async () => {
      const variables = {
        startDate: "2025-08-07T09:46:00.000Z",
        endDate: "2025-08-07T09:46:00.000Z",
        period: "year"
      };

      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: getOutcomesCharts, variables });

      
      expect(res.body.errors).toBeUndefined();

      const outcomeCharts = res.body.data.outcomeCharts;
      expect(outcomeCharts).toBeDefined();

      expect(Array.isArray(outcomeCharts.labels)).toBe(true);

      expect(Array.isArray(outcomeCharts.datasets)).toBe(true);

      if (outcomeCharts.datasets.length > 0) {
        const dataset = outcomeCharts.datasets[0];

        expect(Array.isArray(dataset.data)).toBe(true);
        expect(Array.isArray(dataset.backgroundColor)).toBe(true);
        expect(Array.isArray(dataset.borderColor)).toBe(true);
        expect(typeof dataset.borderWidth).toBe('number');

        expect(dataset.data.length).toBe(outcomeCharts.labels.length);
        expect(dataset.backgroundColor.length).toBe(dataset.data.length);
        expect(dataset.borderColor.length).toBe(dataset.data.length);

        dataset.data.forEach((val: any) => {
          expect(typeof val).toBe('number');
        });
      };
    });
  });

  describe('Outcome GraphQL - createOutcome', () => {
  it('should create a new outcome with categories and entities', async () => {
    const variables = {
      outcomeData: {
        datum: "2025-09-01T00:00:00.000Z",
        categories_outcome: [
          {
            title: "Salary",
            entities_outcome: [
              { description: "Employer", sum: 5000 }
            ]
          }
        ]
      }
    };

    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: createOutcomeMutation, variables });

    expect(res.body.errors).toBeUndefined();

    const outcome = res.body.data.createOutcome;
    expect(outcome).toBeDefined();
    expect(outcome.categories_outcome.length).toBe(1);
    expect(outcome.categories_outcome[0].title).toBe("Salary");
    expect(outcome.categories_outcome[0].entities_outcome[0].description).toBe("Employer");
    expect(outcome.categories_outcome[0].entities_outcome[0].sum).toBe(5000);
  });

  it('should update an existing outcome if one exists for the same date', async () => {
    const variables = {
      outcomeData: {
        datum: "2025-09-01T00:00:00.000Z",
        categories_outcome: [
          {
            title: "Freelance",
            entities_outcome: [
              { description: "Client", sum: 2000 }
            ]
          }
        ]
      }
    };

    const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: createOutcomeMutation, variables });

      expect(res.body.errors).toBeUndefined();

      const updated = res.body.data.createOutcome;
      expect(updated).toBeDefined();
      expect(updated.categories_outcome.length).toBe(1);
      expect(updated.categories_outcome[0].title).toBe("Freelance");
      expect(updated.categories_outcome[0].entities_outcome[0].description).toBe("Client");
      expect(updated.categories_outcome[0].entities_outcome[0].sum).toBe(2000);
    });
  });
});
