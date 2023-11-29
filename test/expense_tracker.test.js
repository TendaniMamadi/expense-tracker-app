import assert from 'assert';
import expense_tracker from '../services/expense_tracker.js';

describe('Expense Tracker', () => {
    let tracker;

    beforeEach(() => {
        tracker = expense_tracker();
    });

    it('should add an expense', () => {
        const updatedExpenses = tracker.addExpense(1, 50, 'Lunch');
        assert.strictEqual(updatedExpenses.length, 1);
        assert.deepStrictEqual(updatedExpenses[0], {
            id: 1,
            categoryId: 1,
            amount: 50,
            description: 'Lunch',
        });
    });

    it('should return all expenses', () => {
        tracker.addExpense(1, 50, 'Lunch');
        tracker.addExpense(2, 30, 'Transportation');
        const allExpenses = tracker.allExpenses();
        assert.strictEqual(allExpenses.length, 2);
    });

    it('should return expenses for a specific category', () => {
        tracker.addExpense(1, 50, 'Lunch');
        tracker.addExpense(2, 30, 'Transportation');
        const categoryExpenses = tracker.expenseForCategory(1);
        assert.strictEqual(categoryExpenses.length, 1);
        assert.strictEqual(categoryExpenses[0].categoryId, 1);
    });

    it('should delete an expense', () => {
        tracker.addExpense(1, 50, 'Lunch');
        tracker.addExpense(2, 30, 'Transportation');
        const updatedExpenses = tracker.deleteExpense(1);
        assert.strictEqual(updatedExpenses.length, 1);
        assert.strictEqual(updatedExpenses[0].id, 2);
    });

    it('should calculate category totals', () => {
        tracker.addExpense(1, 50, 'Lunch');
        tracker.addExpense(2, 30, 'Transportation');
        tracker.addExpense(1, 20, 'Dinner');
        const categoryTotals = tracker.categoryTotals();
        assert.strictEqual(categoryTotals[1], 70);
        assert.strictEqual(categoryTotals[2], 30);
    });
});
