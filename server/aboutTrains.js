var connection=require('./databaseConnection.js');

function aboutTrain(res){
	connection.query("select * from Train",(err,rows,fields)=>{
		if(err){
			res.send(err);
		}else{
			res.json(rows);
		}
		res.end();
	})
}
module.exports=aboutTrain;