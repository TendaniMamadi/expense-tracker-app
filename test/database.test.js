import assert from 'assert';
import dbQueries from '../services/db_queries.js';
import pgPromise from 'pg-promise';
import 'dotenv/config';

const pgp = pgPromise({});
const connectionString = process.env.DATABASE_URL;

const db = pgp(connectionString);
let dbQueriesInstance = dbQueries(db);

describe('Database Queries', function () {
    this.timeout(20000);


    it('should add an expense', async function () {
        let categoryId = 1;
        let expense = ''
        let description = ''
        let amount = '';

        const cart = [
            {
                categoryId: 1,
                expense: 'Groceries',
                description: 'Monthly groceries',
                amount: 100
            }
        ]

        await dbQueriesInstance.addExpense(categoryId, expense, description, amount);
        const result = await dbQueriesInstance.allExpenses();
        assert.ok(result, cart);
    });

    it('should get all expenses', async function () {
        const result = await dbQueriesInstance.allExpenses();
        assert.ok(Array.isArray(result), 'Expected an array of expenses');
    });

    it('should get expenses for a specific category', async function () {
        const categoryId = 1;
        const result = await dbQueriesInstance.expensesForCategory(categoryId);
        assert.ok(Array.isArray(result), 'Expected an array of expenses for the category');
    });

    it('should delete an expense', async function () {
        const categoryId = 1;
        const expense = 'Groceries';
        const description = 'Monthly groceries';
        const amount = 100;

        // Add an expense for deletion
        const addedExpense = await dbQueriesInstance.addExpense(categoryId, expense, description, amount);

        // Delete the added expense
        const deleteResult = await dbQueriesInstance.deleteExpense(addedExpense.id);
        assert.strictEqual(deleteResult, null, 'Expected deletion to be successful');
    });

    it('should get category totals', async function () {
        const result = await dbQueriesInstance.categoryTotals();
        assert.ok(Array.isArray(result), 'Expected an array of category totals');
    });



    after(function () {
        db.$pool.end();
    });
});
