require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var nav = {
	init: function() {
		this.bindEvent();
//		this.loadUserInfo();
//		this.test();
		return this;
	},
	bindEvent: function() {
		console.log('nav')
		//点击登录事件
		$('.js-login').click(function() {
			_mm.doLogin();
		});
		//点击注册事件
		$('.js-register').click(function() {
			window.location.href = './view/user-register.html'
		});
		//退出点击事件
		$('.js-logout').click(function() {
			_user.logout(function(res) {
				window.location.reload();
			}, function(errMsg) {
				_mm.errorTips(errMsg);
			})
		})
	},
	
	//加载用户信息
	loadUserInfo:function(){
		_user.checkLogin(
			function(res){
//				$('.not-login').hide().siblings('.login').show().find('.username').text('hahahha')
				console.log(res)
			},
			function(err){
			console.log('11没用用户登录状态')
		})
	}
}
module.exports = nav.init();