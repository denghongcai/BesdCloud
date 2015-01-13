//云中心地址
var url = "http://cloud.besdlab.cn/";
var link = "";
//初始化变量
var username = "null";
var password = "null";
var email = "null";
var num = 0;
var value1 = "null";
var value2 = "null";
var value3 = "null";
var value4 = "null";
var id = 0;

//请将开发者ID填写在这
var devid = "null";

//声明用于放置结果的变量
var result="";

function ice_cloud() {
	//设置开发者ID
	this.setDevid = function(d) {
		devid = d;
	};

	//调用api接口登录
	this.login = function(u, p) {
		link = url + "api/login";
		username = u;
		password = p;
		cloud_ajax();
	};

	//调用api接口注册
	this.register = function(u, p, e) {
		link = url + "api/register";
		username = u;
		password = p;
		email = e;
		return cloud_ajax();
	};

	//调用api接口退出登录
	this.logout = function() {
		link = url + "manage/account/logout";
		return cloud_ajax();
	};

	//验证登录，如果已登录返回账户名和开发者ID
	this.loged = function() {
		link = url + "manage/account/loged";
		return cloud_ajax();
	};

	//调用api向数据仓库增加数据
	this.storeAdd = function(v1, v2, v3, v4) {
		link = url + "api/store/add";
		value1 = v1;
		value2 = v2;
		value3 = v3;
		value4 = v4;
		return cloud_ajax();
	};

	//调用api删除数据仓库中指定ID的数据
	this.storeDelete = function(i) {
		link = url + "api/store/delete"
		id = i;
		return cloud_ajax();
	};

	//根据条件查找数据仓库
	this.storeSearch = function(n, v1, v2, v3, v4) {
		link = url + "api/store/search";
		num = n;
		value1 = v1;
		value2 = v2;
		value3 = v3;
		value4 = v4;
		return cloud_ajax();
	};

	//开发者授权
	this.manageLogin = function(u, p) {
		link = url + "manage/login";
		username = u;
		password = p;
		return cloud_ajax();
	};

	//增加public数据
	this.addPublic = function(v1, v2, v3, v4) {
		link = url + "manage/public/addpublic";
		value1 = v1;
		value2 = v2;
		value3 = v3;
		value4 = v4;
		return cloud_ajax();
	};
	//删除public数据
	this.delPublic = function(i) {
		link = url + "manage/public/delpublic"
		id = i;
		return cloud_ajax();
	};

	//获取public数据
	this.serPublic = function() {
		link = url + "manage/public/serpublic"
		return cloud_ajax();
	};
	
	//获取result
	this.getResult=function(){
		return result;
		
	}


}




//AJAX方法
function cloud_ajax() {
	$.ajax(link, {

		type: "POST",

		xhrFields: {

			withCredentials: true,
			useDefaultXhrHeader: false

		},
		data: {
			id: this.id,
			username: this.username,
			password: this.password,
			email: email,
			devid: this.devid,
			num: this.num,
			value1: this.value1,
			value2: this.value2,
			value3: this.value3,
			value4: this.value4


		},

		crossDomain: true,

		success: function(data, status, xhr) {
			result= data["result"];

		}

	});
}