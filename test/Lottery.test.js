const Web3 = require('web3');
const assert = require('assert');
const ganache = require('ganache-cli');
const web3 = new Web3(ganache.provider());

const {interface, bytecode} = require('../compile');

let lottery;
let accounts;

beforeEach( async ()=>{
    accounts = await web3.eth.getAccounts();
    lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode})
    .send({from:accounts[0], gas:'1000000'})
})


describe('test SmartContract-Lottry',()=>{
    /*
    it('can deploy ?',()=>{
        assert.ok(lottery.options.address)
    })
    
    it('can let someone enter', async ()=>{
        await lottery.methods.enter().send({
            from:accounts[0],
            value: web3.utils.toWei('2','ether')
        });
        await lottery.methods.enter().send({
            from:accounts[1],
            value: web3.utils.toWei('2','ether')
        });
        await lottery.methods.enter().send({
            from:accounts[2],
            value: web3.utils.toWei('2','ether')
        });
        await lottery.methods.enter().send({
            from:accounts[3],
            value: web3.utils.toWei('2','ether')
        });


        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0],players[0]);
        assert.equal(accounts[1],players[1]);
        assert.equal(accounts[2],players[2]);
        assert.equal(accounts[3],players[3]);
        assert.equal(4,players.length);
    });


    it('require the minium ehter to enter', async ()=>{
        try {
            await lottery.methods.enter().send({
                from: accounts[0],
                value: 0
            })
            assert(false) // if process thie line will auto fail this unit test
        } catch (error) {
            assert(error) //cuz It will actually produce an error object, assert(true)  will pass test
        }
    })

    it('should only let manager pick winnder', async ()=>{
        try {
            await lottery.methods.pickWinner().send({
                from: acounts[1]
            })
            assert(false) // program should not process here ,cuz only manager can call this method
        } catch (error) {
            assert(error)
        }
    })
     */
    it('can enter ehter in contract, and transfer ehter to account', async ()=>{

        //假設原本我有10塊
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('2','ether')
        })

        //花掉兩塊後，應該還剩8塊
        const initBalance = await web3.eth.getBalance(accounts[0]);

        await lottery.methods.pickWinner().send({
            from:accounts[0]
        })

        //再把獎金倒回來，我應該要有9塊多 (因為中間有手續費)
        const finalBalance = await web3.eth.getBalance(accounts[0]);

        const diffrance =  finalBalance - initBalance; //1.X
        console.log(`diffrance is ${diffrance}`)

        console.log(`gas is ${web3.utils.toWei('2','ether')-diffrance}`)
        assert(diffrance > web3.utils.toWei('1.8','ether'))

        

    })


});