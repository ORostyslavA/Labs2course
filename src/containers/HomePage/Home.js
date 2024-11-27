import React from "react";
import Hero from "./Hero/Hero";
import HomeCards from "./HomeCards/HomeCards";
import DocumentTitle from "../../components/helmet/document_title";
import ContextProvider from "../../components/context_provider/ContextProvider";


function Home() {
    DocumentTitle("Home")
    return(
        <ContextProvider>
            <div>
                <Hero />
                <HomeCards />
            </div>
        </ContextProvider>

    );
}

export default Home;