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
    ContainerCard
} from './upgradeUser';
import { Wrapper } from "../../Components/Search/Search";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import PayPal from "../../Components/Paypal/PayPal";

const Upgrade = () => {

    const [success, setSuccess] = useState('');
    useEffect(() => {
        let isCancel = false;
        if (!isCancel) {
            setCookiesF();
        }
        return () => {
            isCancel = true
        }
    }, [success])
    async function setCookiesF() {
        const cookieUser = Cookies.get('User')
        if (cookieUser) {
            await setSuccess(jwt_decode(cookieUser).username)
        }
    }

    useEffect(() => {
        document.title = "Nâng cấp gói cước";
    })
    const [activeID, setActiveID] = useState(0);
    const Package = (e) => {
        setActiveID(e);
    };
    const [paypal, setPaypal] = useState({
        nameBtn: "Tiếp tục",
        price: activeID,
        userName: success,
    });
    useEffect(() => {
        setPaypal({
            nameBtn: "Tiếp tục",
            price: activeID,
            userName: success,
        })
    }, [activeID]);

    return (
        <div className="upgrade_user">
            <Header />
            {(success !== '') ?
                <Container>
                    <Address>Nâng cấp tài khoản của bạn</Address>
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
                                {activeID == item.id ?
                                    <PayPal paypal={paypal} onClick={() => setPaypal(paypal)}></PayPal>
                                    : null}
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