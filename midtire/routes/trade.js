
const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://10.50.0.2:22000"));

const tradeAbi = require("../../build/contracts/TradeContract").abi;
const contractAddress = require("../../build/contracts/TradeContract").networks["21782"].address;
let fromAccount = "";


/**
 * POST endpoint for submitting a trade.
 * 
*/
router.post('/', async (req, res) => {

    await web3.eth.getAccounts()
    .then(async(accounts)=>{
        console.log(`account to unlock ${accounts}`)
        fromAccount = accounts[0];
        await web3.eth.personal.unlockAccount(accounts[0], "", 600)
        .then(console.log(`'Account unlocked!'`));
    })   
    
    console.log(`code Abi ${tradeAbi}`);
    console.log(`contract Address ${contractAddress}`);

    let contract = new web3.eth.Contract(tradeAbi, contractAddress);
    await contract.methods.addTrade(
        web3.utils.asciiToHex(req.body.tradeId),
        fromAccount,
        req.body.recipient,
        req.body.amount,
        Date.now() 
        )
        .send(
        	// { from: fromAccount, gas: 4500000, privateFor: [req.body.recipient]}  
            { from: fromAccount, gas: 4500000 }
        )
        .on('transactionHash', (hash) => {
            console.log(`transactionHash is ${hash}`);
            res.status(200).send({"txHash": hash});
        })
        .on('confirmation', (confID, receipt) => {
            console.log(`Tx confirmation ID:  ${confID}`)
            console.log(`Receipt: ${JSON.stringify(receipt)}`);
        })
        .on('error', (err)=>{
            throw new Error(err);
        });
});

/**
 * GET endpoint for fetching a trade, passing tradeId param.
 * 
*/
router.get('/:tradeId', async (req, res) => {

	console.log(` trade ID: ${req.params.tradeId}`);
	console.log(`code Abi ${tradeAbi}`);
    console.log(`contract Address ${contractAddress}`);

    const contract = new web3.eth.Contract(tradeAbi, contractAddress);

    await contract.methods.getTrade(web3.utils.asciiToHex(req.params.tradeId)).call()
        .then((result) => {
            console.log(result);
            let tradeRes = {
                "sender": result[0],
                "recipient": result[1],
                "amount": parseInt(result[2]),
                "tradeDate": new Date(parseInt(result[3])).toLocaleString(),
                "tradeStatus": parseInt(result[4])
            };
            res.send(tradeRes);
        });

});


/**
 * GET endpoint for fetching all trades.
 * 
*/
router.get('/', async (req, res) => {
    let tradesData = []; 
    let tStatus = "SUBMITTED";
    const contract = new web3.eth.Contract(tradeAbi, contractAddress);    
    await contract.getPastEvents('tradeEvent', {
            fromBlock: 0,
            toBlock: 'latest'
        },(error, events) => { 
        console.log(`Trade Event log count ${JSON.stringify(events.length)}`); 
    })
    .then(function(events){
        for (let i = 0; i < JSON.stringify(events.length); i++) {
            switch (events[i].returnValues._tradeStatus) {
                case 0:
                    tStatus = "SUBMITTED";
                  break;
                case 1:
                    tStatus = "INPROCESS";
                  break;
                case 2:
                    ttStatus = "SETTLED";
                    break;
              }
            tradesData.push({
                "tradeId" : web3.utils.hexToUtf8(events[i].returnValues._tradeId),
                "sender" : events[i].returnValues._sender,
                "recipient" : events[i].returnValues._recipient,
                "amount" : events[i].returnValues._amount,
                "tradeDate" : new Date(parseInt(events[i].returnValues._tradeDate)).toLocaleString(),
                "tradeStatus" : tStatus
            });
        }
        console.log(tradesData);
    });
    res.send(tradesData);
});

module.exports = router;
