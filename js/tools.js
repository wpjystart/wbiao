
getElementById公用样式

function $(str){
	if(str.charAt(0)=="#"){
		return document.getElementById(str.substring(1));
	}else if(str.charAt(0)=="."){
		return document.getElementsByClassName(str.substring(1));
	}else{
		return document.getElementsByTagName(str);
	}
}


兼容内部外部样式

function getStyle(domObj,attr){
	if(domObj.currentStyle){
		return domObj.currentStyle[attr];			
	}else{
		return window.getComputedStyle(domObj)[attr];
	}
}



//让物体移动
//参数：
//移动的物体（DOM元素）
//样式属性名；
//方向（1：表示正向，由小到大；-1：表示反向，由大到小）
//起始位置
//结束位置
//步长
//频率（时间间隔）

function move1803(domObj,attr,direction,startP,endP,inc,timeSpace){
	let currPos = startP;	
	let myTimer = setInterval(function(){
		//1、改变数据
		currPos=currPos+direction*inc;
		//2、边界处理
		if(direction>0){
			if(currPos>=endP){
				window.clearInterval(myTimer);	
				currPos = endP;
			}	
		}else{
			if(currPos<=endP){
				window.clearInterval(myTimer);
				currPos = endP;
			}
		}		
		//3、外观呈现
		domObj.style[attr] = currPos+"px";
	},timeSpace);	
}


//让物体移动02
//参数：
//移动的物体（DOM元素）
//样式属性名；
//结束位置
//步长
//频率（时间间隔）

function move1803_02(domObj,attr,endP,inc,timeSpace){
	let startP=parseInt(getStyle(domObj,attr));
	let direction = endP>startP?1:-1;
	move1803(domObj,attr,direction,startP,endP,inc,timeSpace);
}

//淡入淡出的封装
//参数：
//移动的物体（DOM元素）
//结束值
//步长
//频率（时间间隔）

function fadeInOut(domObj,endValue,inc,timeSpace){
	let startValue = parseInt(getStyle(domObj,"opacity"));
	let direction = endValue>startValue?1:-1;
	let currPos = startValue;	
	let myTimer = setInterval(function(){
		//1、改变数据
		currPos=currPos+direction*inc;
		//2、边界处理
		if(direction>0?currPos>=endValue:currPos<=endValue){
			window.clearInterval(myTimer);
			currPos = endValue;
		}
		//3、外观呈现
		domObj.style.opacity = currPos;
	},timeSpace);
}


//淡入
function fadeIn(domObj,inc,timeSpace){
	fadeInOut(domObj,1,inc,timeSpace);
}

//淡出
function fadeOut(domObj,inc,timeSpace){
	fadeInOut(domObj,0,inc,timeSpace);
}

//多属性运动的封装（用多长时间，把哪个物体从当前位置移动到哪儿）
//参数：
//移动的物体（DOM元素）
//多个属性的最终值：样式属性名和结束位置（json对象）
//   如：{
//			left:500,
//			top:400
//}
//时长；

function move1803_03(domObj,endAttrs,timeLong){
	var currAttrs={};//记录着每个属性的当前值；
	for(let key in endAttrs){//给currAttrs里赋初值为domObj的起始位置
		currAttrs[key]= parseInt(getStyle(domObj,key));
	}
	
	//计算方向（多个），
	var directions = {};
	for(let key in endAttrs){
		directions[key]= endAttrs[key]>currAttrs[key]?1:-1;
	}
	//假定总步数是100步；
	//确定总步数（100），再根据总距离，计算步长；
	//计算步长（多个）
	var incs = {};
	for(let key in endAttrs){
		incs[key]= Math.abs(endAttrs[key]-currAttrs[key])/100;
	}
	//时间间隔（一样的，因为总时长一样，总步数也一样），、
	let timeSpace = timeLong/100;
	
	let myTimer = setInterval(function(){
		//1、改变数据
		let firstKey;//记录第一个键名（属性名）
		for(let key in endAttrs){
			if(!firstKey){
				firstKey = key;	
			}
			currAttrs[key] = currAttrs[key]+directions[key]*incs[key];
		}
		
		//2、边界处理
		if(directions[firstKey]>0){//正向
			if(currAttrs[firstKey]>=endAttrs[firstKey]){
				window.clearInterval(myTimer);	
				for(let key in endAttrs){
					currAttrs[key] = endAttrs[key];
				}
			}	
		}else{//反向
			if(currAttrs[firstKey]<=endAttrs[firstKey]){
				window.clearInterval(myTimer);	
				for(let key in endAttrs){
					currAttrs[key] = endAttrs[key];
				}
			}
		}		
		//3、外观呈现
		for(let key in currAttrs){
			domObj.style[key] = currAttrs[key]+"px";
		}
	},timeSpace);	

}



//功能：两个数的加法
//参数：数1，数2
//返回值：求和的结果
function add(n1,n2){
	return n1+n2;
}

//功能：求1到n之间的整数之和
//参数：数
//返回值：求和结果
function sum(num){
	var result=0;
	for(var i=1;i<=num;i++){
		result=result+i;
	}
	return result;
}

//功能：求1到n之间的能被m整除的整数之和，
//参数：n和m。
//返回值：求和结果
function sum1toNbyM(n,m){//temp就是参数，形参
	var sum=0;//保存求和的结果
	var add=m;//加数
	while(add<=n){
		sum = sum+add;
		add=add+m;
	}
	return sum;
}

