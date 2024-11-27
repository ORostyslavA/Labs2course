import "./Filters.css";
import FilterSelect from "../../../components/filter_select/FilterSelect";
import Search from "../Search/Search";

function Filters({
    onSearch, 
    onSortNameChange, 
    onSortCityChange, 
    onSortPriceChange, 
    searchValue, 
    setSearchValue, 
    sortPrice, 
    sortCity, 
    sortName, 
    searchTerm
}) {
    return (
        <section>
            <div className="filters_line">
                <div className="filters">
                    <FilterSelect
                        label="Name:"
                        options={[
                            { value: 'Italy', label: 'Italy' },
                            { value: 'Greece', label: 'Greece' },
                            { value: 'Spain', label: 'Spain' },
                            { value: 'Poland', label: 'Poland' },
                            { value: 'Thailand', label: 'Thailand' },
                            { value: 'Egypt', label: 'Egypt' },
                            { value: 'Turkey', label: 'Turkey' },
                            { value: 'Georgia', label: 'Georgia' }
                        ]}
                        onFunction={onSortNameChange}
                        value={sortName}
                    />
                    <FilterSelect 
                        label="City:"
                        options={[
                            { value: 'by_the_sea', label: 'By the sea' },
                            { value: 'near_the_mountains', label: 'Near the mountains' }
                        ]}
                        onFunction={onSortCityChange}
                        value={sortCity}
                    />
                    <FilterSelect
                        label="Price:"
                        options={[
                            { value: 'descending', label: 'Descending' },
                            { value: 'ascending', label: 'Ascending' }
                        ]}
                        onFunction={onSortPriceChange}
                        value={sortPrice}
                    />
                </div>
                <Search 
                    onSearch={onSearch} 
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    value={searchTerm}
                />
            </div>
        </section>
    );
}

export default Filters;