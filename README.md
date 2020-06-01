# trademaster

##Setup the Network: 

Step1: Once your BC network is up and running

Step2: Configure the truffle-config file as per network parameters like hostIP, RPC port to connect to one of the nodes of network. 

Step3: Compile and Migrate the contract using truffle migrate & truffle migrate commands. (Note: Before migrating unlock the eth account by attaching to geth console using commands: 

Personal.unlockAccount(eth acc, pwd, duration of acc remain unlocked) 

Step4: Change dir to Midtire folder and Run <npm install> for first time only and the <node app> commands. (express server would start listening on localhost:3000 ) 

Note:  before Step 6 require Node installed 

(Once express server  up and running) 

Step5: Change dir to UI folder and Run <npm install> for first time only and the <ng serve> commands. (Angular cli server would start listening on localhost:4200 ), Application would be accessible from browser on http://localhost:4200 (Note:  before Step 7 require Angular CLI and bootstrap 3 installed) 
