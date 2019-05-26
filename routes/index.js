var express = require('express');
var router = express.Router();

const documents = [
  {id: 1, document: 'sdfsdfadf'},
  {id: 2, document: 'sdfasdfdsaffasd'}
]


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('incoming request....', req.headers['content-type']);
  res.format({
  
    'text/html': function(){
      res.send('<b>hey html</b>');
    },
  
    'application/json': function(){
      res.send({ message: 'hey api' });
    },

    'text/plain': function(){
      res.send('hey plain text');
    },
  
    'default': function() {
      // log the request and respond with 406
      res.status(406).send('Not Acceptable');
    }
  });
});

module.exports = router;
