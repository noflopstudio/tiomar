import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../services/supabase";

export default function Menu() {

    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);


    useEffect(() => {

        const checkUser = async () => {

            const {
                data: {
                    user
                }
            } = await supabase.auth.getUser();


            if (user) {

                setUser(user);


                const { data } = await supabase
                    .from("profiles")
                    .select("role")
                    .eq("email", user.email)
                    .single();


                if (data) {

                    setRole(data.role);

                }

            }

        };


        checkUser();


    }, []);



    const logout = async () => {

        await supabase.auth.signOut();

        window.location.reload();

    };
    const handleHover = (e) => {
        e.currentTarget.style.background = "#f8fafc";
        e.currentTarget.style.color = "#0B5ED7";
    };

    const handleLeave = (e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "#475569";
    };

    return (

        <>

            <button
                onClick={() => setOpen(!open)}
                style={styles.button}
            >
                ☰
            </button>


            {
                open && (

                    <div style={styles.menu}>


                        <h2 style={styles.titleLogo}>
                            🏪 TIOMAR
                        </h2>


                        {/* CLIENT */}

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
                            🛒 Mon panier
                        </Link>

                        <Link
                            to="/orders"
                            style={styles.link}
                        >
                            📋 Mes commandes
                        </Link>

                        <Link
                            to="/contact"
                            style={styles.link}
                        >
                            📞 Contact
                        </Link>

                        {
                            !user && (

                                <Link
                                    to="/login"
                                    style={styles.link}
                                >
                                    🔐 Connexion
                                </Link>

                            )
                        }



                        {/* ADMIN */}

                        {
                            role === "admin" && (

                                <>

                                    <hr />

                                    <h3>
                                        ⚙️ Administration
                                    </h3>


                                    <Link
                                        to="/admin"
                                        style={styles.link}
                                    >
                                        📊 Tableau de Bord
                                    </Link>


                                    <Link
                                        to="/admin/products"
                                        style={styles.link}

                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = "#f8fafc";
                                            e.currentTarget.style.color = "#0B5ED7";
                                        }}

                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = "transparent";
                                            e.currentTarget.style.color = "#475569";
                                        }}
                                    >
                                        📦 Produits
                                    </Link>


                                    <Link
                                        to="/admin/categories"
                                        style={styles.link}
                                    >
                                        📂 Catégories
                                    </Link>


                                    <Link
                                        to="/admin/orders"
                                        style={styles.link}
                                    >
                                        🛒 Commandes
                                    </Link>

                                    <Link
                                        to="/admin/drivers"
                                        style={styles.link}
                                    >
                                        🚚 Gestion des livreurs
                                    </Link>

                                </>

                            )
                        }

                        {
                            role === "livreur" && (

                                <>

                                    <hr />

                                    <h3>
                                        🚚 Livraison
                                    </h3>

                                    <Link
                                        to="/livreur"
                                        style={styles.link}
                                    >
                                        📦 Mes livraisons
                                    </Link>

                                </>

                            )
                        }

                        {
                            user && (

                                <button
                                    onClick={logout}
                                    style={styles.logout}
                                >
                                    🚪 Déconnexion
                                </button>

                            )
                        }


                    </div>

                )

            }

        </>

    );

}

const styles = {
    button: {
        position: "fixed",
        top: "12px",
        left: "15px",
        zIndex: 3000,
        fontSize: "26px",
        border: "none",
        background: "transparent",
        color: "#ffffff",
        cursor: "pointer",
        padding: "5px"
    },

    menu: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "280px",
        height: "100vh",
        background: "#ffffff",
        padding: "90px 20px 30px",
        zIndex: 999,
        boxShadow: "5px 0 25px rgba(0,0,0,0.08)",
        borderRight: "1px solid #f1f5f9",
        overflowY: "auto",
        overflowX: "hidden",
        WebkitOverflowScrolling: "touch",

        display: "flex",
        flexDirection: "column",
        gap: "10px"
    },

    link: {
        display: "flex",
        alignItems: "center",
        gap: "12px",

        padding: "14px 18px",
        textDecoration: "none",
        color: "#475569",
        fontSize: "15px",
        fontWeight: "500",

        borderRadius: "14px",
        transition: "0.3s",
        marginBottom: "5px"
    },

    logout: {
        marginTop: "30px",
        padding: "14px",
        width: "100%",
        background: "#fee2e2",
        color: "#dc2626",
        border: "none",
        borderRadius: "14px",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer"
    },

    linkHover: {
        background: "#f8fafc",
        color: "#0B5ED7"
    },

    titleLogo: {
        color: "#D4A017",
        textAlign: "center",
        fontSize: "24px",
        fontWeight: "700",
        marginBottom: "30px"
    },
};
