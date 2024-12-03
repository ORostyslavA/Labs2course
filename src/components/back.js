import axios from "axios";

const  APIURL = "http://localhost:5000/api/data";
export const fetchData = async (searchTerm, sortName, sortCity, sortPrice) => {
    try {
        const response = await axios.get(`${APIURL}`, {
            params: {
                searchTerm,
                sortName,
                sortCity,
                sortPrice
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
export const fetchCardData = async (index) => {
    try {
        const response = await axios.get(`${APIURL}/${index}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching item:", error);
        throw error;
    }
};