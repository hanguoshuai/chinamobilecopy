require('../common/nav-list/index.js')
require('./index.css')
var templateIndex = require('./index.string')
var _mm = require('util/mm.js')
var echarts = require('echarts');
var navList = require('../common/nav-list/index.js')
var page = (function() {
	return {
		init: function() {
			this.onload();
			this.bindEvent();
			this.renderEachEcharts();
			this.getData();
			this.getBusinessData();
		},
		onload: function() {
			navList.init({
				name: 'user-home'
			})
		},
		bindEvent: function() {
			var _this = this;
			//点击某一轮，显示相应的图表，并且显示中间层
			$('.lun').on('click', '.lun_item', function() {
				console.log($(this).attr('index'))
				$('.float-page').show()
				$('.model').show()
				var data = $(this).attr('index');
				//点击哪一轮，获取相应的数据
				_this.getEchartsData(data)
			})
			//点击模态框里的关闭按钮，关闭模态框
			$('.model').on('click', '.js-close', function() {
				$('.float-page').hide()
				$('.model').hide()
			})
			//点击下一页，切换页面
			var flag = 0;

			$('.next-one').click(function() {
				flag += 1;
				var len = $('.business-item').length;
				console.log(len)
				console.log('下一页')
				if(flag >= 0 && flag < len) {
					$('.business-item').eq(flag).css('opacity', 1).siblings('.business-item').css('opacity', 0)
					$('.business-item').eq(flag).css('zIndex',100).siblings('.business-item').css('zIndex',1)
				}
				if(flag === (len - 1)) {
					$('.next-one').css('background-color', '#e9e7ef')
					$('.next-one').attr('disabled', true)
				} else {
					$('.next-one').css('background-color', '#42645f')
					$('.next-one').attr('disabled', false)
				}
				if(flag <= 0) {
					$('.last-one').css('background-color', '#e9e7ef')
					$('.last-one').attr('disabled', true)
				} else {
					$('.last-one').css('background-color', '#42645f')
					$('.last-one').attr('disabled', false)
				}
				console.log($('.business').children('.business-item')[0])
			})
			//点击上一页，切换页面
			$('.last-one').click(function() {
				flag -= 1;
				var len = $('.business-item').length;
				console.log(len)
				console.log('下一页')
				if(flag >= 0 && flag < len) {
					$('.business-item').eq(flag).css('opacity', 1).siblings('.business-item').css('opacity', 0)
					$('.business-item').eq(flag).css('zIndex',100).siblings('.business-item').css('zIndex',1)
				
				}
				if(flag >= (len - 1)) {

					$('.next-one').css('background-color', '#e9e7ef');
					$('.next-one').attr('disabled', true);
				} else {
					$('.next-one').css('background-color', '#42645f');
					$('.next-one').attr('disabled', false);
				}
				if(flag <= 0) {
					$('.last-one').css('background-color', '#e9e7ef');
					$('.last-one').attr('disabled', true);
				} else {
					$('.last-one').css('background-color', '#42645f');
					$('.last-one').attr('disabled', false);
				}
				console.log($('.business').children('.business-item')[0])
			})

		},
		//获取278,279的数据
		getData: function() {
			var _this = this;
			//			所有业务分轮次资源优化足迹图表的数据--每轮的数据，假数据里边每轮有4个
			var all_arr = [];
			//			所有业务分轮次资源优化足迹图表的数据--业务的名称，假数据里边有两个
			var all_name = [];
			$.getJSON('278.json', function(res) {
				console.log(res)
				//当成功的时候对数据进行处理
				if(res.status === 'SUCCESS') {
					var result = res.result;
					console.log(result)
					//					因为是有很多轮,并且每一轮的数据都是分开的,所以要做多层的数组嵌套
					var cpu_list_arr = [];
					for(item in result) {
						var cpu_arr = [];
						var a = result[item].cpu_system.split(' ')
						var name = result[item].name
						var b = [];
						for(var i = 0; i < a.length; i++) {
							b.push(parseFloat(a[i]))
						}
						cpu_list_arr.push(b)
						var s = [];
						for(var i = 0; i < b.length; i++) {
							s.push(i)
						}
					}
					all_name.push(name)
					//console.log(cpu_list_arr)
					all_arr.push(cpu_list_arr)
					//如果看不懂，你可以打印出这两个参数，基本就能看懂了
					//					console.log(all_arr)
					//					console.log(all_name)
				}
			})
			$.getJSON('279.json', function(res) {
				console.log(res)
				if(res.status === 'SUCCESS') {
					var result = res.result;
					console.log(result)
					var cpu_list_arr = [];
					for(item in result) {
						var cpu_arr = [];
						var a = result[item].cpu_system.split(' ')
						var name = result[item].name
						var b = [];
						for(var i = 0; i < a.length; i++) {
							b.push(parseFloat(a[i]))
						}
						cpu_list_arr.push(b)
						var s = [];
						for(var i = 0; i < 100; i++) {
							s.push(i)
						}

					}
					all_name.push(name)
					//					console.log(all_name)
					//					console.log(cpu_list_arr)
					all_arr.push(cpu_list_arr)
					if(all_arr.length == 2) {
						var data = all_arr;
						console.log(all_arr)
						console.log(all_name)
						console.log(all_arr[0][0])
						//name获取到了，数据也获取到了，现在要把name跟数据循环进去
						//这个是根据事先做好的echarts图表进行处理的加1是为了不与例子重复
						var series1 = [];
						var yAxis1 = [];
						var xAxis1 = [];
						var grids1 = [];
						//循环产生series
						for(var i = 0; i < all_arr.length; i++) {
							for(var j = 0; j < all_arr[i].length; j++) {
								var obj = {};
								obj.smooth = true;
								obj.name = all_name[i];
								obj.type = 'line';
								obj.xAxisIndex = j;
								obj.yAxisIndex = j;
								obj.data = all_arr[i][j]
								series1.push(obj)
							}
						}
						//循环产生yAxis 跟 xAxis，grids
						var color = ['#f0fcff', '#e3f9fd', '#fffbf0', '#f3f9f1', '#c0ebd7', '#eedeb0', '#a1afc9', '#ffb3a7', '#70f3ff', '#3eede7'];
						var gridWidth = (80 / all_arr[0].length).toFixed(1);
						console.log(gridWidth);
						var str = '';
						var echartsId = '';
						for(var j = 0; j < all_arr[0].length; j++) {
							str += '<li class="lun_item" index=' + (j + 1) + '>第' + (j + 1) + '轮</li>'
							var yAxisObj = {
								type: 'value',
								max: 7,

								axisLabel: {
									formatter: '{value} %'
								}
							};
							if(j == 0) {
								yAxisObj.name = '利用率'
							}
							yAxisObj.gridIndex = j;
							var xAxisObj = {
								type: 'category',
								boundaryGap: false,
								data: 100,
								nameTextStyle: {
									color: '#fff'
								},
								axisLabel: {
									show: false
								}
							}
							xAxisObj.gridIndex = j;
							var gridObj = {};
							var a = (gridWidth * j * 1 + 5) + '%';
							console.log(a)
							gridObj.x = a;
							gridObj.y = "15%";
							gridObj.width = gridWidth + '%';
							gridObj.height = '78%';
							gridObj.show = true;
							gridObj.backgroundColor = color[j];
							yAxis1.push(yAxisObj)
							xAxis1.push(xAxisObj)
							grids1.push(gridObj)
							//for循环生成多个canvas图表
							echartsId += '<div class="model-item" id="main' + (j + 1) + ' " style="height: 300px;width:1000px;">第' + (j + 1) + '轮</div>'

						}
						console.log(str)
						$('.lun').html(str)
						//将图表放入model中
						//$('.echarts-content').html(echartsId)
						console.log(series1)
						console.log(yAxis1)
						console.log(xAxis1)
						console.log(grids1)
						var series = [{
								smooth: true,
								name: 'I',
								type: 'line',
								xAxisIndex: 0,
								yAxisIndex: 0,
								data: data[0][0],
							},
							{
								smooth: true,
								name: 'I',
								type: 'line',
								xAxisIndex: 1,
								yAxisIndex: 1,
								data: data[0][1],

							},
							{
								smooth: true,
								name: 'I',
								type: 'line',
								xAxisIndex: 2,
								yAxisIndex: 2,
								data: data[0][2],

							},
							{
								smooth: true,
								name: 'I',
								type: 'line',
								xAxisIndex: 3,
								yAxisIndex: 3,
								data: data[0][3],

							},

							{
								smooth: true,
								name: 'II',
								type: 'line',
								xAxisIndex: 0,
								yAxisIndex: 0,
								data: data[1][0],
							},
							{
								smooth: true,
								name: 'II',
								type: 'line',
								xAxisIndex: 1,
								yAxisIndex: 1,
								data: data[1][1],
							},
							{
								smooth: true,
								name: 'II',
								type: 'line',
								xAxisIndex: 2,
								yAxisIndex: 2,
								data: data[1][2],
							},
							{
								smooth: true,
								name: 'II',
								type: 'line',
								xAxisIndex: 3,
								yAxisIndex: 3,
								data: data[1][3],
							},

						];
						var grids = [{
								x: '5%',
								y: '10%',
								width: '20%',
								height: '90%',
								show: true,
								backgroundColor: '#f0fcff'
							},
							{
								x: '25%',
								y: '10%',
								width: '20%',
								height: '38%',
								show: true,
								backgroundColor: '#e3f9fd'
							},
							{
								x: '45%',
								y: '10%',
								width: '20%',
								height: '38%',
								show: true,
								backgroundColor: '#fffbf0'
							},
							{
								x: '65%',
								y: '10%',
								width: '20%',
								height: '38%',
								show: true,
								backgroundColor: '#f3f9f1'
							}
						];
						var yAxis = [{
								gridIndex: 0,
								type: 'value',
								max: 7,
								name: '利用率',
								axisLabel: {
									formatter: '{value} %'
								}
							},
							{
								gridIndex: 1,
								max: 7,
								type: 'value',
								axisLabel: {
									//							show:false,
									formatter: '{value} %'
								}
							},
							{
								gridIndex: 2,
								max: 7,
								type: 'value',
								axisLabel: {
									//							show:false,
									formatter: '{value} %'
								}
							},
							{
								gridIndex: 3,
								max: 7,
								type: 'value',
								axisLabel: {
									//							show:false,
									formatter: '{value} %'
								}
							}
						];
						var time = 100;
						var xAxis = [{
								gridIndex: 0,

								type: 'category',
								boundaryGap: false,
								data: time,
								nameTextStyle: {
									color: '#fff'
								},
								axisLabel: {
									show: false
								}
							},
							//      {gridIndex: 1, min: 0, max: 20},
							{
								gridIndex: 1,
								type: 'category',
								boundaryGap: false,
								data: time,
								axisLabel: {
									show: false
								}
							},
							{
								gridIndex: 2,
								type: 'category',
								boundaryGap: false,
								data: time,
								axisLabel: {
									show: false
								}
							},
							{
								gridIndex: 3,
								type: 'category',
								boundaryGap: false,
								data: time,
								axisLabel: {
									show: false
								}
							}
						];
						_this.renderEcharts(all_arr, series1, all_name, grids1, yAxis1, xAxis1)
					}
					//					
					console.log(all_arr)
				}
			})
		},
		//对数组去平均值，最小值，最大值
		avgData: function(data) {
			var sum = 0;
			for(var i = 0; i < data.length; i++) {
				sum += data[i]
				console.log(sum)
			}
			sum = (sum / data.length).toFixed(2)
			return sum
		},
		//渲染每一轮echarts图表之前先获取数据
		getEchartsData: function(data) {
			var _this = this;
			$.getJSON('round' + data + '.json', function(res) {
				console.log(res)
				var result = res.result
				var result_arr = [];
				var result_name = [];
				for(var item in result) {
					var arr_string = result[item].cpu_user.split(' ');
					var arr_arr = [];
					var name = result[item].name;
					result_name.push(name)
					for(var j = 0; j < arr_string.length; j++) {
						arr_arr.push(parseFloat(arr_string[j]))

					}
					result_arr.push(arr_arr)
				}
				console.log(result_arr)
				console.log(result_name)
				var data1 = data;
				var arr_x = [];
				for(var i = 0; i < 100; i++) {
					arr_x.push(i)
				}
				var series = [];
				for(var j = 0; j < result_arr.length; j++) {
					var series_obj = {
						smooth: true,
						type: 'line',
						markPoint: {
							data: [{
								name: '最低',
								value: -2,
								xAxis: 1,
								yAxis: -1.5
							}]
						},
						markLine: {
							data: [{
									type: 'average',
									name: '平均值'
								},
								[{
									symbol: 'none',
									x: '90%',
									yAxis: 'max'
								}, {
									symbol: 'circle',
									label: {
										normal: {
											position: 'start',
											formatter: '最大值'
										}
									},
									type: 'max',
									name: '最高点'
								}]
							]
						}
					};
					series_obj.name = result_name[j];
					series_obj.data = result_arr[j]
					series.push(series_obj)
				}
				console.log(series)

				_this.renderEachEcharts(data1, result_name, arr_x, series)
			})
		},
		//渲染每一轮的echarts图表
		renderEachEcharts: function(data, name, length, series) {
			var id = 'main' + data;
			console.log(id)
			$('.lunci').attr('id', id)
			var myChart = echarts.init(document.getElementById(id));
			var option = {
				title: {
					text: '资源利用率曲线第' + data + '轮',
					//					subtext: '纯属虚构'
				},
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: name
				},
				toolbox: {
					show: true,
					feature: {
						dataZoom: {
							yAxisIndex: 'none'
						},
						dataView: {
							readOnly: false
						},
						magicType: {
							type: ['line', 'bar']
						},
						restore: {},
						saveAsImage: {}
					}
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: length
				},
				yAxis: {
					type: 'value',
					axisLabel: {
						formatter: '{value} %'
					}
				},
				series: series
			};

			myChart.setOption(option);
		},

		//数组中的最小值
		minData: function(data) {
			return Math.min.apply(this, data);

		},
		//数组中的最大值
		maxData: function(data) {

			return Math.max.apply(this, data);
		},
		//数组中的平均值
		avgData:function(data){
			var str=0;
			var len = data.length;
			for(var i=0;i<data.length;i++){
				str+=parseFloat(data[i]);
			}
			console.log(str)
			var avg = (str/len).toFixed(2)
			return Number(avg)
		},

		renderEcharts: function(data, series, name, grid, yAxis, xAxis) {
			// 基于准备好的dom，初始化echarts实例
			var myChart = echarts.init(document.getElementById('main'));
			// 绘制图表
			var option = {
				title: {
					text: '资源利用率曲线图',
					x: 'center',
					y: 0
				},
				grid: grid,
				tooltip: {
					formatter: 'Group {a}: ({c})'
				},
				legend: {
					bottom: 0,
					data: name
				},
				xAxis: xAxis,
				yAxis: yAxis,
				series: series

			};

			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
		},
		//业务系统性能与虚拟机规格echarts图表
		getBusinessData: function() {
			var _this = this;
			//假设有两个数据，278,279
			var data = [278, 279];
			
			for(var i = 0; i < data.length; i++) {
				(function(i) {
					$.getJSON(data[i] + '.json', function(res) {
						console.log(res)
						var res = res;
						var result = res.result;
						console.log(i)
						console.log(data[i])
						//通过一个for循环，将result里边的对象进行多次循环，获取数据
						//这个是为了获取到一个数组，用于echarts图表中的lengend
						var lengendData = [];
						//这一个是为了获取cpu_user的数据
						var cpuUserData = [];
						//这是为了获取mem的使用情况的数据
						var memUserData = [];
						//这是为了获取mem的总共大小的数据
						var memTotalData = [];
						//获取虚拟机规格跟资源利用率的数据cpu mem
						var virData = [];
						var virCpu = [];
						var virMem = [];
						for(var item in result){
							console.log(result[item])
							var obj={};
							virCpu.push(result[item].cpu);
							virMem.push(result[item].mem);
							obj.cpu = result[item].cpu;
							obj.mem = result[item].mem;
							obj.name = result[item].name;
							virData.push(obj)
							lengendData.push('第'+result[item].round+'轮  '+result[item].cpu+' '+result[item].mem) 
							cpuUserData.push(result[item].cpu_user.split(' '))
							memUserData.push(result[item].mem_used.split(' '))
							memTotalData.push(result[item].mem_total.split(' '))
						}
						console.log('虚拟机规格',virCpu)
						console.log('虚拟机啊规格',virMem)
						console.log(lengendData)
						//对lengendData进行处理，添加第几轮
						
						console.log(cpuUserData)
						console.log(memUserData)
						console.log(memTotalData)
						var memUserDataA = [];
						for(var b=0;b<memUserData.length;b++){
							var  arr = [];
							for(var c=0;c<memUserData[b].length;c++){
								arr.push(parseFloat(memUserData[b][c]))
							}
							memUserDataA.push(arr)
						}
						console.log('memUserDataA',memUserDataA)
						var memTotalDataA=[];
						for(var b=0;b<memTotalData.length;b++){
							var  arr = [];
							for(var c=0;c<memTotalData[b].length;c++){
								arr.push(parseFloat(memTotalData[b][c]))
							}
							memTotalDataA.push(arr)
						}
						console.log('meTotalData',memTotalDataA)
						//使用mem使用的大小除以mem总共的大小，（注：这后台给的数据太坑爹了，直接给个计算完成的值不就行了吗？唉，都懒得骂她）
						var memResult = [];
						for(var d=0;d<memTotalDataA.length;d++){
							var arr = [];
							for(var e =0;e<memTotalDataA[d].length;e++){
							
								arr.push((memUserDataA[d][e]/memTotalDataA[d][e]).toFixed(3)*100)
							}
							memResult.push(arr)
						}
						
						console.log('memResult',memResult)
						//表格中需要是用的tableData数据
						var tableData = [];
						//资源利用率表格中的数据--cpu--avg
						var cpuAvgData = [];
						//资源利用率表格中的数据--cpu--max
						var cpuMaxData = [];
						//资源利用率表格中的数据--mem--avg
						var memAvgData = [];
						//资源利用率表格中的数据--mem--max
						var memMaxData = [];
						for(var f=0;f<memResult.length;f++){
							var obj = {};
							cpuAvgData.push(_this.avgData(cpuUserData[f]))
							cpuMaxData.push(_this.maxData(cpuUserData[f]))
							memAvgData.push(_this.avgData(memResult[f]))
							memMaxData.push(_this.maxData(memResult[f]))
							obj.cpuAvg = _this.avgData(cpuUserData[f])
							obj.cpuMax = _this.maxData(cpuUserData[f])
							obj.memAvg =  _this.avgData(memResult[f]);
							obj.memMax = _this.maxData(memResult[f]);
							
							tableData.push(obj)
								
							
						}
						//memAVG是所有轮次的平均值
						console.log('memAvg',tableData)
						console.log('shuju',cpuAvgData,cpuMaxData,memAvgData,memMaxData)
						//开始渲染 cpu echarts图表使用的数据
						var series3 = [];
						for(var s=0;s<lengendData.length;s++){
							var obj = {};
							obj.name=lengendData[s];
							obj.type = 'line';
							obj.data = cpuUserData[s]
							series3.push(obj)
						}
						console.log(series3)
						var aData = [];
						for(var a =0;a<cpuUserData[0].length;a++){
							aData.push(a)
						}
						console.log('adata',aData)

						//开始渲染mem echarts 图表使用的数据
						var series4 = [];
						for(var s=0;s<lengendData.length;s++){
							var obj = {};
							obj.name=lengendData[s];
							obj.type = 'line';
							obj.data = memResult[s]
							series4.push(obj)
						}
						//总共有多少轮
						var dataLen = lengendData.length;
						console.log(series4)
						var memData = [];
						for(var a =0;a<memResult[0].length;a++){
							memData.push(a)
						}
						console.log('hgs',memData)
						//往渲染页面上进行传参
						_this.renderBusinessItem(dataLen,data[i],series3,lengendData,aData,series4,memData,virCpu,virMem,cpuAvgData,cpuMaxData,memAvgData,memMaxData)
						

						
					})
				})(i)
			}

		},
		//渲染业务系统性能与虚拟机规格echarts图表
		renderBusinessEcharts: function(text,id,series,lengendData,Data) {
			console.log(id)
			console.log(series)
			console.log('1',Data)
			var myChart = echarts.init(document.getElementById(id));

			var option = {
				title: {
					text: text
				},
				tooltip: {
					trigger: 'axis',
					backgroundColor: '#88ada6',
					formatter: function(params) {
						var res = '<div>实际响应时间</div><br/><div ><span class="title-echarts">轮次</span><span class="title-echarts1">响应时间</span></div>'
						for(var item in params) {
							res += '<div><span class="title-echarts"><span class="line" style="background:'+params[item].color+';"></span>'+params[item].seriesName+'</span><span class="title-echarts1">' + params[item].data + 'ms</span></div>'
						}
						return res;
					}
				},
				legend: {
					orient :'vertical',
					right:10,
					top:30,
					data: lengendData
				},
				grid: {
					left: '3%',
					right: '14%',
					bottom: '3%',
					containLabel: true
				},
				toolbox: {
					feature: {
						saveAsImage: {},
						restore :{},
						dataView :{},
					}
				},
				xAxis: {
					type: 'category',
					data: Data
				},
				yAxis: {
					type: 'value',
					axisLabel: {
						formatter: '{value} %'
					}
				},
				series:series
			};

			myChart.setOption(option);
		},
		//渲染整个页面的框架（切换部分）
		renderBusinessItem: function(len,name,series3,lengendData,aData,series4,memData,virCpu,virMem,cpuAvgData,cpuMaxData,memAvgData,memMaxData) {
			var _this = this;
			var series3 = series3;
			var lengendData= lengendData;
			var series4 =series4;
			var memData = memData;
			var aData = aData;
			var virCpu= virCpu;
			var virMem = virMem;
			var cpuAvgData = cpuAvgData;
			var cpuMaxData = cpuMaxData;
			var memAvgData = memAvgData;
			var memMaxData = memMaxData;
			//对虚拟机规格表格进行渲染
			var virStr = `<span class="v-time">CPU/核</span><span class="v-1  gray-qian">`+virCpu[0]+`</span>`;
			var virHeader = '<span class="v-time">轮次</span><span class="v-1">原始</span>';
			var virMemStr = `<span class="v-time">内存/G</span><span class="v-1  gray-qian">`+virMem[0]+`</span>`;
			
			for(var t =0;t<virCpu.length;t++){
				virHeader+=`<span class="v-1 ">第`+(t+1)+`轮</span>`
				virStr += `<span class="v-1 ">`+virCpu[t]+`</span>`
				virMemStr+=`<span class="v-1 ">`+virMem[t]+`</span>`
			}
			console.log('virHeader',virHeader)
			console.log('virStr',virStr)
//			$('.vir-str').html(virHeader)
//			$('.vir-cpu').html(virStr)
			//资源利用率表格进行渲染
			var cpuHStr='<span class="res-time ">轮次</span>';
			var cpuAvgStr = '';
			var cpuMaxStr = '';
			var memAvgStr = '';
			var memMaxStr = '';
			for(var t=0;t<cpuAvgData.length;t++){
				cpuHStr+=`<span class="res-1 ">第`+(t+1)+`轮</span>`
				cpuAvgStr+=`<span>`+cpuAvgData[t]+`</span>`;
				cpuMaxStr+=`<span>`+cpuMaxData[t]+`</span>`;
				memAvgStr+=`<span>`+memAvgData[t]+`</span>`;
				memMaxStr+=`<span>`+memMaxData[t]+`</span>`;
			}
			console.log('cpuAvgStr1',cpuAvgData)
			console.log('cpuAvgStr',cpuAvgStr)
			var str = '';
			str += `<div class="business-item">` +
				`<div class="resource gray-qian">业务系统性能与虚拟机规格关系图</div>` +
				`<div class="echarts1" id="business` + name + `" style="height: 300px;width:1000px;"></div>` +
				`<div class="echarts1" id="mem` + name + `" style="height: 300px;width:1000px;"></div>` +
				`<div class="task-info">` +
				`<p class="t-header">结果说明</p>` +
				`<div class="task-content">` +
				`对业务系统进行了<span class="lun-style">`+  len  +`</span>轮压力测试，第<span class="lun-style">`+  len  +`</span>轮可满足CPU和内存的峰值采样、峰值利用率、平均利用率等上限要求，为增加系统弹性能力，我们<span class="lun-style">推荐使用</span>第<span class="lun-style">`+  (len-1)  +`</span>轮推荐配置` +
				`</div>` +
				`</div>` +
				`<div class="task-title1">` + name + `</div>` +
				`<div class="z-header">` +
				`<div class="z-header-number fl">A</div>` +
				`<div class="fl z-header-content">`+name+`</div>`+
				`</div>`+
				`<div class="z-box">`+
						`<div class="virt ">`+
							`虚拟机规格足迹`+
						`</div>`+
						`<ul class="virt-box ">`+
							`<div class="v-header vir-str">`+virHeader+`</div>`+
							`<li class="h-content vir-cpu">`+virStr+`</li>`+
							`<li class="h-content vir-mem">`+virMemStr+`</li>`+
						`</ul>`+
							`</div>`+
						`</ul>`+
						`<div class="virt ">`+
							`资源利用率`+
						`</div>`+
						`<ul class="res">`+
							`<div class="res-header ">`+cpuHStr+`</div>`+
							`<div class="res-content gray-qian">`+
								`<div class="res-c-header fl">CPU</div>`+
								`<div class="res-c-title fl">`+
									`<div class="cpu-avg">AVG</div>`+
									`<div class="cpu-max">MAX</div>`+
								`</div>`+
								`<ul class="res-c-content fl">`+
									`<li class="cpu-avg-content lan">`+cpuAvgStr+`</li>`+
									`<li class="cpu-avg-content">`+cpuMaxStr+`</li></ul>`+
							`</div>`+
							`<div class="res-content gray-qian">`+
								`<div class="res-c-header fl">内存</div>`+
								`<div class="res-c-title fl">`+
									`<div class="cpu-avg">AVG</div>`+
									`<div class="cpu-max">MAX</div>`+
								`</div>`+
								`<ul class="res-c-content fl">`+
									`<li class="cpu-avg-content lan">`+memAvgStr+`</li>`+
									`<li class="cpu-avg-content">`+memMaxStr+`</li>`+
								`</ul>`+
							`</div>`+
						`</ul>`+
					`</div>`
			$('.business').append(str)
			$('.business-item').eq(0).css('opacity', 1).siblings('.business-item').css('opacity', 0)
			//对echarts进行渲染--cpu
			_this.renderBusinessEcharts('cpu','business' + name,series3,lengendData,aData)
			//对echarts进行渲染--mem
			_this.renderBusinessEcharts('mem','mem'+name,series4,lengendData,memData)
			
		},
		

		
	}
})();
page.init();