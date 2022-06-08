import { Routes, Route } from "react-router-dom";
import PostProducts from "../PostProducts";

export default function AdminRouter(){

    return(

    <Routes>
        <Route path='/post-products' element={<PostProducts />} />

    </Routes>
)}