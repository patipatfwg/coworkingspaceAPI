const express = require('express');
const mysql = require('mysql');
const moment = require('moment');
const momentz = require('moment-timezone');
const Base64 = require('nodejs-base64-converter');

const app = express();
const router = express.Router();
const time_at = moment().tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss");
var con = mysql.createConnection({
  host: Base64.decode("NTIuMTYzLjgyLjI0OQ=="),
  port: "1178",
  user: Base64.decode("cHJvbXB0YWRt"),
  password: Base64.decode("Y2hlZSNNYWk1"),
  database: Base64.decode("aHJzZXJ2aWNlcw==")
});

con.connect(function(err){
  if  (err){
      console.log(time_at+" ERR CONNECTION : "+err.stack);
      return;
  }else{
      console.log(time_at+" CONNECTION CoWorkingSpace Start :"+con.threadId)
      return;
  }
});

router.post('/login',(req,res)=>{
  var username = req.query.username;
  var password = Base64.decode(req.query.password);
  var sql = "SELECT * FROM user LEFT JOIN employee ON user.id = employee.user_id WHERE user.activate = 1 AND user.id = ? AND user.password = ?";
  con.query(sql,[username,password],function (err, rows, result) {
    if(err){
      var headCode = 400;
      var headMessage = "SQL Syntax!!"
      var body = [];
      console.log(err);
      throw err;
    }else{
      var headCode = 200;

      if(rows.length==0){
        var headMessage = "No Rows"
        var body = [];
      }else{
        var first_name_en = rows[0]['first_name_en'];
        var last_name_en = rows[0]['last_name_en'];

        var headMessage = "OK"
        var body = {
          "user":[
            {
              "username":username,
              "firstname":first_name_en,
              "lastname":last_name_en
            }
          ]
        };
        console.log(rows);
      }
      console.log( moment().tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss") + " SELECT COUNT: " + rows.length );
    }

    var head = {
      "head":{
        "datetime":moment().tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss") ,
        "code":headCode ,
        "message":headMessage
      }
    };
    var body = {"body":body};
    const data = Object.assign(head, body);
    res.json(data);
  });
});

module.exports = router;