"use client";
import { useEffect, useState } from "react";
import "./addressModal.css";
import {
  DistrictInterface,
  ProvinceInterface,
  WardInterface,
} from "@/interfaces/address";
import {
  getDistrictAddress,
  getProvincesAddress,
  getWardAddress,
} from "@/helpers/getAddress/getAddress";

interface ChildProps {
  addressModal: boolean;
  setAddressModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddressModal: React.FC<ChildProps> = ({ setAddressModal }) => {
  const [modalCheck, setModalCheck] = useState<boolean>(false);
  const [provinces, setProvinces] = useState<ProvinceInterface[]>([]);
  const [districts, setDistricts] = useState<DistrictInterface[]>([]);
  const [wards, setWards] = useState<WardInterface[]>([]);

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
      if (districtAddress.length !== 0) {
        setDistricts(districtAddress);
      }
    }
  };

  const handleChangeWard = async (value: string): Promise<void> => {
    if (value) {
      const wardAddress = await getWardAddress(value.split("_")[1]);
      if (wardAddress.length !== 0) {
        setWards(wardAddress);
      }
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
        <form className="address__modal">
          <div className="address__modal--block">
            <label htmlFor="address__modal--province">Tỉnh / thành phố</label>

            <select
              name="province"
              id=""
              onChange={(e) => handleChangDistrict(e.target.value)}
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
              onChange={(e) => handleChangeWard(e.target.value)}
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

            <select name="ward" id="">
              <option>Chọn phường / xã</option>

              {wards?.map((w) => (
                <option value={w.ward_name + "_" + w.ward_id} key={w.ward_id}>
                  {w.ward_name}
                </option>
              ))}
            </select>
          </div>

          <div className="address__modal--block address__modal--ward">
            <label htmlFor="address__modal--ward">Địa chỉ</label>

            <textarea
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
              checked={modalCheck}
              type="checkbox"
              name=""
              id="address__modal--check"
              onChange={() => setModalCheck(!modalCheck)}
            />

            <label htmlFor="address__modal--check">
              {modalCheck ? (
                <i className="address__modal--checked fa-regular fa-circle-check"></i>
              ) : (
                <i className="fa-regular fa-circle"></i>
              )}
              Đặt làm địa chỉ mặc định
            </label>
          </div>

          <div className="address__modal--btn">
            <button
              className="transparent-btn"
              onClick={(e) => {
                e.preventDefault();
                setAddressModal(false);
              }}
            >
              Trở lại
            </button>
            <button
              className="secondary-btn"
              onClick={(e) => {
                e.preventDefault();
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
