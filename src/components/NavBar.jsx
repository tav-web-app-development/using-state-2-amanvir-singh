import { useState } from "react";
export default function NavBar({ user } ) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [useShippingAddress, setUseShippingAddress] = useState(true);
  const [shippingAddress, setShippingAddress] = useState({
     firstName: '',
     lastName: '',
     address: '',
     city: '',
     state: '',
     postalCode: '',
  });
  const [billingAddress, setBillingAddress] = useState({
     firstName: '',
     lastName: '',
     address: '',
     city: '',
     state: '',
     postalCode: '',
  });
 
  const handleCheckoutClick = () => {
     setShowCheckout(true);
  };
 
  const handleUseShippingAddressChange = (e) => {
    setUseShippingAddress(e.target.checked);
      // Keeps the values of Billing address when changing the checkbox
      if (!shippingAddress.firstName && !shippingAddress.lastName && !shippingAddress.address && !shippingAddress.city && !shippingAddress.state && !shippingAddress.postalCode) {
        setShippingAddress(billingAddress);
      }
    
  };
 
  const handleInputChange = (e, type) => {
     const { name, value } = e.target;
     if (type === 'shipping') {
       setShippingAddress({ ...shippingAddress, [name]: value });
     } else {
       setBillingAddress({ ...billingAddress, [name]: value });
     }
  };
 
  const handleSubmit = (e) => {
     e.preventDefault();
     // Trim whitespace from all inputs
     const trimmedShippingAddress = {
       ...shippingAddress,
       firstName: shippingAddress.firstName.trim(),
       lastName: shippingAddress.lastName.trim(),
       address: shippingAddress.address.trim(),
       city: shippingAddress.city.trim(),
       state: shippingAddress.state.trim(),
       postalCode: shippingAddress.postalCode.trim(),
     };
     const trimmedBillingAddress = {
       ...billingAddress,
       firstName: billingAddress.firstName.trim(),
       lastName: billingAddress.lastName.trim(),
       address: billingAddress.address.trim(),
       city: billingAddress.city.trim(),
       state: billingAddress.state.trim(),
       postalCode: billingAddress.postalCode.trim(),
     };
     // Handle form submission
     console.log('Shipping Address:', trimmedShippingAddress);
     console.log('Billing Address:', trimmedBillingAddress);
     // Reset forms
     setShowCheckout(false);
     setUseShippingAddress(true);
     setShippingAddress({ firstName: '', lastName: '', address: '', city: '', state: '', postalCode: '' });
     setBillingAddress({ firstName: '', lastName: '', address: '', city: '', state: '', postalCode: '' });
  };
  return (
    <>
      {user ? (
        <span>{`Welcome ${user.firstName} ${user.lastName} `}</span>
      ) : (
        <a href="#">Login </a>
      )}
      <span>
        {user && user.itemsInCart !== 0 && `: ${user.itemsInCart} in your cart `}
      </span>
      <a href="#home">Home </a>
      <a href="#home">Laptops </a>
      <a href="#contact">Contact </a>
      <a href="#about">About </a>
      <button onClick={handleCheckoutClick}>Checkout</button>
      {showCheckout && (
        <form onSubmit={handleSubmit}>
          <h2>Shipping Address</h2>
          <input name="firstName" value={shippingAddress.firstName} onChange={(e) => handleInputChange(e, 'shipping')} placeholder="First Name" />
          <input name="lastName" value={shippingAddress.lastName} onChange={(e) => handleInputChange(e, 'shipping')} placeholder="Last Name" />
          <input name="address" value={shippingAddress.address} onChange={(e) => handleInputChange(e, 'shipping')} placeholder="Address" />
          <input name="city" value={shippingAddress.city} onChange={(e) => handleInputChange(e, 'shipping')} placeholder="City" />
          <input name="state" value={shippingAddress.state} onChange={(e) => handleInputChange(e, 'shipping')} placeholder="State" />
          <input name="postalCode" value={shippingAddress.postalCode} onChange={(e) => handleInputChange(e, 'shipping')} placeholder="Postal Code" />
          <label>
            <input type="checkbox" checked={useShippingAddress} onChange={handleUseShippingAddressChange} />
            Use shipping address as billing address
          </label>
          {!useShippingAddress && (
            <>
              <h2>Billing Address</h2>
              <input name="firstName" value={billingAddress.firstName} onChange={(e) => handleInputChange(e, 'billing')} placeholder="First Name" />
              <input name="lastName" value={billingAddress.lastName} onChange={(e) => handleInputChange(e, 'billing')} placeholder="Last Name" />
              <input name="address" value={billingAddress.address} onChange={(e) => handleInputChange(e, 'billing')} placeholder="Address" />
              <input name="city" value={billingAddress.city} onChange={(e) => handleInputChange(e, 'billing')} placeholder="City" />
              <input name="state" value={billingAddress.state} onChange={(e) => handleInputChange(e, 'billing')} placeholder="State" />
              <input name="postalCode" value={billingAddress.postalCode} onChange={(e) => handleInputChange(e, 'billing')} placeholder="Postal Code" />
            </>
          )}
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
}
