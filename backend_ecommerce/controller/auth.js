var mysql = require('mysql');
var jwt = require('jsonwebtoken');

const sha256 = require('sha256');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'sam12345',
	database: 'ecommerce',
});

connection.connect();

exports.signup = (req, res) => {
	console.log('>>>', req.body);
	const { id, name, email, pass } = req.body;
	var sql = 'INSERT INTO customer ( id,name, email, pass) VALUES (?,?,?,?)';
	const SALT = process.env.SALT;
	const PASS = pass + SALT;
	const Pass_new = sha256(PASS);

	connection.query(sql, [id, name, email, Pass_new], function (err, result) {
		if (err) throw err;
		console.log('Number of records inserted: ' + result);
		const token = jwt.sign({ id: Pass_new }, process.env.SALT);
		res.cookie('token', token, { expire: new Date() + 99999 });
		return res.json({ token, user: { Pass_new, id } });
	});
};

exports.getAllProducts = (req, res) => {
	var sql = 'SELECT * FROM products';
	connection.query(sql, function (err, result) {
		if (err) throw err;
		console.log('All Products: ' + result);

		return res.json({
			data: result,
		});
	});
};

exports.signin = (req, res) => {
	const email = req.body.email;
	const pass = req.body.pass;
	const SALT = process.env.SALT;
	const PASS = pass + SALT;
	const Pass_new = sha256(PASS);
	var sql = `SELECT * FROM customer where email='${email}' and pass='${Pass_new}';`;
	connection.query(sql, (err, result) => {
		console.log(result);
		if (result.length == 0) res.status(409).send();
		else {
			const token = jwt.sign({ id: Pass_new }, process.env.SALT);
			res.cookie('token', token, { expire: new Date() + 99999 });
			return res.json({ result, token });
		}
	});
};
