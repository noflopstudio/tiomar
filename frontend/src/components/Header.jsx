import React from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

export default function Header({ onMenuClick }) {

    const cart = useCartStore(
        (state) => state.cart
    );

    const totalItems = cart.reduce(
        (total, item) => total + Number(item.quantity || 1),
        0
    );

    return (
        <header style={styles.header}>

            {/* MENU */}
            <button
                onClick={onMenuClick}
                style={styles.menuButton}
            >

            </button>


            {/* LOGO CENTRE */}
            <Link to="/" style={styles.logo}>
                <span style={styles.logoYellow}>
                    TIO
                </span>
                <span style={styles.logoBlue}>
                    MAR
                </span>
            </Link>


            {/* PANIER */}
            <Link to="/cart" style={styles.cart}>

                🛒 panier

                {totalItems > 0 && (
                    <span style={styles.badge}>
                        {totalItems}
                    </span>
                )}

            </Link>

        </header>
    );
}
const styles = {

    header: {
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "#0B3D91",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 15px",
        width: "100%",
    },

    menuButton: {
        background: "transparent",
        border: "none",
        color: "#fff",
        fontSize: "20px",
        cursor: "pointer",
        padding: "5px"
    },

    logo: {
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        fontSize: "20px",
        fontWeight: "800",
        textDecoration: "none"
    },

    logoYellow: {
        color: "#D4A017"
    },
    logoBlue: {
        color: "#D4A017"
    },

    cart: {
        position: "relative",
        background: "#D4A017",
        color: "#0B3D91",
        padding: "8px 12px",
        borderRadius: "8px",
        fontWeight: "800",
        textDecoration: "none"
    },

    badge: {
        position: "absolute",
        top: "-8px",
        right: "-8px",
        background: "#dc2626",
        color: "#fff",
        width: "18px",
        height: "18px",
        borderRadius: "50%",
        fontSize: "11px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },



};