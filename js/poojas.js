/* poojas.js */

document.addEventListener('DOMContentLoaded', function() {
    loadPoojas();
    setupEventListeners();
});

function loadPoojas() {
    const poojas = JSON.parse(localStorage.getItem('poojas')) || [];
    const poojaList = document.getElementById('pooja-list');
    poojaList.innerHTML = '';

    poojas.forEach(pooja => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `pooja-${pooja.id}`;
        checkbox.value = pooja.id;

        const label = document.createElement('label');
        label.htmlFor = `pooja-${pooja.id}`;
        label.textContent = `${pooja.name} - ₹${pooja.price}`;

        poojaList.appendChild(checkbox);
        poojaList.appendChild(label);
        poojaList.appendChild(document.createElement('br'));
    });
}

function setupEventListeners() {
    const poojaList = document.getElementById('pooja-list');
    poojaList.addEventListener('change', calculateTotalAmount);

    document.getElementById('submit-booking').addEventListener('click', handleSubmitBooking);

    document.getElementById('devotee-search').addEventListener('input', handleDevoteeSearch);
}

function handleDevoteeSearch() {
    const searchTerm = document.getElementById('devotee-search').value.toLowerCase().trim();
    const devotees = JSON.parse(localStorage.getItem('devotees')) || [];
    const results = devotees.filter(devotee =>
        devotee.name.toLowerCase().trim().includes(searchTerm) ||
        devotee.phone.includes(searchTerm)
    );

    const resultsList = document.getElementById('devotee-results');
    resultsList.innerHTML = '';

    if (results.length > 0) {
        results.forEach(devotee => {
            const listItem = document.createElement('li');
            listItem.textContent = `${devotee.name} (${devotee.phone})`;
            listItem.addEventListener('click', function() {
                document.getElementById('devotee-id-display').textContent = devotee.id;
                document.getElementById('devotee-search').value = `${devotee.name} (${devotee.phone})`;
                resultsList.style.display = 'none';
            });
            resultsList.appendChild(listItem);
        });
        resultsList.style.display = 'block';
    } else {
        resultsList.style.display = 'none';
    }
}

function calculateTotalAmount() {
    const poojas = JSON.parse(localStorage.getItem('poojas')) || [];
    const checkboxes = document.querySelectorAll('#pooja-list input[type="checkbox"]:checked');
    let totalAmount = 0;

    checkboxes.forEach(checkbox => {
        const poojaId = parseInt(checkbox.value);
        const pooja = poojas.find(p => p.id === poojaId);
        if (pooja) {
            totalAmount += pooja.price;
        }
    });

    document.getElementById('total-amount').textContent = totalAmount;
}

function handleSubmitBooking() {
    const devoteeId = document.getElementById('devotee-id-display').textContent;
    const totalAmount = parseInt(document.getElementById('total-amount').textContent);

    if (!devoteeId) {
        alert('Please select a devotee from the list.');
        return;
    }

    const devotees = JSON.parse(localStorage.getItem('devotees')) || [];
    const devotee = devotees.find(devotee => devotee.id === parseInt(devoteeId));

    if (!devotee) {
        alert('Devotee not found.');
        return;
    }

    const paymentLink = document.getElementById('payment-link');
    paymentLink.href = `donations.html?amount=${totalAmount}&title=${encodeURIComponent(`Amount Payable for Poojas for ${devotee.name}`)}`;

    document.getElementById('payment-link-container').style.display = 'block';
}