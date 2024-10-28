import { Dispatch, SetStateAction } from "react";
import { cn } from "../../utils/cn.util";

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
            "rounded-lg border-[1px] border-gray_border text-base px-4 py-2 w-full focus:border-gray focus:outline-none",
            errorMessage
              ? "border-red text-red placeholder:text-red placeholder:opacity-60"
              : ""
          )}
        />
      ) : (
        <input
          readOnly={readOnly}
          placeholder={placeholder}
          value={value}
          type={password ? "password" : "text"}
          onChange={(event) => setValue(event.target.textContent ?? "")}
          className={cn(
            "rounded-lg border-[1px] border-gray_border text-base h-[40px] p-4 w-full focus:border-gray focus:outline-none",
            errorMessage
              ? "border-red text-red placeholder:text-red placeholder:opacity-60 "
              : ""
          )}
        />
      )}

      {errorMessage ? (
        <p className="text-red text-xs pl-2 ">{errorMessage}</p>
      ) : null}
    </div>
  );
};
