import React from 'react';
import { Link } from 'react-router-dom';
//import Aux from '../../../hoc/Auxiliary';
import './Product.css'

const Product = (props) => {
    const imageUrl = 'http://localhost:4000/';
    const image = `${imageUrl}${props.imagePath}`
    return ( 
        <article className="card product-item">
            <header className="card__header">
                <h1 className="product__title">{props.title}</h1>
            </header>
            <div className="card__image">
                <img src={image} alt={props.title} />
            </div>
            <div className="card__content">
                <h3 className="product__price">${props.price}</h3>
                <p className="product__description">{props.description}</p>
            </div>
            <div className="card__actions">
                <Link to="/" className="btn">Edit</Link>
                <button className="btn" type="button">Delete</button>
            </div>
        </article>
     );
}
 
export default Product;