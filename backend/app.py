from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from rdflib import Graph, Namespace
from rdflib.namespace import RDF, RDFS
import sparql_querys 

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load RDF database
g = Graph()
g.parse("database/data.ttl", format="turtle")

@app.get("/personas/{consulta}")
def get_personas(consulta: str):
    resultado = sparql_querys.consultar_personas(g, consulta)
    return {"personas": resultado}