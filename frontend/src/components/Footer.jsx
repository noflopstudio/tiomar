import { Link } from "react-router-dom";
import React from "react";

export default function Footer() {

    return (
        <footer style={styles.footer}>


            {/* PARTIE PRINCIPALE */}
            <div style={styles.container}>

                {/* LOGO */}
                <div style={styles.column}>

                    <img
                        src="/logo.png"
                        alt="TIOMAR"
                        style={styles.logo}
                    />


                    <p style={styles.text}>
                        TIOMAR Multiples Services,
                        votre partenaire de confiance
                        pour vos produits de quincaillerie,
                        matériaux de construction et solutions
                        adaptées à vos projets en Côte d'Ivoire 🇨🇮.
                        <br /><br />
                        Nous accompagnons particuliers,
                        professionnels et entreprises avec des
                        services de qualité, une approche innovante
                        et un engagement constant pour la satisfaction
                        de nos clients.
                    </p>

                </div>


                {/* LIENS */}
                <div style={styles.column}>

                    <h3 style={styles.title}>
                        Navigation
                    </h3>


                    <Link
                        to="/"
                        style={styles.link}
                    >
                        🏠 Accueil
                    </Link>


                    <Link
                        to="/cart"
                        style={styles.link}
                    >
                        🛒 Panier
                    </Link>


                    <Link
                        to="/orders"
                        style={styles.link}
                    >
                        📋 Mes commandes
                    </Link>

                    <Link
                        to="/about"
                        style={styles.link}
                    >
                        ℹ️ À propos
                    </Link>
                </div>


                {/* CONTACT */}
                <div style={styles.column}>

                    <h3 style={styles.title}>
                        Contact
                    </h3>


                    <p style={styles.text}>
                        📍 Côte d'Ivoire
                    </p>


                    <Link
                        to="/contact"
                        style={styles.link}
                    >
                        Contacter TIOMAR
                    </Link>

                </div>


            </div>



            {/* COPYRIGHT */}
            <div style={styles.bottom}>

                © {new Date().getFullYear()} TIOMAR - Tous droits réservés

            </div>


        </footer>
    );
}



const styles = {


    footer: {
        background: "#0B3D91",
        color: "#ffffff",
        marginTop: "50px",
        paddingTop: "40px"
    },


    container: {
        maxWidth: "1100px",
        margin: "auto",
        padding: "0 25px",
        display: "flex",
        justifyContent: "space-between",
        gap: "30px",
        flexWrap: "wrap"
    },


    column: {
        flex: "1",
        minWidth: "220px"
    },


    logo: {
        fontSize: "28px",
        fontWeight: "900",
        marginBottom: "12px"
    },


    yellow: {
        color: "#D4A017"
    },


    white: {
        color: "#ffffff"
    },


    title: {
        color: "#D4A017",
        fontSize: "18px",
        marginBottom: "15px"
    },


    text: {
        color: "#e2e8f0",
        fontSize: "14px",
        lineHeight: "1.6"
    },


    link: {
        display: "block",
        color: "#ffffff",
        marginBottom: "10px",
        fontSize: "14px"
    },


    bottom: {
        marginTop: "35px",
        padding: "15px",
        textAlign: "center",
        borderTop: "1px solid rgba(255,255,255,0.2)",
        fontSize: "13px"
    },

    logo: {
        width: "40px",
        height: "auto",
        objectFit: "contain",
        transform: "translateY(-5px)"
    },

};