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
  }
});

router.post('/login',(req,res)=>{ 
  var username = 'patipat_cha';
  var sql = "SELECT * FROM user WHERE activate = 1 AND id = ?";
  con.query(sql,[username],function (err, rows, result) {
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

        var headMessage = "OK"
        var body = [];

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