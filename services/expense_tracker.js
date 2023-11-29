export default function expense_tracker() {

    // In-memory storage for expenses
    const expenses = [];

    async function addExpense(categoryId, amount, description) {
        // Pseudocode:
        // Create a new expense object with the provided data.
        const newExpense = {
            id: expenses.length + 1, // Generate a simple ID
            categoryId,
            amount,
            description
        };

        //Add the expense object to the expenses array.
        expenses.push(newExpense);

        //Return a success message or the updated list of expenses.
        return {
            success: true,
            message: 'Expense added successfully',
            expense: newExpense
        };
    }

    async function allExpenses() {
        // Pseudocode:
        //Return the entire list of expenses.
        return expenses;
    }

    async function expenseForCategory(categoryId) {
        // Pseudocode:
        //Filter the expenses array based on the provided categoryId.
        const expensesForCategory = expenses.filter(expense => expense.categoryId === categoryId);

        //Return the list of expenses for the specified category.
        return expensesForCategory;
    }

    async function deleteExpense(expenseId) {
        // Pseudocode:
        //Find the expense with the given expenseId in the expenses array.
        const index = expenses.findIndex(expense => expense.id === expenseId);

        //Remove the expense from the array if found.
        if (index !== -1) {
            const deletedExpense = expenses.splice(index, 1)[0];
            //Return a success message or the updated list of expenses.
            return {
                success: true,
                message: 'Expense deleted successfully',
                expense: deletedExpense
            };
        } else {
            // Return an error message if the expense with the given ID is not found.
            return {
                success: false,
                message: 'Expense not found',
                expense: null
            };
        }
    }

    async function categoryTotals() {
        // Pseudocode:
        //Create an object to store category totals.
        const categoryTotals = {};

        //Iterate through the expenses array.
        expenses.forEach(expense => {
            //For each expense, update the corresponding category total.
            if (!categoryTotals[expense.categoryId]) {
                categoryTotals[expense.categoryId] = 0;
            }

            categoryTotals[expense.categoryId] += expense.amount;
        });

        //Return the object with category totals.
        return categoryTotals;
    }

    return {
        addExpense,
        allExpenses,
        expenseForCategory,
        deleteExpense,
        categoryTotals
    };
}
