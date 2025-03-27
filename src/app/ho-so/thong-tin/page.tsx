"use client";
import Image from "next/image";
// import Cropper, { Area } from "react-easy-crop";
import "../layout.css";
import "./page.css";
import "./responsive.css";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
// import formatDate from "@/helpers/format/formattedDate";
import AddressModal from "@/components/addressModal/AddressModal";
import { AddressInterface } from "@/interfaces/addressUser";

import { AvatarInterface } from "@/interfaces/avatar";
import { validationEmpty } from "@/helpers/validation/address";
import axiosInstance from "@/helpers/api/config";
import { useSelector } from "react-redux";
import { RootState } from "@/hooks/useAppDispatch";
import uploadImage from "@/helpers/image/uploadImage";
import { InfoUserInterface } from "@/interfaces/infoUser";
import formatDate from "@/helpers/format/formattedDate";
import formatDateToInput from "@/helpers/format/formatDateToInput";
import { ImageUploadInterface } from "@/interfaces/imageUpload";
import updateImage from "@/helpers/image/updateImage";
import Loading from "@/components/loading/Loading";
import NotificationModal from "@/components/notificationModal/NotificationModal";
import ProfileAccount from "@/components/profileAccount/ProfileAccount";

const ProfilePage = () => {
  const user =
    useSelector((state: RootState) => state.user.currentUser) || null;
  const [userId, setUserId] = useState<string | null>(null);
  // const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  // const [zoom, setZoom] = useState<number>(1.1);
  const [checkFile, setCheckFile] = useState<boolean>(false);
  const [addressModal, setAddressModal] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const [avatar, setAvatar] = useState<ImageUploadInterface>({
    path: "/assets/account/avatar_default.png",
    publicId: "",
  });

  const [avatarError, setAvatarError] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);
  const [gender, setGender] = useState<string>("");
  const [genderError, setGenderError] = useState<boolean>(false);
  const [birthday, setBirthday] = useState<string>("");
  const [birthdayError, setBirthdayError] = useState<boolean>(false);
  const [addresses, setAddresses] = useState<AddressInterface[]>([]);
  const [editAddressMode, setEditAddressMode] = useState<boolean>(false);
  const [indexAddress, setIndexAddress] = useState<number>(9999);

  const [introduce, setIntroduce] = useState<string>("");
  const [loadingAddress, setLoadingAddress] = useState<boolean>(false);
  const [addressId, setAddressId] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [notificationModal, setNotificationModal] = useState<boolean>(false);
  const [firebaseIsAccount, setFirebaseIsAccount] = useState<boolean>(false);

  // const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
  //   console.log(croppedArea, croppedAreaPixels);
  // };

  useEffect(() => {
    if (user) {
      setUserId(user._id);
      if (user.email !== "none") setEmail(user.email);

      if (user.phone !== "none") setPhone(user.phone);
      setFirebaseIsAccount(user?.firebase);
    }
    const getInfoUser = async (): Promise<void> => {
      setLoading(true);
      await axiosInstance
        .get(`/infoUser/${user?._id}`)
        .then((res) => {
          setEditMode(true);
          if (res.data.avatar) {
            setAvatar(res.data.avatar);
          }

          setName(res.data.name);
          setGender(res.data.gender);
          setBirthday(formatDateToInput(res.data.birthday));
          setIntroduce(res.data.introduce);
        })
        .catch((error) => {
          console.log(error);

          if (error.status === 404) {
            setEditMode(false);
          }
        });
      setLoading(false);
    };

    const getAddressInfoUser = async (): Promise<void> => {
      try {
        const res = await axiosInstance.get(`/addressInfoUser/${user?._id}`);
        setAddresses(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAddressInfoUser();
    getInfoUser();
  }, [user, userId, loadingAddress]);

  const validationName = (): boolean => {
    if (validationEmpty(name)) {
      setNameError(false);
      return true;
    } else {
      setNameError(true);
      return false;
    }
  };

  const validationBirthday = (): boolean => {
    if (validationEmpty(birthday)) {
      setBirthdayError(false);
      return true;
    } else {
      setBirthdayError(true);
      return false;
    }
  };

  const validationGender = (): boolean => {
    if (validationEmpty(gender)) {
      setGenderError(false);
      return true;
    } else {
      setGenderError(true);
      return false;
    }
  };

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    validationName();
    validationBirthday();
    validationGender();
    if (
      validationName() &&
      validationBirthday() &&
      validationGender() &&
      !avatarError
    ) {
      if (!editMode) {
        const image = await uploadImage(file);
        const infoUserForm: InfoUserInterface = {
          avatar: image,
          name: name,
          gender: gender,
          birthday: formatDate(birthday),
          introduce: introduce,
        };
        await axiosInstance
          .post(`/infoUser/${userId}`, infoUserForm)
          .then((res) => console.log(res))
          .catch((error) => console.log(error));

        setLoading(false);
      } else {
        console.log("editMode");

        const infoUserForm: InfoUserInterface = {
          avatar: checkFile
            ? await updateImage(file, avatar?.publicId)
            : avatar,
          name: name,
          gender: gender,
          birthday: formatDate(birthday),
          introduce: introduce,
        };
        await axiosInstance
          .put(`/infoUser/${userId}`, infoUserForm)
          .then((res) => console.log(res))
          .catch((error) => console.log(error));
      }
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (id: string): Promise<void> => {
    try {
      await axiosInstance.delete(`/addressInfoUser/${id}`);
      const res = await axiosInstance.get(`/addressInfoUser/${userId}`);
      setAddresses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <h3 className="profile__header">Thông tin của tôi</h3>
      <div className="main-container profile__info">
        {/* <Cropper
          image="/assets/account/avatar_default.png"
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        /> */}
        <div className="profile__info--top">
          <label htmlFor="profile__info--avatar">
            <Image
              className="profile__info--top-image"
              src={file ? URL.createObjectURL(file) : avatar?.path}
              alt="avatar "
              width={108}
              height={108}
            />

            <div className="profile__info--top-input">
              <i className="fa-solid fa-camera"></i>
            </div>
          </label>
          <div className="profile__info--name">
            {name !== "none" && <p>{name}</p>}
            {email !== "none" && <p>{email}</p>}
            {phone !== "none" && <p>{phone}</p>}
          </div>
          <input
            type="file"
            className="display-none"
            id="profile__info--avatar"
            onChange={(e) => {
              setFile(e.target.files[0]);

              if (e.target.files[0].type.startsWith("image/")) {
                setAvatarError(false);
              } else {
                setAvatarError(true);
              }

              setCheckFile(true);
            }}
          />

          {avatarError && (
            <p className="profile__avatar--error">Hãy chọn một hình ảnh</p>
          )}
        </div>

        <form
          className="profile__info--form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
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
              onFocus={() => setNameError(false)}
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
                onFocus={() => setGenderError(false)}
              />
              <label htmlFor="gender__nam">Nam</label>
              <input
                type="radio"
                name="gender"
                id="gender__nu"
                checked={gender === "Nữ"}
                onChange={() => setGender("Nữ")}
                onFocus={() => setGenderError(false)}
              />
              <label htmlFor="gender__nu">Nữ</label>
              <input
                type="radio"
                name="gender"
                id="gender__khac"
                checked={gender === "Khác"}
                onFocus={() => setGenderError(false)}
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
              onFocus={() => setBirthdayError(false)}
              onChange={(e) => setBirthday(e.target.value)}
            />
            {birthdayError && (
              <span className="profile__info--message error">
                Vui lòng không được để trống
              </span>
            )}
          </div>

          <div className="profile__info--address">
            <p>Địa chỉ</p>
            <div className="profile__info--address-container">
              {addresses?.length !== 0 &&
                addresses?.map((a, index) => (
                  <div className="profile__info--address-info" key={a._id}>
                    <span>
                      {a.nameAddress +
                        " | " +
                        a.address +
                        ", " +
                        a.ward +
                        ", " +
                        a.district +
                        ", " +
                        a.province}
                    </span>
                    <div className="profile__info--address-icon">
                      <i
                        className="fa-regular fa-pen-to-square"
                        onClick={() => {
                          setEditAddressMode(true);
                          setAddressId(a._id);
                          setIndexAddress(index);
                          setAddressModal(true);
                        }}
                      ></i>
                      <i
                        className="fa-regular fa-trash-can"
                        onClick={() => handleDeleteAddress(a._id)}
                      ></i>
                    </div>
                  </div>
                ))}
              <button
                className="profile__info--form-address-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setAddressModal(true);
                  setEditAddressMode(false);
                }}
              >
                <i className="fa-solid fa-plus"></i>
                Thêm mới
              </button>
            </div>
          </div>

          <div className="profile__info--form-block profile__info--form-introduce">
            <label htmlFor="profile__info--form-introduce">Giới thiệu</label>
            <textarea
              placeholder="Nhập giới thiệu"
              name=""
              id="profile__info--form-introduce"
              cols="50"
              rows="8"
              value={introduce}
              onChange={(e) => setIntroduce(e.target.value)}
            />

            <textarea
              placeholder="Nhập giới thiệu"
              name=""
              id="profile__info--form-introduce-mobile"
              className="profile__info--form-introduce-mobile"
              cols="43"
              rows="8"
              value={introduce}
              onChange={(e) => setIntroduce(e.target.value)}
            />
          </div>

          <button
            className="secondary-btn profile__info--form-save"
            type="submit"
          >
            Lưu thay đổi
          </button>
        </form>
      </div>

      {addressModal && (
        <AddressModal
          addressModal={addressModal}
          setAddressModal={setAddressModal}
          addresses={addresses}
          editAddressMode={editAddressMode}
          indexAddress={indexAddress}
          userId={userId}
          loadingAddress={loadingAddress}
          setLoadingAddress={setLoadingAddress}
          addressId={addressId}
        />
      )}

      <ProfileAccount
        phone={phone}
        email={email}
        userId={userId}
        firebaseIsAccount={firebaseIsAccount}
      />
    </>
  );
};

export default ProfilePage;
