import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNewTable1738737958867 implements MigrationInterface {
    name = 'CreateNewTable1738737958867';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create the outcome table
        await queryRunner.query(`
            CREATE TABLE "outcome" (
                "id" SERIAL NOT NULL,
                "datum" TIMESTAMP NOT NULL,
                CONSTRAINT "PK_d721e56b4240f79aaa14cb54775" PRIMARY KEY ("id")
            )
        `);

        // Create the category_outcome table
        await queryRunner.query(`
            CREATE TABLE "category_outcome" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "outcomeId" integer,
                CONSTRAINT "PK_bacc4f78d9996c8c01c77adc6c6" PRIMARY KEY ("id")
            )
        `);

        // Create the entities_outcome table
        await queryRunner.query(`
            CREATE TABLE "entities_outcome" (
                "id" SERIAL NOT NULL,
                "description" character varying NOT NULL,
                "sum" integer NOT NULL,
                "categoryOutcomeId" integer,
                CONSTRAINT "PK_c878ef078b93ef45f3598c30db8" PRIMARY KEY ("id")
            )
        `);

        // Add foreign key constraints
        await queryRunner.query(`
            ALTER TABLE "category_outcome"
            ADD CONSTRAINT "FK_302ff369d0bce90f08de1c874f4"
            FOREIGN KEY ("outcomeId")
            REFERENCES "outcome"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "entities_outcome"
            ADD CONSTRAINT "FK_20e94f8fd9c86962ec00b012403"
            FOREIGN KEY ("categoryOutcomeId")
            REFERENCES "category_outcome"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        // Insert the initial data into the "outcome" table
        const outcomeInsertResult = await queryRunner.query(`
            INSERT INTO "outcome" ("datum")
            VALUES ('1970-01-01T20:10:21.817Z')
            RETURNING "id"
        `);
        const outcomeId = outcomeInsertResult[0].id;

        // Insert categories for this outcome record
        const categoryInsertResult = await queryRunner.query(`
            INSERT INTO "category_outcome" ("title", "outcomeId")
            VALUES 
                ('Basic Living Expenses', ${outcomeId}),
                ('Transportation', ${outcomeId}),
                ('Healthcare', ${outcomeId}),
                ('Education', ${outcomeId}),
                ('Personal and Household Expenses', ${outcomeId}),
                ('Entertainment and Recreation', ${outcomeId}),
                ('Savings and Investments', ${outcomeId}),
                ('Debt Payments', ${outcomeId}),
                ('Charitable Giving and Donations', ${outcomeId}),
                ('Miscellaneous Expenses', ${outcomeId})
            RETURNING "id", "title"
        `);

        // Insert entities for each category
        for (const category of categoryInsertResult) {
            const categoryId = category.id;
            const entities = getEntitiesForCategory(categoryId, category.title);

            for (const entity of entities) {
                await queryRunner.query(`
                    INSERT INTO "entities_outcome" ("description", "sum", "categoryOutcomeId")
                    VALUES ('${entity.description}', ${entity.sum}, ${categoryId})
                `);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key constraints
        await queryRunner.query(`ALTER TABLE "entities_outcome" DROP CONSTRAINT "FK_20e94f8fd9c86962ec00b012403"`);
        await queryRunner.query(`ALTER TABLE "category_outcome" DROP CONSTRAINT "FK_302ff369d0bce90f08de1c874f4"`);

        // Drop tables
        await queryRunner.query(`DROP TABLE "entities_outcome"`);
        await queryRunner.query(`DROP TABLE "category_outcome"`);
        await queryRunner.query(`DROP TABLE "outcome"`);
    }
}

// Helper function to get entities based on category title
function getEntitiesForCategory(categoryId: number, title: string) {
  const entities = {
    'Basic Living Expenses': [
      { description: 'Housing - Rent or mortgage payments.', sum: 0 },
      { description: 'Housing - Property taxes.', sum: 0 },
      { description: 'Housing - Home insurance.', sum: 0 },
      { description: 'Housing - Utilities (electricity, water, gas, trash, internet, phone).', sum: 0 },
      { description: 'Housing - Maintenance and repairs.', sum: 0 },
      { description: 'Food - Groceries.', sum: 0 },
      { description: 'Food - Dining out or takeout.', sum: 0 },
      { description: 'Food - Meal subscriptions or delivery services.', sum: 0 },
    ],
    'Transportation': [
        { description: 'Vehicle Costs - Loan payments or leasing.', sum: 0 },
        { description: 'Vehicle Costs - Fuel.', sum: 0 },
        { description: 'Vehicle Costs - Insurance.', sum: 0 },
        { description: 'Vehicle Costs - Maintenance and repairs.', sum: 0 },
        { description: 'Public Transportation - Bus, subway, or train fares.', sum: 0 },
        { description: 'Public Transportation - Rideshare or taxi services.', sum: 0 },
    ],
    'Healthcare': [
        { description: 'Health Insurance - Premiums.', sum: 0 },
        { description: 'Medical Expenses - Doctor visits, prescriptions, and treatments.', sum: 0 },
        { description: 'Dental and Vision Care.', sum: 0 },
        { description: 'Mental Health Services.', sum: 0 },
        { description: 'Emergency Medical Expenses.', sum: 0 },
    ],
    'Education': [
        { description: 'Tuition Fees.', sum: 0 },
        { description: 'School Supplies and Books.', sum: 0 },
        { description: 'Online Courses and Learning Platforms.', sum: 0 },
        { description: 'Student Loan Repayments.', sum: 0 },
    ],
    'Personal and Household Expenses': [
        { description: 'Clothing and Footwear.', sum: 0 },
        { description: 'Personal Care Products (shampoo, soap, skincare, etc.).', sum: 0 },
        { description: 'Household Supplies (cleaning products, detergents, etc.).', sum: 0 },
        { description: 'Subscriptions (streaming services, magazines, etc.).', sum: 0 },
    ],
    'Entertainment and Recreation': [
        { description: 'Movies, Concerts, and Events.', sum: 0 },
        { description: 'Hobbies and Leisure Activities.', sum: 0 },
        { description: 'Sports and Fitness (gym memberships, equipment, etc.).', sum: 0 },
        { description: 'Vacations and Travel.', sum: 0 },
    ],
    'Savings and Investments': [
        { description: 'Emergency Fund Contributions.', sum: 0 },
        { description: 'Retirement Savings (401k, IRA, pension, etc.).', sum: 0 },
        { description: 'Stock and Bond Investments.', sum: 0 },
        { description: 'Cryptocurrency Investments.', sum: 0 },
    ],
    'Debt Payments': [
        { description: 'Credit Card Payments.', sum: 0 },
        { description: 'Personal Loan Repayments.', sum: 0 },
        { description: 'Auto Loan Payments.', sum: 0 },
        { description: 'Mortgage Payments.', sum: 0 },
        { description: 'Student Loan Payments.', sum: 0 },
    ],
    'Charitable Giving and Donations': [
        { description: 'Donations to Charities and Nonprofits.', sum: 0 },
        { description: 'Religious Donations (tithes, offerings, etc.).', sum: 0 },
        { description: 'Crowdfunding Contributions.', sum: 0 },
    ],
    'Miscellaneous Expenses': [
        { description: 'Unexpected Expenses (repairs, fines, etc.).', sum: 0 },
        { description: 'Gifts and Celebrations.', sum: 0 },
        { description: 'Pet Care Expenses.', sum: 0 },
        { description: 'Legal and Professional Fees.', sum: 0 },
    ],
    };
    
    return entities[title] || [];
}
