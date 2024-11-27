import React, { useContext, useEffect, useState } from "react";
import Filters from "../Filters/Filters";
import CardItem from "../../../components/card_item/CardItem"
import "./CatalogItems.css";
import CurrencyContext from "../../../components/create_context/CreateContext";

function CatalogItems() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const data = useContext(CurrencyContext);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortName, setSortName] = useState('');
    const [sortPlace, setSortPlace] = useState('');
    const [sortPrice, setSortPrice] = useState('none');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase().trim().replace(/\s+/g, ''));
    };
    
    const handleSortNameChange = (event) => {
        setSortName(event.target.value);
    };
    
    const handleSortPlaceChange = (event) => {
        setSortPlace(event.target.value);
    };
    
    const handleSortPriceChange = (event) => {
        setSortPrice(event.target.value);
    };

    const filteredData = data
    .filter((data) => {
        const title = data.title.toLowerCase().trim().replace(/\s+/g, '');
        const dataDuration = data.duration.toLowerCase().trim().replace(/\s+/g, '');
        const searchCondition = title.includes(searchTerm) || dataDuration.includes(searchTerm);
        const nameCondition = sortName === '' || data.title === sortName;
        const placeCondition = !sortPlace || data.place === sortPlace;
        return searchCondition && nameCondition && placeCondition;
    })
    .sort((a, b) => {
        if (sortPrice === 'Ascending') return a.price - b.price;
        if (sortPrice === 'Descending') return b.price - a.price;
        return 0;
    });

    return(
        <>
            <Filters
                onSearch={handleSearch}
                onSortNameChange={handleSortNameChange}
                onSortPlaceChange={handleSortPlaceChange}
                onSortPriceChange={handleSortPriceChange}
            />

            <div className="catalog_content">
                <div className="catalog_cards">
                {filteredData && filteredData.map((item) => (
                    <CardItem data={item} key={item.id}/>
                ))}
                </div>
            </div>
        </>
    );
};

export default CatalogItems;