import axios from "axios";
import {navigate} from "react-dom"

// async function fetchUserPofile() {
 export async function fetchUserPofile({setLoading, setError,setUserProfileData, setUser}) {
    
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      // OR
      // const token = cookieStore.getItem("token");
      // console.log("token==========>", token);
      if(!token){
      //  console.log("No token found — skipping auto-login");
       setLoading(false);
        return; 
      }
      
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.get(
        "https://feelify-9vpg.onrender.com/api/user/auth/user_profile",
        {
          headers,
        }
      );
      // console.log("userProfileData ============>", res.data);
      setUserProfileData(res.data.User || null);
      setUser(res.data.User || null);
    } catch (err) {
      setError(err);
      setUserProfileData(null);
      setUser(null);
      navigate("/api/user/auth/login");
      // toast.error("Error in user see profile data.");
      // console.error("there was an error!", err);
    } finally {
      setLoading(false);
    }
  }