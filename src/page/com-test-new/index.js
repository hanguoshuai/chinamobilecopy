require('../common/nav-list/index.js')
require('./index.css')

var _mm = require('util/mm.js')
var echarts = require('echarts');
var navList = require('../common/nav-list/index.js')
//判断名称的正则
var regExp = new RegExp('^([\u4e00-\u9fa5]|-|_|[a-z]|[A-Z]|[0-9]){4,30}$');
//判断只能为大于零的数字的表达式
var regExp_num = /^[0-9]*$/;
//3-20位数字字母或文字
var regExp_name = /^[0-9a-zA-Z\u4e00-\u9fa5]{3,20}$/
//验证ip地址
var regExp_ip = /^(?:(?:2[0-4][0-9]\.)|(?:25[0-5]\.)|(?:1[0-9][0-9]\.)|(?:[1-9][0-9]\.)|(?:[0-9]\.)){3}(?:(?:2[0-5][0-5])|(?:25[0-5])|(?:1[0-9][0-9])|(?:[1-9][0-9])|(?:[0-9]))$/
var flag = 0;
var page = (function() {

	return {
		init: function() {
			this.onload();
			this.bindEvent();

		},
		onload: function() {
			navList.init({
				name: 'user-home'
			})
		},
		bindEvent: function() {
			var _this = this;
			//点击之后收缩盒子
			$('.js-click').click(function() {
				$(this).parent().next().slideToggle();
				if($(this).hasClass('rotate')) {
					$(this).removeClass('rotate').addClass('rotate1')
				} else {
					$(this).removeClass('rotate1').addClass('rotate')
				}
			})
			//点击之后新建一个系统性能基本要求
			$(".js-add").click(function() {
				var html = `<div class="content-content " style="border: 1px solid #ccc;">` +
					`<div  class="css-del js-del">删除</div><div class="box">` +
					`<lable class='task_name '>业务名称<i style="color: red;">*</i></i></lable>` +
					`<input class="shuru yewu_name" type="text" placeholder="请输入3-20位字母、数字或文字 " />` +
					`<span class="error_msg"></span>` +
					`</div>` +
					`<div class="box">` +
					`<lable class='task_name'>脚本路径` +
					`</lable>` +
					`<input class="shuru jiaoben_path" type="text" placeholder="请输入4-30位字母、数字、文字、_ 或 - " />` +
					`<span class="error_msg"></span>` +
					`</div>` +
					`<div class="box">` +
					`<lable class='task_name'>ip地址<i style="color: red;">*</i></i>` +
					`</lable>` +
					`<input class="shuru ip_address" type="text" placeholder="例192.168.1.138 " />` +
					`<span class="error_msg"></span>` +
					`</div>` +
					`<div class="box">` +
					`<lable class='task_name'>用户名<i style="color: red;">*</i></i>` +
					`</lable>` +
					`<input class="shuru user_name" type="text" placeholder="请输入3-20位字母、数字或文字 " />` +
					`<span class="error_msg"></span>` +
					`</div>` +
					`<div class="box">` +
					`<lable class='task_name'>业务名称<i style="color: red;">*</i></i>` +
					`</lable>` +
					`<input class="shuru user_password" type="text" placeholder="请输入密码 " />` +
					`<span class="error_msg"></span>` +
					`</div>` +
					`</div>`
				$('.add_box').append(html)
			})
			//点击取消按钮返回原来的页面
			$('.quit').click(function() {
				window.location.href = './com-test.html'
			})
			//新建之后点击删除按钮删除当前的框
			$('.add_box').on('click', '.js-del', function() {
				console.log($(this))
				$(this).parent('.content-content').remove();
			})
			//点击确定，提交表单
			$('.js-submit').click(function() {
				flag = 0
				_this.submit();
				_this.makeSureName();
				if(flag == 0) {
					console.log('通过可以进行测试了')
				}
			})

		},
		//提交表单
		submit: function() {
			var _this = this;
			var formData = {
				task_name: $.trim($('#task_name').val()),
				task_describe: $.trim($('#task_describe ').val()),
				cloud_id: $.trim($('#cloud_id').val()),
				status: 0,
				test_type: 'com',
				concurrence: $.trim($('#concurrence').val()),
				response_time: $.trim($('#response_time').val()),
				response_ratio: $.trim($('#response_ratio').val()),
				cpu_point: $.trim($('#cpu_point').val()),
				cpu_point_ratio: $.trim($('#cpu_point_ratio').val()),
				cpu_avg_ratio: $.trim($('#cpu_avg_ratio').val()),
				mem_point: $.trim($('#mem_point').val()),
				mem_point_ratio: $.trim($('#mem_point').val()),
				mem_avg_ratio: $.trim($('#mem_avg_ratio').val())
			}
			//			_this.formValidate(formData)
			_this.formValidate(formData, regExp, 'task_name')
			_this.formValidate(formData, regExp_num, 'concurrence')
			_this.formValidate(formData, regExp_num, 'response_time')
			_this.formValidate(formData, regExp_num, 'cpu_point')
			_this.formValidate(formData, regExp_num, 'cpu_point_ratio')
			_this.formValidate(formData, regExp_num, 'cpu_avg_ratio')
			_this.formValidate(formData, regExp_num, 'mem_point')
			_this.formValidate(formData, regExp_num, 'mem_point_ratio')
			_this.formValidate(formData, regExp_num, 'mem_avg_ratio')
			console.log(flag)
		},

		//判断的方法
		formValidate: function(formData, reg, name) {

			if(formData[name] === '') {

				$('#' + name).next().text('名称不能为空')
				$('#' + name).next().removeClass('color_lv').addClass('red')
				flag += 1
				console.log(flag)

			} else if(reg.test(formData[name])) {
				$('#' + name).next().text('正确')
				$('#' + name).next().removeClass('red').addClass('color_lv')
				flag += 0
				console.log(flag)

			} else {
				console.log('输入错误')
				$('#' + name).next().text('输入格式错误')
				$('#' + name).next().removeClass('color_lv').addClass('red')
				flag += 1

				console.log(flag)

			}
		},
		//系统性能基本要求的ID名的循环
		makeSureName: function() {
			var a = [];
			var arr = []
			$('.yewu_name').each(function() {
				if($(this).val() === '') {
					$(this).next().text('不能为空')
					$(this).next().removeClass('color_lv').addClass('red')
					flag += 1
					console.log(flag)
				} else if(regExp_name.test($(this).val())) {
					$(this).next().text('正确')
					$(this).next().removeClass('red').addClass('color_lv')
				} else {
					$(this).next().text('输入格式错误')
					$(this).next().removeClass('color_lv').addClass('red')
					flag += 1
					console.log(flag)
				}
				arr.push($(this).val())
			})
			a.push(arr)
			var arr_shell_path = [];
			$('.jiaoben_path').each(function() {
				arr_shell_path.push($(this).val())
			})
			a.push(arr_shell_path)
			//ip
			var arr_ip = [];
			$('.ip_address').each(function() {
				if($(this).val() === '') {
					$(this).next().text('不能为空')
					$(this).next().removeClass('color_lv').addClass('red')
					flag += 1
					console.log(flag)
					console.log($(this).val())
				} else if(regExp_ip.test($(this).val())) {
					console.log($(this).val())
					$(this).next().text('正确')
					$(this).next().removeClass('red').addClass('color_lv')
				} else {
					console.log($(this).val())
					$(this).next().text('输入格式错误')
					$(this).next().removeClass('color_lv').addClass('red')
					flag += 1
					console.log(flag)
				}
				arr_ip.push($(this).val())
			})
			a.push(arr_ip)
			//用户名
			var arr_user_name = [];
			$('.user_name').each(function() {
				if($(this).val() === '') {
					$(this).next().text('不能为空')
					$(this).next().removeClass('color_lv').addClass('red')
					flag += 1
					console.log(flag)
				} else if(regExp_name.test($(this).val())) {
					$(this).next().text('正确')
					$(this).next().removeClass('red').addClass('color_lv')
				} else {
					$(this).next().text('输入格式错误')
					$(this).next().removeClass('color_lv').addClass('red')
					flag += 1
					console.log(flag)
				}
				arr_user_name.push($(this).val())
			})
			a.push(arr_user_name)
			//密码
			var arr_user_password = [];
			$('.user_password').each(function() {
				if($(this).val() === '') {
					$(this).next().text('不能为空')
					$(this).next().removeClass('color_lv').addClass('red')
					flag += 1
					console.log(flag)
				} else {
					$(this).next().text('正确')
					$(this).next().removeClass('red').addClass('color_lv')

				}
				arr_user_password.push($(this).val())
			})
			a.push(arr_user_password)
			//
			var b = [];
			for(var i = 0; i < a[0].length; i++) {
				var obj = {};
				obj.name = a[0][i]
				obj.shell_path = a[1][i]
				obj.ip = a[2][i]
				obj.vm_user = a[3][i]
				obj.vm_pwd = a[4][i]
				b.push(obj)
			}
			//			console.log(b)
		},
		//模态框
		model:function(){
//			需要写模态框
		}
	}
})();
page.init();