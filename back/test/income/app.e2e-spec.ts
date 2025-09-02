import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';
import request from 'supertest';
import {
  getIncomes,
  getIncomesCharts,
  createIncomeMutation,
} from './queries';

describe('Income Module GraphQL e2e', () => {
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
      `TRUNCATE TABLE income, category, entities RESTART IDENTITY CASCADE`
    );
  }
});

  afterAll(async () => {
    if (app) await app.close();
  });


  describe('Income GraphQL', () => {
    it('should fetch incomes with categories and entities', async () => {
      const variables = {
        startDate: "2025-08-07T09:46:00.000Z",
        endDate: "2025-08-07T09:46:00.000Z",
      };

      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: getIncomes, variables });

      const incomes = res.body.data.income;
    
      expect(Array.isArray(incomes)).toBe(true);
      if (incomes.length > 0) {
        expect(incomes[0].categories).toBeDefined();
        if (incomes[0].categories.length > 0) {
          expect(incomes[0].categories[0].entities).toBeDefined();
        }
      }
    });
  })

  describe('IncomeCharts GraphQL', () => {
    it('should fetch incomeCharts with categories and entities', async () => {
      const variables = {
        startDate: "2025-08-07T09:46:00.000Z",
        endDate: "2025-08-07T09:46:00.000Z",
        period: "year"
      };

      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: getIncomesCharts, variables });

      
      expect(res.body.errors).toBeUndefined();

      const incomeCharts = res.body.data.incomeCharts;
      expect(incomeCharts).toBeDefined();

      expect(Array.isArray(incomeCharts.labels)).toBe(true);

      expect(Array.isArray(incomeCharts.datasets)).toBe(true);

      if (incomeCharts.datasets.length > 0) {
        const dataset = incomeCharts.datasets[0];

        expect(Array.isArray(dataset.data)).toBe(true);
        expect(Array.isArray(dataset.backgroundColor)).toBe(true);
        expect(Array.isArray(dataset.borderColor)).toBe(true);
        expect(typeof dataset.borderWidth).toBe('number');

        expect(dataset.data.length).toBe(incomeCharts.labels.length);
        expect(dataset.backgroundColor.length).toBe(dataset.data.length);
        expect(dataset.borderColor.length).toBe(dataset.data.length);

        dataset.data.forEach((val: any) => {
          expect(typeof val).toBe('number');
        });
      };
    });
  });

  describe('Income GraphQL - createIncome', () => {
  it('should create a new income with categories and entities', async () => {
    const variables = {
      incomeData: {
        datum: "2025-09-01T00:00:00.000Z",
        categories: [
          {
            title: "Salary",
            entities: [
              { description: "Employer", tooltip: "Main job", sum: 5000 }
            ]
          }
        ]
      }
    };

    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: createIncomeMutation, variables });

    expect(res.body.errors).toBeUndefined();

    const income = res.body.data.createIncome;
    expect(income).toBeDefined();
    expect(income.categories.length).toBe(1);
    expect(income.categories[0].title).toBe("Salary");
    expect(income.categories[0].entities[0].description).toBe("Employer");
    expect(income.categories[0].entities[0].tooltip).toBe("Main job");
    expect(income.categories[0].entities[0].sum).toBe(5000);
  });

  it('should update an existing income if one exists for the same date', async () => {
    const variables = {
      incomeData: {
        datum: "2025-09-01T00:00:00.000Z",
        categories: [
          {
            title: "Freelance",
            entities: [
              { description: "Client", tooltip: "Side project", sum: 2000 }
            ]
          }
        ]
      }
    };

    const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: createIncomeMutation, variables });

      expect(res.body.errors).toBeUndefined();

      const updated = res.body.data.createIncome;
      expect(updated).toBeDefined();
      expect(updated.categories.length).toBe(1);
      expect(updated.categories[0].title).toBe("Freelance");
      expect(updated.categories[0].entities[0].description).toBe("Client");
      expect(updated.categories[0].entities[0].sum).toBe(2000);
    });
  });
});
