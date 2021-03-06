# MoneyMap

<b>Project Link</b>: http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:5000/

<b>Video Demo</b>: https://youtu.be/4tah1aX3ZCU

<b>Writeup</b>: https://docs.google.com/document/d/1lc6lS96ysOmjlq45GsI_vmkbfLIkF75ehKsPrsey_Ms/edit?usp=sharing

This is the web application MoneyMap, created for the Computer Science Capstone course in Spring 2019 at Hunter College. The goal is to create an all in one web app that will help users make the difficult decision of which city makes the most financial sense to move to according to their current lifestyle and job offers. The primary audience will be people trying to navigate their job offers, with their new offers or expectations on hand. By consolidating information from different cities in the dataset, users will be provided with an overview of their current status and financial potential for the chosen city.

<b>Project Developers</b>: Jessica Ng (lead), David Belinsky, Eunice Hew, Cris Jimenez, Riyadh Rahman

<b>You do not need to install if you just want to try the web app; use the link above.</b>

## Known Bugs:

*As of 5/19/19:* To solve most of these temporary issues, simply refreshing the page is fine.  

- Selection for Job Offer Comparison behavior breaks if one card or more is selected before adding or deleting a card. 
- Profile information is not automatically updated on the page after Replace Profile submission. 
- User details update automatically on the page after Replace Account Details submission, but RFS is not automatically updated. 
- If you try to register and get an error saying the email is taken, trying with a new unused email will allow you to register, but the new email will cause the app to break when you log in. To resolve this particular issue, if you get an error after registration, please refresh BEFORE trying to regsiter with another email. 

## Installation Guide (only for running frontend locally, with our server):

Clone the repository and install dependencies. In your terminal, run:
```
git clone https://github.com/SingleDreamer/MoneyMap.git
cd moneymap-client
npm install
```
In your terminal, from root directory, run:
```
cd moneymap-client
npm start
```

In your preferred browser, go to: http://localhost:3001


## General Installation Guide:

(please note that the frontend refers to our own hosted server in the code, which would have to be changed if you want to run your own server)

Clone the repository and install dependencies. In your terminal, run:
```
git clone https://github.com/SingleDreamer/MoneyMap.git
cd moneymap-client
npm install
sudo npm install pm2 -g
 cd ../moneymap-server
npm install
```

Start the server. In your terminal, from root directory, run:
```
cd moneymap-client
pm2 start --name “client” npm -- start

cd ../moneymap-server
pm2 start --name “server” npm -- start
```

In your preferred browser, go to: http://localhost:3001

Backend is located at: http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/

Database: moneymap.cepa7azjnt22.us-east-2.rds.amazonaws.com:1433
