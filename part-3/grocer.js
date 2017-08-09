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
const cartFooter = boxList.lastElementChild;
const cartSum = document.getElementById('sum');

/*
  ####################
  EVENT RESPONSES
  ####################
*/

/*
  Function to return whether the modal dialog box is invisible and therefore
  other user actions get responses.
*/

const uiEnabled = () => {
  return modalBox.className === 'modalbox invisible';
};

// Function to respond to an item order.

const addItem = (event) => {
  // If the UI is enabled and an item button was clicked:
  if (uiEnabled() && event.target.tagName === 'BUTTON') {
    // Identify the item ordered, its name, and its price.
    const orderedItem = event.target.parentNode;
    const itemName = orderedItem.querySelector('.item-name').textContent;
    const itemPriceText
      = orderedItem.querySelector('.item-price').textContent.substring(1);
    /*
      Create the selected item for the modal dialog box’s list of ordered
      items.
    */
    const newRow = modelCartRow.cloneNode(true);
    // Insert it into the modal dialog box’s list.
    boxList.insertBefore(newRow, cartFooter);
    // Populate its cells.
    newRow.firstElementChild.textContent = itemName;
    newRow.lastElementChild.textContent = '$' + itemPriceText;
    // Update the payment total.
    cartSum.textContent = (
      Number.parseFloat(cartSum.textContent, 10)
      + Number.parseFloat(itemPriceText, 10)
    ).toFixed(2);
    // Update the item count.
    cartItemCount.textContent = (
      Number.parseInt(cartItemCount.textContent) + 1
    ).toString();
  }
}

// Function to make the modal dialog box visible.

const exposeModal = (event) => {
  if (uiEnabled()) {
    modalBox.className = 'modalbox visible';
  }
}

// Function to restore the state in which no items are ordered.

const clearOrder = (event) => {
  if (! uiEnabled()) {
    let deletable;
    // Remove the modal dialog box’s list of ordered items.
    while (deletable = boxList.querySelector('.cartrow')) {
      boxList.removeChild(deletable);
    }
    // Make the modal dialog box’s payment total $0.
    cartSum.textContent = '0.00';
    // Make the cart button’s item count 0.
    cartItemCount.textContent = '0';
  }
}

// Function to make the modal dialog box invisible.

const hideModal = (event) => {
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
