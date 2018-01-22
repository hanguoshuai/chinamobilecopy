require('./index.css');
var navList = require('../common/nav-list/index.js')
var page = (function() {
	return {
		init: function() {
			this.onLoad();
		},
		onLoad:function(){
			navList.init({name:'help-center'});
		},
		bindEvent:function(){
			console.log('hangusohaui')
		}
	}
})();
page.init();