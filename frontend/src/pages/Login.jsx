import React, { useState } from "react";
import { supabase } from "../services/supabase";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const inscription = async () => {

        if (!email || !password) {
            alert("Veuillez remplir tous les champs.");
            return;
        }
        const { data, error } = await supabase.auth.signUp({
            email: email.trim(),
            password
        });

        console.log("SIGNUP DATA :", data);
        console.log("SIGNUP ERROR :", error);

        if (error) {
            alert(error.message);
            return;
        }

        alert("Compte créé avec succès. Vérifiez votre email.");
    };


    const connexion = async () => {

        if (!email || !password) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        const { error } =
            await supabase.auth.signInWithPassword({
                email: email.trim(),
                password
            });

        if (error) {
            alert(error.message);
            return;
        }

        window.location.href = "/";
    };


    return (
        <div style={styles.container}>

            <h1>
                Connexion TIOMAR
            </h1>


            <input
                style={styles.input}
                type="email"
                placeholder="Votre Gmail"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />
            <div style={styles.passwordContainer}>

                <input
                    style={styles.input}
                    type={showPassword ? "text" : "password"}
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />
                <span
                    style={styles.eye}
                    onClick={() =>
                        setShowPassword(!showPassword)
                    }
                >
                    {showPassword ? "🙈" : "👁️"}
                </span>

            </div>


            <button
                style={styles.button}
                onClick={connexion}
            >
                🔐 Connexion
            </button>


            <button
                style={styles.registerButton}
                onClick={inscription}
            >
                ✍️ Inscription
            </button>

        </div>
    );
}
const styles = {

    container: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "15px",
        padding: "20px"
    },


    input: {
        width: "280px",
        padding: "12px",
        borderRadius: "10px",
        border: "1px solid #ddd",
        fontSize: "16px"
    },


    button: {
        width: "280px",
        padding: "15px",
        borderRadius: "10px",
        border: "none",
        background: "#4285F4",
        color: "white",
        fontSize: "16px",
        cursor: "pointer"
    },


    registerButton: {
        width: "280px",
        padding: "15px",
        borderRadius: "10px",
        border: "none",
        background: "#16a34a",
        color: "white",
        fontSize: "16px",
        cursor: "pointer"
    },

    passwordContainer: {
        position: "relative",
        width: "280px"
    },

    eye: {
        position: "absolute",
        right: "12px",
        top: "50%",
        transform: "translateY(-50%)",
        cursor: "pointer",
        fontSize: "20px"
    }

};