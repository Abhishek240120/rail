import './style.css';
import {useState} from 'react';
import {Link} from 'react-router-dom';

export default function SelectTrain(){
	const [train,setTrain]=useState("");
	return(
		<div>
		<div class="searchTrain">
			<select onChange={(event)=>{setTrain(event.target.value);}}>
			<option value="">---select your train no----</option>
			<option value="1851233">1851233</option>
			</select>
      		<a href={"/"+train} class="btn btn-outline-success">Search</a>
		</div>
		
		</div>

	);
}