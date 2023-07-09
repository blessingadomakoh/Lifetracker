import axios from "axios";
import { API_BASE_URL } from "../constants";

class ApiClient {
  constructor(remoteHostUrl) {
    remoteHostUrl = "https://lifetracker-backend-d41r.onrender.com";
    this.token = null;
  }



  setToken(token) {
    this.token = token;
  }

  async request({ endpoint, method, data = {} }) {
    const url = `${remoteHostUrl}/${endpoint}`;

    const headers = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    const params = (method === "GET") ? data : {}


    try {
      const res = await axios({ url, method, data, params, headers });
      return { data: res.data, error: null };
    } catch (error) {
      console.error("APIclient.makeRequest.error", error);
      return { data: null, error: error };
    }
  }

  async login(credentials) {
    return this.request({ endpoint: "auth/login", method: "POST", data: credentials });
  }

  async signup(credentials) {
    return this.request({ endpoint: "auth/register", method: "POST", data: credentials });
  }

  async fetchUserByEmail() {
    return this.request({ endpoint: "auth/me", method: "GET" });
  }

  async fetchAllNutrition(userId) {
    const endpoint = `api/nutrition`;
    const response = await this.request({ endpoint, method: "GET", data: { user_id: userId } });
    return response;
  }
  
  
  async createNutrition(nutritionData) {
    const url = `${remoteHostUrl}/api/nutrition`;
    const response = await axios.post(url, nutritionData, {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`,
      },
    });
    return response.data;
  }
  
  async updateNutrition(id, nutritionData) {
    const url = `${remoteHostUrl}/api/nutrition/${id}`;
    const response = await axios.put(url, nutritionData, {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`,
      },
    });
    return response.data;
  }
  
  async deleteNutrition(id) {
    const url = `${remoteHostUrl}/api/nutrition/${id}`;
    const response = await axios.delete(url, {
      headers: {
          'Authorization': `Bearer ${this.token}`,
      },
    });
    return response.data;
  }


  async fetchActivityData(userId) {
    const endpoint = `api/activity/${userId}`;
    const response = await this.request({ endpoint, method: "GET" });
    return response;
} 
  
}
  

export default new ApiClient(API_BASE_URL);
