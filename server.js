if(process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}

const app = require('./app/routes')

app.listen(3002);