//功能：求一个数的阶乘
//参数：数
//返回值：阶乘结果
function factorial(num){
	var result=1;
	for(var i=1;i<=num;i++){
		result=result*i;
	}
	return result;
}



//功能：判断一个年份是不是闰年；
//参数：年份；
//返回值：true:是；false：否。
function isRunYear(year){//形参
	if((year%4==0 && year%100!=0)||(year%400==0)){
		return true;
	}else{
		return false;
	}
}



//功能：判断一个数是不是素数；
//参数：整数
//返回值：true:是；false：否；
/*
function isSuShu(num){//num是形参	
	//2、逻辑
	var count=0;//记录因数的个数
	for(var i=2;i<=num-1;i++){
		if(num%i==0){
			count++;
			break;
		}
	}
	//3、输出
	if(count==1){
		return false;
	}else{
		return true;
	}
}
*/




//功能：判断一个数是不是素数(除了1和它本身以外，再没有因数了)
//参数：整数
//返回值：true:是；false：否；
function isSuShu(num){//num是形参	
	for(var n=2;n<=num-1;n++){
		if(num%n==0){
			return false;//return 结束函数的运行，终止函数。
		}
	}	
	return true;
}




//求阶乘合
function sumFactorial(num){
	var sum=0;
	for(var i=1;i<=num;i++){//i=1	 2    3  4
		//1）、求阶乘
		var jie=1;
		for(var j=1;j<=i;j++){
			jie=jie*j;
		}		
		//2）、求和
		sum = sum + jie;
	}
	return sum
}



//功能：生成一个4位的数字验证码
//参数：无
//返回值：4位验证码
function checkMa(){
	//逻辑
	var str="";
	for(var i=0;i<4;i++){
		//1、产生一个一位随机数
		var num = parseInt(Math.random()*10);
		//2、拼接
		str=str+num;	
	}
	//输出
	return str;
}




function testf(){
	var day1=document.getElementById("textOne").value;
	var day2=document.getElementById("texttwo").value;
	day1=new Date(day1);<-------------------------------------
	day2=new Date(day2);<--------------------------------------
	var t=cha(day1,day2);
	document.getElementById("textthree").value=t;
}  
// 求两个日期的差，就是计算两个日期之间差多少天。
function cha(day1,day2){
	// var day1=new Date();
	// var day2=new Date(2018,5,29);
	var n1=day1.getTime();
	var n2=day2.getTime();
 	var day=Math.abs(n1-n2);
 	day=parseInt(day/(1000*60*60*24));
 	return day;
}












//功能：根据日期计算该日期是当年的第几天
//参数：
//     year:年
//     month:月
//     date:日
//返回值：第几天

function getDaysByDate(year,month,date){
	//定义变量：保存天数
	var days = 0;
	switch(month){
		case 12:days=days+30;
		case 11:days=days+31;
		case 10:days=days+30;
		case 9:days=days+31;
		case 8:days=days+31;
		case 7:days=days+30;
		case 6:days=days+31;
		case 5:days=days+30;
		case 4:days=days+31;
		/*
		case 3:if(isRunYear(year)==true){
				days = days+29;
			}else{
				days = days+28;
			}
			*/
		case 3:days = days+(isRunYear(year)==true?29:28);
		case 2:days=days+31;
		case 1:days=days+date;break;
		default:;
	}	
	return days;
}





// 五角星
function sanjiao(){
	for(var i=0;i<5;i++){
		for(k=0;k<5-i-1;k++){
			document.write("&nbsp" +"&nbsp"+"&nbsp");
		}
		for(var n=0; n<=i; n++){
			document.write("★");
		}
		document.write("<br/>");
	}
}



//功能：生成一个n位的数字验证码
//参数：位数
//返回值：n位验证码
function checkMaN(n){
	//逻辑
	var str="";
	for(var i=0;i<n;i++){
		//1、产生一个一位随机数
		var num = parseInt(Math.random()*10);
		//2、拼接
		str=str+num;	
	}
	//输出
	return str;
}



//获取随机的颜色值
function getColor(){
	var str="#";
	for(var i=0;i<6;i++){
		//1、获取0-16（不包括）的数
		var temp = parseInt(Math.random()*16).toString(16);
		//2、拼接
		str+=temp;
	}
	return str;
}




//年月日

function testf(){
	var d = new Date(); 
	
	var str = d.getFullYear()+"年";
	str += (d.getMonth()+1)+"月";
	str += d.getDate()+"日";
	str += " "+d.getHours()+":";
	str += d.getMinutes()+":";
	str += d.getSeconds();
	str += getWeek(d.getDay());
	
	document.write(str);
	
	// document.write("<br/>"+d.getTime());
}

function getWeek(num){
	switch(num){
		case 0:str="星期天";break;
		case 1:str="星期一";break;
		case 2:str="星期二";break;
		case 3:str="星期三";break;
		case 4:str="星期四";break;
		case 5:str="星期五";break;
		case 6:str="星期六";break;
		default:str="您的输入有误";break;
	}
	return str;
}




任意两个整数之间的随机数=取整（小数+随机数*（大数-小数））
function suiji(max,min){
	var num=max-min;
	var run=parseInt(Math.random()*num);
	var n=min+run;
	return n;
}
