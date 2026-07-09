import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CategoryPage from "./pages/CategoryPage";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import ClientOrders from "./pages/Orders";
import LivreurLogin from "./pages/LivreurLogin";
import LivreurDashboard from "./pages/LivreurDashboard";
import About from "./pages/About";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/Products";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import Categories from "./pages/admin/Categories";
import Orders from "./pages/admin/Orders";
import Stock from "./pages/admin/Stock";
import Drivers from "./pages/admin/Drivers";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* PUBLIC ROUTES */}
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/category/:id" element={<CategoryPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/orders" element={<ClientOrders />} />

                {/* LIVREUR ROUTES */}
                <Route path="/login-livreur" element={<LivreurLogin />} />
                <Route path="/livreur" element={<LivreurDashboard />} />

                {/* ADMIN ROUTES - Avec hiérarchie claire */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/products/add" element={<AddProduct />} />
                <Route path="/admin/products/edit/:id" element={<EditProduct />} />
                <Route path="/admin/categories" element={<Categories />} />
                <Route path="/admin/orders" element={<Orders />} />
                <Route path="/admin/stock" element={<Stock />} />
                <Route path="/admin/drivers" element={<Drivers />} />
                <Route path="/about" element={<About />} />
                {/* 404 - Design épuré */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

// Un composant 404 "joli" à placer dans tes pages
const NotFound = () => (
    <div style={styles404.container}>
        <div style={styles404.card}>

            <div style={styles404.code}>
                404
            </div>

            <h1 style={styles404.title}>
                Page introuvable
            </h1>

            <p style={styles404.text}>
                Désolé, la page que vous recherchez n'existe pas
                ou a été déplacée.
            </p>

            <a
                href="/"
                style={styles404.button}
            >
                Retour à l'accueil
            </a>

        </div>
    </div>
);

const styles404 = {

    container: {
        minHeight: "100vh",
        background: "#f8fafc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
    },

    card: {
        width: "100%",
        maxWidth: "450px",
        background: "#ffffff",
        borderRadius: "18px",
        padding: "40px 30px",
        textAlign: "center",
        border: "1px solid #e2e8f0",
        boxShadow: "0 10px 30px rgba(15,23,42,.08)"
    },

    code: {
        fontSize: "72px",
        fontWeight: "800",
        color: "#D4A017",
        lineHeight: "1"
    },

    title: {
        marginTop: "15px",
        fontSize: "24px",
        fontWeight: "700",
        color: "#0B3D91"
    },

    text: {
        marginTop: "12px",
        fontSize: "15px",
        lineHeight: "24px",
        color: "#64748b"
    },

    button: {
        display: "inline-block",
        marginTop: "28px",
        background: "#0B3D91",
        color: "#ffffff",
        padding: "12px 28px",
        borderRadius: "10px",
        textDecoration: "none",
        fontSize: "15px",
        fontWeight: "700",
        transition: ".3s"
    }

};

export default App;