var express = require('express');
var router = express.Router();

const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sanpham',
  password: '01257988704',
  port: 5432,
})



/* GET home page. */
router.get('/', function(req, res, next) {

});

// api get data from postgresSql
router.get('/getdata01', function(req, res, next) {

  //get data
  pool.query('select * from product_info', (err, response) => {
    if(err){
      console.log(err);
    }
    else{
      res.send(response.rows);
    }
    //pool.end()
  })


});


router.get('/add', function(req, res, next) {
  res.render('add',{})
});

router.post('/add', function(req, res, next) {
var product_name = req.body.product_name,
    product_price = req.body.product_price,
    image = req.body.image

  pool.query("insert into product_info (product_name, product_price, image) values ($1, $2, $3)",
  [product_name, product_price, image], (err, response) => {
    if(err){
      res.send(err);
    }
    else{
      res.send("Insert success " + product_name + " " + product_price + " " + image);
    }
  });
});

module.exports = router;
