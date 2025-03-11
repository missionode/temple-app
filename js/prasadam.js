/* prasadam.js */

document.addEventListener('DOMContentLoaded', function() {
    loadPrasadams();
    setupEventListeners();
});

function loadPrasadams() {
    const prasadams = JSON.parse(localStorage.getItem('prasadams')) || [];
    const prasadamList = document.getElementById('prasadam-list');
    prasadamList.innerHTML = '';

    prasadams.forEach(prasadam => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `prasadam-${prasadam.name.replace(/\s+/g, '-')}`; // Replace spaces with dashes
        checkbox.value = prasadam.price;

        const label = document.createElement('label');
        label.htmlFor = `prasadam-${prasadam.name.replace(/\s+/g, '-')}`;
        label.textContent = `${prasadam.name} - ₹${prasadam.price}`;

        prasadamList.appendChild(checkbox);
        prasadamList.appendChild(label);
        prasadamList.appendChild(document.createElement('br'));
    });
}

function setupEventListeners() {
    const prasadamList = document.getElementById('prasadam-list');
    prasadamList.addEventListener('change', calculateTotalAmount);

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
    const prasadams = JSON.parse(localStorage.getItem('prasadams')) || [];
    const checkboxes = document.querySelectorAll('#prasadam-list input[type="checkbox"]:checked');
    let totalAmount = 0;

    checkboxes.forEach(checkbox => {
        totalAmount += parseFloat(checkbox.value);
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
    paymentLink.href = `donations.html?amount=${totalAmount}&title=${encodeURIComponent(`Amount Payable for Prasadams for ${devotee.name}`)}`;

    document.getElementById('payment-link-container').style.display = 'block';
}