const API_URL = "http://127.0.0.1:8000/personas/";

export const fetchResults = async (query) => {
    try {
        const response = await fetch(`${API_URL}${query}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        
        // Extract the skill name and people array
        const [skillName, peopleArray] = data.personas;
        
        // Make sure peopleArray is iterable
        if (!Array.isArray(peopleArray)) {
            console.error("People array is not valid:", peopleArray);
            return {
                skill: query,
                people: []
            };
        }
        
        // Format the data for display (no sorting needed)
        const formattedResults = peopleArray.map(([name, level]) => ({
            name,
            level: parseInt(level)
        }));

        return {
            skill: skillName,
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