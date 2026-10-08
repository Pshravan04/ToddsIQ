import { shopifyFetch } from './client';
import { GET_COLLECTION_BY_HANDLE_QUERY } from './queries';
import { normalizeProduct } from './products';

export async function getCollectionByHandle(handle, first = 250) {
  try {
    const data = await shopifyFetch({
      query: GET_COLLECTION_BY_HANDLE_QUERY,
      variables: { handle, first }
    });
    
    if (data.collection) {
      return {
        id: data.collection.id,
        title: data.collection.title,
        description: data.collection.description,
        image: data.collection.image?.url,
        products: data.collection.products.edges.map(edge => normalizeProduct(edge.node))
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching collection:", error);
    return null;
  }
}
