import { readFileSync } from 'node:fs'
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export default async function(){
    let textArr = []
    try {
	textArr = readFileSync("handbook.txt","utf8")
	const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 250, chunkOverlap: 25 })
	const output = await splitter.createDocuments([textArr])
	textArr = output.map((data) => data.pageContent);

    } catch (err) {
	console.error(err)
    } 
    return textArr
}

// let op = await splitDocument();


