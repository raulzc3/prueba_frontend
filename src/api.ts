import type { ApiResponse } from "./types";

const API_BASE_URL = "https://randomuser.me/api/";

/**
 * Fetches a list of random users from the RandomUser API
 * @param count - Number of users to fetch (default is 100)
 * @returns Promise with the user data
 */
export const fetchRandomUsers = async (
  count: number = 100
): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}?results=${count}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users from RandomUser API:", error);
    throw new Error("Failed to fetch users. Please try again.");
  }
};
