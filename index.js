const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport')
const keys = require('./config/keys');
require('./models/User.js')
require('./services/passport');


mongoose.connect(keys.MONGO_URI, {useUnifiedTopology: true , useNewUrlParser: true  })

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
)

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes.js')(app);
require('./routes/billingRoutes.js')(app);

if (process.env.NODE_ENV=== 'production') {
    // express will serve up production assets like main.css files
    app.use(express.static('client/build'))
    // express will serve up the index.html file if it doesn't recognize the route
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000
app.listen(PORT)