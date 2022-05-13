import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loadToken, selectToken, isLoading, loadUserInfo, selectUserInfos, loadOrders, selectOrders} from "./accountSlice";



export default function Account() {
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const isLoadingToken = useSelector(isLoading);
    const userInfos = useSelector(selectUserInfos);
    const orders = useSelector(selectOrders);
    //local states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isClick1, setIsClick1] = useState(false);
    const [isClick2, setIsClick2] = useState(false);

    useEffect(() => {
        dispatch(loadUserInfo(token));
        dispatch(loadOrders(token));
    }, [dispatch, token]);

    const handleSubmit = async e => {
        e.preventDefault();
        dispatch(loadToken({email: email, password: password}));
      };
    
//TODO Refactor the multiple handleOnClick methods. Check resource (?) : http://www.hackingwithreact.com/read/1/20/refactoring-our-state-code-passing-parameters-in-onclick
    const handleOnClick1 = (e) => {
        isClick1 ? setIsClick1(false) : setIsClick1(true);
    };
    const handleOnClick2 = (e) => {
        isClick2 ? setIsClick2(false) : setIsClick2(true);
    };


    

    if(token){

        return (
            <section className="account-container">
                <div className="account-title">
                    <h2>Bienvenue sur votre espace client {userInfos.firstname} !</h2>
                </div>
                <div className="account-tabs">
                    <article className="tab">
                        <div className="tab-title">
                            <p>Informations personnelles</p>
                            <button type="button" className={isClick1 ? "tab-btn-minus" : "tab-btn-plus"} onClick={handleOnClick1}>
                                {isClick1 ? (<span className="tab-plus-icon">
                                -
                                </span>)
                                : (<span className="tab-minus-icon">
                                +
                                </span>)
                                }
                            </button>
                        </div>
                        <div className={isClick1 ? "show-text" : "not-show-text"}>
                            <div className="infos-user">
                                    <div>
                                        <p>Nom : </p>
                                        <p>{userInfos.firstname} </p>
                                    </div>
                                    <div>
                                        <p>Prénom : </p>
                                        <p>{userInfos.lastname} </p>
                                    </div>
                                    <div>
                                        <p>Email : </p>
                                        <p>{userInfos.email} </p>
                                    </div>
                                    <div>
                                        <p>Compte crée le :</p>
                                        <p>{userInfos.date} </p>
                                    </div>
                                    <div>
                                        <p>Numéro d'identifiant :</p>
                                        <p>{userInfos.id} </p>
                                    </div>
                                </div>
                        </div>
                    </article>
                    <article className="tab">
                        <div className="tab-title">
                            <p>Vos commandes</p>
                            <button type="button" className={isClick2 ? "tab-btn-minus" : "tab-btn-plus"} onClick={handleOnClick2}>
                                {isClick2 ? (<span className="tab-plus-icon">
                                -
                                </span>)
                                : (<span className="tab-minus-icon">
                                +
                                </span>)
                                }
                            </button>
                        </div>
                        <div className={isClick2 ? "show-text" : "not-show-text"}>
                            <table className="infos-orders">
                                <tbody>
                                    <tr>
                                        <td>Numéro de Commande</td>
                                        <td>Passée le</td>
                                        <td>Statut </td>
                                        <td>Total</td>
                                    </tr>
                                    { orders.length ? 
                                    ( orders.map(order => (
                                        <tr key={order.id}>
                                            <td>#{order.id}</td>
                                            <td>{order.date}</td>
                                            <td>{order.status}</td>
                                            <td>{order.total}€</td>
                                            <td><Link to={{pathname:"/commande/checkout", state:{idState: order.id}}}><button>Payer</button></Link></td>
                                        </tr>
                                    ))
                                    ) : <p> Aucune commande passée :( </p>
                                }
                                
                                </tbody>
                            </table>
                        </div>
                    </article>
                </div>
            </section>
        )
    }

    if(isLoadingToken){
        return (
            <div className="message attente">
                <p>Chargement espace client...</p>
            </div>
        )
    }

    return (
        <div className="login-container">
            <div className="login-form-container">
                <h1>Connectez-vous :</h1>
                <form className="login-form" onSubmit={handleSubmit} >
                    <label>
                        <p>Email :</p>
                        <input name='email' type='text' onChange={e => setEmail(e.target.value)} placeholder='test@test.fr' require/>
                    </label>
                    <label>
                        <p>Mot de passe :</p>
                        <input name='password' type="password" onChange={e => setPassword(e.target.value)} placeholder='*****' require/> 
                    </label>
                    <div>
                        <input type='submit' />
                    </div>
                </form>
            </div>
            <div className="register-form-container">
                <p>Ou créer un compte :</p>
                <Link to={"/register"}><button>Créer un compte</button></Link>
            </div>
        </div>
    );
};