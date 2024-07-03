import { toast } from "@/components/ui/use-toast";

export async function getExperts() {
  try {
    const response = await fetch(
      "https://krushimitra-backend.onrender.com/api/v1/users/experts",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    // console.log(data);

    return data;
  } catch (error) {
    console.error("An error occurred during loading data:", error);
    toast({
      variant: "destructive",
      title: "Data Loading failed",
      description: "An error occurred during loading data",
    });
  }
}
