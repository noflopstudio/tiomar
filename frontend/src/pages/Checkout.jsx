import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { useCartStore } from "../store/cartStore";
export default function Checkout() {

    const navigate = useNavigate();
    const cart = useCartStore(
        (state) => state.cart
    );
    const clearCart = useCartStore(
        (state) => state.clearCart
    );
    const [form, setForm] = useState({

        customer_name: "",

        phone: "",

        city: "",

        district: "",

        address: "",

        delivery_note: ""

    });
    const total = cart.reduce(

        (sum, item) =>

            sum +

            Number(item.price) *

            Number(item.quantity || 1),

        0

    );
    const handleChange = (e) => {
        setForm({

            ...form,

            [e.target.name]: e.target.value

        });
    };
    const submitOrder = async (e) => {
        e.preventDefault();
        if (cart.length === 0) {
            alert(
                "Votre panier est vide"
            );
            return;

        }
        const { error } = await supabase

            .from("orders")

            .insert([

                {
                    customer_name:
                        form.customer_name,
                    phone:
                        form.phone,
                    city:
                        form.city,
                    district:
                        form.district,
                    address:
                        form.address,
                    delivery_note:
                        form.delivery_note,
                    products:
                        cart,
                    total:
                        total,
                    status:
                        "En attente"
                }

            ]);

        if (error) {
            alert(
                "Erreur : " + error.message
            );
            return;


        }
        alert(
            "Commande envoyée avec succès ✅"
        );
        clearCart();
        navigate("/");
    };
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>
                🚚 Livraison TIOMAR
            </h1>
            <form

                onSubmit={submitOrder}

                style={styles.form}

            >
                <input

                    name="customer_name"

                    placeholder="Nom complet"

                    value={form.customer_name}

                    onChange={handleChange}

                    style={styles.input}

                    required

                />
                <input

                    name="phone"

                    placeholder="Numéro téléphone"

                    value={form.phone}

                    onChange={handleChange}

                    style={styles.input}

                    required

                />
                <input

                    name="city"

                    placeholder="Ville (ex: Abidjan)"

                    value={form.city}

                    onChange={handleChange}

                    style={styles.input}

                    required

                />
                <input

                    name="district"

                    placeholder="Commune / Quartier"

                    value={form.district}

                    onChange={handleChange}

                    style={styles.input}

                    required

                />
                <textarea

                    name="address"

                    placeholder="Adresse détaillée"

                    value={form.address}

                    onChange={handleChange}

                    style={styles.textarea}

                    required

                />
                <textarea

                    name="delivery_note"

                    placeholder="Information pour le livreur (optionnel)"

                    value={form.delivery_note}

                    onChange={handleChange}

                    style={styles.textarea}

                />

                <div style={styles.summary}>


                    <h3>
                        Résumé commande
                    </h3>
                    {
                        cart.map((item) => (

                            <p key={item.id}>

                                {item.name}
                                {" x "}
                                {item.quantity}
                            </p>
                        ))
                    }
                    <h2>

                        Total :
                        {total} FCFA

                    </h2>
                </div>
                <button
                    style={styles.button}
                >
                    ✅ Confirmer la commande
                </button>
            </form>
        </div>
    );
}
const styles = {
    container: {

        minHeight: "100vh",

        background: "#f5f7fb",

        padding: "30px"
    },
    title: {

        textAlign: "center",

        color: "#0B3D91"
    },

    form: {

        maxWidth: "600px",

        margin: "auto",

        background: "#fff",

        padding: "30px",

        borderRadius: "20px",

        boxShadow:
            "0 8px 20px rgba(0,0,0,0.1)"
    },
    input: {

        width: "100%",

        padding: "13px",

        marginBottom: "15px",

        borderRadius: "8px",

        border: "1px solid #ddd",

        boxSizing: "border-box"
    },
    textarea: {

        width: "100%",

        minHeight: "90px",

        padding: "13px",

        marginBottom: "15px",

        borderRadius: "8px",

        border: "1px solid #ddd",

        boxSizing: "border-box"
    },
    summary: {

        background: "#f8fafc",

        padding: "15px",

        borderRadius: "10px",

        marginBottom: "20px"
    },
    button: {

        width: "100%",

        padding: "15px",

        background: "#0B3D91",

        color: "#fff",

        border: "none",

        borderRadius: "10px",

        fontWeight: "900",

        cursor: "pointer"

    }
};