import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

export default function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        const { data, error } = await supabase
            .from("orders")
            .select("*")
            .order("created_at", { ascending: false });

        if (!error) setOrders(data || []);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>📋 Mes commandes</h1>

            {orders.length === 0 ? (
                <p style={styles.empty}>Vous n'avez aucune commande pour le moment.</p>
            ) : (
                <div style={styles.list}>
                    {orders.map((order) => (
                        <div key={order.id} style={styles.card}>
                            <div style={styles.headerRow}>
                                <span style={styles.orderId}>CMD-#{order.id.slice(0, 8)}</span>
                                <span style={styles.statusBadge}>{order.status}</span>
                            </div>

                            <div style={styles.content}>
                                <div style={styles.infoGroup}>
                                    <span style={styles.label}>Client</span>
                                    <span style={styles.value}>{order.customer_name}</span>
                                </div>
                                <div style={styles.infoGroup}>
                                    <span style={styles.label}>Livraison</span>
                                    <span style={styles.value}>{order.address}, {order.district}</span>
                                </div>
                                <div style={styles.infoGroup}>
                                    <span style={styles.label}>Contact</span>
                                    <span style={styles.value}>{order.phone}</span>
                                </div>
                            </div>

                            <div style={styles.footer}>
                                <span style={styles.totalText}>Total : {order.total.toLocaleString()} FCFA</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        minHeight: "100vh",
        background: "#F8FAFC",
        padding: "30px 20px",
        fontFamily: "'Inter', sans-serif"
    },
    title: {
        color: "#0B3D91",
        fontSize: "28px",
        fontWeight: "900",
        textAlign: "center",
        marginBottom: "30px"
    },
    list: {
        maxWidth: "600px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "20px"
    },
    card: {
        background: "#ffffff",
        borderRadius: "20px",
        padding: "20px",
        border: "1px solid #E2E8F0",
        boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)"
    },
    headerRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "15px"
    },
    orderId: {
        fontSize: "14px",
        fontWeight: "600",
        color: "#64748B"
    },
    statusBadge: {
        background: "#FEF3C7", // Jaune clair pour rappel charte
        color: "#92400E",
        padding: "4px 12px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "700"
    },
    content: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: "20px"
    },
    infoGroup: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: "14px"
    },
    label: { color: "#94A3B8" },
    value: { fontWeight: "600", color: "#1E293B" },
    footer: {
        borderTop: "2px solid #F1F5F9",
        paddingTop: "15px",
        textAlign: "right"
    },
    totalText: {
        fontSize: "18px",
        fontWeight: "800",
        color: "#0B3D91"
    },
    empty: { textAlign: "center", color: "#94A3B8", marginTop: "50px" }
};