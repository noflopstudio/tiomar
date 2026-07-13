import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

export default function Drivers() {

    const [drivers, setDrivers] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchDrivers = async () => {
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("role", "livreur")
            .order("created_at", {
                ascending: false
            });
        if (!error) {
            setDrivers(data || []);
        }
    };

    useEffect(() => {
        fetchDrivers();
    }, []);

    const addDriver = async (e) => {
        e.preventDefault();
        if (!email) return;
        setLoading(true);

        const { error } = await supabase
            .from("profiles")
            .insert([
                {
                    email: email,
                    role: "livreur"
                }
            ]);

        if (error) {
            alert(error.message);
            setLoading(false);
            return;

        }
        setEmail("");
        fetchDrivers();
        alert(
            "Livreur ajouté ✅"
        );
        setLoading(false);

    };
    const deleteDriver = async (id) => {

        const confirm = window.confirm(
            "Supprimer ce livreur ?"
        );
        if (!confirm) return;
        const { error } = await supabase
            .from("profiles")
            .delete()
            .eq("id", id);
        if (!error) {

            fetchDrivers();
        }
    };
    return (

        <div style={styles.container}>
            <h1 style={styles.title}>

                <button
                    style={styles.back}
                    onClick={() => navigate("/admin")}
                >
                    ← Retour
                </button>

                🚚 Gestion des livreurs
            </h1>
            <form
                onSubmit={addDriver}
                style={styles.form}
            >
                <input
                    type="email"
                    placeholder="Email du livreur"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />
                <button
                    style={styles.button}
                >
                    {
                        loading
                            ?
                            "Ajout..."
                            :
                            "➕ Ajouter livreur"
                    }
                </button>
            </form>
            <h2>
                Liste des livreurs
            </h2>
            <div style={styles.grid}>

                {
                    drivers.map((driver) => (
                        <div
                            key={driver.id}
                            style={styles.card}
                        >
                            🚚
                            <h3>
                                {driver.email}
                            </h3>
                            <p>
                                Rôle : {driver.role}
                            </p>
                            <button
                                onClick={() =>
                                    deleteDriver(driver.id)
                                }
                                style={styles.delete}
                            >
                                🗑️ Supprimer accès
                            </button>
                        </div>

                    ))
                }

            </div>
        </div>

    );

}

const styles = {
    container: {
        padding: "40px",
        maxWidth: "1200px",
        margin: "0 auto",
        fontFamily: "'Inter', sans-serif"
    },
    title: {
        color: "#0B3D91",
        fontSize: "2rem",
        fontWeight: "800",
        marginBottom: "40px",
        textAlign: "center"
    },
    form: {
        display: "flex",
        gap: "15px",
        marginBottom: "40px",
        justifyContent: "center",
        background: "#f8fafc",
        padding: "20px",
        borderRadius: "16px"
    },
    input: {
        padding: "14px 20px",
        width: "350px",
        borderRadius: "12px",
        border: "2px solid #e2e8f0",
        fontSize: "16px",
        outline: "none",
        transition: "border-color 0.3s"
    },
    button: {
        padding: "14px 25px",
        background: "#16a34a",
        color: "#fff",
        border: "none",
        borderRadius: "12px",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "transform 0.2s, background 0.3s"
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "25px"
    },
    card: {
        padding: "25px",
        background: "#fff",
        borderRadius: "20px",
        border: "1px solid #f1f5f9",
        boxShadow: "0 10px 20px -5px rgba(0,0,0,0.05)",
        transition: "transform 0.3s ease"
    },
    delete: {
        marginTop: "15px",
        background: "#fee2e2", // Rouge très clair (plus doux pour les yeux)
        color: "#dc2626",
        border: "none",
        padding: "12px",
        borderRadius: "10px",
        width: "100%",
        fontWeight: "600",
        cursor: "pointer",
        transition: "background 0.3s"
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
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
    },
};