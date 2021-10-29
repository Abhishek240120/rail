const express=require('express');
var app=express();
var cors = require('cors');
app.use(cors())


var seatAvailablity=require('./seatAvailablity.js');
var bookSeat=require('./bookSeat.js');
var aboutTrain=require('./aboutTrains.js')

const port = process.env.PORT || 5000;
app.listen(port,()=>{
	console.log("server is listening at port no "+port);
});

// if(process.env.NODE_ENV=='production'){
// 	app.use(express.static('client/build'));
// 	const path=require('path');
// 	app.get("*",(req,res)=>{
// 		res.sendFile(path.resolve(__dirname,'client','build','index.html'));
// 	});
// }
app.get("/",(req,res)=>{
	res.send("Perfect");
	res.end();
})

app.get("/seats/:trainNo",(req,res)=>{
	var trainNo=req.params.trainNo;
	console.log("entered......"+trainNo);
	seatAvailablity(trainNo).then((seats)=>{
		res.send(seats);
		res.end();
	}).catch((mes)=>{
		console.log(mes);
		res.end();
	});
	
	
});
app.get("/book/:trainNo/:numOfseats/:allOrNone",(req,res)=>{
	console.log("booking.........")
	var trainNo=req.params.trainNo;
	var numOfseats=req.params.numOfseats;
	var allOrNone=req.params.allOrNone=="false"?false:true;
	seatAvailablity(trainNo).then((seats)=>{
		console.log("resolving seatAvailablity functin")
		var result=bookSeat(trainNo,numOfseats,seats,allOrNone,res);
	}).catch((mes)=>{
		console.log(mes);
		res.end();
	});
});



app.get("/trains",(req,res)=>{
	aboutTrain(res);
});