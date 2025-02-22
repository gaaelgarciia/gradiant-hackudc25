const API_URL = "http://127.0.0.1:8000/personas/";

export const fetchResults = async (query) => {
    try {
        const response = await fetch(`${API_URL}${query}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data.personas;
    } catch (error) {
        console.error("Error fetching results:", error);
        return [];
    }
};