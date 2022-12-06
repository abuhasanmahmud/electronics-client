import "./App.css";
import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import ProductsDetails from "./components/Product/ProductsDetails";
import About from "./components/About/About";
import Products from "./components/Product/Products";
import Login from "./components/Auth/Login";
import Regi from "./components/Auth/Regi";
import Setting from "./components/Profile/Setting";
import UserProfile from "./components/Profile/UserProfile";
import ViewCart from "./components/Cart/ViewCart";
import UserDashbord from "./components/Dashbord/UserDashbord";
import Shipping from "./components/Shipping/Shipping";
import EditProfile from "./components/Dashbord/EditProfile";
import Protected from "./components/Protected/Protected";
import AllOrders from "./components/Dashbord/AllOrders";
import AllUsers from "./components/Dashbord/AllUsers";
import AllProduct from "./components/Dashbord/AllProduct";
import ForgetPassword from "./components/Auth/ForgetPassword";
import PasswordReset from "./components/Auth/PasswordReset";
import AddProduct from "./components/Dashbord/AddProduct";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route
          exact
          path="/about"
          element={
            <Protected>
              <About />
            </Protected>
          }
        />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forget/password" element={<ForgetPassword />} />
        <Route exact path="/password/reset/:resettoken" element={<PasswordReset />} />
        <Route exact path="/regi" element={<Regi />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/product/:id" element={<ProductsDetails />} />
        <Route exact path="/settings" element={<Setting />} />
        <Route exact path="/userprofile" element={<UserProfile />} />
        <Route exact path="/viewcart" element={<ViewCart />} />
        <Route
          exact
          path="/shipping"
          element={
            <Protected>
              <Shipping />
            </Protected>
          }
        />
        <Route exact path="/editprofile" element={<EditProfile />} />
        <Route path="/dashbord" element={<UserDashbord />}>
          <Route index element={<AllOrders />} />
          <Route path="allproduct" element={<AllProduct />} />
          <Route path="allusers" element={<AllUsers />} />
          <Route path="addproduct" element={<AddProduct />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
