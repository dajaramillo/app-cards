const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');

//Inicializaciones
const app = express();

//Configuración
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layousDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(
    session({
      secret: "secret",
      resave: true,
      saveUninitialized: true
      //store: MongoStore.create({ mongoUrl: MONGODB_URI }),
    })
  );

//Variables globales

//Rutas
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//archivos estáticos

//Servidor
app.listen(app.get('port'), ()=> {
    console.log('Server on port', app.get('port'));
});