// Admin Panel JavaScript

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    loadInventoryTable();
    loadSubmissions();
    loadInquiries();
    checkSharePointSetup();
});

// Tab Switching
function switchTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Remove active class from all nav buttons
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName + 'Tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Reload data for specific tabs
    if (tabName === 'inventory') {
        loadInventoryTable();
    } else if (tabName === 'submissions') {
        loadSubmissions();
    } else if (tabName === 'inquiries') {
        loadInquiries();
    }
}

// Vehicle Management Functions
function showAddVehicleForm() {
    document.getElementById('vehicleForm').style.display = 'block';
    document.getElementById('formTitle').textContent = 'Add New Vehicle';
    document.getElementById('editingCarId').value = '';
    document.querySelector('.vehicle-form form').reset();
}

function cancelVehicleForm() {
    document.getElementById('vehicleForm').style.display = 'none';
    document.querySelector('.vehicle-form form').reset();
}

function handleVehicleFormSubmit(event) {
    event.preventDefault();
    
    const editingId = document.getElementById('editingCarId').value;
    const formData = new FormData(event.target);
    
    const vehicleData = {
        make: formData.get('make'),
        model: formData.get('model'),
        year: parseInt(formData.get('year')),
        price: parseFloat(formData.get('price')),
        mileage: parseInt(formData.get('mileage')),
        color: formData.get('color'),
        image: formData.get('image') || 'assets/default-car.png'
    };
    
    if (editingId) {
        // Update existing vehicle
        updateInventoryItem(parseInt(editingId), vehicleData);
        alert('Vehicle updated successfully!');
    } else {
        // Add new vehicle
        addToInventory(vehicleData);
        alert('Vehicle added successfully!');
    }
    
    cancelVehicleForm();
    loadInventoryTable();
}

