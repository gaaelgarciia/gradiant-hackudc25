from rdflib import Graph, Namespace, RDF, RDFS

# Define el espacio de nombres
ex = Namespace("http://127.0.0.1:8000/")

# Crear un nuevo grafo
g = Graph()

# Cargar el esquema desde schema.ttl
g.parse("schema.ttl", format="ttl")

# Cargar los datos desde data.ttl
g.parse("data.ttl", format="ttl")

# Guardar el grafo en un archivo (opcional)
g.serialize(destination="output.ttl", format="ttl")

# Opcional: Mostrar cuántos triples hay en el grafo
print(f"Número de triples en el grafo: {len(g)}")

# Ejemplo de cómo consultar los datos (opcional)
# Aquí se pueden hacer consultas SPARQL si es necesario
query = """
    SELECT ?person ?knowledge ?level WHERE {
        ?person a ex:Person .
        ?person ex:hasKnowledge ?knowledge .
        ?knowledge ex:proficiencyLevel ?level .
    }
"""
results = g.query(query)

# Mostrar resultados de la consulta
for row in results:
    print(f"Persona: {row.person}, Conocimiento: {row.knowledge}, Nivel: {row.level}")