from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from rdflib import Graph
from classes import Competencia
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

@app.get("/personas/competencias/{consulta}")
def get_personas(consulta: str):
    try:
        consulta = sparql_querys.parse_query(g, consulta)
        resultado = sparql_querys.consultar_personas(g, consulta)
        return {"personas": resultado}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/personas/id/{persona_id}")
def get_perfil(persona_id: int):
    try:
        resultado = sparql_querys.get_persona(g, persona_id)
        if not resultado:
            raise HTTPException(status_code=404, detail="Perfil no encontrado")
        return {"perfil": resultado}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/personas/atributos/{id_persona}")
def get_atributos_persona(id_persona: int):
    try:
        resultado = sparql_querys.get_persona(g, id_persona)
        if not resultado:
            raise HTTPException(status_code=404, detail="Persona no encontrada")
        return {"atributos": resultado}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/lenguajes")
def get_programming_languages():
    try:
        lenguajes = sparql_querys.consultar_lenguajes_programacion(g)
        return {"programming_lenguajes": lenguajes}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/personas/PutCompetencia")
def put_competencia(competencia: Competencia):
    try:
        sparql_querys.put_competencia(g, competencia.persona_id, competencia.competencia, competencia.nivel, competencia.repositorio)
        return {"message": "Competencia añadida"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))