var express=require('express')
var sql=require('mysql')

var sqlConnection=sql.createConnection({
	"host":"sql6.freesqldatabase.com",
	"user":"sql6447205",
	"password":"ZZyZ2eQflZ",
	"database":"sql6447205",
	"multipleStatements":true
});

sqlConnection.connect((err)=>{
	if(!err){
		console.log("Connection established");
	}else{
		throw new Error("Database Connection failed");
	}
});

module.exports=sqlConnection;