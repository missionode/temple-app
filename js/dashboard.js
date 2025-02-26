/* dashboard.js */

document.addEventListener('DOMContentLoaded', function() {
    loadDashboardData();
    setupFavoriteDevotees();
});

function loadDashboardData() {
    const devotees = JSON.parse(localStorage.getItem('devotees')) || [];
    const poojaBookings = JSON.parse(localStorage.getItem('poojaBookings')) || [];
    const poojas = JSON.parse(localStorage.getItem('poojas')) || [];

    // Devotees by Day
    const devoteesByDay = {};
    devotees.forEach(devotee => {
        if (devotee.registrationDate) {
            const day = new Date(devotee.registrationDate).getDay();
            devoteesByDay[day] = (devoteesByDay[day] || 0) + 1;
        }
    });
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const devoteesByDayData = { labels: days, data: days.map(day => devoteesByDay[days.indexOf(day)] || 0) };

    // Devotees by Month
    const devoteesByMonth = {};
    devotees.forEach(devotee => {
        if (devotee.registrationDate) {
            const month = new Date(devotee.registrationDate).getMonth();
            devoteesByMonth[month] = (devoteesByMonth[month] || 0) + 1;
        }
    });
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const devoteesByMonthData = { labels: months, data: months.map(month => devoteesByMonth[months.indexOf(month)] || 0) };

    // Devotees by Year
    const devoteesByYear = {};
    devotees.forEach(devotee => {
        if (devotee.registrationDate) {
            const year = new Date(devotee.registrationDate).getFullYear();
            devoteesByYear[year] = (devoteesByYear[year] || 0) + 1;
        }
    });
    const years = Object.keys(devoteesByYear);
    const devoteesByYearData = { labels: years, data: years.map(year => devoteesByYear[year]) };

    // Pooja Distribution
    const poojaCounts = {};
    poojaBookings.forEach(booking => {
        poojaCounts[booking.poojaId] = (poojaCounts[booking.poojaId] || 0) + 1;
    });

    const poojaDistributionData = {
        labels: poojas.map(pooja => pooja.name),
        data: poojas.map(pooja => poojaCounts[pooja.id] || 0)
    };

    // Popular Pooja
    let popularPooja = null;
    let maxBookings = 0;
    poojas.forEach(pooja => {
        const bookingCount = poojaBookings.filter(booking => booking.poojaId === pooja.id).length;
        if (bookingCount > maxBookings) {
            maxBookings = bookingCount;
            popularPooja = pooja;
        }
    });

    document.getElementById('popular-pooja-name').textContent = popularPooja ? popularPooja.name : 'No Pooja Data';

    // Returning Devotees
    const devoteeBookingsCount = {};
    poojaBookings.forEach(booking => {
        devoteeBookingsCount[booking.devoteeId] = (devoteeBookingsCount[booking.devoteeId] || 0) + 1;
    });

    const returningDevoteesCount = Object.values(devoteeBookingsCount).filter(count => count > 1).length;
    document.getElementById('returning-devotees-count').textContent = returningDevoteesCount;

    // Favorite Devotees
    const favoriteDevotees = devotees.slice(0, 5); // First 5 devotees as favorites
    populateFavoriteDevotees(favoriteDevotees);

    // Render Charts
    renderBarChart('devotees-day-chart', devoteesByDayData.labels, devoteesByDayData.data);
    renderBarChart('devotees-month-chart', devoteesByMonthData.labels, devoteesByMonthData.data);
    renderBarChart('devotees-year-chart', devoteesByYearData.labels, devoteesByYearData.data);
    renderDonutChart('pooja-distribution-chart', poojaDistributionData.labels, poojaDistributionData.data);
}

function renderBarChart(canvasId, labels, data) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Count',
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function renderDonutChart(canvasId, labels, data) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                label: 'Distribution',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        }
    });
}

function populateFavoriteDevotees(devotees) {
    const favoriteDevoteesList = document.getElementById('favorite-devotees-list');
    favoriteDevoteesList.innerHTML = devotees.map(devotee => `<li>${devotee.name}</li>`).join('');
}

function setupFavoriteDevotees() {
    // Add logic to add favorite devotees (e.g., button click to add a devotee)
    // Example:
    // document.getElementById('add-favorite-devotee').addEventListener('click', function() {
    //     // Get devotee data and add to favorites
    //     // Update local storage and re-render the list
    // });
}