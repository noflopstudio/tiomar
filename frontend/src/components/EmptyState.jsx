import React from "react";
export default function EmptyState({
    icon = "📦",
    title = "Aucun élément trouvé",
    message = "Il n'y a rien à afficher pour le moment."
}) {

    return (
        <div style={styles.container}>

            <div style={styles.icon}>
                {icon}
            </div>


            <h2 style={styles.title}>
                {title}
            </h2>


            <p style={styles.message}>
                {message}
            </p>

        </div>
    );
}



const styles = {

    container: {
        textAlign: "center",
        padding: "50px 20px",
        background: "#ffffff",
        borderRadius: "14px",
        border: "1px solid #e5e7eb",
        margin: "30px auto",
        maxWidth: "500px"
    },


    icon: {
        fontSize: "55px",
        marginBottom: "15px"
    },


    title: {
        color: "#0B3D91",
        fontSize: "22px",
        fontWeight: "800",
        marginBottom: "10px"
    },


    message: {
        color: "#64748b",
        fontSize: "15px",
        lineHeight: "1.5"
    }

};