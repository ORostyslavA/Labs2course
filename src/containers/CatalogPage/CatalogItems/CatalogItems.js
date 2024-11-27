import React, { useEffect, useState } from "react";
import { fetchData } from "../../../components/back";
import Filters from "../Filters/Filters";
import CardItem from "../../../components/card_item/CardItem";
import "./CatalogItems.css";

function CatalogItems() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortName, setSortName] = useState('');
    const [sortCity, setSortCity] = useState('');
    const [sortPrice, setSortPrice] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDataAsync = async () => {
            setLoading(true);
            try {
                const response = await fetchData(searchTerm, sortName, sortCity, sortPrice);
                const sortedData = sortDataByPrice(response, sortPrice);
                setData(sortedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDataAsync();
    }, [searchTerm, sortName, sortCity, sortPrice]);

    const sortDataByPrice = (data, sortDirection) => {
        if (!sortDirection || !data) return data;
        
        return [...data].sort((a, b) => {
            const priceA = parseFloat(a.price);
            const priceB = parseFloat(b.price);
            
            if (sortDirection === 'ascending') {
                return priceA - priceB;
            } else if (sortDirection === 'descending') {
                return priceB - priceA;
            }
            return 0;
        });
    };

    if (loading) {
        return <div className="loader">Loading...</div>;
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };
    
    const handleSortNameChange = (event) => {
        setSortName(event.target.value);
        setSearchValue('');
        setSearchTerm('');
    };
    
    const handleSortCityChange = (event) => {
        setSortCity(event.target.value);
    };
    
    const handleSortPriceChange = (event) => {
        setSortPrice(event.target.value.toLowerCase());
    };

    return (
        <>
            <Filters
                onSearch={handleSearch}
                onSortNameChange={handleSortNameChange}
                onSortCityChange={handleSortCityChange} 
                onSortPriceChange={handleSortPriceChange}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                searchTerm={searchTerm}
                sortName={sortName}
                sortCity={sortCity}
                sortPrice={sortPrice}
            />
            <div className="catalog_content">
                <div className="catalog_cards">
                    {data && data.map((item) => (
                        <CardItem data={item} key={item.id} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default CatalogItems;