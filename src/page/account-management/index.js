require('../common/nav-list/index.js')
require('./index.css')
var templateIndex = require('./index.string')
var _mm = require('util/mm.js')
var echarts = require('echarts');
var navList = require('../common/nav-list/index.js')
var page = (function(){
	
	return {
		slider:{
			list : [ 
			{name : 'Rosen'}, 
			{name : 'JIM'} ,
			{name : 'Rosen1'}, 
			{name : 'JIM1'} 
		]
		},
		init:function(){
			this.onload();
			this.renderTask();
			this.bindEvent();
			this.renderEcharts('Rosen');
			this.renderEcharts('JIM');
			this.renderEcharts('Rosen1');
			this.renderEcharts('JIM1');
		},
		onload:function(){
			navList.init({name:'account-management'})
		},
		bindEvent:function(){
			var _this= this;
			var index = 0;
			var len = _this.slider.list.length;
			console.log(len)
			$('.last-one').css('background','#ccc')
			$($('.click-change')[0]).addClass('a').siblings().removeClass('a')
			$('.next-one').click(function(){
				//判断一下是否还能继续点击
				if((len-1)>index>0){
					index++;
					if(index===(len-1)){
					$(this).css('background','#ccc')
				}
				console.log(index)
					$('.last-one').css('background','#42645f')
			$($('.click-change')[index]).addClass('a').siblings().removeClass('a')
//				_this.renderEcharts(_this.slider.list[index])
				}
			})
			$('.last-one').click(function(){
				if(index>0){
					index--;
//				_this.renderEcharts(_this.slider.list[index])
					
					$($('.click-change')[index]).addClass('a').siblings().removeClass('a')
					$('.next-one').css('background','#42645f')
					if(index==0){
						$(this).css('background','red')
					}
				}
			})
		},
		renderTask:function(){
			var ss = _mm.renderHtml(templateIndex,this.slider)
			$('.box').html(ss)
		},
		renderEcharts:function(name){
			// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById(name));
// 绘制图表
myChart.setOption({
    title: {
        text: 'ECharts 入门示例'+name
    },
    tooltip: {},
    xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
});
		}
	}
})();
page.init();