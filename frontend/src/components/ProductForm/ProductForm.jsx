import { useState } from 'react';
import { SEASONS } from '../../services/config';
import Select from 'react-select';
import PropTypes from 'prop-types';
import './ProductForm.css';

const ProductForm = ({ createProduct }) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    normalPrice: ''
  });

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

      <form className='form' onSubmit={addProduct}>
        <label className='label' >
            Product name 
        </label>
        <input
            className='input'
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
        />
        <br />
        <label className='label' > 
            Price 
        </label>
        <input
            className='input'
            type="text"
            name="normalPrice"
            value={newProduct.normalPrice}
            onChange={handleChange}
        />
       
        <br/>
        <label className='label' > Sale months 
            <Select className='select'
                    defaultValue={selectedSeasons}
                    value={selectedSeasons}
                    onChange={handleSelect}
                    options={SEASONS}
                    isMulti
                    hideSelectedOptions={true}
                />  
            </label>
            <button className='button' type="submit">save</button>
      </form>
    </div>
  )
}

ProductForm.propTypes = {
    createProduct: PropTypes.func
};

export default ProductForm;