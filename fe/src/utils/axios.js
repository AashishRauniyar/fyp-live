import axios from "axios";


export const guestInstance = axios.create({
    baseURL: "http://localhost:5000",
});
