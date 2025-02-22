from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from rdflib import Graph, Namespace
from rdflib.namespace import RDF, RDFS
import sparql_querys 
from parser import query_parse
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

@app.get("/personas/competencias/{consulta}")
def get_personas(consulta: str):
    consulta = parse_query(consulta)
    resultado = sparql_querys.consultar_personas(g, consulta)
    return {"personas": resultado}

@app.get("/personas/id/{persona_id}")
def get_perfil(persona_id: int):
    try:
        persona_uri = f"http://127.0.0.1:8000/personas/{persona_id}"
        resultado = sparql_querys.consultar_perfil(g, persona_id)
        if not resultado:
            raise HTTPException(status_code=404, detail="Perfil no encontrado")
        return {"perfil": resultado}
    except Exception as e:

        raise HTTPException(status_code=500, detail=str(e))
