Firejose
======================
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
5. Point your browser to the location of where your installation is running, by default it's: `http://localhost:7050`.
6. Enter the websocket URL for firejose in the prompt, by default it's: `localhost:7051`.
![blah](http://i.imgur.com/vHifPQE.png)
7. Start sending data to firejose in the firejose format. `timeinms:metricname:metricvalue`. This string needs to be UTF8 formatted.
For example: `1405499680942:test:5`. I wrote a client for nodejs already, search npm for `firejose-client`.
![blah](http://i.imgur.com/LmX6xAB.png)
8. The firejose web interface will automatically create graphs for metrics.
![blah](http://i.imgur.com/mq30Aa2.png)
9. When you introduce new metrics, new graphs are automatically created on the fly
![blah](http://i.imgur.com/7Y3jhpC.png)
10. You can change the table headers by clicking on the name and entering a new name. 
![blah](http://i.imgur.com/vyO0TN3.png)