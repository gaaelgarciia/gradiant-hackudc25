from rdflib import Graph, Namespace, RDF, RDFS

# Define el espacio de nombres
ex = Namespace("http://127.0.0.1:8000/")

# Crear un nuevo grafo
g = Graph()

# Cargar el esquema desde schema.ttl
g.parse("schema.ttl", format="ttl")

# Cargar los datos desde data.ttl
g.parse("data.ttl", format="ttl")




