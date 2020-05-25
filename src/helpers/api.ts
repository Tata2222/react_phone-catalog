const API_URL = 'https://mate-academy.github.io/react_phone-catalog/api';

export async function getData<T>(url: string): Promise<T[]> {
  const response = await fetch(url);
  return response.json();
};

export async function getGoods() {
  const phones = await getData<Good>(`${API_URL}/products.json`);

  return phones;
}
