import { ProductInfo } from '../components/PlanetList/ProductInfoTypes';
import { PageInfo } from '../components/Pagination/Pagination';

export const getAllData = async (
  url: string
): Promise<{ items: ProductInfo[]; total: number }> => {
  let results: ProductInfo[] = [];
  let total = 0;
  let fetchUrl = url;
  let shouldContinue = true;

  while (shouldContinue) {
    const response = await fetch(fetchUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    results = results.concat(data.products as ProductInfo[]);
    total = data.total;

    if (data.next) {
      fetchUrl = data.next;
    } else {
      shouldContinue = false;
    }
  }

  return { items: results, total: total };
};

export const fetchDataForProductList = async (
  searchQuery: string | null,
  page: number,
  limit: number,
  setIsLoaded: (isLoaded: boolean) => void,
  setItems: (items: ProductInfo[]) => void,
  setError: (error: Error) => void,
  setPageInfo: (info: PageInfo) => void
) => {
  const baseUrl = 'https://dummyjson.com/products';
  const url = searchQuery
    ? `${baseUrl}/search?q=${encodeURIComponent(searchQuery)}`
    : `${baseUrl}?limit=${limit}&skip=${(page - 1) * limit}`;

  setIsLoaded(false);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    setIsLoaded(true);
    setItems(data.products);

    const totalPages = searchQuery
      ? Math.ceil(data.total / data.products.length)
      : Math.ceil(data.total / limit);

    setPageInfo({
      count: data.total,
      pages: totalPages,
    });
  } catch (error) {
    setIsLoaded(true);
    setError(error as Error);
  }
};
