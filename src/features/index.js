import { style } from "../lib.js"
import * as stores from "../settings/stores/index.js"

export default {
  data: () => ({ ...stores }),
  computed: {
    features: ({
      brows,
      eyelashes,
      eyes,
      eyesMakeup,
      look,
      morphs,
    }) => {
      const features = []

      if (brows.enabled)
        features.push({
          group: "Eyes",
          name: brows.title,
          clear: () => brows.reset(),
        })
      for (const [name, region] of Object.entries(eyesMakeup))
        if (region.enabled)
          features.push({
            group: "Eyes",
            name: region.title,
            clear: () => eyesMakeup.reset(name),
          })
      if (eyelashes.enabled)
        features.push({
          group: "Eyes",
          name: eyelashes.title,
          clear: () => eyelashes.reset(),
        })
      for (const [name, property] of Object.entries(eyes))
        if (property.enabled || property.strength > 0)
          features.push({
            group: "Eyes",
            name: property.title,
            clear: () => eyes.reset(name),
          })

      if (look.texture)
        features.push({
          group: "Other",
          name: `Look "${look.title}"`,
          clear: () => look.reset(),
        })

      
      return features
    },
    empty: (vm) => vm.features.length === 0,
    groups: (vm) => vm.features.reduce((r, a) => ((r[a.group] ??= []).push(a), r), {}),
  },
  methods: {
    serialize() {
      const {
        brows,
        eyelashes,
        eyes,
        eyesMakeup,
        look,
        morphs,
      } = this

      const dump = {}

      if (brows.enabled) dump.brows = brows.color

      if (eyelashes.enabled) dump.eyelashes = eyelashes.color

      for (const [name, { strength }] of Object.entries(eyes))
        if (strength > 0) (dump.eyes ??= {})[name] = strength

      for (const [name, { enabled, color }] of Object.entries(eyesMakeup))
        if (enabled) (dump.eyesMakeup ??= {})[name] = color


      if (look.texture) dump.look = look.texture

      for (const [name, { strength }] of Object.entries(morphs))
        if (strength > 0) (dump.morphs ??= {})[name] = strength


      return dump
    },
  },
  template: /* HTML */ `
    <div
      class="is-flex is-flex-grow-1 is-flex-direction-column has-text-link has-text-centered bnb-features"
    >
      <h3 class="mb-2">Selected Features</h3>
      <p v-if="empty" class="mb-2 mt-2 bnb-features__no-features">No features selected</p>
      <div class="is-flex is-flex-grow-1 is-flex-direction-column pt-2 bnb-features__list">
        <section v-for="(features, name) in groups" class="mb-4 bnb-features__list-item">
          <h4 class="has-text-weight-bold mb-2">{{ name }}</h4>
          <b-taglist>
            <b-tag
              v-for="feature of features"
              :key="feature.name"
              type="is-white has-text-link pr-1"
              close-type="is-white has-text-grey"
              @close="feature.clear"
              closable
              attached
              ellipsis
            >
              {{ feature.name }}
            </b-tag>
          </b-taglist>
        </section>
      </div>

      <div class="pt-2 is-align-self-center">
        <b-button
          type="is-link is-small"
          @click="$emit('preset-download-request', serialize())"
          rounded
          outlined
          :disabled="empty"
        >
          Download preset
        </b-button>
        <b-tooltip label="Copy preset" append-to-body>
          <b-button
            class="pl-3 pr-3 bnb-tooltip"
            type="is-link is-small"
            icon-left="copy"
            @click="$emit('preset-copy-request', serialize())"
            rounded
            outlined
            :disabled="empty"
          />
        </b-tooltip>
      </div>
    </div>
  `,
}

style(/* CSS */ `
  .tooltip-content {
    opacity: 0.85;
  }
  .bnb-features {
    max-height: 100%;
  }
  .bnb-features__no-features {
    opacity: 0.5;
  }
  .bnb-features__list {
    overflow-x: hidden;
    overflow-y: auto;
    padding-right: 0.75rem;
    margin-right: -0.75rem;
  }
  @supports (scrollbar-gutter: stable) {
    .bnb-features__list {
      padding-right: 0rem;
      scrollbar-gutter: stable;
    }
  }
  .bnb-features__list-item {
    margin-left: -0.25rem;
    margin-right: -0.25rem;
  }
  .bnb-features__list-item:last-child {
    margin-bottom: 0.75rem !important;
  }
  .bnb-features__list-item .tags .tag {
    margin-bottom: 0;
  }
  .bnb-features__list-item .has-addons {
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    margin-bottom: 0.5rem;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  }
`)
