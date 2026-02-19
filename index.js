import { Mistral } from '@mistralai/mistralai'
import { createClient } from '@supabase/supabase-js'
// import dataUpload from 'data.js'
import dotenv from 'dotenv'
import createEmbeddingsChunk from './createEmbeddingsChunk.js';
dotenv.config()

const mistralClient = new Mistral({apiKey:process.env.MISTRAL_API_KEY});
const supabase = createClient(process.env.SUPABASE_URL,process.env.SUPABASE_API_KEY);

// dataUpload(mistralClient,supabase)

// get input from the user
const input = "December 25 is on Sunday, do I get extra time off to account for that?";

// create an embedding of the input
const embedding = await createEmbeddingsChunk([input],mistralClient);

const context = await retrieveMatches(embedding);
// console.log("context = ", context);

const prompt = await generateChatResponse(context,input);
console.log("prompt = ", prompt);

async function retrieveMatches(embedding){
    try {
	const response = await supabase.rpc('match_handbook_docs', {
	    query_embedding: embedding[0].embedding, // Pass the embedding you want to compare
	    match_threshold: 0.78, // Choose an appropriate threshold for your data
	    match_count: 5, // Choose the number of matches
	})
	if (!response.data) {
	    throw response
	}
	return response.data.map(d=>d.content)
    } catch (err) {
	console.log("error",err)
    } 
}

async function generateChatResponse(context,query){
    try {
	const response = await mistralClient.chat.complete({
	    model:"mistral-large-latest",
	    messages:[{
		role:"user",
		content:`Handbook context:${context} - Question ${query}. Just provide a one or two line summary.`
	    }]
	})
	return response.choices[0].message.content
    } catch (err) {
	console.error(err)
    } 
}
