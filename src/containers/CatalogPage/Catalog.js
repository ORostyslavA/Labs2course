import React from "react"
import DocumentTitle from "../../components/helmet/document_title"
import CatalogItems from "./CatalogItems/CatalogItems";
import ContextProvider from "../../components/context_provider/ContextProvider";

function Catalog() {
    DocumentTitle("Catalog");
    return(
        <>         
            <ContextProvider>
                <CatalogItems/>
            </ContextProvider>
        </>
    );
}

export default Catalog;