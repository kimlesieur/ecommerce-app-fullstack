import React from "react";
import { Route, Link } from "react-router-dom";

export default function Register(){

    return(
        <div className="register-container">
            <p>Créer votre compte :</p>
            <Link to={"/test"}><button>Créer votre compte</button></Link>
            <Route path="/test"> </Route>
        </div>
    )
}