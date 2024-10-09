import { Container, Text, SimpleGrid, Box } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useProductStore } from '../store/product.js'
import ProductCard from '../components/ProductCard.jsx';

const HomePage = () => {
    const { fetchProduct, products } = useProductStore();
    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);



    return (

        <Container maxW='4xl'>



            <SimpleGrid columns={[2, null, 3]} spacing='20px'>
                {
                    products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                }

            </SimpleGrid>
        </Container >
    )
}

export default HomePage
