import { UserData } from "../models/userTypes";

const API_ENDPOINT = "https://tmsv4.stagingcp.co/api/machine-test";

export const fetchData = async (): Promise<UserData[] | null> => {
    try {
        const response = await fetch(API_ENDPOINT);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data.data);
        return data.data as UserData[];
    } catch (error) {
        console.error("There was a problem with the fetch operation:", (error as Error).message);
        return null;
    }
}

fetchData();
