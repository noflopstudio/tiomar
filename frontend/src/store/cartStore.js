import { create } from "zustand";
import { persist } from "zustand/middleware";


export const useCartStore = create(

    persist(

        (set) => ({

            // PANIER
            cart: [],



            // AJOUTER AU PANIER
            addToCart: (product) =>

                set((state) => {


                    const existing = state.cart.find(
                        (item) => item.id === product.id
                    );


                    if (existing) {

                        return {

                            cart: state.cart.map(
                                (item) =>

                                    item.id === product.id

                                        ?

                                        {
                                            ...item,

                                            quantity:
                                                (item.quantity || 1)
                                                +
                                                (product.quantity || 1)
                                        }

                                        :

                                        item

                            )

                        };

                    }



                    return {

                        cart: [

                            ...state.cart,

                            {
                                ...product,
                                quantity:
                                    product.quantity || 1
                            }

                        ]

                    };


                }),






            // SUPPRIMER PRODUIT
            removeFromCart: (id) =>

                set((state) => ({

                    cart:
                        state.cart.filter(
                            (item) =>
                                item.id !== id
                        )

                })),







            // AUGMENTER QUANTITE
            increaseQuantity: (id) =>

                set((state) => ({

                    cart:

                        state.cart.map(
                            (item) =>


                                item.id === id

                                    ?

                                    {
                                        ...item,

                                        quantity:
                                            (item.quantity || 1)
                                            + 1
                                    }

                                    :

                                    item

                        )

                })),








            // DIMINUER QUANTITE
            decreaseQuantity: (id) =>

                set((state) => ({

                    cart:

                        state.cart.map(
                            (item) =>

                                item.id === id

                                    ?

                                    {

                                        ...item,

                                        quantity:
                                            Math.max(
                                                1,
                                                (item.quantity || 1)
                                                - 1
                                            )

                                    }

                                    :

                                    item

                        )

                })),







            // VIDER LE PANIER
            clearCart: () =>

                set({

                    cart: []

                })



        }),


        {

            name: "tiomar-cart"

        }

    )

);