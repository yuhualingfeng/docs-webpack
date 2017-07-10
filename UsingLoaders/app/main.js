// var div = <div>fsdf</div>;
import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
require('./app.css');
var cats = require('./cats');

let i = 1;
const j =2;
var f = i=>i;
var d = i=>i;

var p = require('json!../package.json');
console.log(p);

var div = <div></div>;
var Component = React.createClass({
	render:function(){
		return (<div>fd222</div>);
	}
});

$(function(){
	ReactDOM.render(<Component/>,document.getElementById('content'));
});
