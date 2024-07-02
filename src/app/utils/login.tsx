import Cookies from "js-cookie";

export async function login(email: string, password: string) {
  try {
    const response = await fetch("http://localhost:3000/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    // console.log(data);

    if (data.status === "success") {
      // Store the JWT token as a cookie
      Cookies.set("token", data.token);

      // Store user details in local storage or cookies
      Cookies.set("user", JSON.stringify(data.data.user));

      // Redirect to a protected route or perform other actions
      window.location.href = "/dashboard";
    } else {
      console.error("Login failed:", data.message);
    }
    return data;
  } catch (error) {
    console.error("An error occurred during login:", error);
  }
}
