import React from 'react';
import { Link } from 'react-router-dom';
//import Aux from '../../../hoc/Auxiliary';
import './Product.css'

const Product = (props) => {
    const imageUrl = `/${props.imagePath}`
    return ( 
        <article className="card product-item">
            <header className="card__header">
                <h1 className="product__title">{props.title}</h1>
            </header>
            <div className="card__image">
                <img src={imageUrl} alt={props.title} />
            </div>
            <div className="card__content">
                <h2 className="product__price">{props.price}</h2>
                <p className="product__description">{props.description}</p>
            </div>
            <div className="card__actions">
                <Link to="/" class="btn">Edit</Link>
                <button className="btn" type="button">Delete</button>
            </div>
        </article>
     );
}
 
export default Product;