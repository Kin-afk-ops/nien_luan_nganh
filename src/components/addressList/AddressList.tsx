"use client";
import { useEffect, useState } from "react";

import axiosInstance from "@/helpers/api/config";
import { AddressInterface } from "@/interfaces/addressUser";
import "./addressList.css";
import { usePathname } from "next/navigation";

interface ChildProps {
  setAddressModal: React.Dispatch<React.SetStateAction<boolean>>;
  addresses: AddressInterface[];
  setEditAddressMode: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | null;
  setIndexAddress: React.Dispatch<React.SetStateAction<number | null>>;
  setAddressId: React.Dispatch<React.SetStateAction<string>>;
  setAddresses: React.Dispatch<React.SetStateAction<AddressInterface[]>>;
  setChoiceAddress: React.Dispatch<
    React.SetStateAction<AddressInterface | null>
  >;
  setChoiceAddressModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddressList: React.FC<ChildProps> = ({
  userId,
  setAddressModal,
  setEditAddressMode,
  setAddressId,
  setIndexAddress,
  addresses,
  setAddresses,
  setChoiceAddress,
  setChoiceAddressModal,
}) => {
  const pathname = usePathname();

  const typeComponent = pathname.split("/")[1];

  interface DeleteAddressParams {
    id: string;
    isDefault: boolean;
  }
  const handleDeleteAddress = async ({
    id,
    isDefault,
  }: DeleteAddressParams): Promise<void> => {
    try {
      if (isDefault) {
        alert("Không thể xóa địa chỉ mặc định");
      } else {
        await axiosInstance.delete(`/addressInfoUser/${id}`);
        const res = await axiosInstance.get(`/addressInfoUser/${userId}`);
        setAddresses(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChoiceAddress = (address: AddressInterface) => {
    if (typeComponent === "dat-hang") {
      setChoiceAddress(address);
      setChoiceAddressModal(false);
    }
  };

  return (
    <div className="address__list--container">
      {addresses?.length !== 0 &&
        addresses?.map((a, index) => (
          <div
            className={
              a.default ? "address__list--info default" : "address__list--info"
            }
            key={a._id}
          >
            <span
              onClick={(e) => {
                e.stopPropagation();
                handleChoiceAddress(a);
              }}
            >
              {a.nameAddress +
                " " +
                a.phoneAddress +
                " | " +
                a.address +
                ", " +
                a.ward +
                ", " +
                a.district +
                ", " +
                a.province}
            </span>
            <div className="address__list--icon">
              <i
                className="fa-regular fa-pen-to-square"
                onClick={() => {
                  setEditAddressMode(true);
                  setAddressId(a._id);
                  setIndexAddress(index);
                  setAddressModal(true);
                }}
              ></i>
            </div>
          </div>
        ))}
      <button
        className="address__list--btn"
        onClick={(e) => {
          e.preventDefault();
          setAddressModal(true);
          setEditAddressMode(false);
        }}
        style={{ display: addresses.some(address => address === address) ? 'none' : 'inline-block' }}
      >
        <i className="fa-solid fa-plus"></i>
        Thêm mới
      </button>
    </div>
  );
};

export default AddressList;
