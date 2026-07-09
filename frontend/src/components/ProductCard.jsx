import { Link } from "react-router-dom";
import React from "react";

export default function ProductCard({ product }) {

    return (
        <div style={styles.card}>

            {/* IMAGE */}
            <div style={styles.imageBox}>

                {
                    product.images?.length > 0 ? (

                        <img
                            src={product.images[0]}
                            alt={product.name}
                            style={styles.image}
                        />

                    ) : product.image ? (

                        <img
                            src={product.image}
                            alt={product.name}
                            style={styles.image}
                        />

                    ) : (

                        <div style={styles.noImage}>
                            📦 Pas d'image
                        </div>

                    )
                }
            </div>
            {/* INFORMATIONS */}
            <div style={styles.content}>

                <h3 style={styles.title}>
                    {product.name}
                </h3>


                <p style={styles.description}>
                    {product.description
                        ? product.description.substring(0, 70) + "..."
                        : "Produit de quincaillerie"}
                </p>


                <div style={styles.price}>
                    {Number(product.price).toLocaleString()} FCFA
                </div>


                <p style={styles.stock}>
                    Stock : {product.stock || 0}
                </p>


                <Link
                    to={`/product/${product.id}`}
                    state={{ product }}
                    style={styles.button}
                >
                    Voir le produit
                </Link>


            </div>

        </div>
    );
}



const styles = {

    card: {
        background: "#ffffff",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
        border: "1px solid #e5e7eb",
        transition: "0.3s"
    },


    imageBox: {
        height: "220px",
        background: "#f1f5f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },


    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
    },


    noImage: {
        fontSize: "16px",
        color: "#64748b"
    },


    content: {
        padding: "16px"
    },


    title: {
        color: "#0B3D91",
        fontSize: "18px",
        marginBottom: "8px"
    },


    description: {
        color: "#64748b",
        fontSize: "14px",
        minHeight: "40px"
    },


    price: {
        color: "#D4A017",
        fontSize: "20px",
        fontWeight: "900",
        marginTop: "12px"
    },


    stock: {
        marginTop: "8px",
        color: "#334155",
        fontSize: "14px"
    },


    button: {
        display: "block",
        marginTop: "15px",
        textAlign: "center",
        background: "#0B3D91",
        color: "#fff",
        padding: "12px",
        borderRadius: "8px",
        fontWeight: "700"
    }

};