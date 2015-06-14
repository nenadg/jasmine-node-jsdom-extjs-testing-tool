# jasmine-node-jsdom-extjs-testing-tool
Functional front-end Ext.JS testing automation tool using jasmine-node and jsdom

Installation will get needed libraries for you in case you already have installed node package module (https://www.npmjs.org/).

## Ext.JS setup
Use Ext.JS package and follow Sencha cmd enterprise app workflow rules to get your app built.
(http://www.sencha.com/blog/sencha-cmd-enterprise-workflow/) 

## But if you find these tl;dr ...
... you can follow these steps abbreviated:
```sh
$ sencha generate workspace workspace/ (or whatever directory you like)
$ sencha -sdk ext-5.0.1/ generate app MyTestApp workspace/MyTestApp
$ cd workspace/MyTestApp
$ sencha app build -c production
```
(production is set for a reason)

and that would do. Now let's create website in Apache that'll server this testing app.

# Apache config and build explanation
I'm using OpenSUSE linux so configuration might be different for you. Please refer to whatever source you can find on the Internet on how to configure local website on Apache webserver. For me, configuration goes like this:
```sh
$ nano /etc/hosts
```
there i'll create a record like this:
```sh
127.0.0.1 	mytestapp.ll
```
don't mind .ll domain, it's just something I've made up for local instances. You can name it whatever you like. 
```sh
$ cd /etc/apache/vhosts.d/
$ sudo nano mytestapp.ll.conf
```

Create vhosts file similar to this one:
```xml
<VirtualHost *:80>
	ServerName mytestapp.ll
	DocumentRoot /srv/www/mytestapp.ll/htdocs/
	ErrorLog /srv/www/mytestapp.ll/logs/error.log
	CustomLog /srv/www/mytestapp.ll/logs/access.log common
	<Directory />
		Options Indexes FollowSymLinks Includes ExecCGI
		AllowOverride All
		Order deny,allow
		Allow from all
	</Directory>
</VirtualHost>
```
Now create directory for your website in it's root. For me it's /srv/www/
```sh
$ mkdir /srv/www/mytestapp.ll
```
and there, create symbolic link to your sencha workspace root
```sh
$ cd /srv/www/mytestapp.ll/
$ ln /path/to/my/sencha/workspace/ htdocs -s
```

IMPORTANT: It's essential not to create symbolic link to project's application root. We'd like to test our application in one of sencha's default scenarios: development, testing and production, so it would be great if our testing suite could access one of those scenarios without having to rewire Apache configuration. Because of that, we will create link to sencha workspace and there we could create .htaccess file that'll tell script what case to use. Here is an example of what it should look like:
```sh
RewriteEngine On
RewriteCond %{REQUEST_URI} (/|\.htm|\.php|\.html|/[^.]*)$ [NC]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /build/production/MyTestApp/index.html/$1 [R=301,NC,L]
```

Our rewrite rule now has the directory of 'production' scenario. 
And for your joy and happiness I have created run.sh file that will be ran after `sencha app build` step; Specifically - in one of their scenarios: 
```sh
$ sencha app build -c production 
$ sencha app build -c development 
$ sencha app build -c testing
```
and create .htaccess for given scenario. Feel free to modify it to your liking.

Beside that, you'll find build.xml in ~/MyTestApp application root, that executes run.sh making all of this possible and seamless as it could get.

Now let's go to testing part.

## Included tests and environment
In this test scenario, I've built basic Ext.JS app as it comes out of the box. Added just few lines of code to test things like: 
- Click on this button, dialog opens, click 'Yes' to modify some namespace-global variable.
- Is there a 'tabpanel' available 
- etc.

I've built an app and set up Apache to serve that content. Nothing special.

## Installation
```sh
$ npm install
```
## Running
```sh
$ npm start
```
or
```sh
$ ./run.sh
```
or
```sh
$ workspace/MyTestApp/sencha app build -c [development, production, testing]
```

## The way it works
Code is well commented so I won't bother explaining to much, the process is basic:

1. Your site gets loaded by request module, 
2. as it's loaded, it's parsed for script tags and microloader script is sucked into node environment (not yet loaded),
3. Using jsdom.jsom, I get the basic DOM loaded with needed objects,
4. Than I load microloader code (insecure I know; I'm working in familiar env.) and,
5. do window.location.reload :),
6. wait for a second, as it's being reloaded,
7. profit

Complete Ext.JS is loaded as it would be in browser. Tests are run afterwards, in familiar style - using Jasmine methods and pure Ext.JS. 

No browser window, nothing, just console and reports. It' pretty fast that way. And, yeah, reports are exported in /reports directory in JUnit xml. 

Any improvements, comments and critiques are encouraged.