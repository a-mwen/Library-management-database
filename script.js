document.addEventListener("DOMContentLoaded", () => {
    loadBooks(); // Load books on initial load

    document.getElementById('loader').style.display = 'none'; // Hide loader
});

async function fetchData(url) {
    const loaderDiv = document.getElementById('loader');
    const dataDiv = document.getElementById('data');
    loaderDiv.style.display = 'block'; // Show loader

    dataDiv.innerHTML = ''; // Clear existing data

    try {
        const response = await fetch(url);
        const data = await response.json();
        loaderDiv.style.display = 'none'; // Hide loader

        data.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = "data-item";
            itemDiv.innerHTML = Object.keys(item).map(key => `<p>${key}: ${item[key]}</p>`).join('');
            dataDiv.appendChild(itemDiv);
        });
    } catch (error) {
        loaderDiv.textContent = 'Error fetching data. Please try again.';
        console.error('Error fetching data:', error);
    }
}

function loadBooks() {
    fetchData('https://library-management-system-0itd.onrender.com/books');
}

function loadUsers() {
    fetchData('https://library-management-system-0itd.onrender.com/users');
}

function loadLoans() {
    fetchData('https://library-management-system-0itd.onrender.com/loans');
}
