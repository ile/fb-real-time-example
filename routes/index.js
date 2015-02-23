var express = require('express'),
	fb = require('ilkkah-fb'),
	router = express.Router(),
	appSecret = 'ReplaceWithYourAppSecret';

fb.options({ appSecret: appSecret });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/deauthorize', function(req, res, next) {
	var request = fb.parseSignedRequest(req.body.signed_request, appSecret);
	console.log('post /deauthorize', request);
	res.send('');
});

router.get('/cb', function(req, res, next) {
	console.log('get /cb', req.query);
	if (req.query['hub.verify_token'] === 'moi') {
		res.send(req.query['hub.challenge']);
	}
});

router.post('/cb', function(req, res, next) {
	console.log('post /cb', req.body);
	res.send('');
});

module.exports = router;
