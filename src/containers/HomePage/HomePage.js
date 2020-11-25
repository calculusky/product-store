import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'; 
import UserContext from '../../context/context';
import Product from '../../components/store/Product/Product';
import Aux from '../../hoc/Auxiliary';
import serverProxy from '../../config';
import './HomePage.css'

const HomePage = () => {
    const { userData, setUserData } = useContext(UserContext);
    const [ products, setProducts ] = useState([]);
   // console.log(userData, '------homePG------ppp/....')

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsRes = await axios.get(`${serverProxy}`);                
                if(productsRes.data.data){
                    console.log(productsRes.data, '---8')
                    setProducts(productsRes.data.data)
                }

            } catch (error) {
                if(error.response === undefined){
                    return products;
                }
                if(error.response.data){
                    console.log(error.response.data)
                }
            }
        }

        fetchProducts();

    }, [])

    //set products variable
    let displayProducts = (
        <Aux>
            <h2>No products!</h2>
        </Aux>
    ) 
    if(products.length > 0){
        const listProducts = products.map(product => {
            return (
                <Product
                   title={product.title}
                   price={product.price}
                   imagePath={product.imagePath}
                   description={product.description}           
                />
            )
        })
        displayProducts = (
            <div className="grid">
                 {listProducts}
            </div>
           
        )
    }
   
    return (
        <div className="container">
            {displayProducts}
        </div>
    )
}
 
export default HomePage;













