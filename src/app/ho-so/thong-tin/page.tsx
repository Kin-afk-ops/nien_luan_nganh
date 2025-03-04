"use client";
import Image from "next/image";
import "../layout.css";
import "./page.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import formatDate from "@/helpers/format/formattedDate";
import AddressModal from "@/components/addressModal/AddressModal";

const ProfilePage = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [addressModal, setAddressModal] = useState<boolean>(false);
  const [birthday, setBirthday] = useState<string>("Chọn ngày");

  return (
    <>
      <h3 className="profile__header">Thông tin của tôi</h3>
      <div className="main-container profile__info">
        <div className="profile__info--top">
          <label htmlFor="profile__info--avatar">
            <Image
              className="profile__info--top-image"
              src="/assets/account/avatar_default.png"
              alt="avatar default"
              width={108}
              height={108}
            />
            <div className="profile__info--top-input">
              <i className="fa-solid fa-camera"></i>
            </div>
          </label>
          <div className="profile__info--name">
            <p>Nguyen Vu Linh</p>
            <p>email</p>
            <p>sdt</p>
          </div>
          <input
            type="file"
            className="display-none"
            id="profile__info--avatar"
          />
        </div>

        <form className="profile__info--form" action="">
          <div className="profile__info--form-block">
            <label htmlFor="profile__info--form-name">Tên đầy đủ</label>

            <input
              className="profile__info--form-name success"
              type="text"
              id="profile__info--form-name"
              placeholder="Nhập họ và tên"
            />
          </div>

          <div className="profile__info--form-block">
            <label htmlFor="">Giới tính</label>
            <div className="profile__info--form-gender">
              <input type="radio" name="gender" id="gender__nam" />
              <label htmlFor="gender__nam">Nam</label>
              <input type="radio" name="gender" id="gender__nu" />
              <label htmlFor="gender__nu">Nữ</label>
              <input type="radio" name="gender" id="gender__khac" />
              <label htmlFor="gender__khac">Khác</label>
            </div>
          </div>
          <div className="profile__info--form-block">
            <label htmlFor="profile__info--form-date">Ngày sinh</label>

            <DatePicker
              className="profile__info--form-date"
              selected={startDate}
              onChange={(date) =>
                setBirthday(formatDate(new Date(date as Date)))
              }
              value={birthday}
              id="profile__info--form-date"
            />
            <label htmlFor="profile__info--form-date">
              <i className="profile__info--form-date-icon fa-regular fa-calendar-minus"></i>
            </label>
          </div>

          <div className="profile__info--form-block">
            <p className="profile__info--form-address">Địa chỉ</p>
            <button
              className="profile__info--form-address-btn"
              onClick={(e) => {
                e.preventDefault();

                setAddressModal(true);
              }}
            >
              <i className="fa-solid fa-plus"></i>
              Thêm mới
            </button>
          </div>

          <div className="profile__info--form-block profile__info--form-introduce">
            <label htmlFor="profile__info--form-introduce">Giới thiệu</label>
            <textarea
              placeholder="Nhập giới thiệu"
              name=""
              id="profile__info--form-introduce"
              cols="50"
              rows="8"
            />
          </div>

          <button className="secondary-btn profile__info--form-save">
            Lưu thay đổi
          </button>
        </form>
      </div>
      {addressModal && (
        <AddressModal
          addressModal={addressModal}
          setAddressModal={setAddressModal}
        />
      )}
    </>
  );
};

export default ProfilePage;
