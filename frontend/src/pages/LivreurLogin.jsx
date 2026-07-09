import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";


export default function LivreurLogin() {

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


        const {
            data: authData,
            error: authError
        } = await supabase.auth.signInWithPassword({

            email,
            password

        });



        if (authError) {

            setError(
                "Email ou mot de passe incorrect"
            );

            setLoading(false);

            return;

        }



        const {
            data: profile,
            error: profileError
        } = await supabase
            .from("profiles")
            .select("*")
            .eq("email", authData.user.email)
            .maybeSingle();



        console.log(
            "Profil livreur :",
            profile
        );



        if (
            profileError ||
            !profile ||
            profile.role !== "livreur"
        ) {


            await supabase.auth.signOut();


            setError(
                "Vous n'avez pas accès à l'espace livreur."
            );


            setLoading(false);

            return;

        }



        localStorage.setItem(
            "tiomar_livreur",
            JSON.stringify(profile)
        );



        navigate("/livreur");


        setLoading(false);

    };



    return (

        <div style={styles.container}>


            <form
                onSubmit={handleLogin}
                style={styles.card}
            >


                <h1 style={styles.title}>
                    🚚 TIOMAR LIVREUR
                </h1>



                <input

                    type="email"

                    placeholder="Email livreur"

                    value={email}

                    onChange={(e) =>
                        setEmail(e.target.value)
                    }

                    style={styles.input}

                    required

                />



                <div style={styles.passwordBox}>


                    <input

                        type={
                            showPassword
                                ?
                                "text"
                                :
                                "password"
                        }

                        placeholder="Mot de passe"

                        value={password}

                        onChange={(e) =>
                            setPassword(e.target.value)
                        }

                        style={styles.passwordInput}

                        required

                    />


                    <span

                        onClick={() =>
                            setShowPassword(!showPassword)
                        }

                        style={styles.eye}

                    >

                        {
                            showPassword
                                ?
                                "🙈"
                                :
                                "👁️"
                        }

                    </span>


                </div>



                {
                    error && (

                        <p style={styles.error}>
                            {error}
                        </p>

                    )
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
        background: "#f1f5f9"
    },


    card: {
        width: "350px",
        padding: "30px",
        background: "#fff",
        borderRadius: "15px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.1)"
    },


    title: {
        textAlign: "center",
        marginBottom: "25px"
    },


    input: {
        width: "100%",
        padding: "12px",
        marginBottom: "15px",
        borderRadius: "8px",
        border: "1px solid #ddd"
    },


    passwordBox: {
        display: "flex",
        alignItems: "center",
        border: "1px solid #ddd",
        borderRadius: "8px",
        marginBottom: "15px"
    },


    passwordInput: {
        flex: 1,
        padding: "12px",
        border: "none",
        outline: "none"
    },


    eye: {
        cursor: "pointer",
        padding: "10px"
    },


    button: {
        width: "100%",
        padding: "12px",
        background: "#16a34a",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer"
    },


    error: {
        color: "red",
        textAlign: "center"
    }

};