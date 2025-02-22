from rdflib import Graph, Namespace
from pydantic import BaseModel

EX = Namespace("http://127.0.0.1:8000/")

class Competencia(BaseModel):
    persona_id: int
    competencia: str
    nivel: int

class Repositorio(BaseModel):
    persona_id: int
    lenguaje: str
    nombre: str
    url:str

