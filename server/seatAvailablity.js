var connection=require("./databaseConnection.js");
var seatAvailablity=(trainNo)=>{
	console.log("inside seatAvailablity");
	let query="select * from Seats where TrainNo="+trainNo;
	return new Promise((resolve,reject)=>{
		connection.query(query,(err,rows,fields)=>{
			if(err){
				console.log("error during fetching....");
				reject("error during fetching....");
			}else{
				resolve(rows);
			}
		});
	});
}
module.exports=seatAvailablity;