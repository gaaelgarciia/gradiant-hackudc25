from rdflib import Namespace

EX = Namespace("http://127.0.0.1:8000/")
def consultar_competencia(graph, competencia):
    query = f"""
        PREFIX ex: <{EX}>
        SELECT DISTINCT ?persona ?nivel WHERE {{
            ?persona ?a ex:Person ;
                ?nivel "{competencia}" .
        }}
    """
    return [str(row[0]).split("/")[-1] for row in graph.query(query)]

def consultar_personas(graph, competencias):
    competencias = competencias.split('_')
    resultado = []
    for competencia in competencias:
        resultado.append(competencia)
        resultado.append(consultar_competencia(graph, competencia))
    return resultado
