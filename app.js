var express = require('express');
var path = require('path');
var fs = require('fs');
let alert = require('alert');
var MongoClient = require('mongodb').MongoClient;
var app = express();
var un = null;
var pw = null;
var want = [];

const PORT = process.env.PORT || 3030;
//view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
	res.render('login')
});

//app.listen(3000)

function getHome(res) {
	res.render('home');

}
app.post('/', function (req, res) {
	var x = req.body.username;
	var y = req.body.password;
	if (x.length === 0) {
		alert("please enter a username");
	} else if (y.length === 0) {
		alert("please enter your password");
	}

	else {
		MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
			if (err) throw err;
			var db = client.db('myDB');
			var firstColl = db.collection('myCollection');
			firstColl.find({ username: x, password: y }).toArray(function (err, docs) //find if documents that satisfy the criteria exist
			{

				if (docs.length > 0) //if exists
				{
					un = docs[0].username;
					pw = docs[0].password;
					want = docs[0].wantlist;
					getHome(res); // print out what it sends back

				}
				else // if it does not 
				{
					alert("Please create an account");
				}
			});


		});

	}
});

app.post('/home', function (req, res) {
	res.render('wanttogo');
});

app.get('/wanttogo', function (req, res) {
	res.render('wanttogo');
});
app.post('/search', function (req, res) {
	var value = req.body.Search;
	const list_of_cities = ["inca trail to machu picchu", "annapurna circuit", "bali island", "santorini island", "paris", "rome"];
	var list_of_results = [];
	if (list_of_cities[0].includes(value.toString().toLowerCase()))
		list_of_results = list_of_results + [list_of_cities[0]];
	if (list_of_cities[1].includes(value.toString().toLowerCase()))
		list_of_results = list_of_results + [list_of_cities[1]];
	if (list_of_cities[2].includes(value.toString().toLowerCase()))
		list_of_results = list_of_results + [list_of_cities[2]];
	if (list_of_cities[3].includes(value.toString().toLowerCase()))
		list_of_results = list_of_results + [list_of_cities[3]];
	if (list_of_cities[4].includes(value.toString().toLowerCase()))
		list_of_results = list_of_results + [list_of_cities[4]];
	if (list_of_cities[5].includes(value.toString().toLowerCase()))
		list_of_results = list_of_results + [list_of_cities[5]];
	res.render('searchresults', { results: list_of_results });
	console.log(value);
	res.render('searchresults');
});
app.get('/hiking', function (req, res) {
	res.render('hiking');
});
app.get('/cities', function (req, res) {
	res.render('cities');
});
app.get('/islands', function (req, res) {
	res.render('islands');
});
app.post('/bali', function (req, res) {
	MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
		if (err) throw err;
		var db = client.db('myDB');
		var firstColl = db.collection('myCollection');
		firstColl.find({ username: un, password: pw }).toArray(function (err, docs) //find if documents that satisfy the criteria exist
		{

			if (docs.length > 0) //if exists
			{
				firstColl.updateOne(
					{
						username: un
					},
					{
						$addToSet: { wantlist: 'bali' }
					});

			}

		});

	});
	res.render('bali');
});
app.get('/bali', function (req, res) {
	res.render('bali');
});
app.get('/santorini', function (req, res) {
	res.render('santorini');
});
app.post('/santorini', function (req, res) {
	MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
		if (err) throw err;
		var db = client.db('myDB');
		var firstColl = db.collection('myCollection');
		firstColl.find({ username: un, password: pw }).toArray(function (err, docs) //find if documents that satisfy the criteria exist
		{

			if (docs.length > 0) //if exists
			{
				firstColl.updateOne(
					{
						username: un
					},
					{
						$addToSet: { wantlist: 'Santorini' }
					});
			}

		});

	});
	res.render('santorini');
});
app.get('/inca', function (req, res) {
	res.render('inca');
});
app.post('/inca', function (req, res) {
	MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
		if (err) throw err;
		var db = client.db('myDB');
		var firstColl = db.collection('myCollection');
		firstColl.find({ username: un, password: pw }).toArray(function (err, docs) //find if documents that satisfy the criteria exist
		{
			if (docs.length > 0) //if exists
			{
				firstColl.updateOne(
					{
						username: un
					},
					{
						$addToSet: { wantlist: 'Inca' }
					});

			}

		});

	});
	res.render('Inca');
});
app.get('/paris', function (req, res) {
	res.render('paris');
});
app.post('/paris', function (req, res) {
	MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
		if (err) throw err;
		var db = client.db('myDB');
		var firstColl = db.collection('myCollection');
		firstColl.find({ username: un, password: pw }).toArray(function (err, docs) //find if documents that satisfy the criteria exist
		{
			if (docs.length > 0) //if exists
			{
				firstColl.updateOne(
					{
						username: un
					},
					{
						$addToSet: { wantlist: 'Paris' }
					});

			}

		});

	});
	res.render('paris');
});
app.get('/rome', function (req, res) {
	res.render('rome');
});
app.post('/rome', function (req, res) {
	MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
		if (err) throw err;
		var db = client.db('myDB');
		var firstColl = db.collection('myCollection');
		firstColl.find({ username: un, password: pw }).toArray(function (err, docs) //find if documents that satisfy the criteria exist
		{

			if (docs.length > 0) //if exists
			{
				firstColl.updateOne(
					{
						username: un
					},
					{
						$addToSet: { wantlist: 'Rome' }
					});

			}

		});

	});
	res.render('rome');
});
app.get('/annapurna', function (req, res) {
	res.render('annapurna');
});
app.post('/annapurna', function (req, res) {
	MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
		if (err) throw err;
		var db = client.db('myDB');
		var firstColl = db.collection('myCollection');
		firstColl.find({ username: un, password: pw }).toArray(function (err, docs) //find if documents that satisfy the criteria exist
		{

			if (docs.length > 0) //if exists
			{
				docs[0].wantlist.push('annapurna')

			}

		});

	});
	res.render('annapurna');
});
app.get('/registration', function (req, res) {
	res.render('registration');
});
app.post('/register', function (req, res) {
	var u = req.body.username;
	var c = req.body.password;
	MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
		if (err) throw err;
		var db = client.db('myDB');
		var firstColl = db.collection('myCollection');
		firstColl.find({ username: u, password: c }).toArray(function (err, docs) //find if documents that satisfy the criteria exist
		{
			if (docs.length > 0) //if exists
			{
				alert("Account already exists"); // print out what it sends back
			}
			else // if it does not 
			{
				firstColl.insertOne({ username: u, password: c, wantlist: [String] });
				un = u;
				pw = c;
				want = [];
				alert("Account created succesfully!");
				res.render('login');
			}
		});

	});

});


MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
	if (err) throw err;
	var db = client.db('MyDB');

});


app.listen(PORT, () => {
	console.log(`server started on port ${PORT}`);
});


