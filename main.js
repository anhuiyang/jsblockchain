const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash=''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0
    }
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }
    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty+1).join('0')){
            this.nonce++
            this.hash = this.calculateHash()
        }
        console.log('Block mined: ', this.hash)
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 4
    }
    createGenesisBlock(){
        return new Block(0, "01/01/2019", "Genesis Block", "");
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

let anCoin = new BlockChain()
console.log('mining block1...')
anCoin.addBlock(new Block(1, '01/06/2019', {amount: 4}, ))
console.log('mining block2...')
anCoin.addBlock(new Block(2, '01/06/2019', {amount: 12}, ))

// original block chain
// console.log(JSON.stringify(anCoin, null, 2))
// console.log('Is blockchain valid?', anCoin.isChainValid())

// tamper block1 with data
// anCoin.chain[1].data.amount = 10
// anCoin.chain[1].hash = anCoin.chain[1].calculateHash()
// console.log(JSON.stringify(anCoin, null, 4))
// console.log('Is blockchain valid?', anCoin.isChainValid())

// untamper block1
// anCoin.chain[1].data.amount = 4
// anCoin.chain[1].hash = anCoin.chain[1].calculateHash()
// console.log(JSON.stringify(anCoin, null, 4))
// console.log('Is blockchain valid?', anCoin.isChainValid())