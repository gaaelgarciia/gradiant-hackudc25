from rdflib import Namespace

EX = Namespace("http://127.0.0.1:8000/")

def consultar_personas(graph, competencia):
    query = f"""
        PREFIX ex: <{EX}>
        SELECT ?persona WHERE {{
            ?persona ex:tieneCompetencia ex:{competencia} .
        }}
    """
    return [row[0].split("/")[-1] for row in graph.query(query)]