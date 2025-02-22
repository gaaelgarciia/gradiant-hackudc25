import re

def parse_query(query):
    # List of common programming languages and frameworks (you can expand this list)
    programming_terms = {'python', 'react', 'angular', 'java', 'javascript', 'ruby', 'c#', 'c++', 'html', 'css', 'swift', 'node.js', 'django', 'flask'}
    
    # Normalize the query to lowercase for case insensitivity
    query = query.lower()
    
    # Find all matches in the query
    matches = []
    for term in programming_terms:
        if term in query:
            matches.append(term.capitalize())
    
    # Join matches with underscore and return
    return '_'.join(matches)
