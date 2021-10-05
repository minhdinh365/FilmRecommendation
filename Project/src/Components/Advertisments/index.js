import React, {useState} from 'react'


export default function Index({start, end}) {
    const [NavbarRight, setNavbarRight] = useState(false);
    const [NavbarLeft, setNavbarLeft] = useState(false);

    const changBackgroundNavbar = () =>{
      if(window.scrollY >= start && window.scrollY <= end){
        setNavbarRight(true);
        setNavbarLeft(true);
      }
      else{
        setNavbarRight(false);
        setNavbarLeft(false);
      }
    }
    window.addEventListener('scroll', changBackgroundNavbar)
    return (
        <>
         <div className={NavbarLeft ? "advertisments-left show" : "advertisments-left"}>
           <a href = "https://www.fb88anh.com/vi-VN/Account/Register/?affiliateId=2715&cID=1066&tID=1956" >
              <img src= "https://i.imgur.com/ctnl7ZI.gif" alt ="NO Advertisment"/>
              <img src= "https://i.imgur.com/AZtG4fo.gif" alt ="NO Advertisment"/>
           </a>
        </div>
        <div className={NavbarRight ? "advertisments-right show" : "advertisments-right"}>
          <a href = "https://www.fb88anh.com/vi-VN/Account/Register/?affiliateId=2715&cID=1066&tID=1956" >
              <img src= "https://i.imgur.com/ctnl7ZI.gif" alt ="NO Advertisment"/>
              <img src= "https://i.imgur.com/AZtG4fo.gif" alt ="NO Advertisment"/>
           </a>
        </div>
        </>
    )
}
