import React from "react";
import { Link } from 'react-router-dom';

export default function ProductCard({id, name, url, description, prix, categorie}) {
  
   
    return (
    
    <div className="product-card" >
        <div className="card-img">
            <img src={`./img/${url}`} className="product-img" alt={`${name} - ${description}`}></img>
            <Link 
            key={1}
            to={`/produit/${id}`}>
                <div className="filtreBleu">
                    <div className="btnReveal">Découvrir</div>
                </div>
            </Link>
        </div>

        <div className="details">
            <h2 className="titre"> {name} </h2>
            <p className="prix">{prix}€</p>
            <p className="description">{description}</p>
        </div>

        <div className="colors">
            <h2 className="sousTitreC">Colors</h2>
            <div className="contRonds">
                <div className="ronds"></div>
                <div className="ronds"></div>
            </div>
        </div>
        <div className="plus-infos">
                <button className="button-infos">Ajouter au panier</button>
        </div>
    </div>
    );
};