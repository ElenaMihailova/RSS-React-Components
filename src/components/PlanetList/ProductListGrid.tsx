import { ProductInfo } from './ProductInfoTypes';

type ProductListDisplayProps = {
  items: ProductInfo[];
};

const ProductListGrid: React.FC<ProductListDisplayProps> = ({ items }) => {
  return (
    <div className="result result--all">
      {items.map((item) => (
        <div key={item.title} className="result__wrapper result__wrapper--all">
          <p>{`${item.title}`}</p>
          <p>{`${item.description}`}</p>
          <p>{`price: ${item.price} €`}</p>
          <p>etc.</p>
        </div>
      ))}
    </div>
  );
};

export default ProductListGrid;
