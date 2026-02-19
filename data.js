import splitDocument from './splitDocument.js'
import createEmbeddingsChunk from './createEmbeddingsChunk.js';

// data uploading code
export default async (mistralClient,supabase) => {
    const chunks = await splitDocument();
    const embeddedChunks = await createEmbeddingsChunk(chunks,mistralClient)
    const {error} = await supabase.from("handbook_docs").insert(embeddedChunks)
    console.log("done upload",error)
}
