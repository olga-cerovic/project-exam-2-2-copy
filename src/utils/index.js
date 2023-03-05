import axios from "axios";
import { BASE_URL, PROFILE_PATH } from "../api";

export async function fetchProfile(params) {
  try {
    const response = await axios.get(
      `${BASE_URL}/${PROFILE_PATH}${params.name}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response?.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}
