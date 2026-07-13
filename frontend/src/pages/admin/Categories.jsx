import React, { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { useNavigate } from "react-router-dom";
export default function Categories() {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const [image, setImage] = useState("");
    const fetchCategories = async () => {
        const { data, error } = await supabase
            .from("categories")
            .select("*")
            .order("created_at", {
                ascending: false
            });

        if (!error) {
            setCategories(data || []);
        }
    };
    useEffect(() => {

        fetchCategories();
    }, []);
    const addCategory = async (e) => {
        e.preventDefault();

        if (!name) return;

        let imageUrl = "";

        if (image) {

            const fileName = `${Date.now()}-${image.name}`;

            const { error: uploadError } = await supabase
                .storage
                .from("products")
                .upload(fileName, image);

            if (uploadError) {
                alert(uploadError.message);
                return;
            }

            const { data } = supabase
                .storage
                .from("products")
                .getPublicUrl(fileName);

            imageUrl = data.publicUrl;
        }

        const { error } = await supabase
            .from("categories")
            .insert([
                {
                    name: name,
                    image: imageUrl
                }
            ]);

        if (error) {
            alert("Erreur : " + error.message);
            return;
        }

        setName("");
        setImage(null);
        fetchCategories();

        alert("Catégorie ajoutée ✅");
    };

    const deleteCategory = async (id) => {
        const confirmDelete = window.confirm(
            "Supprimer cette catégorie ?"
        );

        if (!confirmDelete) return;
        const { error } = await supabase
            .from("categories")
            .delete()
            .eq("id", id);
        if (!error) {
            fetchCategories();
        }
    };
    return (
        <div style={styles.container}>

            <button
                style={styles.back}
                onClick={() => navigate("/admin")}
            >
                ← Retour
            </button>

            <h1 style={styles.title}>
                📂 Catégories TIOMAR
            </h1>

            <form
                onSubmit={addCategory}
                style={styles.form}
            >
                <input
                    placeholder="Nom catégorie"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={styles.input}
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    style={styles.input}
                />

                <button
                    style={styles.button}
                >
                    ➕ Ajouter catégorie
                </button>
            </form>

            <div style={styles.grid}>
                {
                    categories.map((cat) => (
                        <div
                            key={cat.id}
                            style={styles.card}
                        >
                            <img
                                src={
                                    cat.image ||
                                    "https://via.placeholder.com/150"
                                }
                                style={styles.image}
                            />

                            <h3>
                                {cat.name}
                            </h3>

                            <button
                                onClick={() =>
                                    deleteCategory(cat.id)
                                }
                                style={styles.delete}
                            >
                                🗑️ Supprimer
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
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "25px 15px",
        fontFamily: "Segoe UI, Arial, sans-serif"
    },


    title: {
        textAlign: "left",
        color: "#0B3D91",
        fontSize: "22px",
        fontWeight: "700",
        marginBottom: "25px"
    },


    form: {
        maxWidth: "500px",
        margin: "0 auto 30px",
        background: "#ffffff",
        padding: "20px",
        borderRadius: "14px",
        border: "1px solid #e2e8f0"
    },


    input: {
        width: "100%",
        padding: "11px",
        marginBottom: "12px",
        borderRadius: "8px",
        border: "1px solid #cbd5e1",
        fontSize: "14px",
        boxSizing: "border-box",
        outline: "none"
    },


    button: {
        width: "100%",
        padding: "12px",
        background: "#0B3D91",
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "700",
        cursor: "pointer"
    },


    grid: {
        display: "grid",
        gridTemplateColumns:
            "repeat(auto-fit,minmax(200px,1fr))",
        gap: "15px"
    },


    card: {
        background: "#ffffff",
        padding: "15px",
        borderRadius: "14px",
        border: "1px solid #e2e8f0",
        textAlign: "left"
    },


    image: {
        width: "100%",
        height: "140px",
        objectFit: "contain",
        background: "#f8fafc",
        borderRadius: "10px",
        marginBottom: "10px"
    },


    productName: {
        fontSize: "15px",
        fontWeight: "700",
        color: "#1e293b"
    },


    price: {
        fontSize: "14px",
        fontWeight: "700",
        color: "#D4A017"
    },


    delete: {
        width: "100%",
        marginTop: "10px",
        background: "#dc2626",
        color: "#ffffff",
        border: "none",
        padding: "9px",
        borderRadius: "8px",
        fontSize: "13px",
        fontWeight: "600",
        cursor: "pointer"
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