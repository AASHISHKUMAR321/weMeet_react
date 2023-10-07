import React from "react";

export const Select = ({ title, data }) => {
  return (
    <div className="flex  flex-col gap-5 mt-2 text-xl ">
      <p>{title}</p>
      <select
        name=""
        id=""
        className="w-full p-3 border-2 border-blue-400 rounded-md overflow-hidden whitespace-nowrap text-ellipsis "
      >
        {data
          ? data.map((e) => {
              console.log(e.label.split(" ").slice(0, 4));
              let label = e.label.split(" ").slice(0, 4).join(" ");
              return (
                <option className=" w-[30%] " key={e.groupId} value={e.label}>
                  {label}
                </option>
              );
            })
          : ""}
      </select>
    </div>
  );
};
