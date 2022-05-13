import {React, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { isLoading, loadAllProducts, selectProducts } from "./homepageSlice";

export default function Homepage() {
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const isLoadingProducts = useSelector(isLoading);
    const {category} = useParams();

    useEffect(() => {
        dispatch(loadAllProducts(category));
    }, [dispatch, category]);

    if (isLoadingProducts) {
        return <div>Chargement des produits...</div>
      }

    return (
        <div className="home">
            { products.length ? (
                products.map((product) => (
                    <div key={product.id}>
                         <ProductCard id={product.id} name={product.name} url={product.url} description={product.description} prix={product.price} categorie={product.category_id}/>
                    </div>
                ))
            ) : (
                <p className="message">Aucun produit visible.</p>
            )
            
        }
        </div>
    );
};