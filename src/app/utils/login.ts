import Cookies from "js-cookie";
import { toast, useToast } from "@/components/ui/use-toast";

export async function login(email: string, password: string) {
  // Show loading toast
  // const { toast } = useToast();
  const loadingToast = toast({
    title: "Logging in...",
    description: "Please wait while we log you in.",
  });

  try {
    const response = await fetch(
      "https://krushimitra-backend.onrender.com/api/v1/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
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
      // loadingToast.dismiss();
    } else {
      console.error("Login failed:", data.message);

      loadingToast.update({
        id: "logging",
        variant: "destructive",
        title: "Login failed",
        description: data.message,
      });
    }
    return data;
  } catch (error) {
    console.error("An error occurred during login:", error);
    toast({
      variant: "destructive",
      title: "Login failed",
      description: "An error occurred during login",
    });
  }
}
