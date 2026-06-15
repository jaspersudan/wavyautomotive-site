// Inventory management
let currentInventory = [];

// Initialize inventory page
document.addEventListener('DOMContentLoaded', function() {
    loadAndDisplayInventory();
    
    // Load search parameters if they exist
    const searchMake = sessionStorage.getItem('searchMake') || '';
    const searchModel = sessionStorage.getItem('searchModel') || '';
    
    if (searchMake || searchModel) {
        document.getElementById('filterMake').value = searchMake;
        document.getElementById('filterModel').value = searchModel;
        applyFilters();
        
        // Clear stored search parameters
        sessionStorage.removeItem('searchMake');
        sessionStorage.removeItem('searchModel');
    }
});

function loadAndDisplayInventory() {
    currentInventory = getInventoryData();
    displayInventory(currentInventory);
}

function displayInventory(vehicles) {
    const container = document.getElementById('inventoryContainer');
    const resultCount = document.getElementById('resultCount');
    const noResults = document.getElementById('noResults');
    
    container.innerHTML = '';
    
    if (vehicles.length === 0) {
        container.style.display = 'none';
        noResults.style.display = 'block';
        resultCount.textContent = '0';
        return;
    }
    
    container.style.display = 'grid';
    noResults.style.display = 'none';
    resultCount.textContent = vehicles.length;
    
    vehicles.forEach(car => {
        const carCard = createCarCard(car);
        container.appendChild(carCard);
    });
}

function createCarCard(car) {
    const card = document.createElement('div');
    card.className = 'car-card';
    
    let imageHtml = '';
    if (car.image && car.image.toString().trim() && !/default|placeholder|no-image/i.test(car.image)) {
        imageHtml = `<img src="${car.image}" alt="${car.year} ${car.make} ${car.model}" onerror="this.onerror=null;this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22280%22 height=%22200%22%3E%3Crect fill=%22%23e0e0e0%22 width=%22280%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2216%22 fill=%22%23999%22 text-anchor=%22middle%22 dy=%22.3em%22%3ENo Image%3C/text%3E%3C/svg%3E'">`;
    } else {
        imageHtml = `<div class="no-image">Upcoming</div>`;
    }

    card.innerHTML = `
        <div class="car-image">
            ${imageHtml}
        </div>
        <div class="car-info">
            <h3 class="car-title">${car.year} ${car.make} ${car.model}</h3>
            <p class="car-year" style="display:none;">${car.year}</p>
            <div class="car-details">
                <div class="detail-item">
                    <span class="detail-label">Color:</span>
                    <span>${car.color}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Mileage:</span>
                    <span>${formatMileage(car.mileage)} km</span>
                </div>
            </div>
            <div class="car-price">${formatCurrency(car.price)}</div>
            <div class="car-actions">
                <button class="btn-view" onclick="viewCarDetails(${car.id})">View Details</button>
                <button class="btn-inquire" onclick="inquireAboutCar(${car.id})">Inquire</button>
            </div>
        </div>
    `;
    
    return card;
}

function applyFilters() {
    const make = document.getElementById('filterMake').value.toLowerCase();
    const model = document.getElementById('filterModel').value.toLowerCase();
    const minYear = parseInt(document.getElementById('filterYear').value) || 0;
    const maxPrice = parseInt(document.getElementById('filterPrice').value) || Infinity;
    
    const filtered = currentInventory.filter(car => {
        return (car.make.toLowerCase().includes(make) || make === '') &&
               (car.model.toLowerCase().includes(model) || model === '') &&
               (car.year >= minYear) &&
               (car.price <= maxPrice);
    });
    
    displayInventory(filtered);
}

function resetFilters() {
    document.getElementById('filterMake').value = '';
    document.getElementById('filterModel').value = '';
    document.getElementById('filterYear').value = '';
    document.getElementById('filterPrice').value = '';
    
    displayInventory(currentInventory);
}

function viewCarDetails(carId) {
    const car = currentInventory.find(c => c.id === carId);
    if (!car) return;
    
    const detailsHtml = `
        <div class="modal" id="detailsModal" class="show">
            <div class="modal-content">
                <span class="close" onclick="closeDetailsModal()">&times;</span>
                <h2>${car.year} ${car.make} ${car.model}</h2>
                <div class="car-details-full">
                    <img src="${car.image}" alt="${car.year} ${car.make} ${car.model}" style="width: 100%; border-radius: 10px; margin: 20px 0;" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%25%22 height=%22300%22%3E%3Crect fill=%22%23e0e0e0%22 width=%22100%25%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2216%22 fill=%22%23999%22 text-anchor=%22middle%22 dy=%22.3em%22%3ENo Image%3C/text%3E%3C/svg%3E'">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
                        <div>
                            <p><strong>Year:</strong> ${car.year}</p>
                            <p><strong>Make:</strong> ${car.make}</p>
                            <p><strong>Model:</strong> ${car.model}</p>
                            <p><strong>Color:</strong> ${car.color}</p>
                        </div>
                        <div>
                            <p><strong>Price:</strong> ${formatCurrency(car.price)}</p>
                            <p><strong>Mileage:</strong> ${formatMileage(car.mileage)} km</p>
                            <p><strong>ID:</strong> ${car.id}</p>
                        </div>
                    </div>
                    <p style="color: #666; line-height: 1.6; margin: 20px 0;">
                        This ${car.year} ${car.make} ${car.model} is a quality certified vehicle with transparent pricing and comprehensive warranty options available. 
                        With only ${formatMileage(car.mileage)} kilometers on the odometer and in beautiful ${car.color} condition, this is an excellent choice for your next vehicle. 
                        Contact us for more information or to arrange a test drive.
                    </p>
                    <button class="btn-view" onclick="inquireAboutCar(${car.id})" style="width: 100%; padding: 15px; font-size: 16px;">Get More Information</button>
                </div>
            </div>
        </div>
    `;
    
    // Append modal to body
    const existingModal = document.getElementById('detailsModal');
    if (existingModal) existingModal.remove();
    
    document.body.insertAdjacentHTML('beforeend', detailsHtml);
    document.getElementById('detailsModal').classList.add('show');
}

