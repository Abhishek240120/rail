import Header from "./Header/header.js"
import SelectTrain from "./SelectTrain/selectTrain.js";
import TrainBook from "./TrainBook/trainBook.js";
import {BrowserRouter as Router,Route} from 'react-router-dom';


export default function App(){
	 return(
	 	<div class="container">
	 	<Header/>
	 	<Router>
	 		<Route  path="/" exact component={SelectTrain}/>
	 		<Route  path="/:trainNo" exact component={TrainBook}/>
	 	</Router>
	 	
	 	</div>
	 );
}
