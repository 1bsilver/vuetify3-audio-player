// src/plugins/vuetify.js
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#6366f1", // Indigo from your gradient
          secondary: "#06b6d4", // Cyan from your gradient
          background: "#f0f7ff",
          surface: "#fff",
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: "#6366f1",
          secondary: "#06b6d4",
          background: "#18181b",
          surface: "#232526",
        },
      },
    },
  },
});
