import React, { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { useNavigate } from "react-router-dom";

export default function Orders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [drivers, setDrivers] = useState([]);

    const navigate = useNavigate();
    const fetchOrders = async () => {

        const { data, error } = await supabase
            .from("orders")
            .select("*")
            .order("created_at", {
                ascending: false
            });

        if (error) {

            alert(error.message);
            return;
        }
        setOrders(data || []);
        setLoading(false);

    };

    const fetchDrivers = async () => {
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("role", "livreur");

        if (error) {
            console.log(error.message);
            return;

        }
        setDrivers(data || []);
    };
    useEffect(() => {

        fetchOrders();
        fetchDrivers();

    }, []);

    const assignDriver = async (orderId, driverId) => {
        const { error } = await supabase
            .from("orders")
            .update({
                driver_id: driverId
            })
            .eq("id", orderId);

        if (error) {

            alert(error.message);
            return;

        }

        alert("Livreur attribué ✅");

        fetchOrders();
    };

    const changeStatus = async (id, status) => {
        console.log("UPDATE :", id, status);

        const { data, error } = await supabase
            .from("orders")
            .update({
                status
            })
            .eq("id", id)
            .select();

        console.log("UPDATE DATA :", data);
        console.log("UPDATE ERROR :", error);

        if (error) {

            alert(error.message);
            return;

        }
        fetchOrders();
    };

    const deleteOrder = async (id) => {

        if (!window.confirm("Supprimer cette commande ?"))
            return;
        const { error } = await supabase
            .from("orders")
            .delete()
            .eq("id", id)
            .select();

        if (error) {

            alert(error.message);
            return;

        }
        fetchOrders();

    };
    const statusColor = (status) => {

        if (status === "Livrée")
            return "#16a34a";

        if (status === "Annulée")
            return "#dc2626";

        if (status === "En cours de livraison")
            return "#2563eb";

        if (status === "En préparation")
            return "#ea580c";

        return "#ca8a04";
    };

    if (loading)

        return (

            <h2 style={{
                textAlign: "center"
            }}>
                Chargement...
            </h2>
        );
    return (
        <div style={styles.container}>

            <button
                style={styles.back}
                onClick={() => navigate("/admin")}
            >
                ← Retour
            </button>


            <h1 style={styles.title}>
                📦 Gestion des commandes
            </h1>
            {
                orders.length === 0 ?
                    <p style={styles.empty}>
                        Aucune commande pour le moment
                    </p>
                    :
                    <div style={styles.grid}>
                        {
                            orders.map((order) => (
                                <div
                                    key={order.id}
                                    style={styles.card}
                                >
                                    <h2>
                                        🧾 Commande #{order.id}
                                    </h2>
                                    <h3>
                                        👤 {order.customer_name}
                                    </h3>
                                    <p>
                                        📞 {order.phone}
                                    </p>
                                    <p>
                                        📍 {order.city} - {order.address}
                                    </p>
                                    <hr />
                                    <h3>
                                        🛒 Produits
                                    </h3>

                                    {
                                        order.products?.map((item, index) => (

                                            <div
                                                key={index}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "15px",
                                                    marginBottom: "10px"
                                                }}
                                            >

                                                {
                                                    item.image && (
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            style={{
                                                                width: "70px",
                                                                height: "70px",
                                                                objectFit: "cover",
                                                                borderRadius: "10px"
                                                            }}
                                                        />
                                                    )
                                                }

                                                <div>
                                                    <p>
                                                        <b>{item.name}</b>
                                                    </p>

                                                    <p>
                                                        Quantité : {item.quantity}
                                                    </p>

                                                    <p>
                                                        Prix : {item.price} FCFA
                                                    </p>
                                                </div>

                                            </div>
                                        ))
                                    }
                                    <hr />
                                    <p>
                                        🚚 Livraison :
                                        <b> Gratuite</b>
                                    </p>

                                    <h2>
                                        💰 {order.total} FCFA
                                    </h2>

                                    <p>
                                        📅

                                        {
                                            new Date(order.created_at)
                                                .toLocaleString()
                                        }

                                    </p>

                                    <p>

                                        Statut :

                                        <hr />

                                        <h3>
                                            🚚 Livreur
                                        </h3>
                                        <select
                                            style={styles.select}
                                            value={order.driver_id || ""}
                                            onChange={(e) =>
                                                assignDriver(
                                                    order.id,
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                Choisir un livreur
                                            </option>
                                            {
                                                drivers.map((driver) => (

                                                    <option
                                                        key={driver.id}
                                                        value={driver.id}
                                                    >
                                                        {driver.email}
                                                    </option>

                                                ))
                                            }

                                        </select>

                                        <b
                                            style={{
                                                color:
                                                    statusColor(order.status)
                                            }}
                                        >

                                            {" "}
                                            {order.status}

                                        </b>

                                    </p>
                                    <select

                                        value={order.status}

                                        onChange={(e) =>
                                            changeStatus(
                                                order.id,
                                                e.target.value
                                            )
                                        }
                                        style={styles.select}

                                    >
                                        <option>
                                            En attente
                                        </option>

                                        <option>
                                            Confirmée
                                        </option>

                                        <option>
                                            En préparation
                                        </option>

                                        <option>
                                            En cours de livraison
                                        </option>

                                        <option>
                                            Livrée
                                        </option>

                                        <option>
                                            Annulée
                                        </option>

                                    </select>
                                    <button

                                        onClick={() =>
                                            deleteOrder(order.id)
                                        }

                                        style={styles.delete}
                                    >
                                        🗑 Supprimer

                                    </button>
                                </div>
                            ))
                        }
                    </div>}
        </div>

    );

}
const styles = {
    container: {
        maxWidth: "1100px",
        margin: "50px auto",
        padding: "0 20px"
    },
    title: {
        textAlign: "center",
        color: "#0B3D91",
        fontSize: "2.5rem",
        fontWeight: "800",
        marginBottom: "50px",
        letterSpacing: "-1px"
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
        gap: "30px"
    },
    card: {
        background: "#ffffff",
        padding: "30px",
        borderRadius: "24px",
        // Ombre très subtile et élégante
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)",
        border: "1px solid rgba(0,0,0,0.03)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease"
    },
    label: {
        fontSize: "0.85rem",
        fontWeight: "600",
        color: "#64748b",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        marginBottom: "10px",
        display: "block"
    },
    select: {
        width: "100%",
        padding: "14px 16px",
        borderRadius: "14px",
        border: "2px solid #f1f5f9",
        backgroundColor: "#f8fafc",
        fontSize: "1rem",
        color: "#1e293b",
        cursor: "pointer",
        appearance: "none", // Pour un look plus moderne
        transition: "border-color 0.2s"
    },
    delete: {
        marginTop: "25px",
        width: "100%",
        padding: "14px",
        background: "transparent",
        color: "#ef4444",
        border: "1px solid #fee2e2",
        borderRadius: "14px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.2s"
    },
    // Effets au survol pour rendre le tout "vivant"
    cardHover: {
        transform: "translateY(-8px)",
        boxShadow: "0 25px 30px rgba(0,0,0,0.1)"
    },

    back: {
        background: "#fff",
        border: "1px solid #e2e8f0",
        padding: "10px 15px",
        borderRadius: "10px",
        cursor: "pointer",
        marginBottom: "20px",
        fontWeight: "600",
        color: "#0B5ED7",
        display: "block",
    },
};