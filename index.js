const express = require('express')
const app = express()
const port = 3000
const path = require('path');

const handlebars = require('express-handlebars');
const route = require('./src/routes')
const db = require('./src/config/db')
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const morgan = require('morgan')
var cookieParser = require('cookie-parser')
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
const striptags = require('striptags');
const setCommonData = require('./src/app/middlewares/setData')
//template
app.engine('hbs', handlebars.engine({
  extname: '.hbs',
  helpers: {
    sum: (a, b) => a + b,
    truncateDescription: function (description) {
      if (description.length > 0) {
        return striptags(description.substring(0, 150) + '...');
      }
      return description;
    },
    truncateDescriptionTitle: function (description) {
      if (description.length > 0) {
        return striptags(description.substring(0, 50));
      }
      return description;
    },
    truncateDescriptionSearch: function (description) {
      if (description.length > 0) {
        return striptags(description.substring(0, 500) + '...');
      }
      return description;
    },
    formatDate: function (dateString) {
      const parts = dateString.split('-');
      if (parts.length === 3) {
        return parts[2] + '-' + parts[1] + '-' + parts[0];
      }
      return dateString;

    }

  }
}));

//cookies
app.use(cookieParser())

//change method
app.use(methodOverride('_method'))

app.use(express.urlencoded({
  extended: true, limit: '50mb'
}))

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src\\resources\\views'));

//morgan console log
app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, 'src\\public')))
app.use('/uploads', express.static('uploads'))
app.use(setCommonData)
route(app)
db.connection;
app.listen(port, () => {
  console.log(`Example app listening on port  http://localhost:${port}`)
})