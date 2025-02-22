const API_URL = "http://127.0.0.1:8000/personas/competencias/";

export const fetchResults = async (query) => {
    try {
        const response = await fetch(`${API_URL}${query}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        
        // La API devuelve un array con la primera competencia encontrada
        const skillData = data.personas[0];
        if (!skillData) {
            console.error("No data found for query:", query);
            return {
                skill: query,
                people: []
            };
        }
        
        // Extraer el array de personas de la competencia
        const peopleArray = skillData.personas;
        
        // Make sure peopleArray is iterable
        if (!Array.isArray(peopleArray)) {
            console.error("People array is not valid:", peopleArray);
            return {
                skill: skillData.competencia,
                people: []
            };
        }
        
        // Format the data for display
        const formattedResults = peopleArray.map(([id, name, level]) => ({
            id: parseInt(id),
            name: name,
            level: parseFloat(level)
        }));

        return {
            skill: skillData.competencia,
            people: formattedResults
        };
    } catch (error) {
        console.error("Error fetching results:", error);
        return {
            skill: query,
            people: []
        };
    }
};

const PROFILE_API_URL = "http://127.0.0.1:8000/personas/";

export const fetchPerfil = async (personaUri) => {
    try {
        // Realizar la solicitud GET para obtener el perfil
        const response = await fetch(`${PROFILE_API_URL}${personaUri}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        
        // Convertir la respuesta a JSON
        const data = await response.json();
        
        // Procesar y formatear los resultados del perfil
        const perfil = {
            name: data.perfil.name,
            email: data.perfil.email,
            skills: data.perfil.skills.map(skill => ({
                skill: skill.skill,
                level: parseInt(skill.level)
            })),
            repositories: data.perfil.repositories
        };

        return perfil;
    } catch (error) {
        console.error("Error fetching perfil:", error);
        return null;
    }
};