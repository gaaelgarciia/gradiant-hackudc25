from fastapi import FastAPI
from rdflib import Graph, Namespace
from rdflib.namespace import RDF, RDFS
import sparql_querys 

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cargar la base de datos RDF
g = Graph()
g.parse("database/data.ttl", format="turtle")

@app.get("/personas/{consulta}")
def get_personas(consulta: str):
    resultado = sparql_querys.consultar_personas(g, consulta)
    return {"personas": resultado}
