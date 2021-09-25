"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});

// NOTE PART 1

let hashBlock = (block) => {
	const { index, timestamp, data, prevHash } = block
	return crypto.createHash("sha256").update(`${index}${prevHash}${data}${timestamp}`).digest("hex");
}

let createBlock = (newData) => {
	let lastBlock = Blockchain.blocks[Blockchain.blocks.length - 1]

	let newBlock = {}

	newBlock.index = lastBlock.index + 1
	newBlock.prevHash = lastBlock.hash
	newBlock.data = newData
	newBlock.timestamp = Date.now()

	newBlock.hash = hashBlock(newBlock)

	Blockchain.blocks.push(newBlock)
}

poem.forEach(line => {
	createBlock(line)
});

// NOTE PART 2

let verifyBlock = (block, chain) => {
	const { index, hash, data, prevHash } = block

	if (index === 0 && hash === "000000" && prevHash === undefined) {
		return true
	}
	if (!data) return false
	if (!prevHash) return false
	if (!index) return false
	if (hash !== hashBlock(block)) return false
	if (prevHash !== chain[index - 1].hash) return false

	return true
}

let verifyChain = (blockchain) => {
	let Results = []
	blockchain.blocks.forEach(block => {
		let blockResult = verifyBlock(block, blockchain.blocks)
		Results.push(blockResult)
	})

	let isValid = Results.every(result => result)
	return isValid
}

console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);
