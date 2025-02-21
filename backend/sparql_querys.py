from rdflib import Namespace

EX = Namespace("http://example.org/")

def consultar_personas(graph, competencia):
    query = f"""
        PREFIX ex: <http://example.org/>
        SELECT ?persona WHERE {{
            ?persona ex:tieneCompetencia ex:{competencia} .
        }}
    """
    return [row[0].split("/")[-1] for row in graph.query(query)]