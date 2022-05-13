import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { selectProduct, loadProduct, isLoading, hasError, selectQuantity, addToCart, addQuantity, removeQuantity } from "./productSlice";
import { selectToken } from "../account/accountSlice";

export default function Product() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const product = useSelector(selectProduct);
    const quantity = useSelector(selectQuantity);
    const isLoadingProduct = useSelector(isLoading);
    const loadingError = useSelector(hasError);
    const token = useSelector(selectToken);

    useEffect(() => {
        dispatch(loadProduct(id));
    }, [dispatch]);

    const clickToCart = (e) => {
        e.preventDefault();
        alert("Ajouté au panier !");
        dispatch(addToCart({token: token, quantity: quantity, id: id}));
    };

    const handleMinus = (e) => {
        e.preventDefault();
        dispatch(removeQuantity());
    };
    const handlePlus = (e) => {
        e.preventDefault();
        dispatch(addQuantity());
    };


    return (
    <div className="product-container" >
        <div className="product" >
            <div className="product-image">
                <img src={`/img/${product.image}`} className="product-img" alt={`${product.name} - ${product.description}`}></img>
            </div>
            <div className="product-details">
                <h2 className="product-name"> {product.name} </h2>
                <p className="product-categorie">Catégorie #{product.category_id}</p>
                <p className="product-description">{product.description}</p>
                <p className="product-price">{product.price}€</p>
            </div>
            <div className="product-quantity">
                <div className="quantity-container">
                    <button className="-" onClick={handleMinus}>- </button>
                    <p className="quantity">{quantity}</p>
                    <button className="+" onClick={handlePlus}>+</button>
                </div>
                <div className="ajout-panier-container">
                    <button className="ajout-panier" onClick={clickToCart} >Ajouter au panier</button>
                </div>

            </div>
        </div>
    </div>
    );
};