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
      <select @change="eyeshape">
        <option>---Eye Shape---</option>
        <option>ROUND</option>
        <option>BULBOUS</option>
        <option>ALMOND</option>
        <option>NARROW</option>
        <option>UPTURNED</option>
        <option>DOWNTURNED</option>
        <option>HOODED</option>
        <option>MONOLID</option>
      </select>
      <button>Detect Eye Shape</button>
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
    margin-right: -0.75rem;
    // background: url('static/images/eyes.jpg') no-repeat;
    background-size: contain;
  }

`)
