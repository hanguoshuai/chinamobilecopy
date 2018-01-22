require('./index.css');
var navList = require('../common/nav-list/index.js')
var page = (function(){
	return {
		init:function(){
			this.onload();
		},
		onload:function(){
			navList.init({name:'user-home'})
		}
	}
})();
page.init();