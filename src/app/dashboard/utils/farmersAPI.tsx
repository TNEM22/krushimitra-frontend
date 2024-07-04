import { getUser } from "@/app/utils/apis";

const GetFarmerName = async (farmerId: string) => {
  const farmer = await getUser(farmerId);
  // console.log(farmer.results.name);
  return farmer.results.name;
};

export default GetFarmerName;
