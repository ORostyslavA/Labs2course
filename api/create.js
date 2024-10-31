const submitButton = document.getElementById("submit_button");
const form = document.getElementById('add_form');
const titleInput = document.getElementById('title_input');
const descriptionInput = document.getElementById('description_input');
const expenseInput = document.getElementById('daily-expense');

submitButton.addEventListener('click', async (event) => {
    event.preventDefault();
    
    const expenseValue = parseFloat(expenseInput.value);
    
    // Перевірка на від'ємне значення
    if (expenseValue < 0) {
        alert("Error: Expense cannot be negative.");
        return;
    }
    
    const voucher = {
        id: uuid.v1(),
        title: titleInput.value.trim(),
        description: descriptionInput.value.trim(),
        expense: expenseValue,
    };

    try {
        const vouchersResponse = await fetch('/api/vouchers');
        const vouchers = await vouchersResponse.json();
        const duplicateVoucher = vouchers.find(existingVoucher => existingVoucher.title.toLowerCase() === voucher.title.toLowerCase());

        if (duplicateVoucher) {
            alert('Error: A voucher with this title already exists. Please choose a different title.');
            return;
        }

        const response = await fetch('/api/vouchers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(voucher),
        });

        if (response.ok) {
            form.reset();
            window.location.href = 'index.html';
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (error) {
        alert('An error occurred while adding the voucher.');
    }
});

// Додатковий обробник для перевірки зображення через FormData
form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);

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
        // Оновлення UI за необхідності
    })
    .catch(error => {
        console.error('Error adding voucher:', error);
    });
});
