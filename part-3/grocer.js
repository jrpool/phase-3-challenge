'use strict';

/*
  ####################
  ELEMENTS
  ####################
*/

// Identify the elements to monitor.

const content = document.getElementById('content');
const cartButton = document.getElementById('cart-button');
const clearButton = document.getElementById('clear-button');
const closeModal = document.getElementById('closemodal');

// Identify the elements to act on.

const cartItemCount = document.getElementById('cart-item-count');
const modalBox = document.getElementById('modalbox');
const boxList = document.getElementById('modallist');
const modelCartRow = document.getElementById('rowtemplate').firstElementChild;
const cartFooter = document.getElementById('modalfoot');
const cartSum = document.getElementById('sum');

/*
  ####################
  EVENT RESPONSES
  ####################
*/

/*
  Function returning whether the modal dialog box is invisible and therefore
  other user actions get responses.
*/

const uiEnabled = () => {
  return modalBox.className === 'modalbox invisible';
};

// Function responding to an item order.

const addItem = event => {
  if (uiEnabled() && event.target.tagName === 'BUTTON') {
    // Identify the item.
    const orderedItem = event.target.parentNode;
    const itemName = orderedItem.querySelector('.item-name').textContent;
    const itemPriceText
      = orderedItem.querySelector('.item-price').textContent.substring(1);
    // Add it to the modal dialog box.
    const newRow = modelCartRow.cloneNode(true);
    boxList.insertBefore(newRow, cartFooter);
    newRow.firstElementChild.textContent = itemName;
    newRow.lastElementChild.textContent = '$' + itemPriceText;
    // Update the amounts.
    cartSum.textContent = (
      Number.parseFloat(cartSum.textContent, 10)
      + Number.parseFloat(itemPriceText, 10)
    ).toFixed(2);
    cartItemCount.textContent = (
      Number.parseInt(cartItemCount.textContent) + 1
    ).toString();
  }
}

// Function making the modal dialog box visible.

const exposeModal = event => {
  if (uiEnabled()) {
    modalBox.className = 'modalbox visible';
  }
}

// Function reinitializing the content of the modal dialog box.

const clearOrder = event => {
  if (! uiEnabled()) {
    let deletable;
    while (deletable = boxList.querySelector('.cartrow')) {
      boxList.removeChild(deletable);
    }
    cartSum.textContent = '0.00';
    cartItemCount.textContent = '0';
  }
}

// Function making the modal dialog box invisible.

const hideModal = event => {
  if (! uiEnabled()) {
    document.getElementById('modalbox').className = 'modalbox invisible';
  }
}

/*
  ##################
  MONITORING
  ##################
*/

// Create event listeners.

content.addEventListener('click', addItem);
cartButton.addEventListener('click', exposeModal);
clearButton.addEventListener('click', clearOrder);
clearButton.addEventListener('click', clearOrder);
closeModal.addEventListener('click', hideModal);
