import { Dispatch, SetStateAction, useState } from "react";
import { CustomInput } from "../CustomInput/CustomInput";
type CustomInputType = {
  variant_?: string;
};
export const CustomButton = ({ variant_ }: CustomInputType) => {
  const variant = variant_?.toLocaleLowerCase();
  if (variant === "cancel") {
    return (
      <button className="w-full h-[38] rounded bg-withe border-solid border-2 border-black">
        cancel
      </button>
    );
  } else if (variant === "logout") {
    return (
      <button className="w-full h-[38] rounded bg-primary border-solid border-2 border-black bg-primary text-white border-gray_border ">
        logout
      </button>
    );
  }
};
