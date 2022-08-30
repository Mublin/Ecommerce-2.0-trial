import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Rating from "../components/Rating";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async"
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import { getError } from "../utils";
import { Store } from "../Store";






const reducer = (state,  action) => {
    switch (action.type){
      case "FETCH_REQUEST":
        return {...state, loading: true}
      case "FETCH_SUCCESS":
        return {...state, loading: false, product: action.payload}
      case "FETCH_FAIL":
        return {...state, loading: false, error: action.payload}
      default:
        return state
    }
  }
function ProductScreen(){
    const { slug } = useParams();
    const navigate = useNavigate();
    const [{loading, error, product}, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
        product: {}
      })
      useEffect(()=>{
        const fetchData = async ()=>{
          dispatch({type: "FETCH_REQUEST"})
          try {
            const result = await axios.get(`http://localhost:5090/api/products/slug/${slug}`);
            dispatch({ type: "FETCH_SUCCESS", payload: result.data})
          } catch (error) {
            dispatch({ type: "FETCH_FAIL", payload: getError(error)})
          }
          // setProducts(result.data)
        };
        fetchData();
      }, [slug])

      const {state, dispatch: ctxDispatch} = useContext(Store);
      const {cart} = state
      const addToCartHandler = async () => {
        const existItem = cart.cartItems.find((x)=> x._id === product._id);
        const quantity =  existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`http://localhost:5090/api/products/${product._id}`);
        if (data.countInstock < quantity){
          window.alert(`Sorry, Product is out of stock`)
          return;
        }
        ctxDispatch({
          type:"CART_ADD_ITEM", 
          payload: {...product, quantity}}
          )
          navigate("/cart")
      }
    return(
      loading ? <LoadingBox /> :
      error ? <MessageBox variant="danger">{error}</MessageBox> :
        <div>
            <Row>
                <Col md={6}>
                   <img className="img-large" src={product.image}
                   alt={product.name} />
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                        <Helmet>
                          <title>{product.name}</title>
                        </Helmet>
                            <h1>{product.name}</h1> 
                            <p>{product.brand}</p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Rating rating={product.rating} numReviews={product.review} />    
                        </ListGroup.Item> 
                        <ListGroup.Item>
                            Price : ${product.price}    
                        </ListGroup.Item> 
                        <ListGroup.Item>
                            Description : ${product.description}    
                        </ListGroup.Item> 
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>status:</Col>
                                    <Col>
                                    { product.countInstock > 0 ? (
                                        <Badge bg="success">In Stock</Badge>
                                    ) : (<Badge bg="danger">Unavailable</Badge>)}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {product.countInstock > 0 && (
                                <ListGroup.Item>
                                    <div className="d-grid">
                                    <Button variant="primary" onClick={addToCartHandler}>Add to Cart</Button>
                                    </div>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
        )
}

export default ProductScreen;