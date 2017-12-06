/*
	初始化用于全局存储的数据
 */
import { combineReducers } from 'redux'
import reducers1 from './reducers1'
import reducers2 from './reducers2'


let reducers = {};
Object.assign(reducers,reducers1,reducers2);

export default combineReducers(reducers)