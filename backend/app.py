from fastapi import FastAPI
from rdflib import Graph, Namespace
from rdflib.namespace import RDF, RDFS
from SPARQLWrapper import SPARQLWrapper, JSON

app = FastAPI()

# Cargar la base de datos RDF
g = Graph()
g.parse("database/data.ttl", format="turtle")

@app.get("/personas/{competencia}")
def get_personas(competencia: str):
    resultado = SPARQLWrapper.consultar_personas(g, competencia)
    return {"personas": resultado}