import {React, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Logo from '../../app/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCartShopping, faMagnifyingGlass, faBars, faUserNinja } from '@fortawesome/free-solid-svg-icons';
import { selectCategories, isLoading, loadAllCategories } from "./headerSlice";

export default function Header() {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);
    const isLoadingCategories = useSelector(isLoading);

    useEffect(() => {
        dispatch(loadAllCategories());
    }, [dispatch]);
   
    return (
        <nav>
            <NavLink exact to="/">
                <div className="nav-logo">
                    <img src={Logo} alt="Logo" className="logo"/>
                </div>
            </NavLink>
            <ul className="nav-links">
                <li key="all">
                    <NavLink 
                        exact to="/"
                        className="nav-link"
                        activeClassName="nav-link-active" >
                        Tous les produits
                    </NavLink>
                </li>
                { isLoadingCategories ? 
                    <li>Chargement liens menu...</li>
                    : 
                    categories.map((category) => (
                        <li key={category.id}>
                       <NavLink 
                        exact to={`/${category.name}-${category.id}`}
                        className="nav-link"
                        activeClassName="nav-link-active" >
                        {category.name}
                    </NavLink>
                        </li>
                    )) 
                }
            </ul>
            <div className="nav-icons">
                <NavLink exact to="/panier">
                    <div className="nav-search">
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" className="icon-size" />
                    </div>
                </NavLink>
                <NavLink exact to="/panier">
                    <div className="nav-cart">
                    <FontAwesomeIcon icon={faCartShopping} size="lg" className="icon-size" />
                    </div>
                </NavLink>
                <NavLink exact to="/account">
                    <div className="nav-login">
                    <FontAwesomeIcon icon={faUserNinja} size="lg" className="icon-size" />
                    </div>
                </NavLink>
                <NavLink exact to="/panier">
                    <div className="nav-menu-icon">
                    <FontAwesomeIcon icon={faBars} size="lg" className="icon-size" />
                    </div>
                </NavLink>
            </div>
        </nav>
      

    );
};