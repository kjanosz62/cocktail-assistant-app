import { html } from "lit-html";
import { component } from 'haunted';

import '../QueryResultCard/QueryResultCard';
import { Variables } from "../../enums/Variables.enum";

interface DrinksProps {
  drinks: any;
};

const notFoundMsg = "No drinks found.";

export function QueryResultsList({drinks}) {
  let listElements;

  if (drinks && drinks.length) {
    listElements = drinks?.map(drink => {
      return html`
        <li class="li-element">
          <query-result-card
            .cardData=${drink}
          ></query-result-card>
        </li>
      `;
    });
  } else {
    listElements = html`
      <p class="empty-list">${notFoundMsg}</p>
    `;
  }    

  const styles = `
    .ul-list {
      display: flex;
      width: 100%;
      flex-direction: column;
      margin: 0;
      padding: 0;
      list-style-type: none;
    }

    .ul-list > .empty-list {
      text-align: center;
      width: 280px;
      padding: 10px 180px;
      box-shadow: ${Variables.shoppingListContainerShadowColor} 0px 5px 15px;
      background: #FFF;
      border-radius: 8px;
      margin: 0;
    }

    .ul-list > .li-element {
      display: flex;
      align-items: center;
      width: 100%;
      margin-bottom: 40px;
      text-align: center;
      border-bottom: 1px solid ${Variables.borderBottomColor};
      list-style-type: none;
    }

    .ul-list > .li-element:last-of-type {
      margin-bottom: 0;
    }
  `;

  return html`
    <style>${styles}</style>
    <ul class="ul-list">
      ${listElements}
    </ul>
  `;
}

customElements.define('query-results-list',
  component<HTMLElement & DrinksProps>(QueryResultsList)
);