function closeDetailsModal() {
    const modal = document.getElementById('detailsModal');
    if (modal) {
        modal.remove();
    }
}

function inquireAboutCar(carId) {
    const car = currentInventory.find(c => c.id === carId);
    if (!car) return;
    
    // Create inquiry form
    const inquiryHtml = `
        <div class="modal" id="inquiryModal" class="show">
            <div class="modal-content">
                <span class="close" onclick="closeInquiryModal()">&times;</span>
                <h2>Inquiry - ${car.year} ${car.make} ${car.model}</h2>
                <form onsubmit="submitCarInquiry(event, ${car.id})">
                    <div class="form-group">
                        <label for="inquiryName">Full Name *</label>
                        <input type="text" id="inquiryName" name="inquiryName" required>
                    </div>
                    <div class="form-group">
                        <label for="inquiryEmail">Email Address *</label>
                        <input type="email" id="inquiryEmail" name="inquiryEmail" required>
                    </div>
                    <div class="form-group">
                        <label for="inquiryPhone">Phone Number *</label>
                        <input type="tel" id="inquiryPhone" name="inquiryPhone" required>
                    </div>
                    <div class="form-group">
                        <label for="inquiryMessage">Message</label>
                        <textarea id="inquiryMessage" name="inquiryMessage" rows="4" placeholder="Tell us why you're interested in this vehicle..."></textarea>
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" name="testDrive"> I'm interested in a test drive
                        </label>
                    </div>
                    <button type="submit" class="btn-view" style="width: 100%; padding: 12px;">Submit Inquiry</button>
                </form>
            </div>
        </div>
    `;
    
    const existingModal = document.getElementById('inquiryModal');
    if (existingModal) existingModal.remove();
    
    document.body.insertAdjacentHTML('beforeend', inquiryHtml);
    document.getElementById('inquiryModal').classList.add('show');
    
    // Close modal when clicking outside
    document.getElementById('inquiryModal').onclick = function(event) {
        if (event.target === this) {
            closeInquiryModal();
        }
    };
}

function closeInquiryModal() {
    const modal = document.getElementById('inquiryModal');
    if (modal) {
        modal.remove();
    }
}

function submitCarInquiry(event, carId) {
    event.preventDefault();
    
    const car = currentInventory.find(c => c.id === carId);
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    const inquiry = {
        carId: carId,
        carDetails: `${car.year} ${car.make} ${car.model} - ${formatCurrency(car.price)}`,
        name: data.inquiryName,
        email: data.inquiryEmail,
        phone: data.inquiryPhone,
        message: data.inquiryMessage,
        testDrive: data.testDrive ? 'Yes' : 'No',
        timestamp: new Date().toLocaleString()
    };
    
    // Store inquiry
    let inquiries = JSON.parse(localStorage.getItem('carInquiries') || '[]');
    inquiries.push(inquiry);
    localStorage.setItem('carInquiries', JSON.stringify(inquiries));
    
    alert('Thank you for your inquiry! Our team will contact you shortly at ' + data.inquiryPhone);
    closeInquiryModal();
}

// Style for modals in this window
const style = document.createElement('style');
style.textContent = `
    .form-group {
        margin-bottom: 15px;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    
    .form-group label {
        font-weight: bold;
        font-size: 14px;
    }
    
    .form-group input,
    .form-group textarea {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 14px;
        font-family: inherit;
    }
    
    .form-group input:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: #0099cc;
        box-shadow: 0 0 5px rgba(0, 153, 204, 0.3);
    }
    
    .form-group input[type="checkbox"] {
        width: auto;
        margin-right: 8px;
    }
    
    .form-group textarea {
        resize: vertical;
        min-height: 80px;
    }
    
    .modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        overflow-y: auto;
        align-items: center;
        justify-content: center;
    }
    
    .modal.show {
        display: flex;
    }
    
    .modal-content {
        background-color: #fefefe;
        padding: 40px;
        border-radius: 15px;
        width: 90%;
        max-width: 600px;
        position: relative;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease;
        max-height: 90vh;
        overflow-y: auto;
    }
    
    .car-details-full img {
        max-width: 100%;
    }

    /* Placeholder for missing images */
    .car-image .no-image {
        width: 280px;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #e0e0e0;
        color: #777;
        font-size: 18px;
        border-radius: 8px;
    }

    .no-image-large {
        width: 100%;
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #e0e0e0;
        color: #777;
        font-size: 18px;
        border-radius: 10px;
        margin: 20px 0;
    }
`;

document.head.appendChild(style);
