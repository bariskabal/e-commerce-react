
export default async function getUserRoles() {

    const apiUrl = import.meta.env.VITE_API_BASE_URL
    const token = JSON.parse(localStorage.getItem("token"))
    try {
      const response = await fetch(
        `${apiUrl}/user/currentUserRoles`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.accessToken}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const userRole = await response.json();
      return userRole;
    } catch (error) {
      console.error("Error fetching user roles:", error.message);
      throw error;
    }
}