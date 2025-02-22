#from rdflib import Namespace
#
#EX = Namespace("http://127.0.0.1:8000/")
#
#def consultar_personas(graph, competencia):
#
#    query = f"""
#        PREFIX ex: <{EX}>
#        SELECT DISTINCT ?persona (SUM(?peso) AS ?puntuacion) WHERE {{
#            ?persona rdf:type ex:Person ;
#            ?persona ex:know_with_level_1 {competencia} . BIND (1 AS ?peso)
#        }}
#    """
#    return [str(row[0]).split("/")[-1] for row in graph.query(query)]
from rdflib import Namespace

EX = Namespace("http://127.0.0.1:8000/")

def consultar_competencia(graph, competencia):
    query = f"""
        PREFIX ex: <{EX}>
        SELECT DISTINCT ?persona WHERE {{
            ?persona rdf:type ex:Person ;
                ?nivel "{competencia}" .
        }}
    """
    #return [str(row[0]).split("/")[-1] for row in graph.query(query)]
    return graph.query


def consultar_personas(graph, competencias):
    resultado = []
    for competencia in competencias:
        resultado.append(consultar_competencia(graph, competencia))
    return resultado
