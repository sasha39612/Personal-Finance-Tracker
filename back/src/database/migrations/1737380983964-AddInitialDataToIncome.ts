import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInitialDataToIncome1737380983964 implements MigrationInterface {
    name = 'AddInitialDataToIncome1737380983964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create the income table
        await queryRunner.query(`
            CREATE TABLE "income" (
                "id" SERIAL NOT NULL, 
                "datum" TIMESTAMP NOT NULL, 
                CONSTRAINT "PK_29a10f17b97568f70cee8586d58" PRIMARY KEY ("id")
            )
        `);

        // Create the category table
        await queryRunner.query(`
            CREATE TABLE "category" (
                "id" SERIAL NOT NULL, 
                "title" character varying NOT NULL, 
                "incomeId" integer, 
                CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id")
            )
        `);

        // Create the entities table
        await queryRunner.query(`
            CREATE TABLE "entities" (
                "id" SERIAL NOT NULL, 
                "description" character varying NOT NULL, 
                "tooltip" character varying NOT NULL, 
                "sum" integer NOT NULL, 
                "categoryId" integer, 
                CONSTRAINT "PK_8640855ae82083455cbb806173d" PRIMARY KEY ("id")
            )
        `);

        // Add foreign key constraints
        await queryRunner.query(`
            ALTER TABLE "category" 
            ADD CONSTRAINT "FK_5a900137d037399e0780ea59ece" 
            FOREIGN KEY ("incomeId") 
            REFERENCES "income"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "entities" 
            ADD CONSTRAINT "FK_6c7eda02e54a519b8209daeca29" 
            FOREIGN KEY ("categoryId") 
            REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        // Insert the initial data into the "income" table
        const incomeInsertResult = await queryRunner.query(`
            INSERT INTO "income" ("datum") 
            VALUES ('2020-05-12T23:50:21.817Z') 
            RETURNING "id"
        `);
        const incomeId = incomeInsertResult[0].id;

        // Insert categories for this income record
        const categoryInsertResult = await queryRunner.query(`
            INSERT INTO "category" ("title", "incomeId") 
            VALUES 
                ('Earned Income', ${incomeId}),
                ('Investment Income', ${incomeId}),
                ('Business Income', ${incomeId}),
                ('Passive Income', ${incomeId}),
                ('Transfer Payments', ${incomeId}),
                ('Gifts and Inheritance', ${incomeId}),
                ('Miscellaneous Income', ${incomeId}),
                ('Government Assistance Programs', ${incomeId}),
                ('Educational and Research Grants', ${incomeId}),
                ('Bartering or Non - Monetary Income', ${incomeId})
            RETURNING "id", "title"
        `);

        // Insert entities for each category
        for (const category of categoryInsertResult) {
            const categoryId = category.id;
            const entities = getEntitiesForCategory(categoryId, category.title);

            for (const entity of entities) {
                await queryRunner.query(`
                    INSERT INTO "entities" ("description", "tooltip", "sum", "categoryId") 
                    VALUES 
                        ('${entity.description}', '${entity.tooltip}', ${entity.sum}, ${categoryId})
                `);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key constraints
        await queryRunner.query(`ALTER TABLE "entities" DROP CONSTRAINT "FK_6c7eda02e54a519b8209daeca29"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_5a900137d037399e0780ea59ece"`);

        // Drop the tables
        await queryRunner.query(`DROP TABLE "entities"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "income"`);
    }
}

// Helper function to get entities based on category title
function getEntitiesForCategory(categoryId: number, title: string) {
    const entities = {
        'Earned Income': [
            { description: 'Salary/ Wages', tooltip: 'Income from full-time or part-time employment.', sum: 0 },
            { description: 'Overtime', tooltip: 'Additional earnings for working beyond standard hours.', sum: 0 },
            { description: 'Bonuses and Commissions', tooltip: 'Performance-based income from sales or achievements.', sum: 0 },
            { description: 'Freelance', tooltip: 'Income earned from providing services on a project basis.', sum: 0 },
        ],
        'Investment Income': [
            { description: 'Dividends', tooltip: 'Earnings from owning shares in a company', sum: 0 },
            { description: 'Interest Income', tooltip: 'Income from savings accounts, bonds, or other interest-bearing accounts.', sum: 0 },
            { description: 'Capital Gains', tooltip: 'Profit from selling investments like stocks, real estate, or other assets.', sum: 0 },
            { description: 'Rental Income', tooltip: 'Earnings from leasing or renting out property.', sum: 0 },
        ],
        'Business Income': [
            { description: 'Profits from a Family Business', tooltip: 'Income generated from owning or operating a business', sum: 0 },
            { description: 'Side Hustles', tooltip: 'Earnings from small-scale entrepreneurial ventures or gigs.', sum: 0 },
        ],
        'Passive Income': [
            { description: 'Royalties', tooltip: 'Income from intellectual property, like books, music, or patents.', sum: 0 },
            { description: 'Affiliate Marketing', tooltip: 'Earnings from promoting products or services online.', sum: 0 },
            { description: 'Licensing', tooltip: 'Fees for allowing others to use patents, trademarks, or other assets.', sum: 0 },
        ],
        'Transfer Payments': [
            { description: 'Pensions', tooltip: 'Payments from retirement funds.', sum: 0 },
            { description: 'Social Security / State Pensions', tooltip: 'Government-provided retirement or disability income.', sum: 0 },
            { description: 'Unemployment Benefits', tooltip: 'Assistance for jobless individuals.', sum: 0 },
        ],
        'Gifts and Inheritance': [
            { description: 'Monetary Gifts', tooltip: 'Money received from friends or family.', sum: 0 },
            { description: 'Inheritance', tooltip: 'Assets passed down from deceased family members.', sum: 0 },
        ],
        'Miscellaneous Income': [
            { description: 'Lottery Winnings', tooltip: 'One-time or recurring winnings.', sum: 0 },
            { description: 'Insurance Settlements', tooltip: 'Payments from insurance claims.', sum: 0 },
            { description: 'Legal Settlements', tooltip: 'Compensation from lawsuits or agreements.', sum: 0 },
            { description: 'Prizes or Awards', tooltip: 'Cash awards from contests or competitions.', sum: 0 },
        ],
        'Government Assistance Programs': [
            { description: 'Subsidies', tooltip: 'Financial support for housing, education, or other needs.', sum: 0 },
            { description: 'Tax Credits and Refunds', tooltip: 'Money received from tax benefits like child credits or rebates.', sum: 0 },
        ],
        'Educational and Research Grants': [
            { description: 'Scholarships / Stipends', tooltip: 'Support for education or academic pursuits.', sum: 0 },
            { description: 'Research Funding', tooltip: 'Payments for conducting studies or projects.', sum: 0 },
        ],
        'Bartering or Non - Monetary Income': [
            { description: 'Goods and Services Exchange', tooltip: 'Trading goods or services without monetary transactions.', sum: 0 },
        ]
    };

    return entities[title] || [];
}
