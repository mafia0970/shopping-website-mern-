import { Box, Button, Container, Heading, useColorMode, useColorModeValue, VStack, Input, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useProductStore } from '../store/product.js'

const CreatePage = () => {
    const [newProduct, setNewproduct] = useState({
        name: "",
        price: "",
        image: ""
    })
    const toast = useToast()
    const { createProduct } = useProductStore();
    const handleAddProduct = async () => {
        const { success, message } = await createProduct(newProduct)
        if (!success) {
            toast({
                "title": "Error",
                "description": message
            })

        }
        else {
            toast({
                "title": success,
                "description": message
            })
        }
    }
    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2x1"} textAlign={"center"} mb={8}>
                    Create New Product
                </Heading>
                <Box
                    w={"full"} bg={useColorModeValue("white", "gray.800")}
                    p={6} rounded={"lg"} shadow={"md"}
                >
                    <VStack spacing={4}>
                        <Input

                            placeholder='Product Name'
                            name='name'
                            value={newProduct.name}
                            onChange={(e) => setNewproduct({ ...newProduct, name: e.target.value })}

                        />
                        <Input
                            placeholder='Price'
                            name='price'
                            type='number'
                            value={newProduct.price}
                            onChange={(e) => setNewproduct({ ...newProduct, price: e.target.value })}

                        />
                        <Input
                            placeholder=' Image'
                            name='image'
                            value={newProduct.image}

                            onChange={(e) => setNewproduct({ ...newProduct, image: e.target.value })}

                        />
                        <Button colorScheme='blue' onClick={handleAddProduct} w={'full'}>
                            Add Product
                        </Button>
                    </VStack>

                </Box>

            </VStack>
        </Container>
    )
}

export default CreatePage
