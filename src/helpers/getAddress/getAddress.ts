import {
  DistrictInterface,
  ProvinceInterface,
  WardInterface,
} from "@/interfaces/address";
import axios from "axios";

export const getProvincesAddress = async (): Promise<ProvinceInterface[]> => {
  try {
    const resProvince = await axios.get(
      "https://api.vnappmob.com/api/v2/province/"
    );
    return resProvince.data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getDistrictAddress = async (
  provinceID: string
): Promise<DistrictInterface[]> => {
  try {
    const resDistrict = await axios.get(
      `https://api.vnappmob.com/api/v2/province/district/${provinceID}`
    );
    return resDistrict.data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getWardAddress = async (
  districtID: string
): Promise<WardInterface[]> => {
  try {
    const resWard = await axios.get(
      `https://api.vnappmob.com/api/v2/province/ward/${districtID}`
    );
    return resWard.data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};
