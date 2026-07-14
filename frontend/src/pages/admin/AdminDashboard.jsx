import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function AdminDashboard() {


    const navigate = useNavigate();


    const [admin, setAdmin] = useState(null);



    useEffect(() => {


        const checkAdmin = () => {


            const data =
                JSON.parse(
                    localStorage.getItem(
                        "tiomar_admin"
                    )
                );



            if (!data) {

                navigate("/login");
                return;

            }



            if (data.role !== "admin") {


                alert(
                    "Accès refusé 🚫"
                );


                navigate("/");


                return;

            }



            setAdmin(data);


        };



        checkAdmin();



    }, [navigate]);




    if (!admin) {


        return (

            <h2>
                Vérification accès...
            </h2>

        );

    }





    return (

        <div style={styles.container}>


            <h1 style={styles.title}>

                🏪 TIOMAR ADMIN

            </h1>



            <p style={styles.welcome}>

                Bienvenue {admin.email}

            </p>




            <button

                onClick={() =>
                    navigate("/")
                }

                style={styles.shopButton}

            >

                🏪 Voir la boutique

            </button>





            <div style={styles.grid}>


                <div

                    style={styles.card}

                    onClick={() =>
                        navigate("/admin/products")
                    }

                >

                    📦

                    <h3>
                        Produits
                    </h3>

                    <p>
                        Ajouter et modifier les produits
                    </p>

                </div>





                <div

                    style={styles.card}

                    onClick={() =>
                        navigate("/admin/products/add")
                    }

                >

                    ➕

                    <h3>
                        Ajouter produit
                    </h3>

                    <p>
                        Publier un nouvel article
                    </p>


                </div>





                <div

                    style={styles.card}

                    onClick={() =>
                        navigate("/admin/categories")
                    }

                >

                    📂

                    <h3>
                        Catégories
                    </h3>


                    <p>
                        Gérer les catégories
                    </p>


                </div>





                <div

                    style={styles.card}

                    onClick={() =>
                        navigate("/admin/orders")
                    }

                >

                    🛒

                    <h3>
                        Commandes
                    </h3>


                    <p>
                        Voir les commandes clients
                    </p>


                </div>





                <div

                    style={styles.card}

                    onClick={() =>
                        navigate("/admin/drivers")
                    }

                >

                    🚚

                    <h3>
                        Livreurs
                    </h3>


                    <p>
                        Gérer les livreurs
                    </p>


                </div>





                <div

                    style={styles.card}

                    onClick={() =>
                        navigate("/admin/stock")
                    }

                >

                    📊

                    <h3>
                        Stock
                    </h3>


                    <p>
                        Contrôler les stocks
                    </p>


                </div>




            </div>



        </div>

    );

}
const styles = {
    container: {

        minHeight: "100vh",

        padding: "30px",

        background: "#f5f7fb"

    },

    title: {

        textAlign: "center",

        color: "#0B3D91",

        fontSize: "32px"

    },
    welcome: {

        textAlign: "center",

        marginBottom: "40px"

    },

    grid: {

        display: "grid",

        gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",

        gap: "25px"

    },

    card: {

        background: "#fff",

        padding: "25px",

        borderRadius: "15px",

        cursor: "pointer",

        textAlign: "center",

        boxShadow:
            "0 8px 20px rgba(0,0,0,0.1)",

        fontSize: "35px",

        color: "#D4A017"

    },

    shopButton: {
        marginBottom: "25px",
        padding: "12px 20px",
        border: "none",
        borderRadius: "10px",
        background: "#0B3D91",
        color: "white",
        fontSize: "16px",
        cursor: "pointer"
    },



};