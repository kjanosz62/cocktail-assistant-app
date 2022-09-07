import { html } from 'lit-html';
import { component, useState } from 'haunted';

export function SearchInput() {
  const [query, setQuery] = useState('');
  const enterKeyCode = 13;

  const handleSearchQuery = (queryString) => {
    const event = new CustomEvent('search-query', {
      bubbles: true,
      composed: true,
      detail: queryString
    });
    this.dispatchEvent(event);
  }

  const handleKeyup = (ev) => {
    if (ev) {
      setQuery(ev.target.value);
  
      if (ev.keyCode === enterKeyCode) {
        handleSearchQuery(ev.target.value);
      }
    }
  }

  const styles = `
    .search-container {
      position: relative;
      min-width: 640px;
      width: 100%;
      display: block;
      margin: 0 auto;
    }

    .search-container > button {
      position: absolute;
      width: 32px;
      height: 32px;
      top: 6px;
      right: -32px;
      border: transparent;
      background: transparent;
      cursor: pointer;
    }

    .search-container > button > img {
      position: absolute;
      width: 32px;
      height: 32px;
      top: 0;
      right: 0;
    }

    input#search-bar {
      margin: 0 auto;
      width: 100%;
      height: 45px;
      padding: 0 20px;
      font-size: 1rem;
      border: none;
      outline: none;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      border: 1px solid transparent;
      border-radius: 4px;
    }

    input#search-bar:focus {
      border: 1px solid #d3d3d3;
    }
    
    .search-icon {
      position: absolute;
      width: 32px;
      height: 32px;
      top: 6px;
      right: -32px;
    }  
  `;

  return html`
    <style>${styles}</style>
    <div class="search-container">
      <input class="search-input" type="text" id="search-bar" placeholder="Search for a product..."
        @keyup=${e => handleKeyup(e)}
      >
      <button type="button"
        @click=${() => handleSearchQuery(query)}
      >
        <img class="search-icon" src="/assets/search-icon.svg">
      </button>
    </div>
  `;
}

customElements.define('search-input',
  component(SearchInput)
);
