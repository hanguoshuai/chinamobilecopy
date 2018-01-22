require('./index.css');
var _mm = require('util/mm.js')
const templateIndex = require('./index.string')
var _user = require('service/user-service.js')
var navList = require('../common/nav-list/index.js')
var page = (function(){
	return {
		init:function(){
			this.onload();
			this.bindEvent();
			this.getData()
//			this.checkout();
//			this.test();
		},
		bindEvent:function(){
			$('.js-click').click(function(){
				$(this).parent().next().slideToggle();
				if($(this).hasClass('rotate')){
					$(this).removeClass('rotate').addClass('rotate1')
				}else{
					$(this).removeClass('rotate1').addClass('rotate')
				}
			})
			
		},
		onload:function(){
			navList.init({name:'resource-pool'})
		},
		
		checkout:function(){
//			console.log('1111')
			_user.checkLogin(function(){
				console.log('f')
			},function(){
				console.log('error')
				_mm.errorTips()
			});
		},
		//获取数据
		getData:function(){
			var _this = this;
			$.getJSON('resource-pool.json',function(res){
				if(res.status === 'SUCCESS'){
					var result = res.result;
					console.log(result)
//					因为觉得使用模板也并不怎么好用,所以还是选择拼接字符串
				var str = `<div class="title">测试详情</div>`
			+`<div class="header-title">`
				+`<span class="h-item">测试完成</span>`
				+`<span class="h-time-content">`+result.start_time+`--`+result.end_time+`</span>`
				+`<span class="h-time-title">测试时间</span>`
			+`</div>`;
				$('.box').html(str)
			//基本信息
			var message = `<div class="content">`
				+`<div class="content-header">`
					+`<span class="content-title">基本信息</span>`	
					+`<div class="css-click js-click">`
					+`</div>`
					+`<span class="content-time">12:29 2017.11.12</span>`
				+`</div>`
				+`<div class="content-content">`
					+`<li class="test-name">`
						+`<span class="key">测试名称</span>`
						+`<span class="test-name sky">需要从上一个页面传递过来参数</span>`
					+`</li>`
					+`<li class="test-Id">`
						+`<span class="key">测试ID</span>`
						+`<span class="test-Id sky">这个也需要从上一页传过来</span>`
					+`</li>`
					+`<li class="test-desc">`
						+`<span class="key">测试描述</span>`
						+`<span class="test-desc sky">`+result.task_describe+`</span>`
					+`</li>`
					+`<li class="user-name">`
						+`<span class="key">用户名称</span>`
						+`<span class="user-name sky">这个字段先不要</span>`
					+`</li>`
					+`<li class="test-time">`
						+`<span class="key">测试时间</span>`
						+`<span class="test-time sky">`+result.start_time+`-`+result.end_time+`</span>`
					+`</li>`
					+`<li class="test-status">`
						+`<span class="key">测试状态</span>`
						+`<span class="test-status sky">这个地方也需要上一页的参数</span>`
					+`</li>`
				+`</div>`
			+`</div>`
			$('.message-box').html(message)
			//业务机器列表
			var task_list = `<div class="content-header">`
					+`<span class="content-title">业务性能需求</span>`
					+`<div class="css-click js-click">`
					+`</div>`
				+`</div>`
				+`<div class="content-content">`
					+`<li class="resp-time">`
						+`<span class="key">响应时间</span>`
						+`<span class="test-status sky">`+result.response_time+`</span>`
					+`</li>`
					+`<li class="stand-perc">`
						+`<span class="key">达标比例</span>`
						+`<span class="test-status sky">`+result.response_time+`%</span>`
					+`</li>`
					+`<ul class="table-box">`
						+`<li class="table-header">`
							+`<span class="table_1_header fl"></span>`
							+`<span class="table_2 fl">CPU</span>`
							+`<span class="table_3 fl">内存</span>`
						+`</li>`
						+`<li>`
							+`<span class="table_1 fl">峰值采样数</span>`
							+`<span class="table_2 fl"><`+result.cpu_point+`</span>`
							+`<span class="table_3 fl"><`+result.mem_point+`</span>`
						+`</li>`
						+`<li>`
							+`<span class="table_1 fl">峰值利用率</span>`
							+`<span class="table_2 fl"><`+result.cpu_point_ratio+`%</span>`
							+`<span class="table_3 fl"><`+result.mem_point_ratio+`%</span>`
						+`</li>`
						+`<li>`
							+`<span class="table_1 fl">平均利用率</span>`
							+`<span class="table_2 fl"><`+result.cpu_avg_ratio+`</span>`
							+`<span class="table_3 fl"><`+result.mem_avg_ratio+`</span>`
						+`</li>`
					+`</ul>`
				+`</div>`
				$('.task-item').html(task_list)
				//服务器、业务列表
//				因为原先的数据获取过来是对象,但是对象是无序排列的,我就转化成了数组进行渲染
				var vm_list = result.vm_list;
				var arr = [];
				for( item in vm_list ){
					console.log(item)
					console.log(vm_list[item])
					arr.push(vm_list[item])
				}
				console.log(arr)
				for(var i=0;i<arr.length;i++){
					if(arr[i].status==='1'){
						arr[i].status_pic = 'success'
						arr[i].status_msg = '成功'
					}else if(arr[i].status==='0'){
						arr[i].status_pic = 'error'
						arr[i].status_msg = '失败'
						
					}else{
						arr[i].status_pic = 'waiting'
						arr[i].status_msg = '运行'
						
					}
				}
				console.log(arr)
				var arr_str = ''
				
				for(var i=0;i<arr.length;i++){
					arr_str+=`<li class="table-content">`
							+`<div class="service_table_1">`
								+`<i>`+i+`</i>`
							+`</div>`
							+`<div class="p-service-name">`
								+`<p class="p-name">`+arr[i].busi_name+`</p>`
								+`<p class="p-ID">暂时不写</p>`
							+`</div>`
							+`<div class="p-service-id">`+arr[i].ip+`</div>`
							+`<div class="p-service-status">`
								+`<span class="p-`+arr[i].status_pic+` p-content">`+arr[i].status_msg+`</span>`
							+`</div>`
						+`</li>`
				}
				$('.table-item').append(arr_str)
				}
			})
		},
		
	}
})();
page.init();