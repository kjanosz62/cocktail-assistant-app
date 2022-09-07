import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';
import { component } from 'haunted';
import { ToastStatus } from '../../enums/toastStatus.enum';

interface ToasterProps {
  status: ToastStatus;
};

export function Toaster({status}) {
  const styles = `
    .toaster-container {
      position: fixed;
      top: calc(100vh - 100px);
      right: 94px;
      display: flex;
      min-width: 384px;
      min-height: 48px;
      justify-content: center;
      border-radius: 8px;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
      background: #edeec9;
    }

    .toaster-container.not-displayed {
      display: none;
    }

    .toaster-container > .toaster-info {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: 16px;
      font-weight: 600;
    }
  `;

  return html`
    <style>${styles}</style>
    <div class="toaster-container ${classMap({'not-displayed': !status})}">
      <p class="toaster-info">${status}</p>
    </div>
  `;
}

customElements.define('toaster-bar',
  component<HTMLElement & ToasterProps>(Toaster)
);
