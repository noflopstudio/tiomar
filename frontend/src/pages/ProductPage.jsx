import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../services/supabase";
import { useCartStore } from "../store/cartStore";

export default function ProductPage() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);


    const [loading, setLoading] = useState(true);

    const addToCart = useCartStore(
        (state) => state.addToCart
    );

    const [selectedImage, setSelectedImage] = useState("");

    useEffect(() => {

        const fetchProduct = async () => {

            const { data, error } = await supabase
                .from("products")
                .select("*")
                .eq("id", id)
                .single();

            console.log("PRODUIT COMPLET :", data);
            console.log("ID RECHERCHE :", id);
            console.log("DATA PRODUIT :", data);
            console.log(
                "ERREUR PRODUIT DETAIL :",
                JSON.stringify(error, null, 2)
            );

            if (!error) {

                setProduct(data);

                setSelectedImage(
                    data.images?.[0] || data.image
                );

            }
            setLoading(false);

        };

        fetchProduct();

    }, [id]);
    if (loading) {
        return (
            <p style={styles.center}>
                Chargement...
            </p>
        );
    }
    if (!product) {
        return (
            <p style={styles.center}>
                Produit introuvable
            </p>
        );
    }
    return (
        <div style={styles.container}>
            <div style={styles.card}>

                <div>

                    <img
                        src={
                            selectedImage ||
                            product.image ||
                            "https://via.placeholder.com/400"
                        }
                        alt={product.name}
                        style={styles.image}
                    />
                    {
                        product.images?.length > 0 && (

                            <div style={styles.gallery}>

                                {
                                    product.images.map(
                                        (img, index) => (

                                            <img

                                                key={index}

                                                src={img}

                                                alt={product.name}

                                                onClick={() =>
                                                    setSelectedImage(img)
                                                }

                                                style={styles.thumbnail}

                                            />

                                        )
                                    )
                                }

                            </div>

                        )
                    }

                </div>
                <div>
                    <h1 style={styles.title}>
                        {product.name}
                    </h1>
                    <h2 style={styles.price}>
                        {product.price} FCFA
                    </h2>
                    <p>
                        Stock disponible :
                        <b>
                            {product.stock}
                        </b>
                    </p>
                    <p style={styles.description}>
                        {product.description}
                    </p>
                    <button
                        style={styles.button}
                        onClick={() => {
                            console.log("Produit ajouté :", product);
                            addToCart(product);
                            alert("Produit ajouté au panier ✅");
                        }}
                    >
                        🛒 Ajouter au panier
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles = {

    container: {
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "20px 15px",
        fontFamily: "Segoe UI, Arial, sans-serif"
    },


    card: {
        maxWidth: "700px",
        margin: "auto",
        background: "#ffffff",
        padding: "18px",
        borderRadius: "16px",
        border: "1px solid #e2e8f0",
        display: "flex",
        flexDirection: "column",
        gap: "20px"
    },


    image: {
        width: "100%",
        height: "260px",
        objectFit: "contain",
        background: "#f8fafc",
        borderRadius: "12px"
    },


    title: {
        color: "#0B3D91",
        fontSize: "22px",
        fontWeight: "700",
        marginBottom: "10px"
    },


    price: {
        color: "#D4A017",
        fontSize: "20px",
        fontWeight: "800",
        marginBottom: "10px"
    },


    stock: {
        fontSize: "14px",
        color: "#475569",
        marginBottom: "12px"
    },


    description: {
        fontSize: "14px",
        lineHeight: "1.6",
        color: "#475569",
        marginTop: "10px"
    },


    button: {
        marginTop: "20px",
        width: "100%",
        padding: "13px",
        background: "#0B3D91",
        color: "#ffffff",
        border: "none",
        borderRadius: "10px",
        fontSize: "14px",
        fontWeight: "700",
        cursor: "pointer"
    },


    gallery: {
        display: "flex",
        gap: "8px",
        marginTop: "12px",
        flexWrap: "wrap"
    },


    thumbnail: {
        width: "60px",
        height: "60px",
        objectFit: "cover",
        borderRadius: "8px",
        cursor: "pointer",
        border: "1px solid #e2e8f0"
    },


    center: {
        textAlign: "center",
        marginTop: "40px",
        color: "#64748b",
        fontSize: "14px"
    }

};