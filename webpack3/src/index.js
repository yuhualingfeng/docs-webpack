import _ from 'lodash';
import './style.css';
import Icon from './icon.png';
import printMe from './print.js';


function component(){
	var element = document.createElement('div');
	element.innerHTML = _.join(['Hello','webpack'],'');
	element.classList.add('hello');

	var myIcon = new Image();
	myIcon.src = Icon;
	element.appendChild(myIcon);

	var btn = document.createElement('button');
	btn.innerHTML = 'Click me and check the console';
	btn.addEventListener('click',printMe);
	console.log(printMe);
	element.appendChild(btn);

	return element;
}

document.body.appendChild(component());
