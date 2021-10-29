var connection=require('./databaseConnection.js');

var bookSeat=(train,numOfSeats,seats,allornone,res)=>{
	var seatInCoach=80;
	var x=new Array(seatInCoach);
	let totalAvailable=0;
	seats.map((s)=>{
		x[s["SeatNo"]-1]=(s["status"]=="available"?1:0);
		if(s.status=="available") totalAvailable++;
	});
	console.log(totalAvailable+" "+train+" "+numOfSeats+" "+allornone);
	
	var result={
		"message":"",
		"seatsRequested":numOfSeats,
		"seatsBooked":0,
		"seats":[],
		"status":400
	}

	if(totalAvailable==0){
		console.log("Inside if")
		result.message="No seats available";
		console.log(result);
		res.send(result);
		res.end();
	}
	else if(allornone==true && numOfSeats>totalAvailable){
		console.log("Inside else if")
		result.message="Number of seats requested are not present";
		console.log(result);
		res.send(result);
		res.end();
	}
	else{
		console.log("Inside else")
		numOfSeats=(numOfSeats>totalAvailable)?totalAvailable:numOfSeats;
		result.seatsBooked=numOfSeats;
		let row=new Array();
		let count=0;
		let sum=0;
		for(let j=0;j<seatInCoach;j++){
			sum = sum+x[j];
			count++;
			if(count==7){
				count=0;
				row.push(sum);
				sum=0;
			}
		}
		row.push(sum);
		let start=starting(row,numOfSeats)*7;
		console.log(row);
		for(let j=start;j<seatInCoach && numOfSeats>0;j++){
			if(x[j]==1){
				numOfSeats--;
				result.seats.push(j+1);
			}
		}
		var updateQuery='update Seats set status="booked" where SeatNo=';
		var query="";
		for(let i=0;i<result.seats.length;i++){
			query+=updateQuery+result.seats[i]+" and TrainNo="+train+";";
		}
		console.log(row);
		connection.query(query,(err,rows,fields)=>{
			if(err){
				result.message="error during booking";
				result.seats=[];
				result.seatsBooked=0
			}else{
				result.message="successfully booked";
				result.status=200;
			}
			console.log(result);
			res.send(result);
			res.end();
		});
	  
	}

}

function starting(row,numOfSeats){
	let start=0;
	let nearness=1000;
	for(let j=0;j<row.length;j++){
		
		if(row[j]==0) continue;

		let t=numOfSeats;
		let r=j;
		let tempNear=0;
		while(t>0 && r<row.length){
			if(row[r]==0) {
				r++;
				continue;
			}
			if(row[r]>=t){
				t=0
			}else{
				t=t-row[r];
			}
			tempNear+=(r-j);
			r++;
		}
		if(t==0 && tempNear<nearness){
			start=j;
			nearness=tempNear;
		}
		console.log("start  "+start+" j : "+j+" nearness: "+nearness+" tempNear: "+tempNear);
	}
	return start;
}
module.exports=bookSeat;