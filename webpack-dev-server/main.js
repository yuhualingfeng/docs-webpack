import React,{Component} from "react"
import {render} from "react-dom"

let style = {
	title:{
		color:"#4caf50"
	}
}
console.log(1);
class App extends Component{
	render(){
		return (
			<div>
				<h1 style={style.title}>nice to meet you jack,huasheng!</h1>
			</div>
			);
	}
}

render(<App></App>,document.getElementById("root"))