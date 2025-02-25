/**
 * Fetches the lists data from the API.
 * @returns {Promise<Array>} A promise that resolves to an array of lists.
 */
export const fetchLists = async () => {
    try {
        // Sending a request to fetch lists from the API
        const response = await fetch("https://apis.ccbp.in/list-creation/lists");

        // Parsing the response as JSON
        const data = await response.json();
        
        // Logging the fetched data for debugging
        console.log("Fetched Data:", data);

        // Returning the lists array if the response contains valid data
        return data.lists;
    } catch (error) {
        // Logging any errors that occur during fetching
        console.error("Error fetching lists:", error);

        // Returning an empty array in case of an error
        return [];
    }
};
