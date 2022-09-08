import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';
import { component } from 'haunted';
import { ToastMsgStatus } from '../../enums/ToastMsgStatus.enum';
import { Variables } from '../../enums/Variables.enum';

interface ToasterProps {
  status: ToastMsgStatus;
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
      box-shadow: ${Variables.toastBoxShadow};
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
