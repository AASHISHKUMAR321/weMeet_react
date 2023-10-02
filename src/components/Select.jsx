import React from "react";

export const Select = ({ title, data }) => {
  return (
    <div className="flex  flex-col gap-5 mt-2 ">
      <h1>{title}</h1>
      <select
        name=""
        id=""
        className="w-full p-4 border-2 border-blue-400 rounded-md"
      >
        {data
          ? data.map((e) => {
              return (
                <option
                  className="w-full overflow-auto"
                  key={e.groupId}
                  value={e.label}
                >
                  {e.label}
                </option>
              );
            })
          : ""}
      </select>
    </div>
  );
};
