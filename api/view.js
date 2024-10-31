const findInput = document.getElementById("find_input");
const searchClearButton = document.getElementById("clear_button");
const countButton = document.getElementById('count_button');
const countClearButton = document.getElementById('count_clear_button');
const sumPriceElement = document.getElementById('sumprice');
const itemsContainer = document.getElementById('items_container');
const sortCheckbox = document.querySelector('#sort_checkbox input');

let vouchers = [];

const fetchVouchers = async () => {
    const response = await fetch('/api/vouchers');
    vouchers = await response.json();
    renderVouchers(vouchers);
};

const renderVouchers = (vouchers) => {
    itemsContainer.innerHTML = '';
    vouchers.forEach(renderVoucher);
};

const removeVoucher = async (id) => {
    await fetch(`/api/vouchers/${id}`, { method: 'DELETE' });
    fetchVouchers();
};

const editVoucher = (id) => {
    localStorage.setItem('editVoucherId', id);
    window.location.href = 'edit_page.html';
}

const fetchFilteredVouchers = async () => {
    const searchTerm = findInput.value;
    const isDescending = sortCheckbox.checked;
    const response = await fetch(`/api/vouchers/filter?q=${searchTerm}&desc=${isDescending}&sort=true`);
    const data = await response.json();
    renderVouchers(data.filteredVouchers);
};

findInput.addEventListener("input", fetchFilteredVouchers);

searchClearButton.addEventListener("click", () => {
    findInput.value = "";
    fetchVouchers();
});

sortCheckbox.addEventListener('change', fetchFilteredVouchers);

countButton.addEventListener("click", async () => {
    const searchTerm = findInput.value; 
    const isDescending = sortCheckbox.checked;
    const response = await fetch(`/api/vouchers/filter?q=${searchTerm}&desc=${isDescending}&sort=true`);
    const data = await response.json();
    sumPriceElement.textContent = `$${data.totalSum}`;
});

countClearButton.addEventListener("click", () => {
    sumPriceElement.textContent = `$0`;
});

const renderVoucher = (voucher) => {
    const voucherItem = document.createElement('li');
    voucherItem.id = voucher.id;
    voucherItem.classList.add('cards__content');

    voucherItem.innerHTML = `
    <img src="/images/France.png" alt="" class="cards__img">
    <div class="cards__body">
        <h2 class="cards__title">${voucher.title}</h2>
        <p class="cards__parag">Duration: ${voucher.description}</p>
        <p class="cards__price">Price: ${voucher.expense} $</p>
        <div class="cards__button">
            <button id="edit_button_${voucher.id}" class="cards__edit">Edit</button>
            <button id="remove_button_${voucher.id}" class="cards__remove">Remove</button>
        </div>
    </div>
`;
    voucherItem.querySelector(`#edit_button_${voucher.id}`).addEventListener('click', () => editVoucher(voucher.id));
    voucherItem.querySelector(`#remove_button_${voucher.id}`).addEventListener('click', () => removeVoucher(voucher.id));
    itemsContainer.appendChild(voucherItem);
};

fetchVouchers();
