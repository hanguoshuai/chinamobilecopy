require('./index.css');

var templateIndex = require('./index.string')
var navList = require('../common/nav-list/index.js')
var page = (function(){
	return {
		init:function(){
			this.onload();
			this.getAllData();
		},
		onload:function(){
			navList.init({name:'help-center'})
		},
		//获取数据
		getAllData:function(){
			var _this = this;
			var data = [278,279];
			var title = ['A','B','C','D','E','F','G'];
			for(var i=0;i<data.length;i++){
				_this.getData(data[i],title[i])
			}
		},
		//获取数据
		getData:function(id,title){
			var _this = this;
			var title = title;
			$.getJSON(id+'.json',function(data){
				console.log('data',data)
				var virCpuData = [];
				var virMemData = [];
				var cpuAvgData = [];
				var cpuMaxData = [];
				var memUserData = [];
				var memTotalData = [];
				var memResultData = [];
				var memAvgData = [];
				var memMaxData = [];
				var name;
				var result = data.result;
				for(var item in result ){
					
					virCpuData.push(result[item].cpu)
					virMemData.push(result[item].mem)
					name = result[item].name
					cpuAvgData.push(_this.avgData(result[item].cpu_user.split(' ')))
					cpuMaxData.push(_this.maxData(result[item].cpu_user.split(' ')))
					memUserData.push(result[item].mem_used.split(' '))
					memTotalData.push(result[item].mem_total.split(' '))
				}
				console.log('virCpuData',virCpuData)
				console.log('virMemData',virMemData)
				console.log('name',name)
				console.log('cpuAvgData',cpuAvgData)
				console.log('cpuMaxData',cpuMaxData)
				console.log('memUserData',memUserData)
				console.log('memTotalData',memTotalData)
				for(var j=0;j<memUserData.length;j++){
					var arr = [];
					for(var s=0;s<memUserData[j].length;s++){
						arr.push((memUserData[j][s]/memTotalData[j][s]).toFixed(3)*100)
					}
					memResultData.push(arr)
				}
				console.log('memAvgData',memResultData)
				for(var t=0;t<memResultData.length;t++){
					memAvgData.push( _this.avgData(memResultData[t]))
					memMaxData.push(_this.maxData(memResultData[t]))
				}
				console.log('memAvgData',memAvgData)
				console.log('memMaxData',memMaxData)
				_this.renderVirHtml(title,name,virCpuData,virMemData,cpuAvgData,cpuMaxData,memAvgData,memMaxData)
			})
		},
		//渲染虚拟机规格
		renderVirHtml:function(title,name,virCpuData,virMemData,cpuAvgData,cpuMaxData,memAvgData,memMaxData){
			var virHeaderStr = '';
			var cpuHeaderStr = '';
			var virCpuStr = '<span class="v-1 gray-qian">'+virCpuData[0]+'</span>';
			var virMemStr = '<span class="v-1  gray-qian">'+virMemData[0]+'</span>'
			var cpuAvgStr = '';
			var cpuMaxStr = '';
			var memAvgStr = '';
			var memMaxStr = '';
			for(var i=0;i<virCpuData.length;i++){
				virHeaderStr+=`<span class="v-1">第`+(i+1)+`轮</span>`;
				virCpuStr+=`<span class="v-1 ">`+virCpuData[i]+`</span>`;
				virMemStr+=`<span class="v-1">`+virMemData[i]+`</span>`;
				cpuHeaderStr+=`<span class="res-1 ">第`+(i+1)+`轮</span>`;
				cpuAvgStr+=`<span>`+cpuAvgData[i]+`%</span>`;
				cpuMaxStr+=`<span>`+cpuMaxData[i]+`%</span>`;
				memAvgStr+=`<span>`+memAvgData[i]+`%</span>`;
				memMaxStr+=`<span>`+memMaxData[i]+`%</span>`
			}
			var str = '';
			str+=`<div class="z-header">`+
				`<div class="z-header-number fl">`+title+`</div>`+
				`<div class="fl z-header-content">`+name+`</div>`+
			`</div>`+
			`<div class="z-box">`+
				`<div class="virt ">`+
					`虚拟机规格足迹`+
				`</div>`+
				`<ul class="virt-box ">`+
					`<div class="v-header ">`+
						`<span class="v-time fl">轮次</span>`+
						`<span class="v-1">原始</span>`+virHeaderStr+`</div>`+
					`<li class="h-content">`+
						`<span class="v-time  fl">CPU</span>`+virCpuStr+`</li>`+
					`<li class="h-content">`+
						`<span class="v-time  ">内存</span>`+virMemStr+`</li>`+
				`</ul>`+
				`<div class="virt ">资源利用率</div>`+
				`<ul class="res">`+
					`<div class="res-header ">`+
						`<span class="res-time ">轮次</span>`+cpuHeaderStr+`</div>`+
					`<div class="res-content gray-qian">`+
						`<div class="res-c-header fl">CPU</div>`+
						`<div class="res-c-title fl">`+
							`<div class="cpu-avg">AVG</div>`+
							`<div class="cpu-max">MAX</div>`+
						`</div>`+
						`<ul class="res-c-content fl">`+
							`<li class="cpu-avg-content lan">`+cpuAvgStr+`</li>`+
							`<li class="cpu-avg-content">`+cpuMaxStr+`</li>`+
						`</ul>`+
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
			$('.box').append(str)
			
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

		
	}
})();

page.init();