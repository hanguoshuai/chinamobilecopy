var conf = {
	serverHost : ' '
};
var Hogan = require('hogan.js');
var _mm = {
	request:function(param){
		var _this = this;
		$.ajax({
			type     : param.method || "get",
			url      : param.url    || " ",
			dataType : param.type   || 'json',
			data     : param.data   || ' ',
			async    : true,
			success  : function(res){
//				console.log(res)
				 // 请求成功
                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
//                 没有登录状态，需要强制登录
                else if(10 === res.status){
                    _this.doLogin();
                }
//                 请求数据错误
                else if(1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }
			},
			//与后台 服务器连接失败
			error    : function(err){
				typeof param.error === 'function' && param.error(err.stausText);
			}
		});
	},
	//获取后端的接口地址
	getServerUrl : function(path){
		return conf.serverHost + path;
	},
	//跳转会主页
	goHome : function(){
		wimdow.location.href = './index.html'
	},
	//重新登陆
	doLogin:function(){
		window.location.href = 'view/login.html?redirect='+window.location.href;
	},
	//获取url的参数
	getUrlParam : function(name){
		var reg = new RegExp('(^|&)'+ name + '=([^&]*)(&|$)');
		var result = window.location.search.substr(1).match(reg);
		return   result ? decodeURIComponent(result[2]) : null;
	},
	//渲染html模板
	renderHtml : function(htmlTemplate,data){
		var template = Hogan.compile(htmlTemplate),
		result = template.render(data);
		return result;
	},
	//成功提示
	successTips : function(msg){
		alert(msg||'操作成功')
	},
	//错误提示
	errorTips : function(msg){
		alert(msg||'后台服务器失踪了。。。。')
		window.location.href = '505.html?redirect='+window.location.href;
	},
	//字段的验证，支持非空，手机/邮箱的判断
	validate : function(value,type){
		var value = $.trim(value);
		//非空验证
		if(type === 'require'){
			return !!value;
		}
		//手机号验证
		if('phone' === type){
			return /^1\d{10}$/.test(value);
			
		}
		//邮箱的验证
		if('email' === type){
			return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
		}
		//任务名称验证
		if('task-name' === type){
			return /^([\u4e00-\u9fa5]|-|_|[a-z]|[A-Z]|[0-9]){4,30}$/.test(value)
		}
	}
}
module.exports = _mm;

