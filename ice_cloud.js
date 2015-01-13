"use strict"

function ICE_Cloud() {
	var self = this;

	//云中心地址
	this.url = "http://cloud.besdlab.cn/";
	this.link = "";
	//初始化变量
	this.username = "null";
	this.password = "null";
	this.email = "null";
	this.num = 0;
	this.value1 = "null";
	this.value2 = "null";
	this.value3 = "null";
	this.value4 = "null";
	this.id = 0;

	//请将开发者ID填写在这
	this.devid = "null";

	//声明用于放置结果的变量
	this.result="";

	//设置开发者ID
	this.setDevid = function(d) {
		self.devid = d;
	};

	//调用api接口登录
	this.login = function(u, p, cb) {
		self.link = self.url + "api/login";
		self.username = u;
		self.password = p;
		self.cloud_ajax(cb);
	};

	//调用api接口注册
	this.register = function(u, p, e, cb) {
		self.link = self.url + "api/register";
		self.username = u;
		self.password = p;
		sellf.email = e;
		self.cloud_ajax(cb);
	};

	//调用api接口退出登录
	this.logout = function(cb) {
		self.link = self.url + "manage/account/logout";
		self.cloud_ajax(cb);
	};

	//验证登录，如果已登录返回账户名和开发者ID
	this.loged = function(cb) {
		self.link = self.url + "manage/account/loged";
		self.cloud_ajax(cb);
	};

	//调用api向数据仓库增加数据
	this.storeAdd = function(v1, v2, v3, v4, cb) {
		self.link = self.url + "api/store/add";
		self.value1 = v1;
		self.value2 = v2;
		self.value3 = v3;
		self.value4 = v4;
		self.cloud_ajax(cb);
	};

	//调用api删除数据仓库中指定ID的数据
	this.storeDelete = function(i, cbc) {
		self.link = self.url + "api/store/delete"
		self.id = i;
		self.cloud_ajax(cb);
	};

	//根据条件查找数据仓库
	this.storeSearch = function(n, v1, v2, v3, v4, cb) {
		self.link = self.url + "api/store/search";
		self.num = n;
		self.value1 = v1;
		self.value2 = v2;
		self.value3 = v3;
		self.value4 = v4;
		self.cloud_ajax(cb);
	};

	//开发者授权
	this.manageLogin = function(u, p, cb) {
		self.link = self.url + "manage/login";
		self.username = u;
		self.password = p;
		self.cloud_ajax(cb);
	};

	//增加public数据
	this.addPublic = function(v1, v2, v3, v4, cb) {
		self.link = self.url + "manage/public/addpublic";
		self.value1 = v1;
		self.value2 = v2;
		self.value3 = v3;
		self.value4 = v4;
		self.cloud_ajax(cb);
	};
	//删除public数据
	this.delPublic = function(i, cb) {
		self.link = self.url + "manage/public/delpublic"
		self.id = i;
		self.cloud_ajax(cb);
	};

	//获取public数据
	this.serPublic = function(cb) {
		self.link = self.url + "manage/public/serpublic"
		self.cloud_ajax(cb);
	};

	this.cloud_ajax = function(callback) {
		var xhr = new XMLHttpRequest();
		if ("withCredentials" in xhr) {
			xhr.withCredentials = true;
			xhr.open("POST", self.link, true);
		}
		else {
			if(typeof XDomianRequest !== "undefined") {
				xhr = new XDomainRequest();
				xhr.open("POST", self.link);
			}
			else {
				throw new Error("您的浏览器不支持ICE_Cloud API服务");
			}
		}
		if (typeof window.XMLHttpRequest === "undefined") {
			throw new Error("您的浏览器不支持ICE_Cloud API服务");
		}
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.onreadystatechange = function () {
			if (xhr.readyState != 4 || xhr.status != 200) 
				callback("err", null)
  			data = JSON.parse(xhr.responseText);
  			callback(null, data["result"])
		};
		xhr.send(JSON.stringify({
				id: self.id,
				username: self.username,
				password: self.password,
				email: self.email,
				devid: self.devid,
				num: self.num,
				value1: self.value1,
				value2: self.value2,
				value3: self.value3,
				value4: self.value4
			}
		));
	};
}