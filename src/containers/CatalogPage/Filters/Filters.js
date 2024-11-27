import "./Filters.css";
import FilterSelect from "../../../components/filter_select/FilterSelect";
import Search from "../Search/Search";

function Filters({ onSearch, onSortNameChange, onSortPlaceChange, onSortPriceChange }) {
    return (
        <section>
            <div className="filters_line">
                <div className="filters">
                    <FilterSelect
                        label="Country:"
                        options={[
                            { value: '', label: 'All countries' },
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
                    />
                    <FilterSelect
                        label="Place:"
                        options={[
                            { value: '', label: 'All places' }, 
                            { value: 'by_the_sea', label: 'By the sea' },
                            { value: 'near_the_mountains', label: 'Near the mountains' }
                        ]}
                        onFunction={onSortPlaceChange}
                    />
                    <FilterSelect
                        label="Price:"
                        options={[
                            { value: 'none', label: 'Default' },
                            { value: 'Descending', label: 'Descending' },
                            { value: 'Ascending', label: 'Ascending' }
                        ]}
                        onFunction={onSortPriceChange}
                    />
                </div>
                <Search onSearch={onSearch} />
            </div>
        </section>
    );
}

export default Filters;