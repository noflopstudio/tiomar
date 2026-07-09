import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
export default function LivreurDashboard() {
    const livreur = JSON.parse(
        localStorage.getItem("tiomar_livreur") || "null"
    );
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        if (livreur) {

            loadOrders();

        }
    }, []);

    const loadOrders = async () => {
        const { data, error } = await supabase
            .from("orders")
            .select("*")
            .eq("driver_id", livreur.id)
            .order("created_at", {
                ascending: false
            });

        console.log("Livraisons :", data);
        console.log("Erreur :", error);
        if (!error) {
            setOrders(data || []);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>
                🚚 TIOMAR LIVREUR
            </h1>
            <p>
                Bienvenue {livreur?.email}
            </p>
            <div style={styles.card}>
                📦
                <h3>
                    Mes livraisons
                </h3>
                {
                    orders.length === 0 ?
                        (
                            <p>
                                Vous n'avez aucune livraison pour le moment.
                            </p>
                        )
                        :
                        orders.map((order) => (
                            <div
                                key={order.id}
                                style={styles.order}
                            >
                                <h4>
                                    🚚 Commande
                                </h4>
                                <p>
                                    👤 Client :
                                    {order.customer_name}
                                </p>
                                <p>
                                    📞 Téléphone :
                                    {order.phone}
                                </p>
                                <p>
                                    📍 Adresse :
                                    {order.address}
                                </p>
                                <p>
                                    💰 Total :
                                    {order.total} FCFA
                                </p>
                                <p>
                                    📦 Statut :
                                    {order.status}
                                </p>
                            </div>
                        ))
                }
            </div>
        </div>

    );

}

const styles = {

    container: {
        padding: "30px",
        textAlign: "center"
    },

    title: {
        color: "#16a34a"
    },

    card: {
        margin: "30px auto",
        padding: "25px",
        maxWidth: "400px",
        background: "#fff",
        borderRadius: "15px",
        boxShadow: "0 5px 15px #ddd"
    }

};