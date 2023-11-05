import React from 'react';
import '../css/purchase.css';

function purchase() {  
    const handleSubmit = event => {
   event.preventDefault();
   alert('You have submitted the form.')
     }

  return (
    <div className="wrapper">
      <h1>Purchase</h1>
      <form onSubmit={handleSubmit}>
      <fieldset>
         <label>
           <p>Invoice Number</p>
           <input name="Invoice Number" />
         </label>
         <label>
           <p>Name</p>
           <input name="name" />
         </label>
         <label>
           <p>Vendor</p>
           <input name="Vendor" />
         </label>
         <label>
           <p>Date</p>
           <input name="Date" />
         </label>
         <label>
           <p>Quantity</p>
           <input name="Quantity" />
         </label>
         <label>
           <p>Total Amount</p>
           <input name="Total Amount" />
         </label>
       </fieldset>
       <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default purchase;