import {ChakraProvider} from "@chakra-ui/react";
import CreatePage from './pages/CreatePages';
import HomePage from './pages/HomePage';


function App(){
  return (
    <Box minH={"100vh"}>
      {/* <NavBar />*/}
      <Routes>
        <Route path ="/" element={<HomePage />}   />
        <Route path ="/create" element={<CreatePage />}   />
        
      </Routes>
    </Box>

  )
}
export default App
