// 兼容属性  于IE
function getStyle(domObj,attr){
	if(domObj.currentStyle){
		return domObj.currentStyle[attr];			
	}else{
		return window.getComputedStyle(domObj)[attr];
	}
}
