export default function db_queries(db) {
    async function addExpense(expense, description, amount, total, category_id) {

        try {
            const query = `
            INSERT INTO expense (expense, description, amount, total, category_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id;
        `;
            const result = await db.one(query, [expense, description, amount, total, category_id]);
            return result;
        } catch (error) {
            console.log(error);
            return false
        }
    };

    async function allExpenses() {

        try {
            const query = 'SELECT * FROM expense;';
            const result = await db.manyOrNone(query);
            return result;
        } catch (error) {
            console.log(error);
            return false
        }
    };

    async function expensesForCategory(categoryId) {

        try {
            const query = 'SELECT * FROM expense WHERE category_id = $1;';
            const result = await db.manyOrNone(query, [categoryId]);
            return result;
        } catch (error) {
            console.log(error);
            return false
        }

    };

    async function deleteExpense(expenseId) {

        try {
            const query = 'DELETE FROM expense WHERE id = $1;';
            const result = await db.none(query, [expenseId]);
            return result;
        } catch (error) {
            console.log(error);
            return false
        }
    };

    async function categoryTotals() {

        try {
            const query = `
            SELECT category_id, SUM(amount) AS total
            FROM expense
            GROUP BY category_id;
        `;
            const result = await db.any(query);
            return result;
        } catch (error) {
            console.log(error);
            return false
        }
    };


    return {
        addExpense,
        allExpenses,
        expensesForCategory,
        deleteExpense,
        categoryTotals
    }
}