from fastapi import FastAPI
from rdflib import Graph, Namespace
from rdflib.namespace import RDF, RDFS
import sparql_querys 

app = FastAPI()

# Cargar la base de datos RDF
g = Graph()
g.parse("database/data.ttl", format="turtle")

@app.get("/personas/{consulta}")
def get_personas(consulta: str):
    resultado = sparql_querys.consultar_personas(g, consulta)
    return {"personas": resultado}
