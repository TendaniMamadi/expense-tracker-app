export default function expense_tracker() {
    // In-memory storage for expenses
    const expenses = [];

    function addExpense(categoryId, amount, description) {
        // Create a new expense object with the provided data.
        const newExpense = {
            id: expenses.length + 1,
            categoryId,
            amount,
            description,
        };

        // Add the expense object to the expenses array.
        expenses.push(newExpense);

        // Return the updated list of expenses.
        return expenses;
    }

    function allExpenses() {
        // Return the entire list of expenses.
        return expenses;
    }

    function expenseForCategory(categoryId) {
        // Filter the expenses array based on the provided categoryId.
        const filteredExpenses = expenses.filter(expense => expense.categoryId === categoryId);

        // Return the list of expenses for the specified category.
        return filteredExpenses;
    }

    function deleteExpense(expenseId) {
        // Find the index of the expense with the given expenseId in the expenses array.
        const indexToDelete = expenses.findIndex(expense => expense.id === expenseId);

        // If the expense is found, remove it from the array.
        if (indexToDelete !== -1) {
            expenses.splice(indexToDelete, 1);
        }

        // Return the updated list of expenses.
        return expenses;
    }

    function categoryTotals() {
        // Create an object to store category totals.
        const categoryTotal = {};

        // Iterate through the expenses array.
        expenses.forEach(expense => {
            // For each expense, update the corresponding category total.
            const categoryId = expense.categoryId;
            categoryTotal[categoryId] = (categoryTotal[categoryId] || 0) + expense.amount;
        });

        // Return the object with category totals.
        return categoryTotal;
    }

    return {
        addExpense,
        allExpenses,
        expenseForCategory,
        deleteExpense,
        categoryTotals
    };
}
