import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import flash from 'express-flash';
import session from 'express-session';
import pgPromise from 'pg-promise';
import 'dotenv/config';
import route from './routes/route.js';
import frontEnd from './services/expense_tracker.js'
import db_queries from './services/db_queries.js';



const app = express();
const connectionString = process.env.DATABASE_URL
const pgp = pgPromise({});
const db = pgp(connectionString);
const frontendInstance = frontEnd();
const backendInstance = db_queries(db)
const routeInstance = route(frontendInstance, backendInstance);


app.engine('handlebars', engine({
    layoutsDir: './views/layouts'
}));
app.use(session({
    secret: "expense-tracker-app",
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());


// Route to display homepage

app.get('/',routeInstance.homeRoute)

// Route to add an expense
app.post('/add-expense',routeInstance.addExpenseRoute);

// Route to get all expenses
app.get('/all-expenses', (req, res) => {
    // Call the allExpenses function
    const expenses = routeInstance.allExpenses();

    // Return the expenses as JSON
    res.json(expenses);
});

// Route to get expenses for a specific category
app.get('/expenses-for-category/:categoryId', (req, res) => {
    const categoryId = parseInt(req.params.categoryId);

    // Call the expensesForCategory function
    const categoryExpenses = routeInstance.expenseForCategory(categoryId);

    // Return the expenses for the category as JSON
    res.json(categoryExpenses);
});

// Route to delete an expense
app.delete('/delete-expense/:expenseId', (req, res) => {
    const expenseId = parseInt(req.params.expenseId);

    // Call the deleteExpense function
    routeInstance.deleteExpense(expenseId);

    // Return a success message or status
    res.sendStatus(204); // No content
});

// Route to get category totals
app.get('/category-totals', (req, res) => {
    // Call the categoryTotals function
    const totals = routeInstance.categoryTotals();

    // Return the category totals as JSON
    res.json(totals);
});

//PORT
const PORT = process.env.PORT || 2002;
app.listen(PORT, (req, res) => {
    console.log('We taking off on port:', PORT)
});