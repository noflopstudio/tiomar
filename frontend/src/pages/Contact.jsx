import React from "react";
import { useNavigate } from "react-router-dom";


export default function Contact() {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>

            <button
                style={styles.back}
                onClick={() => navigate(-1)}
            >
                ← Retour
            </button>


            <div style={styles.header}>

                <h1 style={styles.mainTitle}>
                    À propos de TIOMAR
                </h1>

                <p style={styles.subtitle}>
                    Votre partenaire de confiance en Côte d'Ivoire
                </p>

            </div>

            <div style={styles.card}>
                <h2 style={styles.sectionTitle}>TMS Multiples Services</h2>
                <p style={styles.description}>
                    TIOMAR est un groupe spécialisé dans les services, l'accompagnement de projets et
                    les solutions sur-mesure. Nous transformons vos visions en réalités alliant expertise,
                    innovation et esthétique.
                </p>

                <div style={styles.founderBox}>
                    <p style={styles.label}>Fondateur</p>
                    <b style={styles.name}>Mr Harouna Oumar</b>
                    <p style={styles.role}>Promoteur immobilier & Fondateur de TMS</p>
                </div>

                <div style={styles.contactGrid}>
                    <div style={styles.contactItem}>
                        <span style={styles.icon}>📞</span>
                        <div>
                            <p style={styles.contactLabel}>Service Client</p>
                            <p style={styles.contactValue}>0748 492 851</p>
                            <p style={styles.contactValue}>0757 896 767</p>
                            <p style={styles.contactValue}>0594 779 692</p>
                        </div>
                    </div>
                    <div style={styles.contactItem}>
                        <span style={styles.icon}>📠</span>
                        <div>
                            <p style={styles.contactLabel}>Fax</p>
                            <p style={styles.contactValue}>2735 996 189</p>
                        </div>
                    </div>
                </div>

                <button style={styles.whatsappButton} onClick={() => window.open("https://wa.me/2250748492851", "_blank")}>
                    💬 Discuter sur WhatsApp
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: "40px 20px",
        background: "#F8FAFC",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    header: { textAlign: "center", marginBottom: "40px" },
    mainTitle: { color: "#0B3D91", fontSize: "32px", fontWeight: "900", marginBottom: "10px" },
    subtitle: { color: "#64748B", fontSize: "16px" },
    card: {
        background: "white",
        padding: "30px",
        borderRadius: "24px",
        maxWidth: "500px",
        width: "100%",
        boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)"
    },
    sectionTitle: { color: "#0B3D91", fontSize: "20px", fontWeight: "800", marginBottom: "15px" },
    description: { color: "#475569", lineHeight: "1.6", marginBottom: "25px" },
    founderBox: {
        background: "#F1F5F9",
        padding: "15px",
        borderRadius: "12px",
        marginBottom: "25px",
        borderLeft: "4px solid #D4AF37" // Accent Or
    },
    label: { fontSize: "12px", color: "#64748B", textTransform: "uppercase", fontWeight: "700" },
    name: { fontSize: "16px", color: "#0B3D91", display: "block" },
    role: { fontSize: "14px", color: "#475569" },
    contactGrid: { display: "flex", flexDirection: "column", gap: "20px", marginBottom: "30px" },
    contactItem: { display: "flex", gap: "15px" },
    icon: { fontSize: "20px" },
    contactLabel: { fontSize: "12px", color: "#64748B", margin: 0 },
    contactValue: { fontSize: "15px", fontWeight: "600", color: "#1E293B", margin: 0 },
    whatsappButton: {
        width: "100%",
        padding: "16px",
        borderRadius: "14px",
        border: "none",
        background: "#25D366",
        color: "white",
        fontSize: "16px",
        fontWeight: "700",
        cursor: "pointer",
        transition: "transform 0.2s"
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