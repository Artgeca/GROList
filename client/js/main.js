import {
  getFormValues,
  createListItem,
  clearInputValues,
  setBtnEventListeners
} from './helpers/list-helpers.js';
import ApiService from './helpers/api-service.js';

const addForm = document.querySelector('form');

addForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formValues = getFormValues(e.target);
  ApiService.createProduct(formValues);
  createListItem(formValues);

  clearInputValues();
});

const products = await ApiService.fetchProducts();
products.forEach(createListItem);

setBtnEventListeners();
