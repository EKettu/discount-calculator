import {useParams} from 'react-router-dom';

const Product = ({ product, updateDiscountPct, newDiscountPct, handleDiscountChange}) => {
  const id = useParams().id;

  if (product) {
    const discountPrice = product.normalPrice - (product.normalPrice * product.discountPct/100)

    return (
      <div>
        <h2>{product.name}</h2>
        <p>Normal price: {product.normalPrice}</p>
        <p>Discount percentage: {product.discountPct}</p>
        <p>Discount price: {discountPrice}</p>
        <h4>Update discount percentage</h4>
        <form onSubmit={updateDiscountPct(id)}>        
          <input value={newDiscountPct} onChange={handleDiscountChange}/>        
          <button type="submit">update</button>      
        </form>   
      </div>    
    )
  }
  return (
    <div>
      <p> Loading</p>  
    </div>
    
  )
}

export default Product