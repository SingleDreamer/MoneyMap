## MoneyMap Back End

The Amazon Web Services instance is up and running, and the backend has been configured as a Service. 

To stop the server, ssh into the ec2 instance using the address and private key.

cd /MoneyMap/moneymap-server/
pm2 kill

To start the server, ssh into the ec2 instance using the address and private key.

cd /MoneyMap/moneymap-server/
pm2 start npm -- start

Once the service is on it will remain on until killed. 
To make modifications and test kill the pm2 instance, and then simply execute npm start in order to test it without running as a service.
This can then be killed just by using SIGINT (ctrl+c)