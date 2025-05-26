import { createVuetify } from "vuetify";

export default createVuetify({
  theme: {
    defaultTheme: "light",
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
    }
  },
  icons: {
    defaultSet: "mdi"
  }
});