import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../services/supabase";

import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import EmptyState from "../components/EmptyState";

export default function CategoryPage() {

    const { id } = useParams();

    const [products, setProducts] = useState([]);

    const [category, setCategory] = useState(null);

    const [loading, setLoading] = useState(true);

    const fetchCategory = async () => {

        const { data, error } = await supabase
            .from("categories")
            .select("*")
            .eq("id", id)
            .single();

        if (!error) {

            setCategory(data);

        }

    };

    const fetchProducts = async () => {

        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("category_id", id)
            .order("created_at", {
                ascending: false
            });

        if (!error) {

            setProducts(data || []);

        }

    };

    useEffect(() => {

        const load = async () => {

            await fetchCategory();

            await fetchProducts();

            setLoading(false);

        };

        load();

    }, [id]);

    if (loading) {

        return (
            <p style={styles.center}>
                Chargement...
            </p>

        );

    }

    return (

        <div>

            <Header />

            <main style={styles.container}>

                <h1 style={styles.title}>

                    {category?.name || "Catégorie"}

                </h1>

                {
                    products.length === 0 ?

                        (

                            <EmptyState

                                icon="📦"

                                title="Aucun produit disponible"

                                message="Cette catégorie ne contient aucun produit pour le moment."

                            />

                        )

                        :

                        (

                            <div style={styles.grid}>

                                {
                                    products.map(
                                        (product) => (

                                            <ProductCard

                                                key={product.id}

                                                product={product}

                                            />

                                        )
                                    )
                                }

                            </div>

                        )
                }

            </main>
            <Footer />


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


    grid: {

        display: "grid",

        gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",

        gap: "20px"

    },


    center: {

        textAlign: "center",

        marginTop: "50px"

    }


};