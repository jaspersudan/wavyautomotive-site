// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
}

// Modal-specific open functions
function openApprovalsModal() {
    openModal('approvalsModal');
}

function openReferralModal() {
    openModal('referralModal');
}

function openDeliveryModal() {
    openModal('deliveryModal');
}

function openFinancingModal() {
    openModal('financingModal');
}

function openSellTradeModal() {
    openModal('sellTradeModal');
}

function openTermsModal() {
    openModal('termsModal');
}

function openPrivacyModal() {
    openModal('privacyModal');
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('show');
    }
}

// Car Slideshow
const carImages = [
    'https://images.unsplash.com/photo-1560958089-b8a63c50ce67?w=500&h=400&fit=crop',    // Red luxury car
    'https://images.unsplash.com/photo-1553882900-d174edf2122e?w=500&h=400&fit=crop',    // Black Mercedes
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&h=400&fit=crop',    // Silver sports car
    'https://images.unsplash.com/photo-1552519507-da3effff991c?w=500&h=400&fit=crop',    // Luxury Audi
    'https://images.unsplash.com/photo-1549399542-7e3f8b83ad38?w=500&h=400&fit=crop',    // Modern car
    'https://images.unsplash.com/photo-1534286519447-91a2fed00330?w=500&h=400&fit=crop',    // Yellow sports car
    'https://images.unsplash.com/photo-1533473359331-35a52422e501?w=500&h=400&fit=crop',    // Car interior
    'https://images.unsplash.com/photo-1493238751060-a6647ee394fa?w=500&h=400&fit=crop'     // Blue BMW
];

let currentSlide = 0;
let slideTimer;

function initializeSlideshow() {
    const dotsContainer = document.getElementById('slideDots');
    if (!dotsContainer) return;
    
    // Create dots
    dotsContainer.innerHTML = '';
    carImages.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot' + (index === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(index);
        dotsContainer.appendChild(dot);
    });
    
    // Start auto-rotation
    autoRotateSlide();
}

