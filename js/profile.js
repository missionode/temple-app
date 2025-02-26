/* profile.js */

document.addEventListener('DOMContentLoaded', function() {
    setupProfileForm();
    setupUpiActivation();
    loadProfileData();
});

function setupProfileForm() {
    const profileForm = document.getElementById('profile-form');
    profileForm.addEventListener('submit', function(event) {
        event.preventDefault();
        saveProfileData();
        window.location.href = 'settings.html';
    });
}

function setupUpiActivation() {
    const activateButton = document.getElementById('activate-upi');
    const passwordPrompt = document.getElementById('password-prompt');
    const closeButton = passwordPrompt.querySelector('.close-button');
    const confirmButton = document.getElementById('confirm-password');
    const passwordInput = document.getElementById('password-input');
    const upiInput = document.getElementById('upi-id');

    activateButton.addEventListener('click', function() {
        passwordPrompt.style.display = 'block';
    });

    closeButton.addEventListener('click', function() {
        passwordPrompt.style.display = 'none';
    });

    confirmButton.addEventListener('click', function() {
        const password = passwordInput.value;
        if (password === 'Lokasamasthasukninobhavanthu') {
            upiInput.disabled = false;
            passwordPrompt.style.display = 'none';
        } else {
            alert('Incorrect password.');
        }
        passwordInput.value = '';
    });
}

function saveProfileData() {
    const templeName = document.getElementById('temple-name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const upiId = document.getElementById('upi-id').value;
    const description = document.getElementById('description').value;
    const devathas = document.getElementById('devathas').value;

    const profileData = {
        templeName: templeName,
        address: address,
        phone: phone,
        email: email,
        upiId: upiId,
        description: description,
        devathas: devathas.split(',').map(devatha => devatha.trim())
    };

    localStorage.setItem('templeProfile', JSON.stringify(profileData));
}

function loadProfileData() {
    const profileData = JSON.parse(localStorage.getItem('templeProfile'));
    if (profileData) {
        document.getElementById('temple-name').value = profileData.templeName;
        document.getElementById('address').value = profileData.address;
        document.getElementById('phone').value = profileData.phone;
        document.getElementById('email').value = profileData.email;
        document.getElementById('upi-id').value = profileData.upiId;
        document.getElementById('description').value = profileData.description;
        document.getElementById('devathas').value = profileData.devathas.join(', ');

        if (profileData.upiId) {
            document.getElementById('upi-id').disabled = false;
        }
    }
}