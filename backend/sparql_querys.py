from rdflib import Namespace

EX = Namespace("http://127.0.0.1:8000/")

def consultar_competencia(graph, competencia):
    query = f"""
        PREFIX ex: <{EX}>
        SELECT DISTINCT ?name (sum(xsd:integer(coalesce(?level, "0"^^xsd:integer)) + xsd:integer(coalesce(?valor, "0"^^xsd:integer))) AS ?suma) 
        WHERE {{
            ?person a ex:Person ;
                   ex:name ?name ;
                   ?rel "{competencia}" .
            ?rel owl:hasValue ?level .
            optional {{ ?person a ex:Person ;
                            ex:repositories ?repo .
                        ?repo ex:lenguaje "{competencia}" . 
                        ex:lenguaje owl:hasValue ?valor }}.
            
        }}
        ORDER BY DESC(xsd:integer(?level))
    """
    
    results = []
    for row in graph.query(query):
        name = str(row.name)
        level = str(row.suma).replace('.', '')  # Remove decimal point
        results.append([name, level])
    return results

def consultar_personas(graph, competencias):
    competencias = competencias.split('_')
    resultado = []
    for competencia in competencias:
        resultado.append(competencia)
        resultado.append(consultar_competencia(graph, competencia))
    return resultado
