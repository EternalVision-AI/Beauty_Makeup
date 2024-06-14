import Store, { updateEach, resetEach } from "../../store.js"

export const eyesMakeup = Store.module(
  "eyes-makeup",
  {
    eyeshadow: {
      title: "Eyeshadow",
      color: "0.70 0.15 0.16 0.98",
      enabled: false,
    },
    eyeliner: {
      title: "Eyeliner",
      color: "0 0 0",
      enabled: false,
    },
  },
  {
    update: updateEach,
    reset: resetEach,
  }
)
