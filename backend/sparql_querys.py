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

def post_competencia(graph, persona, competencia, nivel=2):
    #implementación vainilla pero que funcionar funciona
    
    if nivel in range(1,6):
        nivel_formato = f'ex:know_with_level_{nivel}'
    if competencia in competencias: # esto yo (pepe) no lo haría así, prefeririaconsultarlo en el grafo en vez de hardcodearlo pero bueno poco a poco
        graph.add(persona, nivel_formato, competencia)
        graph.serialize('data.ttl', format='ttl')

def get_persona(graph, id_persona):
    Persona = graph.subjects('ex:id', id_persona)
    resultado = {}
    for verbo en verbos:
        valor = graph.value(Persona, verbo)
        if valor :
            resultado[verbo] = valor 
    return resultado
    
        
