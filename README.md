# BesdCloud

###简介###

BESD云服务是用于帮助快速开发DEMO和测试用的云服务平台，您可以通过0.8以上版本的ICECSS来调用云服务，也可以通过独立的SDK、AJAX来使用。通过BESD云服务可以在不写后端代码的情况下快速完成DEMO或简单程序的开发。

比如云记事本、云记账等等。

ICECSS：[http://www.besdlab.cn/ICECSS/](http://www.besdlab.cn/ICECSS/)

CDN：[http://www.besdlab.cn/cdn](http://www.besdlab.cn/cdn)


###使用方法###

各SDK的使用方法不一样。请根据各SDK的实际用法使用。


###云服务基本介绍###

BESD云服务目前分为几个部分：开发者系统、用户系统、邮件服务、黑名单系统、监控服务、数据仓库。

通过api可以使用已经开放的功能，比如快速登录、注册、增加数据、删除数据。

采用用户归属开发者的模式，也就是说用户通过devid（开发者id）进行登录、注册、操作数据等等。

但是开发者是看不到用户的数据的，只有用户自己能看到。

我们对各大部分和数据仓库中存放的数据进行了加密，连我们自己都看不到。


###api地址###

1.注册接口 http://cloud.besdlab.cn/api/register

所需参数：username、password、email、devid

2.登录接口 http://cloud.besdlab.cn/api/login

所需参数：username、password、devid

3.退出登录 http://cloud.besdlab.cn/manage/account/logout

所需参数：无

4.获取信息 http://cloud.besdlab.cn/manage/account/loged

所需参数：无

5.增加数据 http://cloud.besdlab.cn/api/store/add

所需参数：value1、value2、value3、value4

6.删除数据 http://cloud.besdlab.cn/api/store/delete

所需参数：id

7.查找数据 http://cloud.besdlab.cn/api/search

所需参数：num、value1、value2、value3、value4

8.开发者授权 http://cloud.besdlab.cn/manage/login

所需参数：username、password

9.增加public数据 http://cloud.besdlab.cn/manage/public/addpublic

所需参数：value1、value2、value3、value4

10.删除public数据 http://cloud.besdlab.cn/manage/public/delpublic

所需参数：id

11.获取public数据 http://cloud.besdlab.cn/manage/public/serpublic

所需参数：无


###常见返还###

返还名称一般都以result命名，下面介绍下result可能包含的值所代表的含义。

true 正确

false 错误

结果集 这个是搜索时会返还搜索结果的JSON集，您也可以通过浏览器的开发者工具进行调试（Chrome按F12）

100 错误-不能为空

101 错误-不能是中文

102 错误-不能太小

103 错误-用户名重复

201 错误-邮箱未验证

202 错误-账号已被冻结

203 错误-devid不存在


###JS SDK###

首先导入所需的js文件（ICECSS本身包含，不需要额外导入）。

`<script src="js/ice_cloud.js"></script>`

然后到BESD云服务官网申请开发者ID。

`http://cloud.besdlab.cn/`

注册然后验证邮箱（注意不要使用QQ邮箱），验证后即可通过右上角的登录进行登录。登陆后便可找到开发者ID。

####JS SDK使用说明####

使用时要先创建一个对象：

`ice_cloud=new ice_cloud();`

通过这个对象来调用SDK的方法。

（1）设置开发者ID

`ice_cloud.setDevid("P1nb0GkHxerq4rmwfvzA")`

这是在每个需要使用BESD云服务的地方都需要做的，或者你也可以直接修改JS文件中的devid变量一劳永逸。

（2）调用api接口登录

`ice_cloud.login("username","password");`

调用api登录成功后会存储一个持续20分钟的session，考虑到安全问题，每个用户每天都不能重复登录超过50次，超过的话当天就会被冻结。

只有用户登录后才能操作数据仓库。

（3）调用api接口注册

`ice_cloud.register("username","password","email");`

账号不能小于四位，密码不能小于六位

通个开发者ID下是不能存在相同的用户名的。

（4）调用api退出登录

`ice_cloud.logout();`

退出登录后就无法对数据仓库进行任何操作。

（5）验证登录

`ice_cloud.loged();`

验证是否已经成功登录。成功登录除了会返回用户名还会返还开发者ID，具体的请在调用这个方法的时候自行使用浏览器的开发者工具。

（6）增加数据

`ice_cloud.storeAdd(value1,value2,value3,value4);`

我们允许最多增加四个字符串，不需要增加的值建议用文本的“null”填充。

如ice_cloud.storeAdd("ICECSS很漂亮","null","null","null");

（7）查找数据

`ice_cloud.storeSearch(num,value1,value2,value3,value4);`

根据条件查找当前用户存储在数据仓库的数据。num代表条件数。

num=1，获取该用户的所有的数据
num=2，根据value1来查找该用户的数据
num=3，根据value1、value2来查找该用户的数据
num=4，根据value1、value2、value3来查找该用户的数据
num=5，根据value1、value2、value3、value4来查找该用户的数据

（8）删除数据

`ice_cloud.storeDelete(id);`

根据id删除该用户的数据，您可以先通过查找数据获取到想要删除的数据的id后进行删除。

（9）获取result

 SDK中默认是执行完后将返回的结果中result的值赋予到变量result上，所以可以通过getResult获取到result的值。

 `ice_cloud.getResult();`

 （10）public用户

 我们在开发云服务的时候想到个问题，如果开发者希望自己下面所有的用户都能看到同样的一些数据怎么办（比如公告）？

所以在开发者注册时会自动生成一个public用户，开发者下面的用户登陆后可以通过api获得public用户的数据但却不能增加和删除。

 `ice_cloud.serPublic();`

 （11）public用户数据的增加和删除

 想要增加或删除public用户的数据必须经过开发者的授权。

 `ice_cloud.manageLogin(username,password);` （这里输入的是开发者的账号密码）

 开发者登录后便可以通过下面两个方法进行增加和删除。

 `ice_cloud.addPublic(value1,value2,value3,value4);` 

 `ice_cloud.delPublic(id);` 


####注意事项####

有可能上面定义的方法执行后会有一两秒的延迟才能获取到result，这时我们建议您对获取result的方法进行延时1-3秒。


####JS SDK使用示例####

场景：云记事本

首先生成一个对象，然后设置开发者ID。

`ice_cloud=new ice_cloud();`

`ice_cloud.setDevid("sssss"); `

设置以后可以通过调用api进行注册

`ice_cloud.register("username","password","email");`

然后用getResult()获取结果进行判断。

注册完之后便可以通过login登录，同理执行完后用getResult获取结果

`ice_cloud.login("username","password");`

登录后用storeSearch获取数据，再用getResult将之前用户的记事都找出来然后渲染到页面上

`ice_cloud.storeSearch(1,"null","null","null","null");`

如果用户想增加一个新的记事，那就可以用storeAdd来增加，可以用getResult知道是否增加成功

`ice_cloud.storeAdd("一月十三的日记","今天去买了菜、跟亲爱的看了场电影","分类-日记","20150113");`