import { useState } from "react";
import { cn } from "../../utils/cn.util";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

type CustomInputType = {
  rows?: number;
  errorMessage?: string;
  placeholder: string;
  value?: string;
  readOnly?: boolean;
  title: string;
  required?: boolean;
  type?: "password" | "email" | "text";
  onChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
};

export const CustomInput = ({
  rows,
  errorMessage,
  type,
  placeholder,
  value,
  readOnly,
  title,
  onChange,
  required = false,
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
          required={required}
          readOnly={readOnly}
          rows={rows}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
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
            "rounded-lg border-[1px] border-gray_border text-sm h-[40px] flex align-middle px-4 w-full focus-within:border-gray bg-white",
            errorMessage
              ? "border-red text-red placeholder:text-red placeholder:opacity-60 focus-within:border-gray_border focus-within:border-[1px]"
              : ""
          )}
        >
          <input
            required={required}
            readOnly={readOnly}
            placeholder={placeholder}
            value={value}
            className=" w-full focus:outline-none"
            type={type && togglePassword ? type : "text"}
            onChange={onChange}
          />

          {type === "password" ? (
            togglePassword ? (
              <EyeIcon
                title="Show password"
                width={18}
                className="mr-2 cursor-pointer"
                onClick={() => {
                  setTogglePassword(!togglePassword);
                }}
              />
            ) : (
              <EyeSlashIcon
                title="Hide password"
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
