from rdflib import Namespace
import numpy as np

EX = Namespace("http://127.0.0.1:8000/")

        #SELECT  ?name (sum(xsd:integer(coalesce(?level, "0"^^xsd:integer)) + xsd:integer(coalesce(?valor, "0"^^xsd:integer))) AS ?suma) 
def consultar_competencia(graph, competencia):
    query = f"""
        PREFIX ex: <{EX}>
       select ?name ?puntuacion1 ?puntuacion2
        WHERE {{
            ?person a ex:Person ;
                   ex:name ?name ;
                   ?rel "{competencia}" .
            ?rel owl:hasValue ?puntuacion1 .
            optional {{ ?person a ex:Person ;
                            ex:repositories ?repo .
                        ?repo ex:lenguaje "{competencia}" . 
                        ex:lenguaje owl:hasValue ?puntuacion2 }}.
            
        }}
    """
   
    results = []
    for row in graph.query(query):
        print(row)
        name = str(row.name)
        level = row.puntuacion1 + row.puntuacion2
        results.append([name, level])
        #results.append(row)
    results = np.array(results)
    return results[results[:,1].argsort()][::-1]

def consultar_personas(graph, competencias):
    competencias = competencias.split('_')
    resultado = []
    for competencia in competencias:
        resultado.append(competencia)
        resultado.append(consultar_competencia(graph, competencia))
    return resultado
