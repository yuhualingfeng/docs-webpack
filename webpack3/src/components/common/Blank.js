import PropTypes from 'prop-types';
/**
 * 空白页组件，用于组件重载
 */
class Blank extends React.Component {
	componentDidMount(){
		// let backUrl = this.props.location.query.backUrl;
		// if(backUrl){
		// 	this.context.router.push({pathname:backUrl});
		// }
		
	}
	render(){
		return (<div>Blank</div>);
	}
}

Blank.contextTypes = {
	router:PropTypes.object
}

export default  Blank
