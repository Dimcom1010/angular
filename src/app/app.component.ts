import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrapper">
      <div class="back"></div>
      <div class="container">
        <app-header class="header"></app-header>
        <div class="main">
          <router-outlet></router-outlet>
        </div>
        <app-footer class="footer"></app-footer>
      </div>
    </div>
  `,
  styles: [
    `
      :root {
        --mobile: 600px;
        --table: 900px;
      }
      .wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        color: var(--text-color);
      }
      .back {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background: var(--bg);
        z-index: -1;
      }
      .container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1em;
      }
      .main {
        flex: 1 0 auto;
      }
      .footer {
        flex: 0 0 auto;
      }
    `,
  ],
})
export class AppComponent {}