function loadInventoryTable() {
    const inventory = getInventoryData();
    const tableBody = document.getElementById('inventoryTableBody');
    const emptyMessage = document.getElementById('emptyMessage');
    
    tableBody.innerHTML = '';
    
    if (inventory.length === 0) {
        emptyMessage.style.display = 'block';
        return;
    }
    
    emptyMessage.style.display = 'none';
    
    inventory.forEach(car => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${car.year}</td>
            <td>${car.make}</td>
            <td>${car.model}</td>
            <td>${formatCurrency(car.price)}</td>
            <td>${formatMileage(car.mileage)} km</td>
            <td>${car.color}</td>
            <td>
                <button class="action-btn btn-edit" onclick="editVehicle(${car.id})">Edit</button>
                <button class="action-btn btn-delete" onclick="deleteVehicle(${car.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editVehicle(carId) {
    const inventory = getInventoryData();
    const car = inventory.find(c => c.id === carId);
    
    if (!car) return;
    
    document.getElementById('formTitle').textContent = `Edit ${car.year} ${car.make} ${car.model}`;
    document.getElementById('make').value = car.make;
    document.getElementById('model').value = car.model;
    document.getElementById('year').value = car.year;
    document.getElementById('price').value = car.price;
    document.getElementById('mileage').value = car.mileage;
    document.getElementById('color').value = car.color;
    document.getElementById('image').value = car.image;
    document.getElementById('editingCarId').value = carId;
    
    document.getElementById('vehicleForm').style.display = 'block';
    document.querySelector('.vehicle-form form').scrollIntoView({ behavior: 'smooth' });
}

function deleteVehicle(carId) {
    if (confirm('Are you sure you want to delete this vehicle?')) {
        deleteInventoryItem(carId);
        alert('Vehicle deleted successfully!');
        loadInventoryTable();
    }
}

// Form Submissions Functions
function loadSubmissions() {
    const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
    const tableBody = document.getElementById('submissionsTableBody');
    const emptyMessage = document.getElementById('emptySubmissionsMessage');
    
    tableBody.innerHTML = '';
    
    if (submissions.length === 0) {
        emptyMessage.style.display = 'block';
        return;
    }
    
    emptyMessage.style.display = 'none';
    
    submissions.reverse().forEach(submission => {
        const row = document.createElement('tr');
        const name = submission.refFirstName ? submission.refFirstName : submission.fullName;
        const email = submission.refEmail ? submission.refEmail : submission.emailAddress || submission.email || 'N/A';
        const phone = submission.refPhone ? submission.refPhone : submission.phoneNumber || submission.phone || 'N/A';
        
        row.innerHTML = `
            <td>${name}</td>
            <td>${email}</td>
            <td>${phone}</td>
            <td>${submission.formType || 'unknown'}</td>
            <td>${submission.timestamp || 'N/A'}</td>
            <td><button class="action-btn btn-view" onclick="viewSubmissionDetails('${JSON.stringify(submission).replace(/'/g, "&apos;")}')">View</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function viewSubmissionDetails(submissionJson) {
    const submission = JSON.parse(submissionJson);
    const detailsHtml = Object.entries(submission)
        .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
        .join('');
    
    alert(detailsHtml.replace(/<[^>]*>/g, '').substring(0, 500));
}

function clearSubmissions() {
    if (confirm('Are you sure you want to delete all form submissions? This cannot be undone.')) {
        localStorage.setItem('formSubmissions', JSON.stringify([]));
        loadSubmissions();
        alert('All submissions cleared!');
    }
}

// Car Inquiries Functions
function loadInquiries() {
    const inquiries = JSON.parse(localStorage.getItem('carInquiries') || '[]');
    const tableBody = document.getElementById('inquiriesTableBody');
    const emptyMessage = document.getElementById('emptyInquiriesMessage');
    
    tableBody.innerHTML = '';
    
    if (inquiries.length === 0) {
        emptyMessage.style.display = 'block';
        return;
    }
    
    emptyMessage.style.display = 'none';
    
    inquiries.reverse().forEach(inquiry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${inquiry.carDetails}</td>
            <td>${inquiry.name}</td>
            <td>${inquiry.email}</td>
            <td>${inquiry.phone}</td>
            <td>${inquiry.testDrive}</td>
            <td>${inquiry.timestamp}</td>
            <td>${inquiry.message}</td>
        `;
        tableBody.appendChild(row);
    });
}

function clearInquiries() {
    if (confirm('Are you sure you want to delete all inquiries? This cannot be undone.')) {
        localStorage.setItem('carInquiries', JSON.stringify([]));
        loadInquiries();
        alert('All inquiries cleared!');
    }
}

// SharePoint Functions
function checkSharePointSetup() {
    const config = JSON.parse(localStorage.getItem('sharePointConfig') || '{}');
    if (config.siteUrl && config.spreadsheetId) {
        document.getElementById('syncStatus').textContent = 'SharePoint connected: ' + config.siteUrl;
        document.getElementById('syncButton').style.display = 'inline-block';
    }
}

function setupSharePointSync() {
    const siteUrl = document.getElementById('spSiteUrl').value.trim();
    const spreadsheetId = document.getElementById('spSpreadsheetId').value.trim();
    
    if (!siteUrl || !spreadsheetId) {
        alert('Please enter both SharePoint Site URL and Spreadsheet ID');
        return;
    }
    
    const config = {
        siteUrl: siteUrl,
        spreadsheetId: spreadsheetId,
        lastSync: new Date().toLocaleString(),
        apiUrl: 'https://graph.microsoft.com/v1.0'
    };
    
    localStorage.setItem('sharePointConfig', JSON.stringify(config));
    document.getElementById('syncStatus').textContent = 'SharePoint configured: ' + siteUrl;
    document.getElementById('syncButton').style.display = 'inline-block';
    
    alert('SharePoint integration setup complete! Click "Sync Now" to sync your inventory.');
}

function syncInventoryNow() {
    const config = JSON.parse(localStorage.getItem('sharePointConfig') || '{}');
    
    if (!config.siteUrl || !config.spreadsheetId) {
        alert('Please setup SharePoint connection first');
        return;
    }
    
    // Note: Actual implementation would require backend support and OAuth tokens
    // This is a placeholder that demonstrates the sync process
    
    alert(`SharePoint sync initiated!\n\nNote: Full SharePoint integration requires:\n1. Backend API with OAuth tokens\n2. Microsoft Graph API access\n3. Proper permission scopes\n\nFor production use, configure your backend to handle SharePoint API calls.`);
    
    // Log sync attempt
    const config_with_sync = {
        ...config,
        lastSync: new Date().toLocaleString()
    };
    localStorage.setItem('sharePointConfig', JSON.stringify(config_with_sync));
    
    document.getElementById('syncStatus').textContent = 'Last sync: ' + new Date().toLocaleString();
}

// Logout Function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        window.close();
    }
}

// Export functions
window.switchTab = switchTab;
window.showAddVehicleForm = showAddVehicleForm;
window.cancelVehicleForm = cancelVehicleForm;
window.handleVehicleFormSubmit = handleVehicleFormSubmit;
window.editVehicle = editVehicle;
window.deleteVehicle = deleteVehicle;
window.loadInventoryTable = loadInventoryTable;
window.loadSubmissions = loadSubmissions;
window.loadInquiries = loadInquiries;
window.clearSubmissions = clearSubmissions;
window.clearInquiries = clearInquiries;
window.viewSubmissionDetails = viewSubmissionDetails;
window.setupSharePointSync = setupSharePointSync;
window.syncInventoryNow = syncInventoryNow;
window.logout = logout;
