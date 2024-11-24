import React from "react";

const ShowBalance = () => {
  return (
    <div className="shadow-md p-4 rounded-sm grid grid-cols-2 bg-white ">
      <div className="place-self-center">
        <h1 className="text-xl font-bold text-blue-950 uppercase">income</h1>
        <span className="text-green-700 font-semibold text-lg text-center">
          $23,034
        </span>
      </div>
      <div className="place-self-center">
        <h1 className="text-xl  font-bold text-blue-950 uppercase">expense</h1>
        <span className="text-red-700 font-semibold text-lg text-center">
          $23,034
        </span>
      </div>
    </div>
  );
};

export default ShowBalance;
