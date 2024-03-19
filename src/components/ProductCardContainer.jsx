import ProductCard from "./ProductCard";

export default function ProductCardContainer({ products, addToCart }) {
  const productsJsx = products.map((product) => (
    <ProductCard key={product.id} product={product} addToCart={addToCart}/>
  ));
  return (
    <>
    
      <h1>Discover Your Favorite Products</h1>
      {productsJsx}
    </>
  );
}
