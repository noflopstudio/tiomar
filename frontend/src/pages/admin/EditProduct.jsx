import React, { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduct() {

    const { id } = useParams();

    const navigate = useNavigate();



    const [categories, setCategories] = useState([]);

    const [form, setForm] = useState({
        name: "",

        description: "",

        price: "",

        image: "",

        stock: "",

        category_id: ""

    });

    const [loading, setLoading] = useState(true);

    // Charger le produit

    useEffect(() => {

        const loadProduct = async () => {
            const { data, error } = await supabase

                .from("products")

                .select("*")

                .eq("id", id)

                .single();

            if (error) {
                console.log("Erreur chargement produit :", error);
                alert(error.message);
                return;
            }

            if (data) {

                setForm({
                    name: data.name || "",
                    description: data.description || "",

                    price: data.price || "",
                    image: data.image || "",
                    stock: data.stock || "",
                    category_id: data.category_id || ""

                });
            }
            setLoading(false);

        };

        loadProduct();

    }, [id]);

    // Charger catégories

    useEffect(() => {
        const loadCategories = async () => {
            const { data } = await supabase
                .from("categories")

                .select("*")

                .order("name");
            setCategories(data || []);
        };
        loadCategories();

    }, []);



    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value

        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data: sessionData } = await supabase.auth.getSession();

        console.log("SESSION :", sessionData.session);
        console.log("USER :", sessionData.session?.user);

        const { data, error } = await supabase
            .from("products")
            .update({
                name: form.name,
                description: form.description,
                price: Number(form.price),
                image: form.image,
                stock: Number(form.stock),

            })
            .eq("id", id)
            .select();

        console.log("UPDATE DATA :", data);
        console.log("UPDATE ERROR :", error);

        if (error) {
            alert("Erreur : " + error.message);
            return;
        }

        alert("Produit modifié avec succès ✅");

        navigate("/admin/products");
    };
    if (loading) {
        return (
            <p style={{
                textAlign: "center",
                marginTop: "50px"
            }}>

                Chargement...

            </p>

        );

    }
    return (

        <div style={styles.container}>

            <h1 style={styles.title}>
                ✏️ Modifier produit TIOMAR
            </h1>
            <form
                onSubmit={handleSubmit}
                style={styles.form}
            >
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Nom produit"
                    style={styles.input}
                    required
                />
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Description"
                    style={styles.textarea}
                />
                <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Prix FCFA"
                    style={styles.input}
                    required
                />
                <input
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="Image URL"
                    style={styles.input}
                />
                <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="Stock"
                    style={styles.input}
                />
                <select
                    name="category_id"
                    value={form.category_id}
                    onChange={handleChange}
                    style={styles.input}
                >

                    <option value="">
                        Choisir catégorie
                    </option>
                    {
                        categories.map((cat) => (

                            <option
                                key={cat.id}
                                value={cat.id}
                            >
                                {cat.name}
                            </option>
                        ))
                    }
                </select>
                <button

                    type="submit"

                    style={styles.button}

                >

                    Enregistrer

                </button>
            </form>
        </div>
    );

}






const styles = {


    container: {

        minHeight: "100vh",

        padding: "30px",

        background: "#f5f7fb"

    },


    title: {

        textAlign: "center",

        color: "#0B3D91",

        marginBottom: "30px"

    },


    form: {

        maxWidth: "500px",

        margin: "auto",

        background: "#fff",

        padding: "30px",

        borderRadius: "15px",

        boxShadow:
            "0 8px 20px rgba(0,0,0,0.1)"

    },


    input: {

        width: "100%",

        padding: "12px",

        marginBottom: "15px",

        borderRadius: "8px",

        border: "1px solid #ddd",

        boxSizing: "border-box"

    },


    textarea: {

        width: "100%",

        height: "100px",

        padding: "12px",

        marginBottom: "15px",

        borderRadius: "8px",

        border: "1px solid #ddd",

        boxSizing: "border-box"

    },


    button: {

        width: "100%",

        padding: "13px",

        background: "#0B3D91",

        color: "#fff",

        border: "none",

        borderRadius: "8px",

        fontWeight: "900",

        cursor: "pointer"

    }


};