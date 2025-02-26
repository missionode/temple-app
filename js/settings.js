/* settings.js */

document.addEventListener('DOMContentLoaded', function() {
    setupPoojaModal();
    setupPrasadamModal();
    loadSettingsData();
    setupDatabaseManagement();
    setupNavigation();
});

function setupPoojaModal() {
    setupModal('pooja-modal', 'add-pooja', 'close-button');
    const poojaForm = document.getElementById('pooja-form');
    poojaForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addPooja();
        document.getElementById('pooja-modal').style.display = 'none';
    });
}

function setupPrasadamModal() {
    setupModal('prasadam-modal', 'add-prasadam', 'close-button');
    const prasadamForm = document.getElementById('prasadam-form');
    prasadamForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addPrasadam();
        document.getElementById('prasadam-modal').style.display = 'none';
    });
}

function addPooja() {
    const name = document.getElementById('pooja-name').value;
    const description = document.getElementById('pooja-description').value;
    const price = parseFloat(document.getElementById('pooja-price').value);
    const time = parseInt(document.getElementById('pooja-time').value);

    const pooja = {
        id: Date.now(),
        name: name,
        description: description,
        price: price,
        time: time
    };

    const poojas = JSON.parse(localStorage.getItem('poojas')) || [];
    poojas.push(pooja);
    localStorage.setItem('poojas', JSON.stringify(poojas));
    loadPoojaList();
    document.getElementById('pooja-form').reset();
    console.log("Saving pooja:", pooja);
}

function addPrasadam() {
    const name = document.getElementById('prasadam-name').value;
    const description = document.getElementById('prasadam-description').value;
    const price = parseFloat(document.getElementById('prasadam-price').value);

    const prasadam = { name: name, description: description, price: price };

    let prasadams = localStorage.getItem('prasadams');
    console.log("Prasadams before parse:", prasadams);

    prasadams = JSON.parse(prasadams) || [];
    console.log("Prasadams after parse:", prasadams);

    prasadams.push(prasadam);
    localStorage.setItem('prasadams', JSON.stringify(prasadams));
    console.log("Prasadams saved to local storage");

    loadPrasadamList();
    document.getElementById('prasadam-form').reset();
}

function loadSettingsData() {
    loadPoojaList();
    loadPrasadamList();
}

function loadPoojaList() {
    const poojas = JSON.parse(localStorage.getItem('poojas')) || [];
    const poojaList = document.getElementById('pooja-list');
    poojaList.innerHTML = '<h3>Poojas</h3><ul>' + poojas.map(pooja => `<li>${pooja.name} - ₹${pooja.price}</li>`).join('') + '</ul>';
}

function loadPrasadamList() {
    console.log("loadPrasadamList() called");
    const rawPrasadams = localStorage.getItem('prasadams');
    console.log("Raw prasadams from local storage:", rawPrasadams);
    const prasadams = JSON.parse(rawPrasadams) || [];
    const prasadamList = document.getElementById('prasadam-list');
    prasadamList.innerHTML = '<h3>Prasadams</h3><ul>' + prasadams.map(prasadam => `<li>${prasadam.name} - ₹${prasadam.price}</li>`).join('') + '</ul>';
}

function setupDatabaseManagement() {
    document.getElementById('backup-database').addEventListener('click', backupDatabase);
    document.getElementById('restore-database').addEventListener('click', restoreDatabase);
    document.getElementById('clear-database').addEventListener('click', clearDatabase);
}

function backupDatabase() {
    console.log("backupDatabase() called");
    const data = {
        devotees: JSON.parse(localStorage.getItem('devotees')) || [],
        poojas: JSON.parse(localStorage.getItem('poojas')) || [],
        poojaBookings: JSON.parse(localStorage.getItem('poojaBookings')) || [],
        donations: JSON.parse(localStorage.getItem('donations')) || [],
        templeProfile: JSON.parse(localStorage.getItem('templeProfile')) || {}
    };

    console.log("Data to backup:", data);

    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const timestamp = new Date().toISOString().replace(/[:T.-]/g, '');
    const filename = `temple_backup_${timestamp}.json`;

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log("Backup download initiated");
}

function restoreDatabase() {
    console.log("restoreDatabase() called");
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = function(event) {
        const file = event.target.files[0];
        console.log("File selected:", file);
        const reader = new FileReader();
        reader.onload = function(event) {
            const data = JSON.parse(event.target.result);
            console.log("Restored data:", data); // Check the entire data object
            console.log("Restored prasadams:", data.prasadams); // Check prasadams specifically
            if(data.prasadams === undefined){
                console.error("prasadams is undefined in restored data");
            }
            localStorage.setItem('templeProfile', JSON.stringify(data.templeProfile));
            localStorage.setItem('poojas', JSON.stringify(data.poojas));
            localStorage.setItem('prasadams', JSON.stringify(data.prasadams));
            localStorage.setItem('devotees', JSON.stringify(data.devotees));
            localStorage.setItem('poojaBookings', JSON.stringify(data.poojaBookings));
            localStorage.setItem('donations', JSON.stringify(data.donations));
            alert('Database restored successfully.');
            loadSettingsData();
            console.log("Database restored");
        };
        reader.readAsText(file);
    };
    input.click();
}

function clearDatabase() {
    console.log("clearDatabase() called");
    if (confirm('Are you sure you want to clear all data?')) {
        localStorage.clear();
        console.log("LocalStorage cleared");
        console.log("Prasadams after clear:", localStorage.getItem('prasadams'));
        alert('Database cleared.');
        loadSettingsData();
        console.log("Database cleared");
    }
}

function setupNavigation() {
    document.getElementById('settings-to-dashboard').addEventListener('click', function() {
        window.location.href = 'dashboard.html';
    });
}