import React, { useState, useEffect } from "react";
import { supabase } from "../services/supabase";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import EmptyState from "../components/EmptyState";
import Footer from "../components/Footer";
import Menu from "../components/Menu";

export default function Home() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const fetchProducts = async () => {

        const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("created_at", {
                ascending: false
            });
        if (error) {
            console.log(
                "Erreur produits :",
                JSON.stringify(error, null, 2)
            );
            return;
        }
        setProducts(data || []);
    };
    const fetchCategories = async () => {
        const { data, error } = await supabase
            .from("categories")
            .select("*")
            .order("name");
        if (error) {
            console.log(
                "Erreur catégories :",
                JSON.stringify(error, null, 2)
            );
            return;
        }
        setCategories(data || []);
    };
    useEffect(() => {
        const loadData = async () => {
            await fetchProducts();
            await fetchCategories();
            setLoading(false);
        };
        loadData();
    }, []);

    const filteredProducts = products.filter(
        (product) =>
            product.name
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )
    );
    return (
        <div>

            <Menu />

            <Header />

            <main style={styles.container}>
                {/* HERO */}
                <section style={styles.hero}>
                    <h1 style={styles.heroTitle}>
                        Bienvenue chez TIOMAR
                    </h1>
                    <p style={styles.heroText}>
                        Ne perdez plus de temps à chercher vos matériels partout. Chez TIOMAR, trouvez des équipements et des outillages de qualité pour tous vos travaux 🚧.

                        Votre partenaire de confiance pour tous vos chantiers.

                        📍 Bouaflé, Rue CIE, en face de TAREG.

                    </p>
                </section>
                {/* RECHERCHE */}

                <SearchBar
                    search={search}
                    setSearch={setSearch}
                />
                {/* CATEGORIES */}
                <section>
                    <h2 style={styles.sectionTitle}>
                        Nos catégories
                    </h2>
                    <div style={styles.grid}>
                        {categories.map(
                            (category) => (
                                <CategoryCard
                                    key={category.id}
                                    category={category}
                                />
                            )
                        )}
                    </div>
                </section>
                {/* PRODUITS */}
                <section>

                    <h2 style={styles.sectionTitle}>
                        Nos produits
                    </h2>

                    {
                        loading ? (

                            <p>
                                Chargement...
                            </p>

                        ) : filteredProducts.length === 0 ? (

                            <EmptyState
                                icon="🔍"
                                title="Aucun produit trouvé"
                                message="Essayez une autre recherche."
                            />

                        ) : (
                            <div style={styles.gridProducts}>
                                {
                                    filteredProducts.map(
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
                </section>
            </main>
            <Footer />
        </div>
    );
}
const styles = {

    container: {
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 20px",
        background: "#f8fafc",
        minHeight: "100vh"
    },


    hero: {
        background:
            "linear-gradient(135deg, #0B3D91 0%, #082c6b 70%, #D4A017 140%)",
        color: "#fff",
        padding: "45px 25px",
        borderRadius: "0 0 30px 30px",
        textAlign: "center",
        boxShadow:
            "0 15px 35px rgba(11,61,145,0.20)",
        marginBottom: "30px"
    },

    heroTitle: {
        fontSize: "38px",
        fontWeight: "900",
        marginBottom: "15px",
        letterSpacing: "-1px"
    },


    heroText: {
        maxWidth: "650px",
        margin: "0 auto",
        fontSize: "17px",
        lineHeight: "1.6",
        opacity: "0.95"
    },


    sectionTitle: {
        fontSize: "36px",
        color: "#0f172a",
        textAlign: "center",
        margin:
            "60px 0 35px",
        fontWeight: "800"
    },


    grid: {
        display: "grid",
        gridTemplateColumns:
            "repeat(auto-fit,minmax(180px,1fr))",
        gap: "25px"
    },


    gridProducts: {
        display: "grid",
        gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
        gap: "30px",
        paddingBottom: "50px"
    },


    searchBox: {
        background: "#fff",
        padding: "20px",
        borderRadius: "20px",
        boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",
        marginBottom: "30px"
    },


    card: {
        background: "#fff",
        borderRadius: "20px",
        padding: "20px",
        boxShadow:
            "0 10px 25px rgba(0,0,0,0.08)",
        transition:
            "transform .3s ease"
    },


    goldText: {
        color: "#D4A017"
    },


    button: {
        background: "#D4A017",
        color: "#fff",
        padding: "12px 25px",
        borderRadius: "30px",
        border: "none",
        fontWeight: "700",
        cursor: "pointer"
    }

};