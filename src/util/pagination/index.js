require('./index.css')
require('util/mm.js')
var templatePagination = require('./index.string')
var Pagination = function(){
	this.defaultOption = {
		container    : null,
		pageNum      : 1,
		pageRange    : 3,
		onSelectPage : null
	}
}
//渲染分页组件
Pagination.prototype.render =  function(userOption){
	//合并选项
	this.option = $.extend({},this.defaultOption,userOption);
	//判断容器是否是合法的jQuery对象
	if(!(this.option.container) instanceof jQuery){
		return;
	}
	//判断是否只有一页
	if(this.option.pages<=1){
		reuturn;
	}
	//渲染分页内容
	this.option.container.html(this.getPaginationHtml());
}
//获取分页的html
Pagination.prototype.getPaginationHtml = function(){
	var html = '',
	    option = this.option,
	    pageArray = [],
	    start = option.pageNum - option.pageRange >0
	    ? (option.pageNum - option.pageRange) : 1,
	    end  = option.pageNum + option.pageRange < option.pages 
	    ? (option.pageNum + option.pageRange) : option.pages;
	//上一页数据的数据
	pageArray.push({
		name:'上一页',
		value:this.option.prePage,
		disabled:!this.option.hasPreviousPage
	});
	//数字按钮的处理
	for(var i = start;i<=end;i++){
		pageArray.push({
			name:i,
			value:i,
			active:(i===option.pageNum),
			
		})
	};
	//下一页数据的处理
	pageArray.push({
		name:'下一页',
		value:this.option.nextPage,
		disabled:!this.option.hasNextPage
	});
	//页面渲染部分
	html = _mm.renderHtml(templatePagination,{
		pageArray:pageArray,
		pageNum:option.pageNum,
		pages:option.pages
		
		
	})
	return html;
}

module.exports = Pagination;