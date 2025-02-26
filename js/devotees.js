/* devotees.js */

document.addEventListener('DOMContentLoaded', function() {
    setupDevoteeModal();
    loadDevotees();
    setupDevoteeFilter();
});

function setupDevoteeModal() {
    setupModal('devotee-modal', 'add-devotee', 'close-button');
    const devoteeForm = document.getElementById('devotee-form');
    devoteeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        saveDevotee();
        document.getElementById('devotee-modal').style.display = 'none';
        loadDevotees();
    });
}

function saveDevotee() {
    const name = document.getElementById('devotee-name').value;
    const phone = document.getElementById('devotee-phone').value;
    const dob = document.getElementById('devotee-dob').value;
    const nakshatra = document.getElementById('devotee-nakshatra').value; // Get the selected Nakshatra
    const notes = document.getElementById('devotee-notes').value;

    const devotee = {
        id: Date.now(),
        name: name,
        phone: phone,
        dob: dob,
        nakshatra: nakshatra,
        notes: notes
    };

    const devotees = JSON.parse(localStorage.getItem('devotees')) || [];
    devotees.push(devotee);
    localStorage.setItem('devotees', JSON.stringify(devotees));
    document.getElementById('devotee-form').reset();
}

function loadDevotees(filter = '') {
    const devotees = JSON.parse(localStorage.getItem('devotees')) || [];
    const devoteeList = document.getElementById('devotee-list');

    devoteeList.innerHTML = '<ul>' +
        devotees
            .filter(devotee =>
                devotee.name.toLowerCase().includes(filter.toLowerCase()) ||
                devotee.phone.includes(filter) ||
                devotee.nakshatra.toLowerCase().includes(filter.toLowerCase()) // Add filter for Nakshatra
            )
            .map(devotee => `
                <li>
                    <strong>Name:</strong> ${devotee.name}<br>
                    <strong>Phone:</strong> ${devotee.phone}<br>
                    <strong>Date of Birth:</strong> ${devotee.dob}<br>
                    <strong>Nakshatra:</strong> ${devotee.nakshatra}<br>
                    <strong>Notes:</strong> ${devotee.notes}<br>
                    <button onclick="editDevotee(${devotee.id})">Edit</button>
                    <button onclick="deleteDevotee(${devotee.id})">Delete</button>
                </li>
            `).join('') +
        '</ul>';
}

function editDevotee(id) {
    const devotees = JSON.parse(localStorage.getItem('devotees')) || [];
    const devotee = devotees.find(devotee => devotee.id === id);

    if (devotee) {
        document.getElementById('devotee-name').value = devotee.name;
        document.getElementById('devotee-phone').value = devotee.phone;
        document.getElementById('devotee-dob').value = devotee.dob;
        document.getElementById('devotee-nakshatra').value = devotee.nakshatra; // Set the selected Nakshatra
        document.getElementById('devotee-notes').value = devotee.notes;

        document.getElementById('devotee-modal').style.display = 'block';

        // Update the form submission to edit the existing devotee
        const devoteeForm = document.getElementById('devotee-form');
        devoteeForm.onsubmit = function(event) {
            event.preventDefault();
            const updatedDevotee = {
                id: id,
                name: document.getElementById('devotee-name').value,
                phone: document.getElementById('devotee-phone').value,
                dob: document.getElementById('devotee-dob').value,
                nakshatra: document.getElementById('devotee-nakshatra').value,
                notes: document.getElementById('devotee-notes').value
            };
            const updatedDevotees = devotees.map(dev => dev.id === id ? updatedDevotee : dev);
            localStorage.setItem('devotees', JSON.stringify(updatedDevotees));
            document.getElementById('devotee-modal').style.display = 'none';
            loadDevotees();
            devoteeForm.onsubmit = function(e){
                e.preventDefault();
                saveDevotee();
                document.getElementById('devotee-modal').style.display = 'none';
                loadDevotees();
            };
        };
    }
}

function deleteDevotee(id) {
    if (confirm('Are you sure you want to delete this devotee?')) {
        let devotees = JSON.parse(localStorage.getItem('devotees')) || [];
        devotees = devotees.filter(devotee => devotee.id !== id);
        localStorage.setItem('devotees', JSON.stringify(devotees));
        loadDevotees();
    }
}

function setupDevoteeFilter() {
    const filterInput = document.getElementById('devotee-filter');
    filterInput.addEventListener('input', function() {
        loadDevotees(this.value);
    });
}