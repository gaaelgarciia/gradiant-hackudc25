from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from rdflib import Graph, Namespace
from rdflib.namespace import RDF, RDFS
import sparql_querys 
from parser import parse_query
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
        persona_uri = f"http://127.0.0.1:8000/personas/id/{persona_id}"
        resultado = sparql_querys.consultar_perfil(g, persona_id)
        if not resultado:
            raise HTTPException(status_code=404, detail="Perfil no encontrado")
        return {"perfil": resultado}
    except Exception as e:

        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/personas/atributos/{persona_id}")
def get_atributos(persona_id: int):
    try:
        resultado = sparql_querys.get_persona(g, persona_id)    
        if not resultado:
            raise HTTPException(status_code=404, detail="Perfil no encontrado")
        return {"atributos": resultado}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/programming_languages") 
def get_programming_languages():
    try:
        lenguajes: sparql_querys.consultar_lenguajes(g)
        if not languages:
            raise HTTPException(status_code=404, detail="Lenguajes no encontrados")
        return {"programming_lenguajes": lenguajes}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/personas/competencias")    
def post_competencia(persona_id: int, competencia: str, nivel: int):
    try:
        sparql_querys.post_competencia(g, persona_id, competencia, nivel)
        return {"message": "Competencia añadida"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



