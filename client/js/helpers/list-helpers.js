import ApiService from './api-service.js';

const addForm = document.querySelector('form');
const listBody = document.querySelector('tbody');

export const getFormValues = (form) => {
  let inputValues = {};
  const formData = new FormData(form);

  for (const pair of formData.entries()) {
    inputValues[pair[0]] = pair[1];
  }

  return inputValues;
};

export const createTableBtn = (type, id) => {
  const btn = document.createElement('button');
  btn.setAttribute('prodid', id);
  btn.classList = `btn btn-${type === 'edit' ? 'warning' : 'danger'}`;
  if (type === 'edit') {
    btn.setAttribute('type', 'button');
    btn.setAttribute('data-bs-toggle', 'modal');
    btn.setAttribute('data-bs-target', '#editModal');
  }
  const btnIcon = document.createElement('i');
  btnIcon.classList = `${type === 'edit' ? 'bi bi-pencil' : 'bi bi-trash'}`;
  btn.append(btnIcon);

  return btn;
};

export const createListItem = ({ description, quantity, id }) => {
  const listItem = document.createElement('tr');
  listItem.setAttribute('prodid', id);

  const itemDescription = document.createElement('td');
  itemDescription.classList = 'w-50';
  itemDescription.setAttribute('name', 'description');
  itemDescription.innerText = description;

  const itemQty = document.createElement('td');
  itemQty.classList = 'w-25';
  itemQty.setAttribute('name', 'quantity');
  itemQty.innerText = quantity;

  const itemEditBtn = document.createElement('td');
  const editBtn = createTableBtn('edit', id);
  itemEditBtn.append(editBtn);
  const itemDeleteBtn = document.createElement('td');
  const deleteBtn = createTableBtn('delete', id);
  itemDeleteBtn.append(deleteBtn);

  listItem.append(itemDescription, itemQty, itemEditBtn, itemDeleteBtn);

  listBody.insertAdjacentElement('afterbegin', listItem);
};

export const clearInputValues = () => {
  const descriptionInput = addForm.querySelector('[name = "description"]');
  descriptionInput.value = '';
  const qtyInput = addForm.querySelector('[name = "quantity"]');
  qtyInput.value = 1;
};

const setModalValues = (prodId) => {
  const item = document.querySelector(`tr[prodid="${prodId}"]`);
  const desc = item.querySelector('[name="description"]').innerText;
  const qty = item.querySelector('[name="quantity"]').innerText;
  const modalDescription = document.querySelector('#product-description');
  modalDescription.value = desc;
  const modalQuantity = document.querySelector('#product-quantity');
  modalQuantity.value = qty;
};

const setModalSaveBtnEventListener = (prodId) => {
  const saveBtn = document.querySelector('#save-btn');
  console.log(saveBtn);
  saveBtn.addEventListener('click', () => {
    const description = document.querySelector('#product-description').value;
    const quantity = document.querySelector('#product-quantity').value;

    console.log(description, quantity);

    ApiService.updateProduct({ description, quantity }, prodId);
  });
};

export const setBtnEventListeners = () => {
  const deleteBtns = listBody.querySelectorAll('td .btn-danger');
  const editBtns = listBody.querySelectorAll('td .btn-warning');
  deleteBtns.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      const id = btn.getAttribute('prodid');
      await fetch(`http://localhost:1337/products/${id}`, {
        method: 'DELETE'
      });
    });
  });
  editBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('prodid');
      setModalValues(id);
      setModalSaveBtnEventListener(id);
    });
  });
};
