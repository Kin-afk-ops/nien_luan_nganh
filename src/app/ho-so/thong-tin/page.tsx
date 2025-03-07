"use client";
import Image from "next/image";
import Cropper, { Area } from "react-easy-crop";
import "../layout.css";
import "./page.css";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import formatDate from "@/helpers/format/formattedDate";
import AddressModal from "@/components/addressModal/AddressModal";
import { AddressInterface } from "@/interfaces/addressUser";

import { AvatarInterface } from "@/interfaces/avatar";

const ProfilePage = () => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1.1);
  const [checkFile, setCheckFile] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [addressModal, setAddressModal] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [avatar, setAvatar] = useState<AvatarInterface | null>(null);

  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);
  const [gender, setGender] = useState<string>("");
  const [genderError, setGenderError] = useState<boolean>(true);
  const [birthday, setBirthday] = useState<string>("Chọn ngày");
  const [birthdayError, setBirthdayError] = useState<boolean>(true);
  const [addresses, setAddresses] = useState<AddressInterface[]>([]);
  const [indexAddress, setIndexAddress] = useState<number | null>(null);
  const [editAddressMode, setEditAddressMode] = useState<boolean>(false);

  const [introduce, setIntroduce] = useState<string>("");

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    console.log(croppedArea, croppedAreaPixels);
  };
  return (
    <>
      <h3 className="profile__header">Thông tin của tôi</h3>
      <div className="main-container profile__info">
        <Cropper
          image="/assets/account/avatar_default.png"
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
        <div className="profile__info--top">
          <label htmlFor="profile__info--avatar">
            {checkFile ? (
              <Image
                className="profile__info--top-image"
                src={file ? URL.createObjectURL(file) : ""}
                alt="avatar "
                width={108}
                height={108}
              />
            ) : (
              <Image
                className="profile__info--top-image"
                src="/assets/account/avatar_default.png"
                alt="avatar default"
                width={108}
                height={108}
              />
            )}

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
            onChange={(e) => {
              setFile(e.target.files[0]);

              setCheckFile(true);
            }}
          />
        </div>

        <form className="profile__info--form" action="">
          <div className="profile__info--form-block">
            <label htmlFor="profile__info--form-name">Tên đầy đủ</label>

            <input
              className={
                nameError
                  ? "profile__info--form-name error"
                  : "profile__info--form-name success"
              }
              value={name}
              type="text"
              id="profile__info--form-name"
              placeholder="Nhập họ và tên"
              onChange={(e) => {
                if (e.target.value === "") setNameError(true);
                else setNameError(false);
                setName(e.target.value);
              }}
            />
            {nameError && (
              <span className="profile__info--message error">
                Vui lòng không được để trống
              </span>
            )}
          </div>

          <div className="profile__info--form-block">
            <label htmlFor="">Giới tính</label>
            <div className="profile__info--form-gender">
              <input
                type="radio"
                name="gender"
                id="gender__nam"
                checked={gender === "Nam"}
                onChange={() => setGender("Nam")}
              />
              <label htmlFor="gender__nam">Nam</label>
              <input
                type="radio"
                name="gender"
                id="gender__nu"
                checked={gender === "Nữ"}
                onChange={() => setGender("Nữ")}
              />
              <label htmlFor="gender__nu">Nữ</label>
              <input
                type="radio"
                name="gender"
                id="gender__khac"
                checked={gender === "Khác"}
                onChange={() => setGender("Khác")}
              />
              <label htmlFor="gender__khac">Khác</label>
              {genderError && (
                <span className="profile__info--message error">
                  Vui lòng không được để trống
                </span>
              )}
            </div>
          </div>

          <div className="profile__info--form-block">
            <label htmlFor="profile__info--form-date">Ngày sinh</label>

            <input
              className={
                birthdayError
                  ? "profile__info--form-date error"
                  : "profile__info--form-date success"
              }
              type="date"
              name=""
              id="profile__info--form-date"
              value={birthday}
              onChange={(e) => setBirthday(formatDate(e.target.value))}
            />
            {birthdayError && (
              <span className="profile__info--message error">
                Vui lòng không được để trống
              </span>
            )}
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
          addresses={addresses}
          setAddresses={setAddresses}
          indexAddress={indexAddress}
          editAddressMode={editAddressMode}
        />
      )}
    </>
  );
};

export default ProfilePage;
