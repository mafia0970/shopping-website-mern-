import { Box, Button, HStack, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useProductStore } from '../store/product.js'

const ProductCard = ({ product }) => {
    const { deleteProduct, updateProduct } = useProductStore()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const [updtedProduct, setUpdatedprooduct] = useState(product)

    const handleOnUpdate = async (pid, updatedproduct) => {
        await updateProduct(pid, updatedproduct)
        onClose()

    }

    const handleOndelete = async (pid) => {
        const { success, message } = await deleteProduct(pid)
        console.log(pid)
        if (success) {
            toast({
                "title": "Product deleted",
                "description": message
            })

        }
        else {
            toast({
                "title": "Product Deleted",
                "description": message
            })
        }

    }
    return (
        <Box>
            <Box
                shadow="lg"
                rounded='lg'
                overflow='hidden'
                transition='all 0.3s'
                _hover={{ transform: "translateY(-5px)", shadow: 'xl' }}
            >

                <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
                <Text alignContent="center">{product.price}</Text>
                <HStack>
                    <Button onClick={onOpen}>edit</Button>
                    <Button onClick={() => handleOndelete(product._id)}>Del</Button>
                </HStack>

            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{updtedProduct._id ? "Update Product" : "Add Product"}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder='Product Name'
                                name='name'
                                defaultValue={updtedProduct.name}
                                onChange={(e) => setUpdatedprooduct({ ...updtedProduct, name: e.target.value })} // Corrected
                            />
                            <Input
                                placeholder='Price'
                                name='price'
                                type='number'
                                defaultValue={updtedProduct.price}
                                onChange={(e) => setUpdatedprooduct({ ...updtedProduct, price: e.target.value })} // Corrected
                            />
                            <Input
                                placeholder='Image URL'
                                name='image'
                                defaultValue={updtedProduct.image}
                                onChange={(e) => setUpdatedprooduct({ ...updtedProduct, image: e.target.value })} // Corrected
                            />
                            <Button colorScheme='blue' onClick={() => handleOnUpdate(updtedProduct._id, updtedProduct)} w={'full'}>
                                {updtedProduct._id ? "Update Product" : "Add Product"}
                            </Button>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Box>

    )
}

export default ProductCard
