from rdflib import Namespace, Graph, Literal
from rdflib.namespace import RDF
import numpy as np
import re

EX = Namespace("http://127.0.0.1:8000/")

        #SELECT  ?name (sum(xsd:integer(coalesce(?level, "0"^^xsd:integer)) + xsd:integer(coalesce(?valor, "0"^^xsd:integer))) AS ?suma) 
def consultar_competencia(graph, competencia, diccionario):
    query = f"""
        PREFIX ex: <{EX}>
       select ?id ?name ?email ?puntuacion1 ?puntuacion2
        WHERE {{
            ?person a ex:Person ;
                   ex:name ?name ;
                   ex:email ?email;
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
        id_persona = str(row.id)
        name = str(row.name)
        email = str(row.email)
        level = row.puntuacion1 + row.puntuacion2
        results.append([id_persona, name, level])
        #results.append(row)
        if diccionario.get(id_persona) is not None:
            diccionario[id_persona].append([(competencia, level)])
        else:
            diccionario[id_persona] = [(name, email),(competencia, level)]
    results = np.array(results)
    #return [list(i) for i in results[results[:,1].argsort()][::-1]]
    return diccionario

def consultar_personas(graph, competencias):
    competencias = competencias.split('_')
    resultado = []
    diccionario = {}
    for competencia in competencias:
        #personas = consultar_competencia(graph, competencia, diccionario)
        diccionario = consultar_competencia(graph, competencia, diccionario)
        #resultado.append({"competencia": competencia, "personas": personas})
    #return resultado
    return diccionario

def put_competencia(graph: Graph, email: str, competencia: str, nivel: int, repositorio: str):
    if nivel not in range(1, 6):
        raise ValueError("El nivel debe estar entre 1 y 5")

    # First, find the person's URI using their email
    query = f"""
    PREFIX ex: <{EX}>
    SELECT ?person
    WHERE {{
        ?person ex:email "{email}" .
    }}
    """
    results = list(graph.query(query))
    if not results:
        raise ValueError(f"No se encontró usuario con email: {email}")
    
    persona_uri = results[0].person
    nivel_formato = EX[f'know_with_level_{nivel}']
    repositorio_uri = EX[repositorio]

    # Check and update existing skills
    existing_skills = list(graph.objects(persona_uri, nivel_formato))
    if existing_skills:
        new_skills = f"{existing_skills[0]}, {competencia}"
        graph.remove((persona_uri, nivel_formato, existing_skills[0]))
        graph.add((persona_uri, nivel_formato, Literal(new_skills)))
    else:
        graph.add((persona_uri, nivel_formato, Literal(competencia)))

    graph.add((persona_uri, EX.repositories, repositorio_uri))
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
    
def parse_query(graph, query):
    # List of common programming languages and frameworks (you can expand this list)
    programming_terms = consultar_lenguajes_programacion(graph)
    
    # Normalize the query to lowercase for case insensitivity
    query = query.lower()
    
    # Ensure underscores are included at the boundaries
    query = '_' + query + '_'

    # Find all matches in the query
    matches = []
    for term in programming_terms:
        # Create a regex pattern that matches the term bounded by underscores or start/end of string
        pattern = r'_' + re.escape(term.lower()) + r'_'
        if re.search(pattern, query):
            matches.append(term.capitalize())
    
    # Join matches with underscore and return
    if len(matches) == 0:
        return None
    return '_'.join(matches)

def verificar_persona(graph: Graph, email: str, password: str) -> bool:
    # Buscar la URI de la persona utilizando el correo electrónico
    query = f"""
    PREFIX ex: <http://127.0.0.1:8000/>
    SELECT ?persona
    WHERE {{
        ?persona ex:email "{email}" .
    }}
    """
    results = graph.query(query)
    persona_uri = None
    for row in results:
        persona_uri = row.persona
        break

    if not persona_uri:
        return False

    # Verificar la contraseña
    stored_passwords = list(graph.objects(persona_uri, EX.password))
    if not stored_passwords:
        return False

    return stored_passwords[0] == Literal(password)
