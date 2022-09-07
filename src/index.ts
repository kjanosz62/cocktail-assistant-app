import { html } from 'lit-html';
import { component, useEffect, useState } from 'haunted';
import { ToastStatus } from './enums/toastStatus.enum';

import '../src/components/QueryResultsList/QueryResultsList';
import '../src/components/SearchInput/SearchInput';
import '../src/components/ShoppingList/ShoppingList';
import '../src/components/Toaster/Toaster';
import '../src/index.css';

export function App(element) {
  const [drinks, setDrinks] = useState([]);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('');
  
  let statusTimeout = null;

  const handleStatusChange = (inputStatus: ToastStatus) => {
    if (statusTimeout) {
      clearTimeout(statusTimeout);
    }

    setStatus(inputStatus);

    statusTimeout = setTimeout(() => {setStatus('')}, 3000);
  }

  useEffect(() => {
    async function fetchDrinks(searchQuery) {
      const apiUrlBase = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
      const response = await fetch(
        `${apiUrlBase}${searchQuery}`
      )
      const parsedResponse = await response.json();
      handleStatusChange(ToastStatus.Results);
      setDrinks(parsedResponse?.drinks);
    }

    const onSearchQuery = ({ detail: query }) => {
      if (query) {
        handleStatusChange(ToastStatus.Searching);
        fetchDrinks(query);
      } else {
        setDrinks([]);
        handleStatusChange(ToastStatus.NoResults);
      }
    }

    element.addEventListener('search-query', onSearchQuery);

    return () => element.removeEventListener('search-query', onSearchQuery);
  });

  useEffect(() => {
    const onAddDrink = ({ detail: drink }) => {
      const maxIngredientsNumber = 15;
      const newIngredientsArray = [];
      if (drink) {
        for (let step = 0; step < maxIngredientsNumber; ++step) {
          if (drink[`strIngredient${step + 1}`]) {
            newIngredientsArray.push(drink[`strIngredient${step + 1}`]);
          }
        }
      }

      const entireProductsListWithDuplicates = [...products, ...newIngredientsArray];
      const uniqueProductsList = entireProductsListWithDuplicates.filter((element, index) => {
        return entireProductsListWithDuplicates.indexOf(element) === index;
      });

      setProducts(uniqueProductsList);
      handleStatusChange(ToastStatus.AddedSuccess);
    }

    element.addEventListener('add-drink', onAddDrink);

    return () => element.removeEventListener('add-drink', onAddDrink);
  });

  useEffect(() => {
    const onRemoveProduct = ({ detail: product }) => {
      if (product) {
        setProducts(products.filter(prod => prod !== product));
        handleStatusChange(ToastStatus.RemovalSuccess);
      }
    }

    element.addEventListener('remove-product', onRemoveProduct);

    return () => element.removeEventListener('remove-product', onRemoveProduct);
  });

  useEffect(() => {
    const onStatusChange = ({ detail: status }) => {
      if (status) {
        setStatus(status);
      }
    }

    element.addEventListener('status-change', onStatusChange);

    return () => element.removeEventListener('status-change', onStatusChange);
  });

  const styles = `
    .main-app-container,
    .main-app-container > .content,
    .main-app-container > .content > .content-col {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .main-app-container {
      position: relative;
      min-height: calc(100vh - 144px);
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 72px 0;
      background: #FFEEEE;
      background: -webkit-linear-gradient(to right, #DDEFBB, #FFEEEE);
      background: linear-gradient(to right, #DDEFBB, #FFEEEE);
    }

    .main-app-container > .content {
      position: relative;
      display: flex;
      align-items: flex-start;
      max-width: 1440px;
      width: 100%;
      padding: 40px 0;
    }

    .main-app-container > .content > .content-col {
      position: relative;
      flex-direction: column;
    }

    .main-app-container > .content > .content-col:nth-of-type(2) {
      width: 32%;
    }

    @media print {
      .main-app-container * {
        display: none;
      }

      .main-app-container .content .content-col:nth-of-type(2) * {
        display: flex;
      }
    }
  `;

  return html`
    <style>
      ${styles}
    </style>
    <div class='main-app-container'>
      <search-input></search-input>
      <div class='content'>
        <div class='content-col'>
          <query-results-list .drinks=${drinks}></query-results-list>
        </div>
        <div class='content-col'>
          <shopping-list .products=${products}></shopping-list>
        </div>
      </div>
      <toaster-bar .status=${status}></toaster-bar>
    </div>
  `;
}

customElements.define(
  "cocktail-assistant-app",
  component(App)
);
