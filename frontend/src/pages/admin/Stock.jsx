import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

export default function Stock() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const fetchProducts = async () => {
        const { data, error } = await supabase

            .from("products")
            .select("*")
            .order("name");
        if (!error) {
            setProducts(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {

        fetchProducts();
    }, []);

    const updateStock = async (id, newStock) => {

        const { error } = await supabase

            .from("products")
            .update({
                stock: Number(newStock)

            })
            .eq("id", id);

        if (!error) {
            fetchProducts();
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
                📊 Gestion du Stock TIOMAR
            </h1>

            {
                loading ?

                    (
                        <p>
                            Chargement...
                        </p>
                    )

                    :

                    (

                        <div style={styles.table}>
                            <div style={styles.header}>
                                <span>
                                    Produit
                                </span>
                                <span>
                                    Stock
                                </span>


                                <span>
                                    Action
                                </span>


                            </div>

                            {
                                products.map((product) => (
                                    <div
                                        key={product.id}
                                        style={styles.row}
                                    >
                                        <span>
                                            {product.name}
                                        </span>
                                        <span
                                            style={
                                                product.stock <= 5
                                                    ?
                                                    styles.low
                                                    :
                                                    styles.good
                                            }
                                        >
                                            {product.stock}
                                            {
                                                product.stock <= 5 &&
                                                " ⚠️"
                                            }
                                        </span>
                                        <input
                                            type="number"
                                            defaultValue={
                                                product.stock
                                            }
                                            onBlur={(e) =>
                                                updateStock(
                                                    product.id,
                                                    e.target.value
                                                )
                                            }
                                            style={styles.input}
                                        />
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

        padding: "30px",

        background: "#f5f7fb"

    },



    title: {

        textAlign: "center",

        color: "#0B3D91",

        marginBottom: "30px"

    },



    table: {

        maxWidth: "800px",

        margin: "auto",

        background: "#fff",

        borderRadius: "15px",

        overflow: "hidden",

        boxShadow:
            "0 8px 20px rgba(0,0,0,0.1)"

    },



    header: {

        display: "grid",

        gridTemplateColumns:
            "1fr 100px 150px",

        padding: "15px",

        background: "#0B3D91",

        color: "#fff",

        fontWeight: "bold"

    },



    row: {

        display: "grid",

        gridTemplateColumns:
            "1fr 100px 150px",

        alignItems: "center",

        padding: "15px",

        borderBottom:
            "1px solid #eee"

    },



    input: {

        width: "100px",

        padding: "8px",

        borderRadius: "6px",

        border: "1px solid #ccc"

    },



    good: {

        color: "green",

        fontWeight: "bold"

    },



    low: {

        color: "red",

        fontWeight: "bold"

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