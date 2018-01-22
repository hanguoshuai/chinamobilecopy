require('../common/nav-list/index.js')
require('./index.css')

var _mm = require('util/mm.js')
var echarts = require('echarts');
var navList = require('../common/nav-list/index.js')

var page = (function() {

	return {
		init: function() {
			this.onload();
			

		},
		onload: function() {
			navList.init({
				name: 'user-home'
			})
		},
		
	}
})();
page.init();