const API_URL = "http://127.0.0.1:8000/personas/competencias/";

export const fetchResults = async (query) => {
    try {
        const response = await fetch(`${API_URL}${query}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        
        if (!data.personas || Object.keys(data.personas).length === 0) {
            return {
                skills: query.split('_'),
                people: []
            };
        }

        // Procesar los datos de las personas
        const formattedResults = Object.entries(data.personas).map(([id, info]) => {
            const [personalInfo, ...skillsInfo] = info;
            const [name, email] = personalInfo;
            
            // Formatear las habilidades correctamente
            const formattedSkills = skillsInfo.map(skillInfo => {
                const [skillName, skillLevel] = skillInfo;
                // Si skillInfo es un array anidado, tomamos el primer elemento
                if (Array.isArray(skillInfo[0])) {
                    return {
                        skill: skillInfo[0][0],
                        level: parseInt(skillInfo[0][1])
                    };
                }
                // Si no es un array anidado, lo procesamos normalmente
                return {
                    skill: skillName,
                    level: parseInt(skillLevel)
                };
            }).filter(skill => !isNaN(skill.level)); // Filtrar habilidades con nivel válido

            return {
                id: parseInt(id),
                name,
                email,
                skills: formattedSkills
            };
        });

        // Ordenar por el nivel más alto
        const sortedResults = formattedResults.sort((a, b) => {
            const maxLevelA = Math.max(...a.skills.map(s => s.level));
            const maxLevelB = Math.max(...b.skills.map(s => s.level));
            return maxLevelB - maxLevelA;
        });

        return {
            skills: query.split('_'),
            people: sortedResults
        };
    } catch (error) {
        console.error("Error fetching results:", error);
        return {
            skills: query.split('_'),
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

export const fetchProgrammingLanguages = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/lenguajes');
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        
        // Usar la clave correcta del response que coincide con el backend
        // app.py devuelve {"programming_lenguajes": lenguajes}
        return data.programming_lenguajes;
    } catch (error) {
        console.error("Error fetching programming languages:", error);
        return [];
    }
};