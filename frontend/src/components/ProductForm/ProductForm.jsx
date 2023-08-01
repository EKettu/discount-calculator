import { useState } from 'react';
import { SEASONS } from '../../services/config';
import Select from 'react-select';
import PropTypes from 'prop-types';

const ProductForm = ({ createProduct }) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    normalPrice: ''
  })

  const [selectedSeasons, setSelectedSeasons] = useState([]);

  const addProduct = (event) => {
    event.preventDefault();
    const saleMonths = selectedSeasons ? selectedSeasons.map(season => season.value) : [];
    createProduct({...newProduct, saleMonths: saleMonths});
    setNewProduct({
        name: '',
        normalPrice: ''
      });
    setSelectedSeasons([]);
  }

  function handleChange(evt) {
    const value = evt.target.value;
    setNewProduct({
      ...newProduct,
      [evt.target.name]: value,
    });
  }

  function handleSelect(seasons) {
    setSelectedSeasons(seasons);
  }

  return (
    <div>
      <h2>Create a new product</h2>

      <form onSubmit={addProduct}>
      <label>
        Product name 
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Price 
        <input
          type="text"
          name="normalPrice"
          value={newProduct.normalPrice}
          onChange={handleChange}
        />
      </label>
      <label> Sale months 
        <Select
                defaultValue={selectedSeasons}
                value={selectedSeasons}
                onChange={handleSelect}
                options={SEASONS}
                isMulti
                hideSelectedOptions={true}
            />  
        </label>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

ProductForm.propTypes = {
    createProduct: PropTypes.func
};

export default ProductForm