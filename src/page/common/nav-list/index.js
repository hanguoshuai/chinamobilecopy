require('./index.css');
var _mm = require('util/mm.js');
var templateIntex = require('./index.string');
var navList = {
	option:{
		name:'',
		list:[
			{name:'user-home',desc:'首页',href:'./index.html'},
			{name:'resource-pool',desc:'资源池',href:'./resource-pool.html'},
			{name:'task-center',desc:'任务中心',href:'./task-center.html'},
			{name:'help-center',desc:'帮助中心',href:'./help-center.html'},
			{name:'account-management',desc:'账户管理',href:'./account-management.html'},
		]
	},
	init:function(option){
		$.extend(this.option,option);
		this.renderHtml();
		return this;
	},
	renderHtml:function(){
		var iLength = this.option.list.length;
		console.log(iLength)
		for(var i=0;i<iLength;i++){
			if(this.option.list[i].name===this.option.name){
				this.option.list[i].isActive = true;
				console.log(this.option.list[i])
			}
		}
		var navHtml = _mm.renderHtml(templateIntex,{list:this.option.list})
		$('.nav-box').html(navHtml)
	}
}
module.exports = navList;
