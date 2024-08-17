const express = require("express");
const path = require("path");
const app = express();
const LogInCollection = require("./mongo"); // Assuming you have a MongoDB connection set up here
const port = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Paths to templates and public files
const templatePath = path.join(__dirname, '../templates');
const publicPath = path.join(__dirname, '../public');

// Set up the view engine and static files
app.set('view engine', 'hbs');
app.set('views', templatePath);
app.use(express.static(publicPath));

// Routes
app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.post('/signup', async (req, res) => {
    const data = new LogInCollection({
        name: req.body.name,
        password: req.body.password
    });

    try {
        const existingUser = await LogInCollection.findOne({ name: req.body.name });
        if (existingUser) {
            if (existingUser.password === req.body.password) {
                res.send("User details already exist");
            } else {
                res.send("Username already taken with a different password");
            }
        } else {
            await data.save();
            res.status(201).render("home", { naming: req.body.name });
        }
    } catch (error) {
        res.send("Wrong inputs");
    }
});

app.post('/login', async (req, res) => {
    try {
        const user = await LogInCollection.findOne({ name: req.body.name });
        if (user && user.password === req.body.password) {
            res.status(201).render("home", { naming: `${req.body.name}` });
        } else {
            res.send("Incorrect username or password");
        }
    } catch (error) {
        res.send("Wrong details");
    }
});
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
