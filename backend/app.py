from fastapi import FastAPI
from rdflib import Graph
import sparql_queries

app = FastAPI()

# Cargar la base de datos RDF
g = Graph()
g.parse("database/data.ttl", format="turtle")

@app.get("/personas/{competencia}")
def get_personas(competencia: str):
    resultado = sparql_queries.consultar_personas(g, competencia)
    return {"personas": resultado}