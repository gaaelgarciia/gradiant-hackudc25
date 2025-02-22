from rdflib import Namespace
import numpy as np

EX = Namespace("http://127.0.0.1:8000/")

        #SELECT  ?name (sum(xsd:integer(coalesce(?level, "0"^^xsd:integer)) + xsd:integer(coalesce(?valor, "0"^^xsd:integer))) AS ?suma) 
def consultar_competencia(graph, competencia):
    query = f"""
        PREFIX ex: <{EX}>
       select ?name ?puntuacion1 ?puntuacion2
        WHERE {{
            ?person a ex:Person ;
                   ex:name ?name ;
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
        print(row)
        name = str(row.name)
        level = row.puntuacion1 + row.puntuacion2
        results.append([name, level])
        #results.append(row)
    results = np.array(results)
    return [list(i) for i in results[results[:,1].argsort()][::-1]]

def consultar_personas(graph, competencias):
    competencias = competencias.split('_')
    resultado = []
    for competencia in competencias:
        resultado.append(competencia)
        resultado.append(consultar_competencia(graph, competencia))
    return resultado

competencias = ['Python', 'Backend']

def post_competencia(graph, persona, competencia, nivel):
    #implementación vainilla pero que funcionar funciona
    
    if nivel in range(1,6):
        nivel_formato = f'ex:know_with_level_{nivel}'
    if competencia in competencias: # esto yo (pepe) no lo haría así, prefeririaconsultarlo en el grafo en vez de hardcodearlo pero bueno poco a poco
        graph.add(persona, nivel_formato, competencia)
        graph.serialize('data.ttl', format='ttl')
    
def post_repositorio(graph, persona, repositorio, nombre_repositorio, lenguaje_repositorio, url_repositorio):
    # no hay error handeling 
    persona_tiene_reposito = 'ex:repositories'
    repositorio_tiene_nombre = 'ex:name'
    repositorio_tiene_url = 'ex:url'
    repositorio_tiene_lenguaje = 'ex:lenguaje'

    graph.add(persona, persona_tiene_reposito, repositorio)
    graph.add(repositorio, repositorio_tiene_nombre, nombre_repositorio)
    graph.add(repositorio, repositorio_tiene_lenguaje, lenguaje_repositorio)
    graph.add(repositorio, repositorio_tiene_url, url_repositorio)
