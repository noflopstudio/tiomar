import React from "react";
import ProductCard from "../components/ProductCard";

export default function Products() {
    // ... tes données ...
    return (
        <div style={styles.pageContainer}>
            <h1 style={styles.title}>📦 Nos Produits TIOMAR</h1>
            <div style={styles.grid}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

const styles = {
    pageContainer: { padding: "40px 20px", background: "#f8fafc", minHeight: "100vh" },
    title: { textAlign: "center", color: "#0B3D91", marginBottom: "40px" },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "30px",
        maxWidth: "1200px",
        margin: "0 auto"
    }
};