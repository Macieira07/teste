import {Box,    Image   } from '@chakra-ui/react';

const ProductCard = ({product}) => {
    return (
        <Box
        shadow='lg'
        rounded='lg'
        overflow='hidden'
        transition='all 0.3s'
        _hover={{   transform:  "translateY(-5px)", shadow: x1}}
        >
            <Image src={product.image} alt={product.name} h={48}   w="full" objectFit='cover'/>

            <Box p={4}>
                <Heading as ='h3' size="md" mb={2}>
                    {product.name}
                </Heading>
            </Box>

        </Box>
    )
};
export default ProductCard;