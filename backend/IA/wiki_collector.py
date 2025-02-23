import wikipedia
import re

def fetch_programming_articles():
    topics = [
        "Programming paradigm",
        "Software design pattern",
        "Data structure",
        "Algorithm",
        "Web development",
        "Database",
        "Machine learning",
        "DevOps",
        "Microservices",
        "Cloud computing"
    ]
    
    articles = []
    for topic in topics:
        try:
            wiki = wikipedia.page(topic)
            articles.append(f"{wiki.title}\n{wiki.content}")
        except:
            continue
    
    return articles

def clean_and_save_articles():
    articles = fetch_programming_articles()
    
    # Limpia y formatea los artículos
    cleaned_articles = []
    for article in articles:
        # Elimina referencias wiki y URLs
        clean_text = re.sub(r'\[\d+\]', '', article)
        clean_text = re.sub(r'http\S+', '', clean_text)
        cleaned_articles.append(clean_text)
    
    # Añade al corpus
    with open("corpus.txt", "a", encoding="utf-8") as f:
        for article in cleaned_articles:
            f.write(f"{article}\n\n")

if __name__ == "__main__":
    clean_and_save_articles()

    #     # Instala las dependencias necesarias
# pip install requests beautifulsoup4 wikipedia

# # Ejecuta los scripts
# cd /Users/gaaelgarciia/Proyects/gradiant-hackudc25/backend/IA
# python collect_data.py
# python wiki_collector.py