document.addEventListener('DOMContentLoaded', () => {
    const addItemForm = document.getElementById('addItemForm');
    const itemNameInput = document.getElementById('itemName');
    const itemQuantityInput = document.getElementById('itemQuantity');
    const itemUnitInput = document.getElementById('itemUnit');
    const pantryList = document.getElementById('pantryList');

    // Load existing products from JSON file
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            data.products.forEach(product => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<span>${product.name} <span>${product.quantity} ${product.unit}</span></span>
                    <button class="edit-btn">Editar</button>
                    <button class="delete-btn">Excluir</button>`;
                pantryList.appendChild(listItem);
            });
        });


    addItemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const itemName = itemNameInput.value.trim();
        const itemQuantity = itemQuantityInput.value.trim();
        const itemUnit = itemUnitInput.value.trim();
        if (itemName && itemQuantity && itemUnit) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<span>${itemName} <span>${itemQuantity} ${itemUnit}</span></span>
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Excluir</button>`;
            pantryList.appendChild(listItem);
            itemNameInput.value = '';
            itemQuantityInput.value = '';
            itemUnitInput.value = '';
        }
    });
});