function changeSlide(direction) {
    currentSlide += direction;
    if (currentSlide >= carImages.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = carImages.length - 1;
    updateSlide();
    clearTimeout(slideTimer);
    autoRotateSlide();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlide();
    clearTimeout(slideTimer);
    autoRotateSlide();
}

function updateSlide() {
    const slide = document.getElementById('carSlide');
    const dots = document.querySelectorAll('.dot');
    
    if (slide) {
        slide.src = carImages[currentSlide];
    }
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function autoRotateSlide() {
    slideTimer = setTimeout(() => {
        currentSlide++;
        if (currentSlide >= carImages.length) currentSlide = 0;
        updateSlide();
        autoRotateSlide();
    }, 5000); // Change every 5 seconds
}

// Inventory Functions
function openInventory() {
    // Open inventory in a new window
    window.open('inventory.html', 'inventory', 'width=1200,height=800,resizable=yes,scrollbars=yes');
}

// Search Function
function searchInventory() {
    const make = document.getElementById('searchMake').value;
    const model = document.getElementById('searchModel').value;

    if (!make) {
        alert('Please select a make first');
        return;
    }

    // Store search parameters (lowercased for matching)
    sessionStorage.setItem('searchMake', make.toLowerCase());
    sessionStorage.setItem('searchModel', model ? model.toLowerCase() : '');
    openInventory();
}

// Admin Panel Function
function openAdminPanel() {
    const password = prompt('Enter Admin Password:');
    if (password === null) return;
    
    // Simple password check - in production, this should be done on the server
    const correctPassword = 'admin123'; // Change this to your desired password
    
    if (password === correctPassword) {
        window.open('admin.html', 'admin', 'width=1400,height=900,resizable=yes,scrollbars=yes');
    } else {
        alert('Incorrect password. Access denied.');
    }
}

// Form Submission Handler with Email Integration
async function handleFormSubmit(event, formType) {
    event.preventDefault();
    
    // Collect form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Add form type and timestamp
    data.formType = formType;
    data.timestamp = new Date().toLocaleString();
    
    // Store locally
    let submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
    submissions.push(data);
    localStorage.setItem('formSubmissions', JSON.stringify(submissions));
    
    // Prepare email content
    const emailBody = `
New Form Submission - ${formType}

Timestamp: ${data.timestamp}

Details:
${Object.entries(data)
    .filter(([key]) => key !== 'formType' && key !== 'timestamp')
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n')}

--- 
Submitted via Wavy Automotive Website
Email: sales@wavyautomotive.ca
    `.trim();
    
    // Try to send email using basic method (you can upgrade to EmailJS for better functionality)
    try {
        // Log for console (forms will be visible in admin panel)
        console.log('Form submitted:', data);
        
        // Show success message
        alert(`Thank you! Your ${formType} request has been submitted. Our team will contact you at ${data.phoneNumber || data.emailAddress || data.refPhone || data.refEmail} soon.`);
    } catch (error) {
        console.error('Submission error:', error);
        alert('Form submitted! Our team will review your request.');
    }
    
    // Close modal and reset form
    const modal = event.target.closest('.modal');
    if (modal) {
        closeModal(modal.id);
    }
    event.target.reset();
}

// Reviews Carousel
let reviewScrollPosition = 0;

function scrollReviews(direction) {
    const container = document.querySelector('.reviews-container');
    const scrollAmount = 320; // Review card width + gap
    
    if (direction === 1) {
        container.scrollLeft += scrollAmount;
    } else {
        container.scrollLeft -= scrollAmount;
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Load inventory data from localStorage or fetch from server
    loadInventoryData();

    // Populate Make/Model selects on homepage (if present)
    try {
        if (typeof populateMakeModelSelects === 'function') {
            populateMakeModelSelects();
        }
        if (typeof initBankLogos === 'function') {
            initBankLogos();
        }
    } catch (e) { console.warn('populateMakeModelSelects/initBankLogos not available', e); }
    
    // Initialize any other components
    initializeReviews();
});

// Inventory Data Management
function loadInventoryData() {
    // Check if inventory data exists in localStorage
    if (!localStorage.getItem('inventoryData')) {
        // Initialize with sample data
        const sampleInventory = [
            {
                id: 1,
                make: 'Toyota',
                model: 'Camry',
                year: 2022,
                price: 24999,
                mileage: 15000,
                color: 'Silver',
                image: 'assets/default-car.svg'
            },
            {
                id: 2,
                make: 'Honda',
                model: 'Civic',
                year: 2021,
                price: 19999,
                mileage: 28000,
                color: 'Black',
                image: 'assets/default-car.svg'
            },
            {
                id: 3,
                make: 'Toyota',
                model: 'RAV4',
                year: 2023,
                price: 34999,
                mileage: 8000,
                color: 'Blue',
                image: 'assets/default-car.svg'
            },
            {
                id: 4,
                make: 'Ford',
                model: 'F-150',
                year: 2022,
                price: 38999,
                mileage: 12000,
                color: 'Red',
                image: 'assets/default-car.svg'
            },
            {
                id: 5,
                make: 'Honda',
                model: 'Accord',
                year: 2021,
                price: 21999,
                mileage: 32000,
                color: 'White',
                image: 'assets/default-car.svg'
            }
        ];
        
        localStorage.setItem('inventoryData', JSON.stringify(sampleInventory));
    }
}

function getInventoryData() {
    return JSON.parse(localStorage.getItem('inventoryData') || '[]');
}

function searchInventoryData(make, model) {
    const inventory = getInventoryData();
    return inventory.filter(car => {
        return (make === '' || car.make.toLowerCase().includes(make)) &&
               (model === '' || car.model.toLowerCase().includes(model));
    });
}

function addToInventory(car) {
    const inventory = getInventoryData();
    car.id = Math.max(...inventory.map(c => c.id), 0) + 1;
    inventory.push(car);
    localStorage.setItem('inventoryData', JSON.stringify(inventory));
}

function updateInventoryItem(id, updatedCar) {
    let inventory = getInventoryData();
    inventory = inventory.map(car => car.id === id ? { ...car, ...updatedCar } : car);
    localStorage.setItem('inventoryData', JSON.stringify(inventory));
}

function deleteInventoryItem(id) {
    let inventory = getInventoryData();
    inventory = inventory.filter(car => car.id !== id);
    localStorage.setItem('inventoryData', JSON.stringify(inventory));
}

// SharePoint/Excel Integration Setup
function setupSharePointIntegration() {
    // This function sets up the connection to SharePoint
    // You'll need to configure this with your SharePoint site details
    const sharePointConfig = {
        siteUrl: 'https://wavyautomotive-my.sharepoint.com/personal/jass_wavyautomotive_ca',
        spreadsheetId: 'IQCekNXAMEVRR5K06eNhLUdLAdNqi-ZlXLYzrzCBUYROn2Q',
        apiUrl: 'https://graph.microsoft.com/v1.0'
    };
    
    localStorage.setItem('sharePointConfig', JSON.stringify(sharePointConfig));
    console.log('SharePoint integration configured');
}

// Sync inventory with SharePoint (requires authentication)
function syncWithSharePoint() {
    // This would sync the local inventory with the SharePoint Excel sheet
    // This requires proper authentication and API setup
    console.log('Syncing with SharePoint...');
    // Implementation would depend on your backend setup
}

// Reviews Initialization
function initializeReviews() {
    const reviewsContainer = document.querySelector('.reviews-container');
    if (reviewsContainer) {
        // Enable smooth scrolling
        reviewsContainer.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                reviewsContainer.scrollLeft += e.deltaY;
            }
        }, { passive: false });
    }
}

