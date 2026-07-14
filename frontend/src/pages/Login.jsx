import React, { useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const inscription = async () => {

        if (!email || !password) {
            alert("Veuillez remplir tous les champs.");
            return;
        }


        // Vérifier si profil existe déjà
        const { data: existingProfile } =
            await supabase
                .from("profiles")
                .select("*")
                .eq("email", email.trim())
                .maybeSingle();


        if (existingProfile) {

            alert(
                "Ce compte existe déjà. Connectez-vous."
            );

            return;

        }



        const { data, error } =
            await supabase.auth.signUp({

                email: email.trim(),
                password

            });



        console.log(
            "SIGNUP DATA :",
            data
        );


        console.log(
            "SIGNUP ERROR :",
            error
        );



        if (error) {

            alert(error.message);
            return;

        }



        if (data.user) {


            const { error: profileError } =
                await supabase
                    .from("profiles")
                    .insert([
                        {

                            id: data.user.id,

                            email: email.trim(),

                            role: "client"

                        }
                    ]);



            if (profileError) {

                console.log(
                    "ERREUR CREATION PROFILE :",
                    profileError
                );

                return;

            }


        }



        alert(
            "Compte créé avec succès ✅"
        );


    };





    const connexion = async () => {


        if (!email || !password) {

            alert("Veuillez remplir tous les champs.");
            return;

        }



        const { data, error } =
            await supabase.auth.signInWithPassword({

                email: email.trim(),
                password

            });



        if (error) {

            alert(error.message);
            return;

        }



        const user = data.user;
        console.log("USER AUTH :", user);


        const { data: profile, error: profileError } =
            await supabase
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .single();



        console.log(
            "PROFILE :",
            profile
        );


        if (profileError) {

            alert(
                "Profil utilisateur introuvable."
            );

            return;

        }



        if (profile.role === "admin") {


            localStorage.setItem(
                "tiomar_admin",
                JSON.stringify(profile)
            );


            navigate("/admin");


        } else {


            localStorage.removeItem(
                "tiomar_admin"
            );


            navigate("/");


        }


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

                    type={
                        showPassword
                            ? "text"
                            : "password"
                    }

                    placeholder="Mot de passe"

                    value={password}

                    onChange={(e) =>
                        setPassword(e.target.value)
                    }

                />



                <span

                    style={styles.eye}

                    onClick={() =>
                        setShowPassword(
                            !showPassword
                        )
                    }

                >

                    {
                        showPassword
                            ? "🙈"
                            : "👁️"
                    }

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
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
    },

};