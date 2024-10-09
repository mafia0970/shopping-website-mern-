import { Container, Flex, HStack, Text, Button, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { CiSquarePlus } from "react-icons/ci";
import { Link } from 'react-router-dom'
import { FaMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Container maxW={"1140px"} px={4}>
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{
                    base: 'column',
                    sm: "row"
                }}>
                <Text
                    bgGradient='linear(to-l, #7928CA, #FF0080)'
                    bgClip='text'
                    fontSize={'30px'}
                    fontWeight='extrabold'
                >
                    <Link to={"/"}>Product Store</Link>
                </Text>

                <HStack spacing={2} alignItems={"center"}>
                    <Link to={"/create"}>
                        <Button>
                            <CiSquarePlus />
                        </Button>
                    </Link>
                    <Button onClick={toggleColorMode}>
                        {colorMode == "light" ? <FiSun /> : <FaMoon />}

                    </Button>

                </HStack>


            </Flex>

        </Container>

    )
}

export default Navbar
