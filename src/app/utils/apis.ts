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

export async function updateExpertStatus(
  jwt: string | undefined,
  status: string
) {
  try {
    const response = await fetch(
      "https://krushimitra-backend.onrender.com/api/v1/users/experts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ status: status }),
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("An error occurred during posting data:", error);
    toast({
      variant: "destructive",
      title: "Data Updation failed",
      description: "An error occurred during posting data",
    });
  }
}

export async function appointExpert(jwt: string | undefined, id: string) {
  try {
    const response = await fetch(
      "https://krushimitra-backend.onrender.com/api/v1/users/experts/book",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ id: id }),
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("An error occurred during posting data:", error);
    toast({
      variant: "destructive",
      title: "Data Updation failed",
      description: "An error occurred during posting data",
    });
  }
}

export async function rejectExpert(jwt: string | undefined, id: string) {
  try {
    const response = await fetch(
      "https://krushimitra-backend.onrender.com/api/v1/users/experts/book",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ id: id }),
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("An error occurred during posting data:", error);
    toast({
      variant: "destructive",
      title: "Data Updation failed",
      description: "An error occurred during posting data",
    });
  }
}

export async function getUser(id: string | undefined) {
  try {
    const response = await fetch(
      "https://krushimitra-backend.onrender.com/api/v1/users/farmer/" + id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("An error occurred during posting data:", error);
    toast({
      variant: "destructive",
      title: "Data Updation failed",
      description: "An error occurred during posting data",
    });
  }
}
