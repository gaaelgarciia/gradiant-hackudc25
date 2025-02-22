from rdflib import Namespace

EX = Namespace("http://127.0.0.1:8000/")
def consultar_competencia(graph, competencia):
    query = f"""
        PREFIX ex: <{EX}>
        SELECT DISTINCT ?persona ?valor  WHERE {{
            ?persona ?a ex:Person ;
                ?nivel "{competencia}" .
            ?nivel owl:hasValue ?valor .

        }}
    """

    #return [str(row[0:1]).split("/")[-1] for row in graph.query(query)]
    #return [str(row[0:1]) for row in graph.query(query)]
    return ((valor.split('/')[-1] for valor in row) for row in graph.query(query))

def consultar_personas(graph, competencias):
    competencias = competencias.split('_')
    resultado = []
    for competencia in competencias:
        resultado.append(competencia)
        resultado.append(consultar_competencia(graph, competencia))
    return resultado
