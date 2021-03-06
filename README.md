Firejose
======================

![Firejose Logo](http://i.imgur.com/X2frGWF.png)

[![Build Status](https://travis-ci.org/briandeheus/firejose.svg?branch=master)](https://travis-ci.org/briandeheus/firejose)

zero-setup, short lived, real-time metric visualization for development and benchmarking. <sup>I couldn't fit more buzzwords in there, even if I tried.</sup>

##Introduction
Data goes in. Data goes out.
Like a firehose. Get it? Fire. Hose. No way. Jose.

This data can then be seen in graphs that are automatically created.

###Short lived
Firejose doesn't use a backend to store data. Your browser acts as a temporary datastore.

###Real time
Using websockets Firejose sends all incoming data straight to your browser.

###Metric visualization
As data comes in, Firejose automatically creates a graph for your to easily see whatever metric you're tracking

##Getting started
1. Install by cloning the git repo
2. In root folder of firejose, run `npm install`.
3. Change any values in `cfg\development.json` to your hearts content.
4. If your `NODE_ENV` is not set to `development`, do it now or create a configuration file named after your `NODE_ENV`.
5. Start firejose like you'd start any node process.
6. Point your browser to the location of where your installation is running, by default it's: `http://localhost:7050`.
7. Enter the websocket URL for firejose in the prompt, by default it's: `localhost:7051`.
![blah](http://i.imgur.com/vHifPQE.png)
8. Start sending data to firejose in the firejose format. `timeinms:metricname:metricvalue`. This string needs to be UTF8 formatted.
For example: `1405499680942:test:5`. I wrote a client for nodejs already, search npm for `firejose-client`. ![blah](http://i.imgur.com/LmX6xAB.png)
9. The firejose web interface will automatically create graphs for metrics.
![blah](http://i.imgur.com/WTUJLqF.png)
10. When you introduce new metrics, new graphs are automatically created on the fly
![blah](http://i.imgur.com/7Y3jhpC.png)
11. You can change the table headers by clicking on the name and entering a new name. 
![blah](http://i.imgur.com/vyO0TN3.png)


##Multiple lines per chart
If you want to have multiple lines per chart, use a hash in the name of your metric like this: `metric#line`. For example,
```
10000000:tweets#oranges:1
10000000:tweets#cake:1
10000000:tweets#bananas:1
```
This will create 3 lines one chart, called `metric` with three lines called `oranges`, `cake`, and `bananas`. 

##Automatically naming your charts
In your config file you can automatically name your charts like this;
```
	"charts": {

		"tweet": {
			"name": "Tweets p/second",
			"type": "sum"
		},

	}
```
Supposing in this situation that you are sending `10000000:tweet:5`, your chart will automatically be labeled 'Tweets p/second'.

##Improving Firejose
Firejose was written in a few hours, this results in less than perfect code and no doubt a plethora of bugs. If you found any bugs or made any improvements I'd love for you to send a pull request

##Logo
The logo was made by Bionda van den Ouden, if you need a logo done she's your girl! http://biondaaa.nl