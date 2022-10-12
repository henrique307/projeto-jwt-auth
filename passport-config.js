const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

function initialize(passport, getUserByEmail, getUserById) {

	async function authenticateUser (email, password, done) {
		const user = getUserByEmail(email);
		if (!user) {
			return done(null, false, { message: "No user with that email" });
		}

		try {
			if (await bcrypt.compare(password, user.password)) {
				return done(null, user);
			} else {
				return done(null, false, { message: "No user with that password" });
			}
		} catch (e) {
			throw done(e);
		}
	};

	passport.use(
		new LocalStrategy(
			{
				usernameField: "email",
				passwordField: "password" /*the default value is already "password"*/,
			},
			authenticateUser
		)
	);
	passport.serializeUser((user, done) => done(null, user.id));
	passport.deserializeUser((id, done) => {
        done(null, getUserById(id))
    });
}

module.exports = initialize