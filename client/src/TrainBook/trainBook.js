import {BrowserRouter as Router,Route,useParams} from 'react-router-dom';
import {useState,useEffect,useMemo} from 'react';

import "./style.css";


const host="https://railway-booking.herokuapp.com/";
export default function TrainBook(){
	
	
	const {trainNo}=useParams();
	const [train,setTrain]=useState(trainNo);
	const [seat,setSeat]=useState([]);
	const getstatus=host+"seats/"+trainNo;
	useEffect(()=>{
		const fetchData = async () => {
            try {
                const response = await fetch(getstatus);
                console.log(response);
                const json = await response.json();
                console.log(json.map((j)=>j.SeatNo));
                setSeat(json);

            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData();
	},[])
	var flag="false";
	var num="";
	
	
	
	return(
		<div>
		<div style={{"display":"grid","grid-template-columns":"auto auto"}}>
			<div><h1 style={{"padding":"30px","color":"blue"}}>Train no. {train}</h1></div>
			<div style={{"padding":"30px","color":"blue"}}>
				<select onChange={(ev)=>{num=ev.target.value;}}>
				<option value="0">---select number of seats---</option>
				<option value='1'>1</option>
				<option value='2'>2</option>
				<option value='3'>3</option>
				<option value='4'>4</option>
				<option value='5'>5</option>
				<option value='6'>6</option>
				<option value='7'>7</option>
				</select>
				<input style={{"margin-left":"10px"}} type="checkbox" value="true" name="allornone" onChange={(ev)=>{flag=(flag=="false")?"true":"false";}}/>All Or None
				<span style={{"margin-left":"10px"}}><button class="btn btn-primary" onClick={()=>{bookTicket(setSeat,train,num,flag)}}>Book</button></span>
			</div>
		</div>
		<div className="statusOfSeats">
		{
			seat.map((s)=>{
				var stl={
					"background-color":(s.status=='available')?"green":"red",
					"height": "100px",
					"width": "100px",
					"border-radius": "100%"
				}
				return (<div class="seat">
					<svg height="100" width="100">
					  <circle cx="50" cy="50" r="30" stroke="black" stroke-width="3" fill={stl["background-color"]} />
					   <text x="50%" y="50%" text-anchor="middle" stroke="white" stroke-width="2px" dy="0.3em">{s.SeatNo}</text>
					</svg> 
				</div>);
			})
		}
		
		</div>
		<div>
			<svg height="100" width="100">
				<circle cx="50" cy="50" r="15" stroke="black" stroke-width="3" fill="green" />   
			</svg><span style={{"font-style":"italic","font-size":"1.3em"}}> *Available</span>
			<svg height="100" width="100">
				<circle cx="50" cy="50" r="15" stroke="black" stroke-width="3" fill="red" />   
			</svg><span style={{"font-style":"italic","font-size":"1.3em"}}> *Booked</span>
		</div>
		</div>
	);
}
 
const bookTicket=(setSeat,train,num,flag)=>{
	const getbook=host+"book/"+train+"/"+num+"/"+flag;
	const getstatus=host+"seats/"+train;
	const fetchData = async () => {
        try {
            var response = await fetch(getbook);
            var json = await response.json();
            var response1 = await fetch(getstatus);
            var json1 = await response1.json();
            var str=json["message"]+"\n";
            
            if(json["status"]==200){
            	str+="seats booked : ";
            	for(let s=0;s<json["seats"].length;s++){
            		str+=" "+json["seats"][s]+",";
            	}
            }
            str+="\n";
            str+="Number of Seats requested : "+json["seatsRequested"]+"\n";
            str+="Number of Seats alloted : "+json["seatsBooked"];
            alert(str);
            setSeat(json1);
        } catch (error) {
                console.log("error", error);
        }
    };
    fetchData();
	
}