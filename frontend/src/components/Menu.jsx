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


                        <h2>
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
                                        📊 Dashboard
                                    </Link>


                                    <Link
                                        to="/admin/products"
                                        style={styles.link}
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
        padding: "80px 30px 30px",
        zIndex: 999,
        boxShadow: "5px 0 25px rgba(0,0,0,0.05)",
        borderRight: "1px solid #f1f5f9",

        overflowY: "auto",
        overflowX: "hidden",
        WebkitOverflowScrolling: "touch"
    },

    // Liens du menu
    link: {
        display: "block",
        padding: "15px 20px",
        textDecoration: "none",
        color: "#475569", // Gris moderne, pas de noir agressif
        fontSize: "15px",
        fontWeight: "500",
        borderRadius: "12px",
        transition: "all 0.3s ease" // Animation fluide au survol
    },

    // Bouton Déconnexion
    logout: {
        marginTop: "40px",
        padding: "12px 20px",
        width: "100%",
        background: "#fee2e2", // Rouge très clair
        color: "#dc2626",
        border: "none",
        borderRadius: "12px",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "background 0.3s"
    }
};