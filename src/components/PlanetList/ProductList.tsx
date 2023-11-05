import Loader from '../Loader/Loader';
import './PlanetList.css';
import NotFoundMessage from './NotFoundMessage';
import { ProductInfo } from './ProductInfoTypes';
import ProductListGrid from './ProductListGrid';

type ProductProps = {
  data: string;
  items: ProductInfo[];
  isLoaded: boolean;
  error: Error | null;
};

const ProductList: React.FC<ProductProps> = ({
  data,
  items,
  isLoaded,
  error,
}) => {
  const renderProductDetails = (item: ProductInfo) => {
    return (
      <div key={item.title} className="result__wrapper result__wrapper--item">
        <div>
          <p> {item.title}</p>
          <p> {item.brand}</p>
          <p> {item.description}</p>
          <p> {item.price} </p>
        </div>

        <img src={item.images[0]} alt={item.title} />
      </div>
    );
  };

  if (!data) {
    return <ProductListGrid items={items} />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!isLoaded) {
    return <Loader />;
  }

  const storageKey = localStorage.getItem('inputKey');

  if (storageKey) {
    const trail = storageKey.trim().toLowerCase();
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(trail)
    );

    if (filteredItems.length === 0) {
      return <NotFoundMessage />;
    }

    return (
      <div className="result">
        {filteredItems.map((item) => renderProductDetails(item))}
      </div>
    );
  }
};

export default ProductList;
