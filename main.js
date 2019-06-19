const Block = require('./src/Block')
const BlockChain = require('./src/BlockChain')

let anCoin = new BlockChain()
// part3 block mined
console.log('mining block1...')
anCoin.addBlock(new Block('01/06/2019', {amount: 4}, ))
console.log('mining block2...')
anCoin.addBlock(new Block('01/06/2019', {amount: 12}, ))

// part1 original block chain
// console.log(JSON.stringify(anCoin, null, 2))
// console.log('Is blockchain valid?', anCoin.isChainValid())

// part2-1 tamper block1 with transactions
// anCoin.chain[1].transactions.amount = 10
// anCoin.chain[1].hash = anCoin.chain[1].calculateHash()
// console.log(JSON.stringify(anCoin, null, 4))
// console.log('Is blockchain valid?', anCoin.isChainValid())

// part2-2 untamper block1
// anCoin.chain[1].transactions.amount = 4
// anCoin.chain[1].hash = anCoin.chain[1].calculateHash()
// console.log(JSON.stringify(anCoin, null, 4))
// console.log('Is blockchain valid?', anCoin.isChainValid())