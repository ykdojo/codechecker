import { createVuetify } from "vuetify";
import "vuetify/styles";
import { mdi } from "vuetify/iconsets/mdi";

const opts = {
  icons: {
    defaultSet: "mdi",
    sets: {
      mdi,
    },
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#2280c3",
          secondary: "#2c87c7",
          accent: "#009688",
          error: "#f44336",
          warning: "#ff9800",
          info: "#3f51b5",
          success: "#4caf50",
          grey: "#9E9E9E"
        }
      }
    },
  }
};

export default createVuetify(opts);
