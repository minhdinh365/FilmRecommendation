import React, { useEffect } from "react";
import HeaderUser from '../../Components/NavUser'
import Information from '../../Components/InforUser'


const InforUser = () => {
  useEffect(() => {
    document.title = "Thông tin người dùng"
  })
  return (
    <div className="informatiton">
      <HeaderUser />
      <Information />
    </div>
  );
}

export default InforUser;
