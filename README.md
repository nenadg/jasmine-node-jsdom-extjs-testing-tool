# jasmine-node-jsdom-extjs-testing-tool
Functional front-end Ext.JS testing automation tool using jasmine-node and jsdom

Installation will get needed libraries for you in case you already have installed node package module (https://www.npmjs.org/).

## Ext.JS setup
Use Ext.JS package and follow Sencha cmd enterprise app workflow rules to get your app built.
(http://www.sencha.com/blog/sencha-cmd-enterprise-workflow/) 

## Included tests and environment
In this test scenario, I've built basic Ext.JS app as it comes out of the box. Added just few lines of code to test things like: 
- Click on this button, dialog opens, click 'Yes' to modify some namespace-global variable.
- Is there a 'tabpanel' available 
- etc.

I've built an app and set up Apache to serve that content. Nothing special.

## Installation
    $ npm install
    
## Running
    $ npm start

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