const itemsContainer = document.getElementById('items_container');
const sortCheckbox = document.getElementById('sort_checkbox');
const searchInput = document.getElementById('find_input');
const searchButton = document.getElementById('search_button');
const clearButton = document.getElementById('clear_button');
const countButton = document.getElementById('count_button');
const countClearButton = document.getElementById('count_clear_button');
const sumPriceElement = document.getElementById('sumprice');

const parseVouchers = () => {
    return Array.from(itemsContainer.children).map(item => ({
        country: item.querySelector('.cards__title').textContent,
        duration: parseInt(item.querySelector('.cards__parag').textContent.match(/\d+/)[0]),
        price: parseInt(item.querySelector('.cards__price').textContent.match(/\d+/)[0])
    }));
};

let vouchers = parseVouchers();
let filteredVouchers = vouchers;

const sortVouchers = (ascending = true) => {
    filteredVouchers.sort((a, b) => 
        ascending ? a.country.localeCompare(b.country) : b.country.localeCompare(a.country)
    );
    renderVouchers();
};


const searchVouchers = (query) => {
    query = query.trim().toLowerCase();
    filteredVouchers = vouchers.filter(voucher => 
        voucher.country.toLowerCase().includes(query)
    );
    renderVouchers(filteredVouchers);
    calculateTotalPrice();
};

const calculateTotalPrice = () => {
    const total = filteredVouchers.reduce((sum, voucher) => sum + voucher.price, 0);
    sumPriceElement.textContent = `${total} €`;
};

const renderVouchers = (vouchersToRender = filteredVouchers) => {
    itemsContainer.innerHTML = vouchersToRender.map((voucher, index) => `
        <li class="cards__content">
            <div class="cards__wrapper">
                <img src="./imglab3ros/${voucher.country}.jfif" alt="${voucher.country}" class="cards__img">
                <div class="cards__body">
                    <h2 class="cards__title">${voucher.country}</h2>
                    <p class="cards__parag">Duration: ${voucher.duration} days</p>
                    <p class="cards__price">Price: ${voucher.price} €</p>
                    <div class="cards__button">
                        <button class="cards__edit" data-id="${index}">Edit</button>
                        <button class="cards__remove" data-id="${index}">Remove</button>
                    </div>
                </div>
            </div>
        </li>
    `).join('');

    // Add event listeners to edit buttons
    document.querySelectorAll('.cards__edit').forEach((button) => {
        button.addEventListener('click', () => {
            const voucherId = button.getAttribute('data-id');
            // In a real app, you'd pass the voucher ID here
            window.location.href = `edit_page.html?id=${voucherId}`;
        });
    });

    // Add event listeners to remove buttons
    document.querySelectorAll('.cards__remove').forEach((button) => {
        button.addEventListener('click', () => {
            const voucherId = button.getAttribute('data-id');
            // In a real app, you'd remove the voucher from the server here
            // For now, we'll just remove it from the local array
            filteredVouchers = filteredVouchers.filter((_, index) => index !== Number(voucherId));
            renderVouchers();
        });
    });
};

sortCheckbox.addEventListener('change', (e) => sortVouchers(e.target.checked));

searchInput.addEventListener('input', (e) => searchVouchers(e.target.value));

searchButton.addEventListener('click', () => searchVouchers(searchInput.value));

clearButton.addEventListener('click', () => {
    searchInput.value = '';
    filteredVouchers = vouchers;
    renderVouchers();
    calculateTotalPrice();
});

countButton.addEventListener('click', calculateTotalPrice);

countClearButton.addEventListener('click', () => {
    sumPriceElement.textContent = '0 €';
});

renderVouchers();

