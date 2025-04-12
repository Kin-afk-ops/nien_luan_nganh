export interface ProvinceInterface {
  province_id: string;
  province_name: string;
  province_type: string;
}

export interface DistrictInterface {
  district_id: string;
  district_name: string;
  district_type: string;
  location: number;
  province_id: string;
}

export interface WardInterface {
  district_id: string;
  ward_id: string;
  ward_name: string;
  ward_type: string;
}

export interface AddressForm {
  nameAddress: string;
  phoneAddress: string;
  province: string;
  provinceId: string;
  district: string;
  districtId: string;
  ward: string;
  wardId: string;
  address: string;
  default: boolean;
}
