import { style } from "../lib.js"
import Eyes from "./eyes.js"
import Looks from "./looks.js"
import Settings from "./settings.js"

const routes = [
  { 
    path: "/looks", 
    component: Looks, 
    meta: { icon: "looks", title: "Lashes" } 
  },
  {
    path: "/eyes",
    component: Eyes,
    meta: { icon: "eyes", title: "Eyes" },
  },
  {
    path: "/makeup",
    meta: { icon: "makeup", title: "Makeup" },
  },
  {
    path: "/lipstick",
    meta: { icon: "lipstick", title: "Lipstick" },
  },
  {
    path: "/hair",
    meta: { icon: "hair", title: "Hair" },
  },
]

const root = {
  path: "/",
  component: Settings,
  props: () => ({ routes }),
}

export default {
  data: () => ({ transition: "" }),
  created() {
    for (const route of [root, ...routes]) this.$router.addRoute(route)
  },
  watch: {
    $route(to) {
      this.transition = to.path === "/" ? "slide-right" : "slide-left"
    },
  },
  template: /* HTML */ `
    <transition :name="transition">
      <router-view />
    </transition>
  `,
}

style(/* CSS */ `
  .slide-left-leave {
    opacity: 1;
    pointer-events: none;
  }
  .slide-left-leave-to {
    opacity: 0;
    transition: all 0.125s ease-in;
    pointer-events: none;
  }
  .slide-left-enter {
    opacity: 0;
    transform: translate(30px, -100%);
    pointer-events: none;
  }
  .slide-left-enter-to {
    opacity: 1;
    transform: translate(0, -100%);
    transition: all 0.125s ease-in;
    pointer-events: none;
  }

  .slide-right-leave {
    opacity: 1;
    pointer-events: none;
  }
  .slide-right-leave-to {
    opacity: 0;
    transition: all 0.125s ease-out;
    transform: translate(30px, 0);
    pointer-events: none;
  }
  .slide-right-enter {
    opacity: 0;
    transform: translate(0, calc(-100% + 0.25rem));
    pointer-events: none;
  }
  .slide-right-enter-to {
    opacity: 1;
    transform: translate(0, calc(-100% + 0.25rem));
    transition: all 0.125s ease-out;
    pointer-events: none;
  }
`)
