import Image from "next/image";
import "../layout.css";
import "./page.css";

const ProfilePage = () => {
  return (
    <>
      <h3 className="profile__header">Thông tin của tôi</h3>
      <div className=" main-container grid profile__info">
        <div className="profile__info--top">
          <Image
            src="/assets/account/avatar_default.png"
            alt="avatar default"
            width={108}
            height={108}
          />
        </div>
        <div className="profile__info--top-input">
          <i className="fa-solid fa-camera"></i>
        </div>
        <p>Nguyen Vu Linh</p>
        <form className="profile__info--form" action="">
          <div className="profile__info--form-block">
            <label htmlFor="profile__info--form-name">Tên đầy đủ</label>
            <input type="text" id="profile__info--form-name" />
          </div>

          <div className="profile__info--form-block">
            <label htmlFor="">Giới tính</label>
            <input type="radio" name="gender" id="" />
            <span>Nam</span>
            <input type="radio" name="gender" id="" />
            <span>Nữ</span>
            <input type="radio" name="gender" id="" />
            <span>Khác</span>
          </div>
          <div className="profile__info--form-block">
            <label htmlFor="profile__info--form-date">Ngày sinh</label>
            <input type="date" name="" id="profile__info--form-date" />
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfilePage;
