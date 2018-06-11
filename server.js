
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
app.use(cors());
var DButilsAzure = require('./DButils');
//var jwt  = require('jsonwebtoken');
//var db = new sqlite3.Database('draw.db');
var util=require('util');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//complete your code here

var port = 6000;
app.listen(port, function () {
    console.log('alex ' + port);
});

app.post('/element',function(req,res){
    element=Object.values(req.body)
   // var query=util.format("SELECT username,password FROM users WHERE username='%s';",req.body.username);
    let placeholders = element.map((language) => "'%s'").join(',');
    let sql = 'INSERT INTO main(ip,shape,color,size,x,y) VALUES (' + placeholders +')';
    var query=util.format(sql,element[0],element[1],element[2],element[3],element[4],element[5]);
    DButilsAzure.execQuery(query)
    .then(function(result){
       console.log("success")
       res.send("Success")
    })
    .catch(function(err){
        console.log("error")
        res.status(500).send("Error While Updating the element")
   })
   })

app.get('/',function(req,res){
    var query = 'SELECT * from main ORDER BY id ASC;';
    DButilsAzure.execQuery(query)
    .then(function(result){
        res.send(result)
    })
    .catch(function(err){
        console.log("error")
        res.status(500).send("Error While retrieving the Board")

    })


})
   /*db.get(query,[], (err,rows) => {
       if (err) {
         return console.error(err.message);
       }
      if(rows['size']<1){
        let placeholders = element.map((language) => '"%s"').join(',');
        let sql = 'INSERT INTO main(ip,element,color,size,x,y) VALUES (' + placeholders +')';
        var query=util.format(sql,element[0],element[1],element[2],element[3],element[4],element[5]);
        db.run(query,[], function(err) {
            if (err) {
              return console.error(err.message);
            }
            console.log(`Rows inserted ${this.changes}`);
          });
           
          // close the database connection
        }

      })*/
       
      



    



    
    








//-----------------------------------------------------------------------------------------------------


