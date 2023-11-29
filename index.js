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


app.get('/', (req, res) => {
    res.render('index', { expenses });
});

// Handle the form submission to add expenses
app.post('/add-expense', (req, res) => {
    const { expense, amount } = req.body;

    // Add the new expense to the expenses array
    expenses.push(`${expense}: $${amount}`);

    // Redirect back to the main page
    res.redirect('/');
});

//PORT
const PORT = process.env.PORT || 2002;
app.listen(PORT, (req, res) => {
    console.log('We taking off on port:', PORT)
});