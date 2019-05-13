# MoneyMap

<b>Project Link</b>: http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3001/

This is the final report for the web application MoneyMap, created for the Computer Science Capstone course in Spring 2019 at Hunter College. The goal is to create an all in one web app that will help users make the difficult decision of which city makes the most financial sense to move to according to their current lifestyle and job offers. The primary audience will be people trying to navigate their job offers, with their new offers or expectations on hand. By consolidating information from different cities in the dataset, users will be provided with an overview of their current status and financial potential for the chosen city.

<b>Project Developers</b>: Jessica Ng (lead), David Belinsky, Eunice Hew, Cris Jimenez, Riyadh Rahman


<b><u>You do not need to install if you just want to try the web app; use the link above.</b></u>

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

