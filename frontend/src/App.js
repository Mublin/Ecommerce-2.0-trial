import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomeScreen from './screens/HomeScreen';
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ProductScreen from './screens/ProductScreen';
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav"
import Badge from "react-bootstrap/Badge"
import Container from "react-bootstrap/Container"
import { LinkContainer } from "react-router-bootstrap"
import {Helmet} from "react-helmet-async"
import { Store } from './Store';
import { useContext } from 'react';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SignupScreen from "./screens/SignupScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
  const {state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state
  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT"})
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentmethod");
    window.location.href= "/signin"
    // navigate('/sigin')
  }
  return (
    <BrowserRouter>
    <div className='d-flex flex-column site-container'>
      <ToastContainer position="bottom-center" limit={1} />
      <Helmet>
          <title>Kano-Mall</title>
      </Helmet>
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container className="mt-3">
            <LinkContainer to="/">
              <Navbar.Brand>Kano-Mall</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-bar" />
            <Navbar.Collapse id="basic-navbar-bar">
            <Nav className="me-auto w-100 justify-content-end" >
              <Link to="/cart" className='nav-link'>
                Cart {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce((a,c) => a + c.quantity, 0)}
                  </Badge>
                )}
              </Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>User Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item>Order History</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <Link className="dropdown-item"
                  to="#signout"
                  onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </NavDropdown>
              ) : (<Link className="nav-link" to="/signin">
              Sign In
              </Link>
              )}
            </Nav>
          </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main>
        <Routes>
          <Route path='/signin' element={<SigninScreen />} />
          <Route path='/signup' element={<SignupScreen />} />
          <Route path='/payment' element={<PaymentMethodScreen />} />
          <Route path='/placeorder' element={<PlaceOrderScreen />} />
          <Route path='/order/:id' element={<OrderScreen />} />
          <Route path='/cart' element={<CartScreen />} />
          <Route path='/profile' element={<ProfileScreen />} />
          <Route path='/orderhistory' element={<OrderHistoryScreen />} />
          <Route path='/shipping' element={<ShippingAddressScreen />} />
          <Route path='/product/:slug' element={<ProductScreen />} />
          <Route path='/' element={<HomeScreen />} />
        </Routes>
      </main>
      <footer>
        <div className='text-center'>All rights reserved Amos Gele</div>
      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
