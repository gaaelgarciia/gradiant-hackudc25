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