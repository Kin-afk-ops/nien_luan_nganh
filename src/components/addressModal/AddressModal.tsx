"use client";
import { useEffect, useState } from "react";
import "./addressModal.css";
import {
  AddressForm,
  DistrictInterface,
  ProvinceInterface,
  WardInterface,
} from "@/interfaces/address";
import {
  getDistrictAddress,
  getProvincesAddress,
  getWardAddress,
} from "@/helpers/getAddress/getAddress";
import { AddressInterface } from "@/interfaces/addressUser";
import {
  validationEmpty,
  validationPhoneAddress,
} from "@/helpers/validation/address";

interface ChildProps {
  addressModal: boolean;
  setAddressModal: React.Dispatch<React.SetStateAction<boolean>>;
  addresses: AddressInterface[];
  setAddresses: React.Dispatch<React.SetStateAction<AddressInterface[]>>;
  indexAddress: number;
  editAddressMode: boolean;
}

const AddressModal: React.FC<ChildProps> = ({
  setAddressModal,
  addresses,
  setAddresses,
  indexAddress,
  editAddressMode,
}) => {
  const [modalCheck, setModalCheck] = useState<boolean>(false);
  const [provinces, setProvinces] = useState<ProvinceInterface[]>([]);
  const [districts, setDistricts] = useState<DistrictInterface[]>([]);
  const [wards, setWards] = useState<WardInterface[]>([]);

  const [nameAddress, setNameAddress] = useState<string>("");
  const [nameAddressError, setNameAddressError] = useState<boolean>(false);
  const [phoneAddress, setPhoneAddress] = useState<string>("");
  const [phoneAddressError, setPhoneAddressError] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [addressError, setAddressError] = useState<boolean>(false);
  const [province, setProvince] = useState<string>("");
  const [provinceError, setProvinceError] = useState<boolean>(false);
  const [district, setDistrict] = useState<string>("");
  const [districtError, setDistrictError] = useState<boolean>(false);
  const [ward, setWard] = useState<string>("");
  const [wardError, setWardError] = useState<boolean>(false);

  const [defaultAddress, setDefaultAddress] = useState<boolean>(false);

  useEffect(() => {
    const getProvince = async (): Promise<void> => {
      const provinceAddress = await getProvincesAddress();
      if (provinceAddress.length !== 0) {
        setProvinces(provinceAddress);
      }
    };

    getProvince();
  }, []);

  const handleChangDistrict = async (value: string): Promise<void> => {
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

  const validationPhone = (): boolean => {
    if (validationPhoneAddress(phoneAddress)) {
      setPhoneAddressError(false);
      return true;
    }
    setPhoneAddressError(true);
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
    validationPhone();
    validationProvince();
    validationDistrict();
    validationWard();
    validationAddress();
    if (
      validationNameAddress() &&
      validationPhone() &&
      validationProvince() &&
      validationDistrict() &&
      validationWard() &&
      validationAddress()
    ) {
      const newAddress: AddressForm = {
        nameAddress: nameAddress,
        phoneAddress: phoneAddress,
        province: province,
        district: district,
        ward: ward,
        address: address,
        default: defaultAddress,
      };

      console.log(newAddress);
    } else {
      console.log("error");
    }
  };

  return (
    <>
      <div
        className="modal-overlay"
        onClick={(e) => {
          e.stopPropagation();
          setAddressModal(false);
        }}
      ></div>

      <div className="main-container address__modal--wrapper">
        <div className="address__modal--close">
          <i
            className="fa-solid fa-xmark"
            onClick={() => setAddressModal(false)}
          ></i>
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
          className="address__modal"
        >
          <div className="address__modal--block">
            <label htmlFor="address__modal--name">Tên</label>

            <input
              className={
                nameAddressError
                  ? "address__modal--name error"
                  : "address__modal--name success"
              }
              type="text"
              id="profile__info--name"
              placeholder="Nhập tên đầy đủ"
              onChange={(e) => setNameAddress(e.target.value)}
              onFocus={() => setNameAddressError(false)}
            />
          </div>

          <div className="address__modal--block">
            <label htmlFor="address__modal--phone">Số điện thoại</label>
            <div
              className={
                phoneAddressError
                  ? "address__modal--phone error"
                  : "address__modal--phone success"
              }
            >
              <span>+84</span>
              <input
                type="text"
                id="profile__info--phone"
                placeholder="Nhập số điện thoại"
                onChange={(e) => {
                  setPhoneAddress(e.target.value);
                }}
                onFocus={() => setPhoneAddressError(false)}
              />
            </div>
          </div>

          <div className="address__modal--block">
            <label htmlFor="address__modal--province">Tỉnh / thành phố</label>

            <select
              name="province"
              id=""
              onChange={(e) => {
                handleChangDistrict(e.target.value);
                setProvince(e.target.value);
              }}
              onFocus={() => setProvinceError(false)}
              className={provinceError ? "error" : "success"}
            >
              <option>Chọn tỉnh / thành phố</option>
              {provinces?.map((p) => (
                <option
                  value={p?.province_name + "_" + p?.province_id}
                  key={p?.province_id}
                >
                  {p?.province_name}
                </option>
              ))}
            </select>
          </div>

          <div className="address__modal--block">
            <label htmlFor="address__modal--district">Quận / huyện</label>

            <select
              name="district"
              id="address__modal--district"
              onChange={(e) => {
                handleChangeWard(e.target.value);

                setDistrict(e.target.value);
              }}
              onFocus={() => setDistrictError(false)}
              className={districtError ? "error" : "success"}
            >
              <option>Chọn quận / huyện</option>

              {districts?.map((d) => (
                <option
                  value={d.district_name + "_" + d.district_id}
                  key={d.district_id}
                >
                  {d?.district_name}
                </option>
              ))}
            </select>
          </div>

          <div className="address__modal--block">
            <label htmlFor="address__modal--ward">Phường / xã</label>

            <select
              name="ward"
              id=""
              onChange={(e) => setWard(e.target.value)}
              onFocus={() => setWardError(false)}
              className={wardError ? "error" : "success"}
            >
              <option>Chọn phường / xã</option>

              {wards?.map((w) => (
                <option value={w.ward_name} key={w.ward_id}>
                  {w.ward_name}
                </option>
              ))}
            </select>
          </div>

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
              cols="40"
              rows="4"
            />
          </div>
          <div className="address__modal--check">
            <input
              className="display-none"
              checked={defaultAddress}
              type="checkbox"
              name=""
              id="address__modal--check"
              onChange={() => {
                setDefaultAddress(!defaultAddress);
              }}
            />

            <label htmlFor="address__modal--check">
              {defaultAddress ? (
                <i className="address__modal--checked fa-regular fa-circle-check"></i>
              ) : (
                <i className="fa-regular fa-circle"></i>
              )}
              Đặt làm địa chỉ mặc định
            </label>
          </div>

          <div className="address__modal--btn">
            <button className="transparent-btn">Trở lại</button>
            <button
              className="secondary-btn"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddressModal;
