
import { create } from "zustand"
export const useProductStore = create((set) => ({
    products: [],

    setProducts: (products) => set({ products }),

    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: "Enter All Details" }
        }
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })
        const data = await res.json();
        set((state) => ({ products: [...state.products, data.data] }))
        return { success: true, message: "added successfully ..." }
    }
    ,
    fetchProduct: async () => {
        const res = await fetch("/api/products")
        const data = await res.json()
        set({ products: data.data })
    }
    ,
    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        })
        const data = await res.json()
        if (!data.success) {
            set(state => ({ products: state.products.filter(product => product._id !== pid) }))
            return { success: false, message: data.message };
        }

        else {
            return {
                success: true, message: data.message
            }
        }



    },
    updateProduct: async (pid, updatedProduct) => {
        try {
            const res = await fetch(`/api/products/${pid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
            });

            // Check if the request was successful
            if (!res.ok) {
                const errorData = await res.json();
                return { success: false, message: errorData.message || "Failed to update the product" };
            }

            const data = await res.json();

            if (!data.success) {
                return { success: false, message: data.message };
            }

            // Update the product in the state
            set(state => ({
                products: state.products.map(product =>
                    product._id === pid ? data.data : product
                ),
            }));

            return { success: true, message: "Product updated successfully" };

        } catch (error) {
            // Handle fetch errors
            return { success: false, message: "Network or server error: " + error.message };
        }
    }








}))