document.addEventListener('DOMContentLoaded', async () => {
    const editButton = document.getElementById('submit_button');
    const titleInput = document.getElementById('title_input');
    const descriptionInput = document.getElementById('description_input');
    const expenseInput = document.getElementById('daily-expense');
    const editVoucherId = localStorage.getItem('editVoucherId');

    if (!editVoucherId) {
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch(`/api/vouchers`);
        const vouchers = await response.json();
        const voucherToEdit = vouchers.find(voucher => voucher.id === editVoucherId);

        if (voucherToEdit) {
            titleInput.value = voucherToEdit.title;
            descriptionInput.value = voucherToEdit.description;
            expenseInput.value = voucherToEdit.expense;
        } else {
            window.location.href = 'index.html';
            return;
        }
    } catch (error) {
        console.error('Failed to load voucher data:', error);
        alert('Failed to load voucher data. Please try again.');
        window.location.href = 'index.html';
        return;
    }

    editButton.addEventListener('click', async (event) => {
        event.preventDefault();
        
        const updatedVoucher = {
            id: editVoucherId,
            title: titleInput.value.trim(),
            description: descriptionInput.value.trim(),
            expense: parseFloat(expenseInput.value)
        };

        try {
            const response = await fetch(`/api/vouchers/${editVoucherId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedVoucher),
            });

            if (response.ok) {
                localStorage.removeItem('editVoucherId');
                window.location.href = 'index.html';
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Failed to update voucher:', error);
            alert('An error occurred while updating the voucher.');
        }
    });
});

document.getElementById('add_form').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this); // Використовуємо FormData для передачі зображення

    fetch('/api/vouchers', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Voucher added:', data);
        // Тут можна оновити UI, наприклад, показати повідомлення
    })
    .catch(error => {
        console.error('Error adding voucher:', error);
    });
});
