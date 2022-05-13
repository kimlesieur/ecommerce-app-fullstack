import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFacebook, faInstagram, faYoutube} from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
    

    return (
        <div className="footer">
            <div className="footer-left">
                <div className="newsletter-container">
                    <h3 className="newsletter-title">Inscrivez vous à notre Newsletter :</h3>
                    <input></input>
                </div>
                <div className="social-icons-container">
                    <ul className="social-icons-list">
                        <li className="social-icon"><a href="#"><FontAwesomeIcon icon={faFacebook} size="xl" style={{color:"#4267B2"}} /></a></li>
                        <li className="social-icon"><a href="#"><FontAwesomeIcon icon={faInstagram} size="xl"  style={{color:"#5851DB"}} /></a></li>
                        <li className="social-icon"><a href="#"><FontAwesomeIcon icon={faYoutube} size="xl"  style={{color:"#FF0000"}} /></a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-right">
                <ul className="footer-links">
                    <li><a href="#">Livraison &amp; Paiement</a></li>
                    <li><a href="#">Conditions Générales de Vente (CGV)</a></li>
                    <li><a href="#">Données personnelles et Confidentialité</a></li>
                    <li><a href="#">Mentions légales</a></li>
                </ul>					
            </div>
        </div>

        
    );
};