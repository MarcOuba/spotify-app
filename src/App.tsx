
import {Routes , Route } from "react-router-dom"
import LoginPage from "./LoginPage/LoginPage"
import Home from "./Home/Home"
import Albums from "./Albums/Albums"
import { QueryClient, QueryClientProvider } from 'react-query'

function App() {

  const client : any=new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <Routes>

<Route path="/" element={<LoginPage></LoginPage>}></Route>
<Route path="/home" element={<Home></Home>}></Route>
<Route path="/albums/:id" element={<Albums></Albums>}></Route>


      </Routes>
    </QueryClientProvider>
  )
}

export default App;
