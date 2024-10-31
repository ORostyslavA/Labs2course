const submitButton = document.getElementById("submit_button");
const form = document.getElementById('add_form');
const countryInput = document.getElementById('country_input');
const durationInput = document.getElementById('duration_input');
const priceInput = document.getElementById('price_input');
const photoInput = document.getElementById('photo_input');

let editingVoucherId = null;

const urlParams = new URLSearchParams(window.location.search);
const editId = urlParams.get('edit');

if (editId) {
    editingVoucherId = editId;
    loadVoucherForEditing(editId);
}

function loadVoucherForEditing(id) {
    const vouchers = JSON.parse(localStorage.getItem('vouchers')) || [];
    const voucher = vouchers.find(v => v.id === id);
    if (voucher) {
        countryInput.value = voucher.country;
        durationInput.value = voucher.duration;
        priceInput.value = voucher.price;
        submitButton.textContent = "Update Voucher";
    }
}

submitButton.addEventListener('click', (event) => {
    event.preventDefault();

    if (parseFloat(priceInput.value) < 0) {
        alert("Price cannot be negative.");
        return;
    }

    if (parseInt(durationInput.value) < 0) {
        alert("Duration cannot be negative.");
        return;
    }

    const photoFile = photoInput.files[0];
    if (!photoFile && !editingVoucherId) {
        alert("Please select a photo.");
        return;
    }

    const vouchers = JSON.parse(localStorage.getItem('vouchers')) || [];

    const isDuplicate = vouchers.some(v => 
        v.country === countryInput.value &&
        (!editingVoucherId || v.id !== editingVoucherId)
    );

    if (isDuplicate) {
        alert("Voucher with the same country already exists.");
        return;
    }

    const handleVoucherData = (photoURL) => {
        const voucher = {
            id: editingVoucherId || uuid.v1(),
            country: countryInput.value,
            duration: durationInput.value,
            price: priceInput.value,
            photo: photoURL
        };

        if (editingVoucherId) {
            const index = vouchers.findIndex(v => v.id === editingVoucherId);
            if (index !== -1) {
                vouchers[index] = voucher;
            }
        } else {
            vouchers.push(voucher);
        }

        localStorage.setItem('vouchers', JSON.stringify(vouchers));
        form.reset();
        window.location.href = 'view_page.html';
    };

    if (photoFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            handleVoucherData(e.target.result);
        };
        reader.readAsDataURL(photoFile);
    } else {
        const existingVouchers = JSON.parse(localStorage.getItem('vouchers')) || [];
        const existingVoucher = existingVouchers.find(v => v.id === editingVoucherId);
        handleVoucherData(existingVoucher.photo);
    }
});
