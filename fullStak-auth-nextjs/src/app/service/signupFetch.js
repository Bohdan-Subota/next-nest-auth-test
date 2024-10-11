import axios from 'axios';

axios.defaults.withCredentials = true;

const register = async (data) => {
  console.log(data);
    try {
      const res = await axios.post("http://localhost:8000/auth/register",
        data
      );

      console.log(res)

      if (!res.data) {
        alert(`Error: ${res}`);
        return;
      }

      const response = res.data;
      alert("User Registered!");
      console.log({ response });
    } catch (error) {
      console.log("Error during registration:", error);
      alert("An error occurred during registration. Please try again.");
    }
};
  
export { register };