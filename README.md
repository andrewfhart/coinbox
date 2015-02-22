coinbox
=======

What is it?
-----------

A personal financial management and goal tracking tool.


How does it work?
-----------------

Using information you provide about your existing financial accounts, coinbox displays various
metrics to help you track changes in your own "net worth" over time, and makes it easier to
visualize trends that can help you make better-informed financial decisions.

Coinbox supports four basic types of accounts:

* General (e.g.: checking, savings)
* Investment (e.g.: securities, retirement)
* Assets (e.g.: things other than money that have intrinsic value )
* Liabilities (e.g.: credit cards, loans, debts)

At the end of each day, coinbox tallies up the changes to each of your accounts and presents
the following metrics:

* End of day balance in each account
* Combined net worth today
* Change in combined net worth from (1 day ago, 1 week ago, 1 month ago, start of calendar year, 1 year ago)


What is it made of?
-------------------

* [NodeJS](http://nodejs.org)
* Express
* Sequelize
* Selenium Web Driver
* BackboneJS
* ReactJS

How do I build it?
------------------

First, obtain the software and dependencies:

```
git clone https://github.com/andrewfhart/coinbox
cd coinbox
npm install
```

Next, edit the configuration files with the information appropriate for your environment:

```
cp src/config/database.example.json src/config/database.json
cp src/config/security.example.json src/config/security.json
<edit database.json and security.json as needed>
```

Then build the server and client code using [gulp](http://gulpjs.com):

```
# if you don't have gulp yet it can be easily installed using `npm`:
# (sudo) npm install -g gulp
gulp
```

Finally, start up the main NodeJS server and navigate to [http://localhost:3000/](http://localhost:3000/):

```
cd release
node app.js
```
