import numpy as np
from sentence_transformers import SentenceTransformer
import faiss
from transformers import pipeline

# Step 1: Load the corpus from 'corpus.txt'
def load_corpus(file_path="corpus.txt"):
    with open(file_path, 'r', encoding='utf-8') as f:
        corpus = f.readlines()
    # Clean up corpus (strip newlines, etc.)
    corpus = [line.strip() for line in corpus if line.strip()]
    return corpus

# Step 2: Initialize the Sentence-BERT model for embedding
def initialize_model():
    # Sentence-BERT model for creating embeddings
    model = SentenceTransformer('all-MiniLM-L6-v2')
    return model

# Step 3: Create the FAISS index for fast retrieval
def create_faiss_index(corpus, model):
    # Create embeddings for the corpus
    corpus_embeddings = model.encode(corpus, show_progress_bar=True)
    corpus_embeddings = np.array(corpus_embeddings).astype('float32')

    # Initialize FAISS index (using L2 distance)
    index = faiss.IndexFlatL2(corpus_embeddings.shape[1])
    index.add(corpus_embeddings)
    
    return index

# Step 4: Retrieve relevant documents from the corpus
def retrieve_relevant_documents(query, model, index, corpus, top_k=3):
    query_embedding = model.encode([query])
    query_embedding = np.array(query_embedding).astype('float32')
    
    # Search the FAISS index
    D, I = index.search(query_embedding, top_k)
    
    # Return the retrieved documents based on the indices
    return [corpus[i] for i in I[0]]

# Step 5: Use GPT-2 for generating an answer based on the retrieved documents
def generate_answer(retrieved_docs, query):
    # Load GPT-2 for text generation
    generator = pipeline('text-generation', model='gpt2')
    
    # Join the retrieved documents and create a prompt
    context = " ".join(retrieved_docs)
    prompt = f"Answer the following question based on the context: {query}\n\nContext: {context}\nAnswer:"
    
    # Generate a response
    response = generator(prompt, max_length=350, num_return_sequences=1)
 
    return response[0]['generated_text'].split('\nAnswer:')[1]


# Step 6: Full RAG system workflow
def rag_system(query, corpus_file="IA/corpus.txt"):
    # Load the corpus

    import os
    print(os.listdir())
    corpus = load_corpus(corpus_file)
    
    # Initialize models
    model = initialize_model()
    
    # Create FAISS index for retrieval
    index = create_faiss_index(corpus, model)
    
    # Retrieve relevant documents for the query
    retrieved_docs = retrieve_relevant_documents(query, model, index, corpus)
    
    # Generate the final answer using GPT-2
    answer = generate_answer(retrieved_docs, query)
    
    return answer

'''
if __name__ == "__main__":
    query = input("Enter your programming-related question: ")
    
    # Run the RAG system
    answer = rag_system(query)
    
    print("\nGenerated Answer:")
    print(answer)
'''
