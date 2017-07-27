import registerServiceWorker from "./registerServiceWorker";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.styl";
import { Provider } from "react-redux";
import Store from "./store";

const StoreInstance = Store();

ReactDOM.render(
    <Provider store={StoreInstance}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);
registerServiceWorker();
