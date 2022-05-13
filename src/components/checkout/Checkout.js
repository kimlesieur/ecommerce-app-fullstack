import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Link, useHistory } from "react-router-dom";
import {orderId, changeOrderId} from '../../features/cart/cartSlice';
import { loadOrderDetails, selectOrder, isLoadingOrder, hasErrorOrder, sendCheckout } from "./checkoutSlice";
import { selectToken } from "../../features/account/accountSlice";

export default function Checkout(){
    const dispatch = useDispatch();
    const history = useHistory();
    const token = useSelector(selectToken);
    const location = useLocation();
    const order = useSelector(selectOrder);
    const isLoading = useSelector(isLoadingOrder);
    const hasError = useSelector(hasErrorOrder);
    const id = useSelector(orderId);

    
    const handleOnClick = (e) => {
        e.preventDefault();
        dispatch(sendCheckout({token: token, orderId: order.id}));
        const location = {
            pathname: `/commande/validation`
          };
        history.push(location);

    }
  
    if(location.state){
        const idState = location.state.idState;
        dispatch(changeOrderId(idState));
    }

    useEffect(()=> {
        dispatch(loadOrderDetails({token: token, id: id}));
    }, [dispatch, token, id]);


    if(!id && !location.state){
        return (
            <div className="checkout-container">
                <p>Aucune commande ne correspond à ce numéro.</p>
            </div>
        )
    }

    return(
        <div className="checkout-container">
             <div className="checkout-title">
                    <h2>Page de paiement</h2>
            </div>
            <div className="checkout-infos">
                <p>Votre commande numéro {order.id} datant du {order.date} pour un total de {order.total}€</p>
            </div>
            <div className="checkout-payment-form">
                <div className="card-select-container">
                    <label for="card-select" className="card-label">Type de carte </label>
                    <select name="card-type" id="card-type">
                        <option value="Visa">Visa</option>
                        <option value="Mastercard">Mastercard</option>
                    </select>
                </div>
                <div className="card-numbers-container">
                    <label for="card-numbers" className="card-label">Numéro de carte : </label>
                    <input placeholder="4158-4789-5689-5821"></input>
                </div>
                <div className="card-date-container">
                    <label for="card-date" className="card-label">Date d'expiration : </label>
                    <input placeholder="numéro de carte..."></input>
                </div>
                <div className="card-csv-container">
                    <label for="card-csv" className="card-label">Numéro confidentiel : </label>
                    <input placeholder="numéro de carte..."></input>
                </div>
            </div>
            <div className="checkout-button">
                <Link to={{pathname:"/commande/checkout/validation", state:{order: order}}}>
                    <button onClick={handleOnClick}>Payer</button>
                </Link>
            </div>
        </div>
    )
}