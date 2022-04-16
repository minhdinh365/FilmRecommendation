import React, { useEffect, useRef } from 'react'
import axios from 'axios';
import { LocalhostApi } from '../../API/const';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PayPal = (props) => {
    let username = props.paypal.userName;
    let price = props.paypal.price;

    const paypal = useRef();
    window.paypal.Buttons({
        createOrder: (data, actions) => {
            return actions.order.create({
                "purchase_units": [{
                    "amount": {
                        "currency_code": "USD",
                        "value": priceUpgrade(price),
                        "breakdown": {
                            "item_total": {
                                "currency_code": "USD",
                                "value": priceUpgrade(price),
                            }
                        }
                    },
                    "items": [
                        {
                            "name": "Upgrade package " + price,
                            "description": "Upgrade your account to watch all films on our website",
                            "unit_amount": {
                                "currency_code": "USD",
                                "value": priceUpgrade(price)
                            },
                            "quantity": "1"
                        },
                    ]
                }]
            });
        },
        onApprove: async (data, actions) => {
            return actions.order.capture().then(function (orderData) {
                const dataUpdate = {
                    package_up: price,
                    username: username,
                }
                axios.post(LocalhostApi + "upgrade_user", dataUpdate).then((data) => {
                    console.log(data.data);
                    if (data.data.success) {
                        toast.success(data.data.mgs, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    } else {
                        toast.warning(data.data.mgs, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                });
                return actions.order.capture().then(function (orderData) {


                });

            });


        },
        onError: (err) => {
            console.log(err);
        }
    }).render(paypal.current);
    function priceUpgrade(package_upgrade) {
        if (package_upgrade == 1)
            return '1.70';
        else if (package_upgrade == 2) return '17.42';
        else return '34.89';
    }
    return (
        <div ref={paypal}>
        </div>
    )
}
export default PayPal;
