const Block = require('./Block')
class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 2
    }
    createGenesisBlock(){
        return new Block("01/01/2019", "Genesis Block", "");
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
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