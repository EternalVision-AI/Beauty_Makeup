import { style } from "../lib.js"
import BnbAsset from "./components/asset.js"
import BnbSetting from "./components/setting.js"
import Config from "./data/looks.js"
import looks_round from "./data/looks_round.js"
import looks_bulbos from "./data/looks_bulbos.js"
import looks_almond from "./data/looks_almond.js"
import looks_narrow from "./data/looks_narrow.js"
import looks_upturned from "./data/looks_upturned.js"
import looks_downturned from "./data/looks_downturned.js"
import { look } from "./stores/index.js"

export default {
  data: () => ({ looks: Config, selectedLook: look }),
  methods: {
    reset() {
      this.selectedLook.reset()
    },
    eyeshape(event) {
      // console.log(event.target.value)
      const option = event.target.value
      switch (option) {
        case 'ROUND':
          this.looks = looks_round
          break;
        case 'BULBOUS':
          this.looks = looks_bulbos
          break;
        case 'ALMOND':
          this.looks = looks_almond
          break;
        case 'NARROW':
          this.looks = looks_narrow
          break;
        case 'UPTURNED':
          this.looks = looks_upturned
          break;
        case 'DOWNTURNED':
          this.looks = looks_downturned
          break;
        case 'HOODED':
          this.looks = Config
          break;
        case 'MONOLID':
          this.looks = Config
          break;
      
        default:
          break;
      }

    }
  },
  components: { BnbSetting, BnbAsset },
  template: /* HTML */ `
    <bnb-setting @reset="reset">
      <div class="eyeshape">
        <select @change="eyeshape" class="eyeshape-select">
          <option> Eye Shape </option>
          <option>ROUND</option>
          <option>BULBOUS</option>
          <option>ALMOND</option>
          <option>NARROW</option>
          <option>UPTURNED</option>
          <option>DOWNTURNED</option>
          <option>HOODED</option>
          <option>MONOLID</option>
        </select>
        
      </div>
      
      <div class="is-flex is-flex-wrap-wrap bnb-looks">
        <bnb-asset
          v-for="(look, name) in looks"
          :key="name"
          class="m-2"
          :title="look.title"
          :cover="look.cover"
          :active="look.texture === selectedLook.texture"
          @change="selectedLook.update(look)"
        />
      </div>
    </bnb-setting>
  `,
}

style(/* CSS */ `
  .bnb-looks {
    // margin-right: -0.75rem;
    // background: url('static/images/eyes.jpg') no-repeat;
    background-size: contain;
    justify-content: center;
    width:100%;
  }
  .full-width {
    width: 100%;
  }
  .eyeshape {
    display: flex;
    text-align: center;
    border: 1px solid blue;
  }
  .eyeshape-select {
    text-align: center;
    border: 1px solid blue;
    width: 100%;
  }
  .eyeshape-help {
    background-color: white;
    border: 1px solid red;
    width: 20%;
  }
  .eyeshape-detect {
    background-image: linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%);
    border-style: none;
    box-sizing: border-box;
    color: #FFFFFF;
    cursor: pointer;
    flex-shrink: 0;
    font-family: "Inter UI","SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif;
    font-size: 16px;
    font-weight: 500;
    padding: 0 1.6rem;
    text-align: center;
    text-shadow: rgba(0, 0, 0, 0.25) 0 3px 18px;
    transition: all .5s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }

  .eyeshape-detect:hover {
    box-shadow: rgba(80, 63, 205, 0.5) 0 1px 25px;
    transition-duration: .1s;
  }

  @media (min-width: 768px) {
    .eyeshape-detect {
      padding: 0 2.6rem;
    }
  }
`)
