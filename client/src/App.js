import React, { Component } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import Main from "./components/main";


class App extends Component {
    render() {

        return (
            <div className="layout">
                <div className="layout__row">
                    <div className="layout__col layout__col--header">
                        <Header />
                    </div>
                </div>
                <div className="layout__row">
                    <div className="layout__col">
                        <Main />
                    </div>
                </div>
                <div className="layout__row">
                    <div className="layout__col layout__col--footer">
                        <Footer />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
