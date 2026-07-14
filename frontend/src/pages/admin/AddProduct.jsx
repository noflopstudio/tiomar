import React, { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
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

    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        const navigate = useNavigate();
        setImages(files);
        console.log(
            "Images sélectionnées :",
            files
        );
    };
    const uploadImages = async () => {

        const imageUrls = [];
        for (const image of images) {

            const fileName =
                `${Date.now()}-${image.name}`;

            const { error } = await supabase
                .storage
                .from("products")
                .upload(
                    fileName,
                    image
                );
            if (error) {
                console.log(error);
                return [];
            }
            const { data } =
                supabase
                    .storage
                    .from("products")
                    .getPublicUrl(fileName);
            imageUrls.push(data.publicUrl);
        }
        return imageUrls;
    };
    useEffect(() => {
        const loadCategories = async () => {
            const { data, error } = await supabase
                .from("categories")
                .select("*")
                .order("name");
            if (!error) {
                setCategories(data || []);
            }
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
        setLoading(true);
        const imageUrls = await uploadImages();

        const { error } = await supabase
            .from("products")
            .insert([{
                name: form.name,
                description: form.description,
                price: Number(form.price),
                image: imageUrls[0],
                images: imageUrls,
                stock: Number(form.stock),
                category_id: form.category_id
            }]);
        if (error) {
            alert(
                "Erreur : " + error.message
            );
            setLoading(false);
            return;
        }
        alert(
            "Produit ajouté avec succès ✅"
        );
        navigate("/");
        setLoading(false);
    };
    return (
        <div style={styles.container}>

            <button
                style={styles.back}
                onClick={() => navigate("/admin/products")}
            >
                ← Retour
            </button>


            <h1 style={styles.title}>
                ➕ Ajouter un produit TIOMAR
            </h1>
            <form
                onSubmit={handleSubmit}
                style={styles.form}
            >
                <input
                    name="name"
                    placeholder="Nom du produit"
                    value={form.name}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    style={styles.textarea}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Prix FCFA"
                    value={form.price}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImagesChange}
                    style={styles.input}
                />
                <input
                    type="number"
                    name="stock"
                    placeholder="Stock disponible"
                    value={form.stock}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />
                <select
                    name="category_id"
                    value={form.category_id}
                    onChange={handleChange}
                    style={styles.input}
                    required
                >
                    <option value="">
                        Choisir une catégorie
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
                    {
                        loading
                            ?
                            "Publication..."
                            :
                            "Publier le produit"
                    }
                </button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "30px"
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
        background: "#D4A017",
        color: "#0B3D91",
        border: "none",
        borderRadius: "8px",
        fontWeight: "900",
        cursor: "pointer"
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