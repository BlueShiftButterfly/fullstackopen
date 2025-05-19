import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { blogTheme } from "./themes/blogTheme";
import "@mantine/core/styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <MantineProvider>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </MantineProvider>,
);
