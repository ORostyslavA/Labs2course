const itemsContainer = document.getElementById('items_container');
const findInput = document.getElementById('find_input');
const clearButton = document.getElementById('clear_button');
const sortCheckbox = document.getElementById('sort_checkbox');
const countButton = document.getElementById('count_button');
const countClearButton = document.getElementById('count_clear_button');
const sumPriceElement = document.getElementById('sumprice');

function renderVouchers(vouchers) {
    itemsContainer.innerHTML = '';

    if (vouchers.length === 0) {
        itemsContainer.innerHTML = '<p>No vouchers found.</p>';
        return;
    }

    vouchers.forEach(voucher => {
        const voucherElement = document.createElement('div');
        voucherElement.classList.add('cards__content');
        voucherElement.innerHTML = `
            <div class="cards__wrapper">
                <img src="${voucher.photo}" alt="${voucher.country}" class="cards__img">
                <div class="cards__body">
                    <h3 class="cards__title">${voucher.country}</h3>
                    <p class="cards__parag">Duration: ${voucher.duration} days</p>
                    <p class="cards__price">Price: €${voucher.price}</p>
                    <div class="cards__button">
                        <button class="cards__edit" onclick="editVoucher('${voucher.id}')">Edit</button>
                        <button class="cards__remove" onclick="deleteVoucher('${voucher.id}')">Delete</button>
                    </div>
                </div>
            </div>
        `;
        itemsContainer.appendChild(voucherElement);
    });
}

function getVouchersFromStorage() {
    return JSON.parse(localStorage.getItem('vouchers')) || [];
}

function filterVouchersBySearch(vouchers, query) {
    const trimmedQuery = query.replace(/\s+/g, '').toLowerCase();

    return vouchers.filter(voucher => {
        const countryName = voucher.country.replace(/\s+/g, '').toLowerCase();
        return countryName.includes(trimmedQuery);
    });
}

function sortVouchersByPrice(vouchers) {
    return [...vouchers].sort((a, b) => b.price - a.price);
}

function calculateTotalPrice(vouchers) {
    return vouchers.reduce((total, voucher) => total + parseFloat(voucher.price), 0);
}

function deleteVoucher(voucherId) {
    let vouchers = getVouchersFromStorage();
    vouchers = vouchers.filter(voucher => voucher.id !== voucherId);
    localStorage.setItem('vouchers', JSON.stringify(vouchers));
    renderVouchers(vouchers);
}

function editVoucher(voucherId) {
    window.location.href = `edit_page.html?id=${voucherId}`;
}

function init() {
    let vouchers = getVouchersFromStorage();
    renderVouchers(vouchers);

    findInput.addEventListener('input', () => {
        const query = findInput.value;
        const filteredVouchers = filterVouchersBySearch(vouchers, query);
        renderVouchers(filteredVouchers);
    });

    clearButton.addEventListener('click', () => {
        findInput.value = '';
        renderVouchers(vouchers);
    });

    sortCheckbox.addEventListener('change', () => {
        if (sortCheckbox.checked) {
            const sortedVouchers = sortVouchersByPrice(vouchers);
            renderVouchers(sortedVouchers);
        } else {
            renderVouchers(vouchers);
        }
    });

    countButton.addEventListener('click', () => {
        const totalPrice = calculateTotalPrice(vouchers);
        sumPriceElement.textContent = `€${totalPrice.toFixed(2)}`;
    });

    countClearButton.addEventListener('click', () => {
        sumPriceElement.textContent = '€0';
    });
}

window.addEventListener('DOMContentLoaded', init);
