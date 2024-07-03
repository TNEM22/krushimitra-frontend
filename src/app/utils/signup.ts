import Cookies from "js-cookie";
import { toast, useToast } from "@/components/ui/use-toast";

export async function signup(
  name: string,
  email: string,
  password: string,
  role: string,
  exp: string,
  hourlyRate: string
) {
  // Show loading toast
  // const { toast } = useToast();
  const loadingToast = toast({
    title: "Signing up...",
    description: "Please wait while we sign you up",
  });
  let body;
  role = role.toLowerCase();
  if (role === "expert") {
    body = {
      name,
      email,
      password,
      role,
      exp,
      hourlyRate,
    };
  } else {
    body = {
      name,
      email,
      password,
      role,
    };
  }

  try {
    const response = await fetch(
      "https://krushimitra-backend.onrender.com/api/v1/users/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    // console.log(data);

    if (data.status === "success") {
      // Store the JWT token as a cookie
      Cookies.set("token", data.token, { expires: 365 });

      // Store user details in local storage or cookies
      Cookies.set("user", JSON.stringify(data.data.user), { expires: 365 });

      // Redirect to a protected route or perform other actions
      window.location.href = "/dashboard";

      // Dismiss toast
      loadingToast.dismiss();
    } else {
      console.error("Signup failed:", data.message);

      loadingToast.update({
        id: "logging",
        variant: "destructive",
        title: "Signup failed",
        description: data.message,
      });
    }
    return data;
  } catch (error) {
    loadingToast.update({
      id: "logging",
      variant: "destructive",
      title: "Signup failed",
      description: "An error occurred during signup",
    });
    console.error("An error occurred during login:", error);
  }
}
