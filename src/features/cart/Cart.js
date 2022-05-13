import {React, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { selectToken } from "../account/accountSlice";
import {loadAllItems, selectItems, isLoading, orderItems} from './cartSlice';
import { loadAllProducts, selectProducts } from "../homepage/homepageSlice";
import ProductCard from "../../components/ProductCard";

export default function Cart() {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectItems);
    const isLoadingItems = useSelector(isLoading);
    const token = useSelector(selectToken);
    const products = useSelector(selectProducts);
    const history = useHistory();

    useEffect(() => {
        if(token){
            dispatch(loadAllItems(token));
            dispatch(loadAllProducts());

        }
    }, [dispatch, token]);

    const handleOrder = (e) => {
        e.preventDefault();
        dispatch(orderItems(token));
        const location = {
            pathname: `/commande/checkout`
          };
        history.push(location);
    };
    
    if(isLoadingItems){
        return <div>Chargement du panier...</div>
    }



    //Join cartItems array and products array to get product details + quantity
    const cartProducts = [];
    cartItems.map(item => {
        let found = products.find(element => element.id === item.product_id);
        found = {...found, quantity: item.quantity};
        cartProducts.push(found);
    });

    if(!token){
        return (
            <div className="cart-container">
                <p className="message">Vous devez être connecté pour voir votre panier.</p>
            </div>
        )
    }


    return (
        <div className="cart-container">
            <p>Vos articles :</p> 

            { cartProducts.length ? cartProducts.map((product) => (
                    <div key={product.id} className="cart-product">
                        <ProductCard id={product.id} name={product.name} url={product.image} description={product.description} prix={product.price} categorie={product.category_id}/>
                        <p>Quantité: {product.quantity}</p>
                    </div>
                )) 
                : 
                <p>Aucun produit dans votre panier.</p>
            }
            <div className="commande-container">
                <button className="button-infos" onClick={handleOrder}>Commander</button>
            </div>    

        </div>
    );
};