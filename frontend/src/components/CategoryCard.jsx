import { Link } from "react-router-dom";
import React from "react";

export default function CategoryCard({ category }) {

    return (
        <Link
            to={`/category/${category.id}`}
            style={styles.card}
        >

            <img
                src={
                    category.image ||
                    "https://via.placeholder.com/150"
                }
                alt={category.name}
                style={styles.image}
            />


            <h3 style={styles.name}>
                {category.name}
            </h3>


        </Link>
    );
}


const styles = {

    card: {

        textDecoration: "none",

        color: "#0B3D91",

        background: "#ffffff",

        padding: "15px",

        borderRadius: "14px",

        textAlign: "center",

        border: "1px solid #e5e7eb",

        transition: "0.3s",

        display: "block"

    },

    image: {
        width: "100px",
        height: "100px",
        objectFit: "cover",
        borderRadius: "50%",
        background: "#ffffff",
        padding: "6px",
        margin: "auto"
    },

    name: {

        marginTop: "10px",

        fontSize: "14px",

        fontWeight: "700",

        color: "#0B3D91"

    }

};