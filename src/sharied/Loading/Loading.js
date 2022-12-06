import React from "react";
import ReactLoading from "react-loading";
const Loading = () => {
  return (
    <div className="flex justify-center mt-10">
      <ReactLoading color="red" type="spin" />
    </div>
  );
};

export default Loading;
