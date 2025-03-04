"use client";
import { useEffect, useState } from "react";
import "./addressModal.css";
import axios from "axios";
import { ProvinceInterface } from "@/interfaces/address";

interface ChildProps {
  addressModal: boolean;
  setAddressModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddressModal: React.FC<ChildProps> = ({ setAddressModal }) => {
  const [modalCheck, setModalCheck] = useState<boolean>(false);
  const [provinces, setProvinces] = useState<ProvinceInterface[]>([]);

  useEffect(() => {
    const getProvince = async (): Promise<void> => {
      try {
        const resProvince = await axios.get(
          "https://api.vnappmob.com/api/v2/province/"
        );
        setProvinces(resProvince.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getProvince();
  }, []);

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

            <select name="province" id="">
              <option>Chọn tỉnh / thành phố</option>
              {provinces?.map((p, index) => (
                <option value={p?.province_name} key={index}>
                  {p?.province_name}
                </option>
              ))}
            </select>
          </div>

          <div className="address__modal--block">
            <label htmlFor="address__modal--district">Quận / huyện</label>

            <select name="district" id="">
              <option>Chọn quận / huyện</option>
              <option value="">Chọn </option>
            </select>
          </div>

          <div className="address__modal--block">
            <label htmlFor="address__modal--ward">Phường / xã</label>

            <select name="ward" id="">
              <option>Chọn phường / xã</option>
              <option value="">Chọn </option>
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
