require('../common/nav-list/index.js')
require('./index.css')

const templateIndex = require('./index.string')
var _mm = require('util/mm.js')
var echarts = require('echarts');
var navList = require('../common/nav-list/index.js')
var page = (function() {

	return {
		data:{
			
		},
		init: function() {
			this.onload();

			this.getListData();
			this.renderTask();
			this.bindEvent();
			
		},
		onload: function() {
			navList.init({
				name: 'user-home'
			})
		},
		bindEvent: function() {
			
		},
		getListData: function() {
			var _this =this;
			$.getJSON('index.json',function(res){
//				console.log(res)
				_this.data = res
				console.log(_this.data)
				var result_arr = [];
				if(_this.data.status === 'SUCCESS'){
					const result = _this.data.result
					const task_list = result.task_list
					console.log(task_list)
					//因为对象是无序的，所以改成列表类型的有序的
					for(var key in task_list){
						result_arr.push(task_list[key])
					}
					console.log(result_arr)
					//因为要显示测试开始等内容，但是使用的是hogan模板，没有判断，所以只能修改数据了
					for(var i=0;i<result_arr.length;i++){
						console.log(result_arr[i].status)
						if(result_arr[i].status === "0"){
							result_arr[i].status_desc = '测试开始（中）'
						}else if(result_arr[i].status === "1"){
							result_arr[i].status_desc = '测试结束'
						}else if(result_arr[i].status === "1"){
							result_arr[i].status_desc = '测试异常'
						}else if(result_arr[i].status === "5"){
							result_arr[i].status_desc = '接受推荐'
						}
					}
					_this.data.result_arr = result_arr;
					console.log(_this.data)
					_this.renderTask(_this.data);
					
				}
				
			})
		},
		renderTask:function(data){
//			console.log(data)
			var ss = _mm.renderHtml(templateIndex,data)
			$('.com-content').html(ss)
		},

	}
})();
page.init();