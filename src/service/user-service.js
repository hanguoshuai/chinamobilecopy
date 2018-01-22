var _mm = require('util/mm.js');
var _user =  {
	//登出
	logout : function(resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/user/logout.do'),
			method:'POST',
			success:resolve,
			error:reject
		})
	},
	//检查用户信息
	checkLogin:function(resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/shipping/select.do'),
			method:'get',
			success:resolve,
			error:reject
		})
		
	}
}
module.exports = _user;
