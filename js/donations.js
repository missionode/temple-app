/* donations.js */

document.addEventListener('DOMContentLoaded', function() {
    updateDonationPageFromUrl();
    document.getElementById('generate-qr').addEventListener('click', generateDonationQRCode);
});

function updateDonationPageFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const amount = urlParams.get('amount');
    const title = urlParams.get('title');

    if (amount && !isNaN(amount)) {
        document.getElementById('donation-amount').value = amount;
    }

    if (title) {
        document.getElementById('donation-title').textContent = decodeURIComponent(title);
    }
}

function generateDonationQRCode() {
    const amount = document.getElementById('donation-amount').value;
    const templeProfile = JSON.parse(localStorage.getItem('templeProfile'));

    if (!templeProfile || !templeProfile.upiId || !templeProfile.templeName) {
        alert('Temple UPI ID or Name not found. Please set up your temple profile.');
        return;
    }

    const upiId = templeProfile.upiId;
    const payeeName = templeProfile.templeName;
    const transactionId = Date.now().toString();

    const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&tr=${transactionId}&am=${amount}&cu=INR`;

    document.getElementById('upi-id-display').textContent = upiId;

    generateQRCode(upiLink);
}

function generateQRCode(upiLink) {
    const qrCodeDiv = document.getElementById('qr-code');
    qrCodeDiv.innerHTML = '';

    const qrcode = new QRCode(qrCodeDiv, {
        text: upiLink,
        width: 200,
        height: 200,
    });
}