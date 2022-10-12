const [dependencies, { express } ] = [require('../dependencies'), require('../dependencies')]
const app = express();

app.set("view-engine", "ejs");
app.use(
    express.urlencoded({extended: true}),
    dependencies.flash(),
    dependencies.MOR('_method'),
    dependencies.session({
        secret: "sd8fg9s9df8gs9dfg",
        /**
         * the default would be storing this in a enviroment variable,
         * but i figured it would be just easier to store the "secret"
         * like this since im not really gonna use this authentication
         * sistem.
         */
        resave:false,
        saveUninitialized:false
    }),
    dependencies.passport.initialize(),
    dependencies.passport.session(),
)

module.exports = app