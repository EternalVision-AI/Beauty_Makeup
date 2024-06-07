import { style, theme } from "../lib.js"
import BnbNavbar from "./navbar.js"

export default {
  props: ["loading"],
  components: { BnbNavbar },
  template: /* HTML */ `
    <div class="bnb-layout is-flex is-flex-direction-column">
      <b-loading :active="loading" :is-full-page="false"></b-loading>
      <bnb-navbar class="is-flex-shrink-0" />
      <div style="min-height:0" class="is-flex is-flex-grow-1 p-4">
        <section class="container m-auto bnb-layout__workspace">
          <aside class="box is-flex-shrink-0 bnb-layout__panel"><slot name="left" /></aside>
          <main class="box is-flex is-flex-grow-1 ml-1 is-clipped bnb-layout__main">
            <slot />
          </main>
          
        </section>
      </div>
    </div>
  `,
}

style(/* CSS */ `
  .bnb-layout {
    width: 100%;
    height: 100%;
    background: #000 url('static/images/bg-2.jpg') 50% no-repeat;
    background-size: cover;
  }
  .bnb-layout__workspace {
    display: flex;
    width: 100%;
    height: 100%;
    max-height: 40.625rem;
  }
  .bnb-layout__workspace > .box {
    padding: 1rem;
    margin-bottom: 0;
    border-radius: 1rem;
  }
  .bnb-layout__panel {
    overflow: hidden;
    width: 20vw;
    background-color: white;
  }
  @media (max-width: 576px) {
    .bnb-layout__workspace {
      display: block;
    }
    .bnb-layout__panel {
        display: flex;
        justify-content: center;
        background-color: transparent;
        width: 100%;
        position: absolute;
        z-index: 99;
    }
  }

  .bnb-layout__panel.bnb-layout__panel--right {
    --scrollbar-thumb-color: rgba(72, 95, 199, 0.25);
    --scrollbar-thumb-border-color: ${theme.colors.light};

    border: 2px dashed ${theme.colors.border};
    background: transparent;
    box-shadow: unset;
  }
  .bnb-layout__main {
    z-index: 1;
  }
  @media (max-width: 576px) {
    .bnb-layout__main {
      margin-top: 40%;
      height: 100vw;
    }
    .layout__main {
      height: 100%;
    }
  }
`)

style(/* CSS */ `
  @media screen and (min-width: 1744px) {
    .container:not(.is-max-desktop):not(.is-max-widescreen) {
      max-width: 1680px;
    }
  }
  @media screen and (min-width: 1080px) {
    .bnb-layout__workspace {
      max-height: min(75%, 50rem);
    }
  }

  :root {
    --scrollbar-thumb-color: ${theme.colors.light};
    --scrollbar-thumb-border-color: white;
  }

  ::-webkit-scrollbar {
    width: 0.75rem;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border: 3px var(--scrollbar-thumb-border-color) solid;
    background-color: var(--scrollbar-thumb-color);
    border-radius: 6px;
  }
  ::-webkit-scrollbar-thumb:hover {
    border: 2px var(--scrollbar-thumb-border-color) solid;
  }
  * {
    scrollbar-width: thin;
    scrollbar-color: var(--scrollbar-thumb-color) transparent;
  }
`)


// <aside
//             class="box is-flex is-flex-shrink-0 is-align-self-flex-start bnb-layout__panel bnb-layout__panel--right"
//           >
//             <slot name="right" />
//           </aside>