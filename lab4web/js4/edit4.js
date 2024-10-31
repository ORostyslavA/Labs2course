const form = document.getElementById('edit_form');
const countryInput = document.getElementById('country_input');
const durationInput = document.getElementById('duration_input');
const priceInput = document.getElementById('price_input');
const photoInput = document.getElementById('photo_input');
const saveButton = document.getElementById('save_button');
const previewImage = document.createElement('img'); // Create an image element for preview
previewImage.style.maxWidth = '200px'; // Set max width for preview
previewImage.style.marginTop = '10px'; // Add some margin

let editingVoucherId = null;

const urlParams = new URLSearchParams(window.location.search);
const voucherId = urlParams.get('id');

if (voucherId) {
    editingVoucherId = voucherId;
    loadVoucherForEditing(voucherId);
} else {
    alert('No voucher ID provided');
    window.location.href = 'view_page.html';
}

function loadVoucherForEditing(id) {
    const vouchers = JSON.parse(localStorage.getItem('vouchers')) || [];
    const voucher = vouchers.find(v => v.id === id);
    if (voucher) {
        countryInput.value = voucher.country; // Виводимо країну в read-only поле
        durationInput.value = voucher.duration;
        priceInput.value = voucher.price;
        
        // Set the preview image
        previewImage.src = voucher.photo;
        photoInput.parentNode.insertBefore(previewImage, photoInput.nextSibling);
    } else {
        alert('Voucher not found');
        window.location.href = 'view_page.html';
    }
}

photoInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const photoFile = photoInput.files[0];
    
    const updateVoucher = (photoURL) => {
        const updatedVoucher = {
            id: editingVoucherId,
            country: countryInput.value, // Не змінюємо країну, оскільки це read-only поле
            duration: durationInput.value,
            price: priceInput.value,
            photo: photoURL
        };
        
        const vouchers = JSON.parse(localStorage.getItem('vouchers')) || [];
        const index = vouchers.findIndex(v => v.id === editingVoucherId);
        
        if (index !== -1) {
            vouchers[index] = updatedVoucher;
            localStorage.setItem('vouchers', JSON.stringify(vouchers));
            alert('Voucher updated successfully');
            window.location.href = 'view_page.html';
        } else {
            alert('Error updating voucher');
        }
    };
    
    if (photoFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            updateVoucher(e.target.result);
        };
        reader.readAsDataURL(photoFile);
    } else {
        updateVoucher(previewImage.src);
    }
});
