from rdflib import Namespace
import numpy as np

EX = Namespace("http://127.0.0.1:8000/")

        #SELECT  ?name (sum(xsd:integer(coalesce(?level, "0"^^xsd:integer)) + xsd:integer(coalesce(?valor, "0"^^xsd:integer))) AS ?suma) 
def consultar_competencia(graph, competencia):
    query = f"""
        PREFIX ex: <{EX}>
       select ?id ?name ?puntuacion1 ?puntuacion2
        WHERE {{
            ?person a ex:Person ;
                   ex:name ?name ;
                   ex:id ?id;
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
        idPersona = str(row.id)
        name = str(row.name)
        level = row.puntuacion1 + row.puntuacion2
        results.append([idPersona, name, level])
        #results.append(row)
    results = np.array(results)
    return [list(i) for i in results[results[:,1].argsort()][::-1]]

def consultar_personas(graph, competencias):
    competencias = competencias.split('_')
    resultado = []
    for competencia in competencias:
        personas = consultar_competencia(graph, competencia)
        resultado.append({"competencia": competencia, "personas": personas})
    return resultado

def post_competencia(graph, persona_id, competencia, nivel):
    if nivel in range(1, 6):
        nivel_formato = EX[f'know_with_level_{nivel}']
    else:
        raise ValueError("El nivel debe estar entre 1 y 5")

    competencia_uri = EX[competencia.replace(" ", "_")]
    persona_uri = EX[f"{persona_id}"]

    graph.add((persona_uri, nivel_formato, competencia_uri))
    graph.serialize('database/data.ttl', format='turtle')    

def consultar_lenguajes_programacion(graph):
    query = f"""
        PREFIX ex: <{EX}> 
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
        SELECT ?language ?value
        WHERE {{
            ?language rdf:type ex:ProgrammingLanguage ;
                      rdf:value ?value .
        }}
    """
    results = graph.query(query)
    lenguajes = []
    for row in results:
        lenguajes.append(str(row.language).split("/")[-1])
    return lenguajes       

def verbos(graph):
    # Use a set to store unique predicates
    predicates = set()

    # Loop through all triples in the graph
    for subject, predicate, object in graph:
        predicates.add(predicate)

    # Return the list of unique predicates
    return list(predicates)

def get_persona(graph, id_persona):
    persona_uri = EX[f"{id_persona}"]
    resultado = {}
    for s, p, o in graph.triples((persona_uri, None, None)):
        predicado = str(p).split("/")[-1]
        resultado[predicado] = str(o)
    return resultado
    
def parse_query(graph,query):
    # List of common programming languages and frameworks (you can expand this list)
    programming_terms = consultar_lenguajes_programacion(graph)
    # Normalize the query to lowercase for case insensitivity
    query = query.lower()
    
    # Find all matches in the query
    matches = []
    for term in programming_terms:
        if term.lower() in query:
            matches.append(term.capitalize())
    
    # Join matches with underscore and return
    return '_'.join(matches)
