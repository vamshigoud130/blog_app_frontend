import { create } from "zustand";
import axios from "axios";

export const authStore = create((set, get) => ({
  currentUser: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  login: async (userCredWithRole) => {
    // Note: role is destructured but not used in the common-api/login currently
    const { role, ...userCred } = userCredWithRole;
    try {
      set({ loading: true, error: null });
      const res = await axios.post("https://blog-app-backend-1-5vj1.onrender.com/common-api/login", userCred, { withCredentials: true });
      console.log("Login Response:", res.data);

      set({
        loading: false,
        error: null,
        isAuthenticated: true,
        currentUser: res.data.payload
      });
    } catch (error) {
      console.error("Login Error:", error);
      const errorMessage = error.response?.data?.message || error.message || "Login failed";
      set({
        loading: false,
        error: errorMessage,
        isAuthenticated: false,
        currentUser: null
      });
    }
  },
  logout: async () => {
    set({ loading: true, error: null });
    try {
      await axios.get("https://blog-app-backend-1-5vj1.onrender.com/common-api/logout", { withCredentials: true });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      set({
        currentUser: null,
        loading: false,
        error: null,
        isAuthenticated: false
      });
    }
  },
  verifyAuth:async()=>{
    try {
      set({loading:true,error:null})
      const res = await axios.get("https://blog-app-backend-1-5vj1.onrender.com/common-api/check-auth", { withCredentials: true });
      set({
        loading:false,
        error:null,
        isAuthenticated:true,
        currentUser:res.data.payload
      })
    } catch (error) {
      console.error("Verify Auth Error:", error);
      const errorMessage = error.response?.data?.message || error.message || "Verify Auth failed";
      set({
        loading:false,
        error:errorMessage,
        isAuthenticated:false,
        currentUser:null
      })
    }
  }
}));