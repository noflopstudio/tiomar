import React, { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { useNavigate } from "react-router-dom";
export default function Products() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchProducts = async () => {
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("created_at", {
                ascending: false
            });
        if (!error) {
            setProducts(data || []);
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchProducts();
    }, []);
    const deleteProduct = async (id) => {
        const confirmDelete = window.confirm(
            "Supprimer ce produit ?"
        );
        if (!confirmDelete) return;
        const { error } = await supabase
            .from("products")

            .delete()
            .eq("id", id);
        if (!error) {
            fetchProducts();
        }
    };
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>
                📦 Produits TIOMAR
            </h1>
            <button

                style={styles.add}

                onClick={() =>
                    navigate("/admin/products/add")
                }

            >
                ➕ Ajouter produit

            </button>
            {
                loading ?

                    (
                        <p>
                            Chargement...
                        </p>
                    )
                    :
                    (
                        <div style={styles.grid}>
                            {
                                products.map((product) => (
                                    <div
                                        key={product.id}
                                        style={styles.card}
                                    >
                                        <img
                                            src={
                                                product.image ||
                                                "https://via.placeholder.com/200"
                                            }
                                            style={styles.image}
                                        />
                                        <h3>
                                            {product.name}
                                        </h3>
                                        <p>
                                            {product.price} FCFA
                                        </p>
                                        <p>
                                            Stock :
                                            {product.stock}
                                        </p>
                                        <button
                                            style={styles.edit}
                                            onClick={() =>
                                                navigate(
                                                    `/admin/products/edit/${product.id}`
                                                )
                                            }
                                        >
                                            ✏️ Modifier
                                        </button>
                                        <button
                                            style={styles.delete}
                                            onClick={() =>
                                                deleteProduct(product.id)
                                            }
                                        >
                                            🗑️ Supprimer
                                        </button>
                                    </div>
                                ))
                            }
                        </div>
                    )
            }
        </div>
    );
}

const styles = {

    container: {
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "25px 20px",
        fontFamily: "Segoe UI, Arial, sans-serif"
    },


    title: {
        textAlign: "left",
        color: "#0B3D91",
        fontSize: "24px",
        fontWeight: "700",
        marginBottom: "20px"
    },


    add: {
        background: "#D4A017",
        color: "#111827",
        padding: "10px 18px",
        borderRadius: "8px",
        border: "none",
        fontSize: "14px",
        fontWeight: "700",
        cursor: "pointer",
        marginBottom: "25px"
    },


    grid: {
        display: "grid",
        gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
        gap: "18px"
    },


    card: {
        background: "#ffffff",
        borderRadius: "14px",
        padding: "15px",
        border: "1px solid #e2e8f0",
        display: "flex",
        flexDirection: "column",
        gap: "8px"
    },


    image: {
        width: "100%",
        height: "150px",
        objectFit: "contain",
        background: "#f8fafc",
        borderRadius: "10px"
    },


    productName: {
        fontSize: "15px",
        fontWeight: "700",
        color: "#1e293b",
        marginTop: "8px"
    },


    price: {
        fontSize: "14px",
        fontWeight: "700",
        color: "#D4A017"
    },


    stock: {
        fontSize: "13px",
        color: "#64748b"
    },


    edit: {
        width: "100%",
        padding: "9px",
        background: "#0B3D91",
        color: "#fff",
        borderRadius: "8px",
        border: "none",
        fontSize: "13px",
        fontWeight: "600",
        cursor: "pointer",
        marginTop: "8px"
    },


    delete: {
        width: "100%",
        padding: "9px",
        background: "#dc2626",
        color: "#fff",
        borderRadius: "8px",
        border: "none",
        fontSize: "13px",
        fontWeight: "600",
        cursor: "pointer"
    }

};