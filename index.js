const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport')
const keys = require('./config/keys');
require('./models/User.js')
require('./services/passport');


mongoose.connect(keys.MONGO_URI, {useUnifiedTopology: true , useNewUrlParser: true  })

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
)

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes.js')(app);

const PORT = process.env.PORT || 5000
app.listen(PORT)