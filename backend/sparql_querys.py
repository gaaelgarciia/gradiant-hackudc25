from rdflib import Namespace

EX = Namespace("http://127.0.0.1:8000/")

def consultar_personas(graph, competencia):
    query = f"""
        PREFIX ex: <{EX}>
        SELECT DISTINCT ?persona WHERE {{
            ?persona a ex:Person ;
                ?nivel "{competencia}" .
        }}
    """
    return [str(row[0]).split("/")[-1] for row in graph.query(query)]