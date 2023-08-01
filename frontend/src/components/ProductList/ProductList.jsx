import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductForm from '../ProductForm/ProductForm';

const ProductList = ({products, createProduct}) => {

    return (
        <div>
            <h2>Products</h2>
            <ul>
                {products.map(product => 
                    <li key={product.id}>
                        <Link to={`/products/${product.id}`}>{product.name}</Link>
                    </li>          
                )} 
            </ul>
            <ProductForm createProduct={createProduct}/>  
      </div>
    )
}

ProductList.propTypes = {
    products: PropTypes.array,
    createProduct: PropTypes.func
};

export default ProductList;