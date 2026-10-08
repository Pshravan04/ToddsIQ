import { shopifyFetch } from './client';
import {
  CREATE_CART_MUTATION,
  GET_CART_QUERY,
  ADD_LINES_MUTATION,
  UPDATE_LINES_MUTATION,
  REMOVE_LINES_MUTATION,
} from './queries';

export async function createCart() {
  const data = await shopifyFetch({
    query: CREATE_CART_MUTATION,
    variables: { input: {} }
  });
  return data.cartCreate.cart;
}

export async function getCart(cartId) {
  const data = await shopifyFetch({
    query: GET_CART_QUERY,
    variables: { cartId }
  });
  return data.cart;
}

export async function addCartLines(cartId, lines) {
  const data = await shopifyFetch({
    query: ADD_LINES_MUTATION,
    variables: { cartId, lines }
  });
  return data.cartLinesAdd.cart;
}

export async function updateCartLines(cartId, lines) {
  const data = await shopifyFetch({
    query: UPDATE_LINES_MUTATION,
    variables: { cartId, lines }
  });
  return data.cartLinesUpdate.cart;
}

export async function removeCartLines(cartId, lineIds) {
  const data = await shopifyFetch({
    query: REMOVE_LINES_MUTATION,
    variables: { cartId, lineIds }
  });
  return data.cartLinesRemove.cart;
}
