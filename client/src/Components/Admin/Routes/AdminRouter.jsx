import { Routes, Route } from "react-router-dom";
import PostProducts from "../PostProducts";

export default function AdminRouter(){

    <Routes>
        <Route path='/admin/post-products' element={<PostProducts />} />
    </Routes>
}