import {useParams} from 'react-router-dom'

const Customer = ({ customers }) => {
  const id = useParams().id;
  const customer = customers.find(customer => customer.id === Number(id));
  return (
    <div>
      <h2>{customer.name}</h2>
    </div>
  )
}

export default Customer