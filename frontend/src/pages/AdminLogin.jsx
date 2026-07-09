import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";


export default function AdminLogin() {


    const navigate = useNavigate();


    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);


    const handleLogin = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");

        // Connexion avec Supabase Auth
        const { data: authData, error: authError } =
            await supabase.auth.signInWithPassword({
                email,
                password
            });

        if (authError) {
            setError(authError.message);
            setLoading(false);
            return;
        }
        console.log("Utilisateur Auth :", authData.user.email);

        const { data: profile, error: profileError } =
            await supabase
                .from("profiles")
                .select("*")
                .eq("email", authData.user.email)
                .maybeSingle();

        console.log("EMAIL AUTH :", authData.user.email);
        console.log("PROFILE :", profile);
        console.log("ERROR :", profileError);

        console.log("Profil :", profile);
        console.log("Erreur :", JSON.stringify(profileError, null, 2));

        console.log(profile);
        if (!profile || profile.role !== "admin") {
            await supabase.auth.signOut();
            setError("Vous n'êtes pas administrateur.");
            setLoading(false);
            return;
        }
        localStorage.setItem(
            "tiomar_admin",
            JSON.stringify(profile)
        );
        navigate("/admin");
        setLoading(false);

    };
    return (

        <div style={styles.container}>
            <form
                onSubmit={handleLogin}
                style={styles.card}
            >
                <h1 style={styles.title}>
                    TIOMAR ADMIN
                </h1>
                <input

                    type="email"

                    placeholder="Email administrateur"

                    value={email}

                    onChange={(e) => setEmail(e.target.value)}

                    style={styles.input}

                />
                <div style={styles.passwordBox}>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                        style={styles.passwordInput}
                    />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        style={styles.eye}
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </span>
                </div>
                {
                    error &&

                    <p style={styles.error}>
                        {error}
                    </p>
                }
                <button
                    type="submit"
                    style={styles.button}
                >
                    {
                        loading
                            ?
                            "Connexion..."
                            :
                            "Se connecter"
                    }
                </button>
            </form>
        </div>

    );

}

const styles = {


    container: {

        minHeight: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        background: "#f5f7fb"

    },


    card: {

        width: "350px",

        padding: "30px",

        background: "#ffffff",

        borderRadius: "15px",

        boxShadow: "0 10px 30px rgba(0,0,0,0.15)"

    },


    title: {

        textAlign: "center",

        color: "#0B3D91",

        marginBottom: "25px"

    },


    input: {

        width: "100%",

        padding: "12px",

        marginBottom: "15px",

        borderRadius: "8px",

        border: "1px solid #ddd",

        fontSize: "15px"

    },


    button: {

        width: "100%",

        padding: "12px",

        background: "#D4A017",

        color: "#0B3D91",

        border: "none",

        borderRadius: "8px",

        fontWeight: "bold",

        cursor: "pointer"

    },


    error: {

        color: "red",

        textAlign: "center"

    },

    passwordBox: {

        position: "relative",

        width: "100%",

        marginBottom: "15px"

    },


    passwordInput: {

        width: "100%",

        padding: "12px",

        paddingRight: "45px",

        borderRadius: "8px",

        border: "1px solid #ddd",

        fontSize: "15px",

        boxSizing: "border-box"

    },


    eye: {

        position: "absolute",

        right: "12px",

        top: "50%",

        transform: "translateY(-50%)",

        cursor: "pointer",

        fontSize: "20px"

    },

};