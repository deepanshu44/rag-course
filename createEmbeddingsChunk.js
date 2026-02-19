export default async (chunks,client) => {
    let embeddingResponse = []
    try {
        const rawResponse = await client.embeddings.create({
	    model:"mistral-embed",
	    inputs:chunks
        })
        // console.log("embeddingResponse = ",
	// embeddingResponse["data"][0]["embedding"]);
	embeddingResponse =
	    rawResponse.data.map((emb,index) => {
		return {
		    content:chunks[index],
		    embedding:emb.embedding,
		    id:emb.index
		}
	    })
    } catch (err) {
        console.log("error",err)
    } 
    return embeddingResponse
}
