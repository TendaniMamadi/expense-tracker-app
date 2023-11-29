export default function route(logic) {


    const homeRoute = async (req, res) => {
        res.render('index', );
    }

    const addExpenseRoute = async (req, res) => {
        const { expense, amount, category } = req.body;

        try {
            const result = await logic.addExpense(expense, parseFloat(amount), category)
            if (result) {
                req.flash('success', 'You have successfully added expenses');
                res.redirect('/');
            }
        } catch (error) {
            req.flash('error', 'An error occurred while processing the request');
            console.error('Error:', error);
            res.render('index', { expense, error });
        }

    }


    
    return {
        homeRoute,
        addExpenseRoute
    }
}



    
