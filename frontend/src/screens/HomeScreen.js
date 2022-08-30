import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logger from "use-reducer-logger";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
// import { data } from "../data";

const reducer = (state,  action) => {
  switch (action.type){
    case "FETCH_REQUEST":
      return {...state, loading: true}
    case "FETCH_SUCCESS":
      return {...state, loading: false, products: action.payload}
    case "FETCH_FAIL":
      return {...state, loading: false, error: action.payload}
    default:
      return state
  }
}

function HomeScreen () {
  const [{loading, error, products}, dispatch] = useReducer(logger(reducer), {
    loading: true,
    error: '',
    products: []
  })
  useEffect(()=>{
    const fetchData = async ()=>{
      dispatch({type: "FETCH_REQUEST"})
      try {
        const result = await axios.get(`http://localhost:5090/api/products/`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data})
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error)})
      }
      // setProducts(result.data)
    };
    fetchData();
  }, [])
    return( <div>
        <h1>Featured Products</h1>
    <div className='products'> 
      {loading ? <LoadingBox /> :
      error ? <MessageBox variant="danger">{getError(error)}</MessageBox> :(<Row> {products.map(product=> ( 
      <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
      <Product product={product}></Product>  
    </Col>
    ))}</Row>)}
    </div>
    </div>)
}

export default HomeScreen;