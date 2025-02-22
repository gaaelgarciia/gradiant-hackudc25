from rdflib import Namespace

EX = Namespace("http://127.0.0.1:8000/")

def consultar_competencia(graph, competencia):
    query = f"""
        PREFIX ex: <{EX}>
        SELECT DISTINCT ?name ?level WHERE {{
            ?person a ex:Person ;
                   ex:name ?name ;
                   ?rel "{competencia}" .
            ?rel owl:hasValue ?level .
        }}
    """
    
    results = []
    for row in graph.query(query):
        name = str(row.name)
        level = str(row.level).replace('.', '')  # Remove decimal point
        results.append([name, level])
    return results

def consultar_personas(graph, competencias):
    competencias = competencias.split('_')
    resultado = []
    for competencia in competencias:
        resultado.append(competencia)
        resultado.append(consultar_competencia(graph, competencia))
    return resultado