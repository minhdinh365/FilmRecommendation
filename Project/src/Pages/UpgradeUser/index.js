import React, { useState, useEffect } from "react";
import Header from '../../Components/Header/NavBar';
import Footer from '../../Components/Footer';
import { ListPrices } from "../../API/const";
import {
    Container,
    Card,
    NamePackage,
    CostPackage,
    DescriptionPackage,
    Address,
    ContainerCard,
    ButtonBuy
} from './upgradeUser';
import { Wrapper } from "../../Components/Search/Search";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import axios from "axios";
import { useLocation } from "react-router";
import UseFullLoading from "../../Components/FullPageLoading";
import { ToastContainer, toast } from "react-toastify";
import { LocalhostApi } from "../../API/const";
import "react-toastify/dist/ReactToastify.css";

const Upgrade = () => {
    const [loader, showLoader, hideLoader] = UseFullLoading();
    const parameter = useLocation().search
    const token = new URLSearchParams(parameter).toString();
    const [success, setSuccess] = useState('');
    useEffect(() => {
        showLoader();
        let isCancel = false;
        if (!isCancel) {
            setCookiesF();
            setTimeout(() => { hideLoader() }, 1000)
        }
        return () => {
            isCancel = true;
        }
    }, [success])
    async function setCookiesF() {
        const cookieUser = Cookies.get('User')
        if (cookieUser) {
            await setSuccess(jwt_decode(cookieUser).username)
        }
    }
    const [activeID, setActiveID] = useState(0);
    const Package = (e) => {
        setActiveID(e);
    };
    useEffect(() => {
        if (token.length > 0) {
            var confirm = {
                username: localStorage.getItem("username"),
                package_up: parseInt(localStorage.getItem("package"))
            }
            showLoader();
            let isActive = false;
            axios.post(LocalhostApi + "momo/confirm?" + token, confirm)
                .then((data) => {
                    if (!isActive) {
                        if (data.data.success) { toast.success("N??ng c???p g??i th??nh c??ng"); isActive = true; }
                        else toast.warning("C?? g?? ???? th???t b???i r???i", "N??ng c???p");
                        localStorage.removeItem("username");
                        localStorage.removeItem("package");
                        hideLoader();
                    }


                })
        }
    }, [activeID, token, success])
    useEffect(() => {
        document.title = "N??ng c???p g??i c?????c";
    })
    function PayBill(e) {
        var packageBill = {
            package_up: e.target.id
        }
        localStorage.setItem("package", packageBill.package_up);
        localStorage.setItem("username", success)
        axios.post(LocalhostApi + "momo/payment", packageBill)
            .then((data) => {
                window.location.href = data.data;
            })

    }
    return (
        <div className="upgrade_user">
            {loader}
            <ToastContainer />
            <Header />
            {(success !== '') ?
                <Container>
                    <Address>N??ng c???p t??i kho???n c???a b???n</Address>
                    <ContainerCard>
                        {ListPrices.map((item) => {
                            return <Card id={item.id} key={item.id} active={activeID == item.id ? "active" : null} onClick={() => { Package(item.id) }}>
                                <Wrapper>
                                    <NamePackage>
                                        {item.time}
                                    </NamePackage>
                                    <CostPackage>
                                        {item.price}
                                    </CostPackage>
                                    <DescriptionPackage>
                                        {item.description}
                                    </DescriptionPackage>
                                    <hr />
                                    <DescriptionPackage>
                                        {item.doit}
                                    </DescriptionPackage>
                                </Wrapper>
                                <ButtonBuy id={item.id} onClick={(e) => PayBill(e)}>Thanh To??n</ButtonBuy>
                            </Card>
                        })}
                    </ContainerCard>
                </Container>
                :
                <div className="information-detail-error"><img className="errorPage" src={process.env.PUBLIC_URL + "/images/errorPage.png"} /> </div>}
            <Footer />
        </div>
    )
};
export default Upgrade;