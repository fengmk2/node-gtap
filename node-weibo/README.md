# tapi: A weibo(like twitter) API SDK, use on browser client and nodejs server.

## Supports:
 * twitter: [http://twitter.com/](http://twitter.com/)
 * facebook: [http://facebook.com/](http://facebook.com/)
 * fanfou: [http://fanfou.com/](http://fanfou.com/)
 * digu: [http://digu.com/](http://digu.com/)
 * zuosa: [http://zuosa.com/](http://zuosa.com/)
 * tsina: [http://t.sina.com.cn/](http://t.sina.com.cn/)
 * tqq: [http://t.qq.com/](http://t.qq.com/)
 * tsohu: [http://t.sohu.com/](http://t.sohu.com/)
 * t163: [http://t.163.com/](http://t.163.com/)
 * renjian: [http://renjian.com/](http://renjian.com/)
 * leihou: [http://leihou.com/](http://leihou.com/)
 * plurk: [http://plurk.com/](http://plurk.com/)

tapi SDK api base on tsina(weibo) api document: [http://open.weibo.com/](http://open.weibo.com/)

## Requires:
 * browser client: jquery(for ajax request)
 * server: nodejs

## How to use

### Browser(Not ready)

    Include the javascript files:
    1. sha1.js
    2. base64.js
    3. oauth.js
    4. tsina.js
       ...
    5. twitter.js
    
    tapi.js

    var tapi = window.tapi;
    tapi.init('tsina', appkey, secret);
    tapi.public_timeline(function(error, data, xhr) {
        if(error) {
            console.error(error);
        } else {
            console.log(data);
        }
    });

### Server

    var tapi = require('./node-weibo').tapi;
    tapi.init('tsina', appkey, secret);
    tapi.public_timeline(function(error, data, response) {
        if(error) {
            console.error(error);
        } else {
            console.log(data);
        }
    });
    
### Use oauth_middleware

handler oauth login middleware, use on connect, express.
    
params: `function oauth_middleware(login_callback, options)`
    
    `login_callback`:
        where login success callback: login_callback(oauth_user, referer, req, res, after_callback)
        you MUST save user info in login_callback.
    `options`: {
        `home_url`: use to create login success oauth_callback url with referer header, 
            default is `'http://' + req.headers.host`;
        `login_path`: login url, default is '/oauth'
        `logout_path`: default is '/oauth/logout'
        `callback_path`: default is login_path + '_callback'
        `blogtype_field`: default is 'blogtype', 
            if you want to connect weibo, login url should be '/oauth?blogtype=tsina'
        `error_callback`: function(error, referer, user, req, res, next), 
            if you want to handler error by yourselft.
    }
    
Example:
    
    var weibo = require('node-weibo')
      , home_url = 'http://localhost';
    weibo.init('tsina', appkey, secret);
    app.use(weibo.oauth_middleware(function(oauth_user, referer, req, res, callback) {
        // do something ...
        // save oauth_user
        db.save_user(oauth_user);
        // use auth redirect, just callback(), return to login referer page.
        // otherwise, callback(true), and handler redirect by yourself
        callback();
    }));

### Node Gtap Twitter API Proxy Server
    
    var start_gtap = require('node-weibo').start_gtap;