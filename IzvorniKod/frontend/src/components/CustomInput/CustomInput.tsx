import { Dispatch, SetStateAction, useState } from "react";
import { cn } from "../../utils/cn.util";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

type CustomInputType = {
  rows?: number;
  errorMessage?: string;
  password?: boolean;
  placeholder: string;
  value?: string;
  setValue: Dispatch<SetStateAction<string>>;
  readOnly?: boolean;
  title: string;
};

export const CustomInput = ({
  rows,
  errorMessage,
  password,
  placeholder,
  value,
  setValue,
  readOnly,
  title,
}: CustomInputType) => {
  const [togglePassword, setTogglePassword] = useState(true);

  return (
    <div>
      <p
        className={cn("text-gray text-sm mb-1", errorMessage ? "text-red" : "")}
      >
        {title}
      </p>
      {rows ? (
        <textarea
          readOnly={readOnly}
          rows={rows}
          value={value}
          placeholder={placeholder}
          onChange={(event) => setValue(event.target.textContent ?? "")}
          className={cn(
            "rounded-lg border-[1px] border-gray_border text-sm px-4 py-2 w-full focus:border-gray focus:outline-none",
            errorMessage
              ? "border-red text-red placeholder:text-red placeholder:opacity-60"
              : ""
          )}
        />
      ) : (
        <div
          className={cn(
            "rounded-lg border-[1px] border-gray_border text-sm h-[40px] flex align-middle pl-4 w-full focus-within:border-gray",
            errorMessage
              ? "border-red text-red placeholder:text-red placeholder:opacity-60 focus-within:border-gray_border focus-within:border-[1px]"
              : ""
          )}
        >
          <input
            readOnly={readOnly}
            placeholder={placeholder}
            value={value}
            className="bg-transparent w-full focus:outline-none"
            type={password && togglePassword ? "password" : "text"}
            onChange={(event) => setValue(event.target.textContent ?? "")}
          />
          {password ? (
            togglePassword ? (
              <EyeIcon
                width={18}
                className="mr-2 cursor-pointer"
                onClick={() => {
                  setTogglePassword(!togglePassword);
                }}
              />
            ) : (
              <EyeSlashIcon
                width={18}
                className="mr-2 cursor-pointer"
                onClick={() => {
                  setTogglePassword(!togglePassword);
                }}
              />
            )
          ) : null}
        </div>
      )}

      {errorMessage ? (
        <p className="text-red text-xs pl-2 ">{errorMessage}</p>
      ) : null}
    </div>
  );
};
