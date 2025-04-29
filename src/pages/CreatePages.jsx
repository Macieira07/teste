import {Box,Container,Heading,useColorModeValue,VStack} from "@chakra-ui/react";
import {useState } from 'react';
import {useProductStore} from "../store/product";

const CreatePage = () =>  {
    const [newProduct, setNewProduct]= useState({
        name:"",
        price:"",
        image:"",
    });

    const toast=useToast( )

const{createProduct}=useProductStore()   

const handleAddProduct= async()=>{ 
const {sucess,message} = await createProduct(newProduct)
if(!sucess){
    toast({
            title:"Erro",
            description:message,
            status:"erro",
            duration:5000,
            isClosable:true
        })
    }else{
        toast({
            title:"Success",
            description:"message",
            status:"success",
            isClosable:true
        })
}
setNewProduct({name:"", price:"", image:""});
};
    
    return <Container maxW={"container.sm"}>
        <VStack
        spacing={8}
        >
            <Heading as={"h1"} size={"2x1"} textAlign={"center"} mb={8}>
                Criar um novo Produto
            </Heading>

            <Box
            w={"full"} bg={useColorModeValue("white", "gray.800")}
            p={6} rounded={"lg"} shadow={"md"}
            >
                <Vstack spacing={4}>
                    <Input
                    placeholder="Nome do produto"
                    name="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({... newProduct, name: e.target.value})}
                    />

                    <Input
                    placeholder="Preço"
                    name="price"
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({... newProduct, price: e.target.value})}
                    />
                    <Input
                    placeholder="Imagem URL"
                    name="image"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({... newProduct, image: e.target.value})}
                    />


                    <Button colorScheme='blue' onClick={handleAddProduct} w="full">
                        Adicionar Produto
                    </Button>
                </Vstack>

            </Box>
        </VStack>
    </Container>
};
export default CreatePage