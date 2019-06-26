const Block = require('./Block')
const Transaction = require('./Transaction')

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 2
        this.pendingTransactions = []
        this.miningReward = 100
    }
    createGenesisBlock(){
        return new Block("01/01/2019", "Genesis Block", "");
    }
    minePendingTransaciton(miningRewardAddress){
        let block = new Block(Date.now, this.pendingTransactions)
        block.mineBlock(this.difficulty)
        console.log('   Block successfully mined')
        this.chain.push(block)
        this.pendingTransactions = [new Transaction(null, miningRewardAddress, this.miningReward)]
    }
    createTransaction(transaction){
        this.pendingTransactions.push(transaction)
    }
    getBalanceOfAddress(address){
        let balance = 0
        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress===address){
                    balance -= trans.amount
                }
                if(trans.toAddress===address){
                    balance += trans.amount
                }
            }
        }
        return balance
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }
    isChainValid(){
        for(let i=1; i<this.chain.length; i++){
            let currentBlock = this.chain[i]
            let previousBlock = this.chain[i-1]
            console.log(currentBlock.hash, currentBlock.calculateHash())
            console.log(currentBlock.previousHash, previousBlock.hash)
            if(currentBlock.hash!==currentBlock.calculateHash()){
                return false
            }
            if(currentBlock.previousHash!==previousBlock.hash){
                return false
            }
        }
        return true
    }
}

module.exports = BlockChain