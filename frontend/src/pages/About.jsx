import React from "react";

export default function About() {

    return (
        <div style={styles.container}>

            <div style={styles.header}>

                <img
                    src="/logo.png"
                    alt="TIOMAR"
                    style={styles.logo}
                />

                <h1 style={styles.title}>
                    À propos de TIOMAR
                </h1>

                <p style={styles.subtitle}>
                    TIOMAR Multiples Services, votre partenaire
                    de confiance en Côte d'Ivoire 🇨🇮
                </p>

            </div>


            <section style={styles.card}>

                <h2 style={styles.sectionTitle}>
                    🏢 Notre histoire
                </h2>

                <p style={styles.text}>
                    TIOMAR Multiples Services est un groupe
                    ivoirien qui accompagne ses clients dans
                    différents domaines avec une vision basée
                    sur la qualité, l'innovation et la confiance.
                </p>

                <p style={styles.text}>
                    Le groupe s'inscrit comme un acteur majeur
                    dans les échanges et les services de la
                    sous-région, en proposant des solutions
                    adaptées aux besoins des particuliers,
                    entreprises et institutions.
                </p>

            </section>



            <section style={styles.card}>

                <h2 style={styles.sectionTitle}>
                    👤 Le fondateur
                </h2>

                <p style={styles.text}>
                    Monsieur <strong>Harouna Oumar</strong>,
                    promoteur immobilier et fondateur de la
                    société <strong>TMS</strong>, porte une vision
                    entrepreneuriale basée sur l'excellence
                    et la réalisation de projets ambitieux.
                </p>

                <p style={styles.text}>
                    Grâce à son expertise dans l'immobilier,
                    TMS accompagne ses clients dans l'étude
                    complète de leurs projets, de la conception
                    jusqu'à la réalisation finale.
                </p>

            </section>



            <section style={styles.card}>

                <h2 style={styles.sectionTitle}>
                    🏗️ TMS Immobilier & Design
                </h2>

                <p style={styles.text}>
                    TMS est une entreprise spécialisée dans
                    l'immobilier, la construction et le design
                    d'espaces.
                </p>

                <p style={styles.text}>
                    Notre équipe réalise l'étude de vos projets
                    de A à Z, construit vos bâtiments et propose
                    également des solutions d'aménagement et
                    de décoration intérieure pour transformer
                    chaque espace en une véritable œuvre.
                </p>

                <p style={styles.text}>
                    Nous collaborons avec de grandes institutions,
                    des entreprises privées et publiques afin
                    d'apporter des solutions professionnelles,
                    modernes et durables.
                </p>

            </section>



            <section style={styles.card}>

                <h2 style={styles.sectionTitle}>
                    ⭐ Notre vision
                </h2>

                <p style={styles.text}>
                    TMS se distingue par son approche innovante,
                    où l'expertise technique rencontre
                    l'esthétique pour donner vie à des projets
                    uniques.
                </p>

                <p style={styles.text}>
                    Notre ambition est de construire des espaces
                    qui répondent aux besoins actuels tout en
                    préparant l'avenir.
                </p>

            </section>



            <section style={styles.contact}>

                <h2 style={styles.sectionTitle}>
                    📞 Contact
                </h2>

                <p>
                    🇨🇮 Côte d'Ivoire
                </p>

                <p>
                    📱 0748 492 851
                </p>

                <p>
                    📱 0757 896 767
                </p>

                <p>
                    📱 0594 779 692
                </p>

                <p>
                    📠 Fax : 2735 996 189
                </p>

            </section>


        </div>
    );
}


const styles = {

    container: {
        maxWidth: "900px",
        margin: "0 auto",
        padding: "30px 20px",
        background: "#f8fafc",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        color: "#334155"
    },


    header: {
        textAlign: "center",
        marginBottom: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px"
    },


    logo: {
        width: "60px",
        height: "auto",
        marginBottom: "10px",
        objectFit: "contain"
    },


    title: {
        color: "#0B3D91",
        fontSize: "32px",
        fontWeight: "800",
        margin: "0"
    },


    subtitle: {
        fontSize: "18px",
        color: "#64748b",
        margin: "0",
        maxWidth: "500px",
        lineHeight: "1.4"
    },


    card: {
        background: "#ffffff",
        padding: "25px",
        borderRadius: "18px",
        marginBottom: "25px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.06)"
    },


    sectionTitle: {
        color: "#D4A017",
        fontSize: "22px",
        fontWeight: "700",
        marginBottom: "15px"
    },


    text: {
        fontSize: "16px",
        lineHeight: "1.8",
        color: "#475569",
        marginBottom: "15px"
    },


    contact: {
        background: "#0B3D91",
        color: "#ffffff",
        padding: "25px",
        borderRadius: "18px",
        textAlign: "center",
        marginBottom: "30px"
    }

};