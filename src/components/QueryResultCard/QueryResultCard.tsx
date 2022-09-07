import { html } from 'lit';
import { component } from 'haunted';
import CardData from "../../models/cardData.model";

interface CardDataProps {
  cardData: CardData;
};

export function QueryResultCard({cardData}: CardDataProps) {

  const handleAddDrinkToSelectedDrinksList = (cardData) => {
    const event = new CustomEvent('add-drink', {
      bubbles: true,
      composed: true,
      detail: cardData
    });
    this.dispatchEvent(event);
  }

  const styles = `
    .card {
      display: flex;
      box-sizing: border-box;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-width: 540px;
      max-width: 860px;
      width: 860px;
      min-height: 160px;
      height: 185px;
      background: rgb(255, 255, 255);
      box-shadow: rgb(0 29 86 / 5%) 0px 0px 20px;
      border-radius: 10px;
    }

    .card > .card-content {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      height: 100%;
    }

    .card > .card-content > .img-content {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20%;
    }

    .card > .card-content > .img-content > img {
      width: 120px;
    }

    .card > .card-content > .name-desc-content {
      display: flex;
      flex-direction: column;
      width: 60%;
      padding-top: 12px;
      padding-bottom: 12px;
      margin-left: 20px;
    }

    .card > .card-content > .name-desc-content > .name,
    .card > .card-content > .name-desc-content > .instructions {
      text-align: left;
    }

    .card > .card-content > .name-desc-content > .instructions {
      max-height: 132px;
      overflow: auto;
    }

    .card > .card-content > .name-desc-content > .name {
      font-weight: 600;
      font-size: 20px;
      margin-bottom: 10px;
    }

    .card > .card-content > .btn-content {
      position: absolute;
      display: flex;
      align-items: flex-end;
      height: 100%;
      right: 20px;
      bottom: 20px;
    }

    .card > .card-content > .btn-content > .btn-add {
      width: 50px;
      height: 50px;
      background-color: #edede9;
      border: none;
      border-radius: 8px;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      font-size: 32px;
    }

    .card > .card-content > .btn-content > .btn-add:hover {
      cursor: pointer;
      color: #8e99a3;
    }
  `;

  function createCard() {
    const thumbPath = cardData?.strDrinkThumb;
    const content = html`
      <div class="card">
        <div class="card-content">
          <div class="img-content">
            <img src="${thumbPath}" />
          </div>
          <div class="name-desc-content">
            <div class="name">${cardData?.strDrink}</div>
            <div class="instructions">${cardData?.strInstructions}</div>
          </div>
          <div class="btn-content">
            <button class="btn-add"
              @click=${() => handleAddDrinkToSelectedDrinksList(cardData)}
            >+</button>
          </div>
        </div>
      </div>
    `;

    return content;
  }

  return html`
    <style>${styles}</style>
    ${createCard()}
  `;
}

customElements.define('query-result-card',
  component<HTMLElement & CardDataProps>(QueryResultCard)
);
