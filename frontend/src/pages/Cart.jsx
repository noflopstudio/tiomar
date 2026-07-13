import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";


export default function Cart() {
    const [city, setCity] = useState("");
    const navigate = useNavigate();
    const cart = useCartStore(
        (state) => state.cart
    );

    const removeFromCart = useCartStore(
        (state) => state.removeFromCart
    );
    const increaseQuantity = useCartStore(
        (state) => state.increaseQuantity
    );
    const decreaseQuantity = useCartStore(
        (state) => state.decreaseQuantity);

    const total = cart.reduce(
        (sum, item) =>
            sum +
            Number(item.price) *
            Number(item.quantity || 1),
        0
    );

    const deliveryInfo = {

        "Abidjan": {
            price: 1000,
            delay: "24h - 48h"
        },

        "Bouaké": {
            price: 2500,
            delay: "2 à 3 jours"
        },

        "Yamoussoukro": {
            price: 2000,
            delay: "1 à 2 jours"
        },

        "Korhogo": {
            price: 3000,
            delay: "3 à 5 jours"
        },

        "San Pedro": {
            price: 3000,
            delay: "3 à 5 jours"
        }

    };

    const deliveryFee = 0;

    const deliveryDelay =
        deliveryInfo[city]?.delay ||
        "Choisissez une ville";

    const finalTotal =
        total + deliveryFee;
    return (
        <div style={styles.container}>

            <button
                style={styles.back}
                onClick={() => navigate("/")}
            >
                ← Retour
            </button>


            <h1 style={styles.title}>
                🛒 Mon panier TIOMAR
            </h1>
            {
                cart.length === 0 ?
                    (
                        <p style={styles.empty}>
                            Votre panier est vide
                        </p>
                    )
                    :
                    (
                        <>
                            <div style={styles.list}>
                                {
                                    cart.map((item) => (
                                        <div
                                            key={item.id}
                                            style={styles.card}
                                        >
                                            <img
                                                src={
                                                    item.image ||
                                                    "https://via.placeholder.com/120"
                                                }
                                                style={styles.image}
                                            />
                                            <div style={styles.info}>
                                                <h3 style={styles.productName}>
                                                    {item.name}
                                                </h3>
                                                <p style={styles.price}>
                                                    {item.price} FCFA
                                                </p>
                                                <div>
                                                    <button
                                                        style={styles.qtyButton}
                                                        onClick={() =>
                                                            decreaseQuantity(item.id)
                                                        }
                                                    >
                                                        -
                                                    </button>
                                                    <span style={styles.qty}>
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        style={styles.qtyButton}
                                                        onClick={() =>
                                                            increaseQuantity(item.id)
                                                        }
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <button
                                                    style={styles.delete}
                                                    onClick={() =>
                                                        removeFromCart(item.id)
                                                    }
                                                >
                                                    🗑️ Supprimer
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div style={styles.total}>
                                <div style={styles.delivery}>
                                    <p style={styles.blockTitle}>
                                        🚚 Livraison
                                    </p>
                                    <select
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        style={styles.select}
                                    >
                                        <option value="">
                                            Choisir votre ville
                                        </option>
                                        <option value="Abidjan">
                                            Abidjan
                                        </option>
                                        <option value="Bouaké">
                                            Bouaké
                                        </option>
                                        <option value="Yamoussoukro">
                                            Yamoussoukro
                                        </option>
                                        <option value="San Pedro">
                                            San Pedro
                                        </option>
                                        <option value="Korhogo">
                                            Korhogo
                                        </option>
                                        <option value="Daloa">
                                            Daloa
                                        </option>
                                        <option value="Man">
                                            Man
                                        </option>
                                        <option value="Gagnoa">
                                            Gagnoa
                                        </option>
                                        <option value="Abengourou">
                                            Abengourou
                                        </option>
                                        <option value="Bondoukou">
                                            Bondoukou
                                        </option>
                                        <option value="Odienné">
                                            Odienné
                                        </option>
                                        <option value="Divo">
                                            Divo
                                        </option>
                                        <option value="Soubré">
                                            Soubré
                                        </option>
                                        <option value="Agboville">
                                            Agboville
                                        </option>
                                        <option value="Grand-Bassam">
                                            Grand-Bassam
                                        </option>
                                        <option value="Anyama">
                                            Anyama
                                        </option>
                                        <option value="Bingerville">
                                            Bingerville
                                        </option>
                                        <option value="Ferkessédougou">
                                            Ferkessédougou
                                        </option>
                                    </select>
                                    <p style={styles.infoText}>
                                        🚚 Livraison vers : <b>{city || "Choisir une ville"}</b>
                                    </p>
                                    <p style={styles.infoText}>
                                        💰 Frais livraison : <b>Gratuit</b>
                                    </p>
                                    <p>
                                        ⏱️ Délai :
                                        <b>
                                            {deliveryDelay}
                                        </b>
                                    </p>
                                    <p style={styles.blockTitle}>
                                        💵 Paiement
                                    </p>
                                    <p>
                                        ✅ Paiement à la livraison
                                    </p>
                                    <p style={{ color: "#666", fontSize: "14px" }}>
                                        Vous payez uniquement lorsque le livreur vous remet votre commande.
                                    </p>
                                </div>
                                <p style={styles.summaryText}>
                                    Produits : {total} FCFA
                                </p>
                                <p style={styles.summaryText}>
                                    Livraison : {deliveryFee} FCFA
                                </p>
                                <p style={styles.finalTotal}>
                                    Total à payer : {finalTotal} FCFA
                                </p>
                                <button
                                    style={styles.checkout}
                                    onClick={() => {
                                        if (!city) {
                                            alert(
                                                "Choisissez une ville de livraison"
                                            );
                                            return;
                                        }
                                        navigate("/checkout", {
                                            state: {
                                                city,
                                                deliveryFee,
                                                deliveryDelay,
                                                finalTotal
                                            }
                                        });
                                    }}
                                >
                                    Commander
                                </button>
                            </div>
                        </>
                    )
            }
        </div>
    );
}
const styles = {
    container: {
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "25px 15px",
        fontFamily: "Segoe UI, Arial, sans-serif"
    },
    title: {
        textAlign: "left",
        maxWidth: "650px",
        margin: "0 auto 25px",
        color: "#0f172a",
        fontSize: "22px",
        fontWeight: "700"
    },
    list: {
        maxWidth: "650px",
        margin: "auto"
    },
    card: {
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "12px",
        marginBottom: "12px",
        display: "flex",
        alignItems: "center",
        gap: "12px"
    },
    image: {
        width: "75px",
        height: "75px",
        objectFit: "contain",
        borderRadius: "10px",
        background: "#f8fafc"
    },
    info: {
        flex: 1
    },
    productName: {
        fontSize: "15px",
        fontWeight: "600",
        color: "#1e293b",
        marginBottom: "5px"
    },
    price: {
        fontSize: "14px",
        color: "#D4A017",
        fontWeight: "700",
        marginBottom: "8px"
    },
    qty: {
        fontSize: "14px",
        fontWeight: "600",
        color: "#334155",
        margin: "0 10px"
    },
    qtyButton: {
        width: "24px",
        height: "24px",
        borderRadius: "6px",
        background: "#e2e8f0",
        color: "#0f172a",
        border: "none",
        fontSize: "14px",
        fontWeight: "700",
        cursor: "pointer"
    },
    delete: {
        marginTop: "10px",
        background: "transparent",
        color: "#dc2626",
        border: "none",
        padding: "0",
        fontSize: "12px",
        cursor: "pointer"
    },
    delivery: {
        maxWidth: "500px",
        margin: "15px auto",
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        padding: "12px"
    },
    blockTitle: {
        fontSize: "14px",
        fontWeight: "700",
        color: "#0B3D91",
        marginBottom: "8px"
    },
    select: {
        width: "100%",
        padding: "8px",
        borderRadius: "7px",
        border: "1px solid #cbd5e1",
        fontSize: "13px"
    },
    infoText: {
        fontSize: "13px",
        color: "#475569",
        marginTop: "8px",
        lineHeight: "1.4"
    },

    total: {
        maxWidth: "650px",
        margin: "20px auto",
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "18px"
    },
    summaryText: {
        fontSize: "14px",
        color: "#475569",
        marginBottom: "8px"
    },
    finalTotal: {
        fontSize: "18px",
        fontWeight: "700",
        color: "#0B3D91",
        marginTop: "15px"
    },
    checkout: {
        width: "100%",
        marginTop: "15px",
        padding: "13px",
        background: "#0B3D91",
        color: "#ffffff",
        borderRadius: "8px",
        border: "none",
        fontSize: "14px",
        fontWeight: "700",
        cursor: "pointer"
    },
    empty: {
        textAlign: "center",
        color: "#64748b",
        fontSize: "14px",
        marginTop: "40px"
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