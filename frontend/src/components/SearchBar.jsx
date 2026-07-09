import React from "react";

export default function SearchBar({
    search,
    setSearch
}) {

    return (
        <div style={styles.container}>

            <input
                type="text"
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
                placeholder="🔍 Rechercher un produit (ciment, vis, peinture...)"
                style={styles.input}
            />


            <button style={styles.button}>
                Rechercher
            </button>

        </div>
    );
}

const styles = {

    container: {
        display: "flex",
        gap: "10px",
        width: "100%",
        maxWidth: "700px",
        margin: "20px auto"
    },


    input: {
        flex: 1,
        padding: "14px 16px",
        borderRadius: "10px",
        border: "1px solid #d1d5db",
        fontSize: "15px",
        outline: "none"
    },


    button: {
        background: "#D4A017",
        color: "#0B3D91",
        padding: "0 20px",
        borderRadius: "10px",
        fontWeight: "800",
        cursor: "pointer"
    }

};