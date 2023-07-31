import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductList = ({products}) => {

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
      </div>
    )
}

ProductList.propTypes = {
    products: PropTypes.array,
};

export default ProductList;