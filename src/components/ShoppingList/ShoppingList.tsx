import { html } from 'lit-html';
import { component } from 'haunted';

interface ProductsProps {
  products: string[];
};

const emptyListMsg = "Shopping list is empty.";
const shoppingListText = "Shopping list";

export function ShoppingList({products}) {

  const handleRemoveProduct = (product) => {
    const event = new CustomEvent('remove-product', {
      bubbles: true,
      composed: true,
      detail: product
    });
    this.dispatchEvent(event);
  }

  const handlePrint = () => {
    window.print();
  }

  const styles = `
    .shopping-list-container {
      padding: 20px;
      border: 1px solid transparent;
      border-radius: 8px;
      box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;
      background: #FFF;
    }

    .shopping-list-title {
      width: 100%;
      display: flex;
      justify-content: center;
      text-transform: uppercase;
      font-weight: 600;
    }

    .shopping-list {
      display: flex;
      min-width: 340px;
      width: 100%;
      flex-direction: column;
      margin: 0;
      padding: 0;
      list-style-type: none;
      border-radius: 8px;
    }

    .shopping-list > .shopping-list-element {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-width: 200px;
      width: 100%;
      text-align: center;
      border-bottom: 1px solid rgba(131, 223, 255, 0.2);
      list-style-type: none;
      border: none;
      border-radius: 4px;
      background: #FFF;
      margin-bottom: 8px;
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    }

    .shopping-list > .empty-shopping-list {
      text-align: center;
    }

    .shopping-list > .shopping-list-element:last-of-type {
      margin-bottom: 0;
    }

    .shopping-list > .shopping-list-element > button {
      border: transparent;
      background: transparent;
      cursor: pointer;
    }

    .shopping-list > .shopping-list-element > .name {
      padding: 10px 10px;
    }

    .shopping-list-container > .shopping-list-btn-print-box {
      display: flex;
      width: 100%;
      min-height: 60px;
      align-items: center;
      margin-top: 40px;
    }

    .shopping-list-container > .shopping-list-btn-print-box > .btn-print {
      width: 120px;
      height: 40px;
      background-color: rgba(53, 53, 53, 0.1);
      border: none;
      border-radius: 4px;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      font-size: 16px;
      font-weight: 600;
      font-family: Nunito, sans-serif;
    }

    .shopping-list-container > .shopping-list-btn-print-box > .btn-print:hover {
      cursor: pointer;
      color: #8e99a3;
    }
  `;

  function createList() {
    let templates;
    if (products && products.length) {
      templates = products?.map(product => {
        return html`
          <li class="shopping-list-element">
            <span class="name">${product}</span>
            <button type="button"
              @click=${() => handleRemoveProduct(product)}
            >
              <img src="/assets/close.svg" />
            </button>
          </li>
        `;
      });
    } else {
      templates = html`
        <p class="empty-shopping-list">${emptyListMsg}</p>
      `;
    }

    return templates;
  }

  return html`
    <style>${styles}</style>
    <div class="shopping-list-container">
      <p class="shopping-list-title">${shoppingListText}</p>
      <ul class="shopping-list">
        ${createList()}
      </ul>
      <div class="shopping-list-btn-print-box">
        <button class="btn-print" type="button"
          @click=${() => {handlePrint()}}
        >Print</button>
      </div>
    </div>
  `;
}

customElements.define('shopping-list',
  component<HTMLElement & ProductsProps>(ShoppingList)
);