// Active navigation link
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Set home as active by default
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
});

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD'
    }).format(amount);
}

// Utility function to format mileage
function formatMileage(mileage) {
    return new Intl.NumberFormat('en-CA').format(mileage);
}

function populateMakeModelSelects() {
    const makeSelect = document.getElementById('searchMake');
    const modelSelect = document.getElementById('searchModel');
    if (!makeSelect || !modelSelect) return;

    const inventory = getInventoryData();
    const makes = Array.from(new Set(inventory.map(c => c.make).filter(Boolean))).sort();

    // populate makes
    makeSelect.innerHTML = '<option value="">Select Make</option>';
    makes.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m;
        opt.textContent = m;
        makeSelect.appendChild(opt);
    });

    // Reset model
    modelSelect.innerHTML = '<option value="">Select Model</option>';
    modelSelect.disabled = true;

    makeSelect.addEventListener('change', function() {
        const selectedMake = this.value;
        modelSelect.innerHTML = '<option value="">Select Model</option>';
        if (!selectedMake) {
            modelSelect.disabled = true;
            return;
        }
        const models = Array.from(new Set(inventory.filter(c => c.make === selectedMake).map(c => c.model).filter(Boolean))).sort();
        models.forEach(mo => {
            const o = document.createElement('option');
            o.value = mo;
            o.textContent = mo;
            modelSelect.appendChild(o);
        });
        modelSelect.disabled = false;
    });
}

// Export functions for use in other pages
window.openModal = openModal;
window.closeModal = closeModal;
window.openInventory = openInventory;
window.openAdminPanel = openAdminPanel;
window.handleFormSubmit = handleFormSubmit;
window.scrollReviews = scrollReviews;
window.getInventoryData = getInventoryData;
window.searchInventoryData = searchInventoryData;
window.addToInventory = addToInventory;
window.updateInventoryItem = updateInventoryItem;
window.deleteInventoryItem = deleteInventoryItem;
window.formatCurrency = formatCurrency;
window.formatMileage = formatMileage;
window.openApprovalsModal = openApprovalsModal;
window.openReferralModal = openReferralModal;
window.openDeliveryModal = openDeliveryModal;
window.openFinancingModal = openFinancingModal;
window.openSellTradeModal = openSellTradeModal;
window.openTermsModal = openTermsModal;
window.openPrivacyModal = openPrivacyModal;
function openBankFinancingForm(bankName) {
    // Prefill a hidden field in the Find My Car form and open the modal
    const findForm = document.querySelector('#findCarModal form');
    if (findForm) {
        let bankInput = findForm.querySelector('input[name="preferredBank"]');
        if (!bankInput) {
            bankInput = document.createElement('input');
            bankInput.type = 'hidden';
            bankInput.name = 'preferredBank';
            findForm.appendChild(bankInput);
        }
        bankInput.value = bankName || '';
    }

    // Open the same Find My Car modal
    openModal('findCarModal');
}
window.openBankFinancingForm = openBankFinancingForm;
function initBankLogos() {
    document.querySelectorAll('.bank-card').forEach(card => {
        const img = card.querySelector('img.bank-logo');
        const label = card.querySelector('.bank-label');
        if (!img) return;

        img.addEventListener('load', () => { if (label) label.style.display = 'none'; });
        img.addEventListener('error', () => { img.style.display = 'none'; if (label) label.style.display = 'block'; });
        // If image already loaded from cache
        if (img.complete && img.naturalWidth !== 0) { if (label) label.style.display = 'none'; }
    });
}

// Header hide-on-scroll and mobile nav toggle
(function() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    const delta = 5;
    let ticking = false;

    function onScroll() {
        const current = window.scrollY || window.pageYOffset;
        if (Math.abs(current - lastScroll) <= delta) {
            return;
        }
        if (current > lastScroll && current > 80) {
            // scrolling down
            navbar && navbar.classList.add('nav-hidden');
        } else {
            // scrolling up
            navbar && navbar.classList.remove('nav-hidden');
        }
        lastScroll = current;
    }

    // Throttle using requestAnimationFrame
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                onScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Mobile nav toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            navMenu.classList.toggle('nav-open');
        });
    } else {
        // in case elements not yet in DOM, attach after DOM ready
        document.addEventListener('DOMContentLoaded', function() {
            const nt = document.getElementById('navToggle');
            const nm = document.getElementById('navMenu');
            if (nt && nm) {
                nt.addEventListener('click', function() { nm.classList.toggle('nav-open'); });
            }
        });
    }
})();

window.searchInventory = searchInventory;
