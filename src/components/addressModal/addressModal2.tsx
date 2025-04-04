"use client";
import { useEffect, useState } from "react";
import "./addressModal.css";
import {
  AddressForm,
  DistrictInterface,
  ProvinceInterface,
  WardInterface,
} from "@/interfaces/address";
import { getDistrictAddress, getProvincesAddress, getWardAddress } from "@/helpers/getAddress/getAddress";
import { AddressInterface } from "@/interfaces/addressUser";
import { validationEmpty } from "@/helpers/validation/address";

interface ChildProps {
  addressModal: boolean;
  setAddressModal: React.Dispatch<React.SetStateAction<boolean>>;
  addresses: AddressInterface[];
  setAddresses: React.Dispatch<React.SetStateAction<AddressInterface[]>>;
  indexAddress: any;
  editAddressMode: boolean;
}

const AddressModal: React.FC<ChildProps> = ({
  setAddressModal,
  addresses,
  setAddresses,
  indexAddress,
  editAddressMode,
}) => {
  const [provinces, setProvinces] = useState<ProvinceInterface[]>([]);
  const [districts, setDistricts] = useState<DistrictInterface[]>([]);
  const [wards, setWards] = useState<WardInterface[]>([]);

  const [nameAddress, setNameAddress] = useState<string>("");
  const [phoneAddress, setPhoneAddress] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [province, setProvince] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [ward, setWard] = useState<string>("");
  const [isDefaultAddress, setIsDefaultAddress] = useState<boolean>(false);

  const [nameAddressError, setNameAddressError] = useState<boolean>(false);
  const [addressError, setAddressError] = useState<boolean>(false);
  const [provinceError, setProvinceError] = useState<boolean>(false);
  const [districtError, setDistrictError] = useState<boolean>(false);
  const [wardError, setWardError] = useState<boolean>(false);

  useEffect(() => {
    const getProvince = async (): Promise<void> => {
      const provinceAddress = await getProvincesAddress();
      if (provinceAddress.length !== 0) {
        setProvinces(provinceAddress);
      }
    };
    getProvince();
  }, []);

  const handleChangeDistrict = async (value: string): Promise<void> => {
    if (value) {
      const districtAddress = await getDistrictAddress(value.split("_")[1]);
      setProvince(value.split("_")[0]);
      if (districtAddress.length !== 0) {
        setDistricts(districtAddress);
      }
    }
  };

  const handleChangeWard = async (value: string): Promise<void> => {
    if (value) {
      const wardAddress = await getWardAddress(value.split("_")[1]);
      setDistrict(value.split("_")[1]);
      if (wardAddress.length !== 0) {
        setWards(wardAddress);
      }
    }
  };

  const validationNameAddress = (): boolean => {
    if (validationEmpty(nameAddress)) {
      setNameAddressError(false);
      return true;
    }
    setNameAddressError(true);
    return false;
  };

  const validationProvince = (): boolean => {
    if (validationEmpty(province)) {
      setProvinceError(false);
      return true;
    }
    setProvinceError(true);
    return false;
  };

  const validationDistrict = (): boolean => {
    if (validationEmpty(district)) {
      setDistrictError(false);
      return true;
    }
    setDistrictError(true);
    return false;
  };

  const validationWard = (): boolean => {
    if (validationEmpty(ward)) {
      setWardError(false);
      return true;
    }
    setWardError(true);
    return false;
  };

  const validationAddress = (): boolean => {
    if (validationEmpty(address)) {
      setAddressError(false);
      return true;
    }
    setAddressError(true);
    return false;
  };

  const handleSubmit = async (): Promise<void> => {
    validationNameAddress();
    validationProvince();
    validationDistrict();
    validationWard();
    validationAddress();
    const newAddress: AddressForm = {
      nameAddress,
      phoneAddress,
      province,
      district,
      ward,
      address,
      default: isDefaultAddress,
    };
    
    if (newAddress) {
      setAddresses(prevAddresses => [...prevAddresses, newAddress]);
      setAddressModal(false);
      setNameAddress("");
      setPhoneAddress("");
      setProvince("");
      setDistrict("");
      setWard("");
      setAddress("");
      setIsDefaultAddress(false);
    } else {
      console.log("error");
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={() => setAddressModal(false)}></div>
      <div className="main-container address__modal--wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="address__modal--close">
          <i className="fa-solid fa-xmark" onClick={() => setAddressModal(false)}></i>
        </div>
        <div className="address__modal--top">
          <h3>Địa chỉ của bạn</h3>
          <p>Nhập địa chỉ của bạn</p>
        </div>
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }} 
          className="address__modal">
        <div className="address__modal--block address__modal--address">
            <label htmlFor="address__modal--ward">Địa chỉ</label>

            <textarea
              className={addressError ? "error" : "success"}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onFocus={() => setAddressError(false)}
              placeholder="Nhập địa chỉ"
              name=""
              id="address__modal--address"
              cols={40}
              rows={4}
            />
          </div>

          {/* Chọn tỉnh */}
          <div className="address__modal--block">
            <label htmlFor="address__modal--province">Tỉnh / thành phố</label>
            <select onChange={(e) => handleChangeDistrict(e.target.value)} className={provinceError ? "error" : "success"}>
              <option>Chọn tỉnh / thành phố</option>
              {provinces.map((p) => (
                <option value={p.province_name + "_" + p.province_id} key={p.province_id}>
                  {p.province_name}
                </option>
              ))}
            </select>
          </div>

          {/* Chọn quận */}
          <div className="address__modal--block">
            <label htmlFor="address__modal--district">Quận / huyện</label>
            <select onChange={(e) => handleChangeWard(e.target.value)} className={districtError ? "error" : "success"}>
              <option>Chọn quận / huyện</option>
              {districts.map((d) => (
                <option value={d.district_name + "_" + d.district_id} key={d.district_id}>
                  {d.district_name}
                </option>
              ))}
            </select>
          </div>

          {/* Chọn phường */}
          <div className="address__modal--block">
            <label htmlFor="address__modal--ward">Phường / xã</label>
            <select onChange={(e) => setWard(e.target.value)} className={wardError ? "error" : "success"}>
              <option>Chọn phường / xã</option>
              {wards.map((w) => (
                <option value={w.ward_name} key={w.ward_id}>
                  {w.ward_name}
                </option>
              ))}
            </select>
          </div>

          {/* Checkbox chọn làm địa chỉ mặc định */}
          <div className="address__modal--block d-flex align-items-center">
            <input type="checkbox" id="defaultAddress" checked={isDefaultAddress} onChange={() => setIsDefaultAddress(!isDefaultAddress)} />
            <label htmlFor="defaultAddress">Dùng địa chỉ mặc định</label>
          </div>

          <div className="address__modal--btn">
            <button
              className="transparent-btn"
              onClick={() => setAddressModal(false)}
            >
              Trở lại
            </button>
            <button className="secondary-btn" type="submit">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddressModal;
