/* help.js */

document.addEventListener('DOMContentLoaded', function() {
    populateNakshatraTable();
    populateChakraList();
});

function populateNakshatraTable() {
    const nakshatras = [
        { name: "Ashwini", stars: "Beta Arietis, Gamma Arietis", description: "Represents beginnings and initiations." },
        { name: "Bharani", stars: "41 Arietis", description: "Represents endings and transformations." },
        { name: "Krittika", stars: "Pleiades", description: "Represents purification and refinement." },
        { name: "Rohini", stars: "Aldebaran", description: "Represents growth and fertility." },
        { name: "Mrigashira", stars: "Lambda Orionis", description: "Represents searching and exploration." },
        { name: "Ardra", stars: "Betelgeuse", description: "Represents storms and transformations." },
        { name: "Punarvasu", stars: "Castor, Pollux", description: "Represents renewal and restoration." },
        { name: "Pushya", stars: "Gamma Cancri", description: "Represents nourishment and care." },
        { name: "Ashlesha", stars: "Delta Hydrae", description: "Represents clinging and binding." },
        { name: "Magha", stars: "Regulus", description: "Represents power and authority." },
        { name: "Purva Phalguni", stars: "Delta Leonis, Zeta Leonis", description: "Represents enjoyment and pleasure." },
        { name: "Uttara Phalguni", stars: "Denebola", description: "Represents stability and support." },
        { name: "Hasta", stars: "Alpha Corvi, Beta Corvi, Gamma Corvi, Delta Corvi, Epsilon Corvi", description: "Represents skill and craftsmanship." },
        { name: "Chitra", stars: "Spica", description: "Represents beauty and artistry." },
        { name: "Swati", stars: "Arcturus", description: "Represents independence and freedom." },
        { name: "Vishakha", stars: "Alpha Librae, Beta Librae, Gamma Librae, Delta Librae", description: "Represents focus and determination." },
        { name: "Anuradha", stars: "Beta Scorpii, Delta Scorpii, Pi Scorpii", description: "Represents friendship and devotion." },
        { name: "Jyeshtha", stars: "Antares", description: "Represents power and control." },
        { name: "Mula", stars: "Lambda Scorpii, Mu Scorpii, Zeta Scorpii, Eta Scorpii, Theta Scorpii, Iota Scorpii, Kappa Scorpii, Upsilon Scorpii", description: "Represents roots and foundations." },
        { name: "Purva Ashadha", stars: "Delta Sagittarii, Epsilon Sagittarii", description: "Represents purification and cleansing." },
        { name: "Uttara Ashadha", stars: "Sigma Sagittarii, Tau Sagittarii, Phi Sagittarii, Lambda Sagittarii", description: "Represents victory and achievement." },
        { name: "Shravana", stars: "Altair, Beta Aquilae, Gamma Aquilae", description: "Represents listening and learning." },
        { name: "Dhanishtha", stars: "Alpha Delphini, Beta Delphini, Gamma Delphini, Delta Delphini, Epsilon Delphini", description: "Represents abundance and prosperity." },
        { name: "Shatabhisha", stars: "Gamma Aquarii, Eta Aquarii, Delta Aquarii, Epsilon Aquarii", description: "Represents healing and mystery." },
        { name: "Purva Bhadrapada", stars: "Alpha Pegasi, Gamma Pegasi", description: "Represents transformation and change." },
        { name: "Uttara Bhadrapada", stars: "Gamma Pegasi, Alpha Andromedae", description: "Represents wisdom and compassion." },
        { name: "Revati", stars: "Zeta Piscium", description: "Represents completion and fulfillment." }
    ];

    const tableBody = document.getElementById('nakshatra-table').querySelector('tbody');
    tableBody.innerHTML = nakshatras.map(nakshatra => `
        <tr>
            <td>${nakshatra.name}</td>
            <td>${nakshatra.stars}</td>
            <td>${nakshatra.description}</td>
        </tr>
    `).join('');
}

function populateChakraList() {
    const chakras = [
        { name: "Muladhara (Root)", description: "Base of the spine, grounding and security." },
        { name: "Swadhisthana (Sacral)", description: "Lower abdomen, creativity and sexuality." },
        { name: "Manipura (Solar Plexus)", description: "Upper abdomen, power and will." },
        { name: "Anahata (Heart)", description: "Center of the chest, love and compassion." },
        { name: "Vishuddha (Throat)", description: "Throat, communication and expression." },
        { name: "Ajna (Third Eye)", description: "Center of the forehead, intuition and insight." },
        { name: "Sahasrara (Crown)", description: "Top of the head, connection to the divine." }
    ];

    const chakraList = document.getElementById('chakra-list');
    chakraList.innerHTML = chakras.map(chakra => `
        <li><strong>${chakra.name}:</strong> ${chakra.description}</li>
    `).join('');
}