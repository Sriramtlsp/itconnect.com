// Booking System Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const modal = document.getElementById('bookingModal');
    const closeBtn = document.querySelector('.close-modal');
    const bookBtns = document.querySelectorAll('.btn-book');
    const bookingForm = document.getElementById('bookingForm');
    const serviceNameInput = document.getElementById('serviceName');
    const servicePriceInput = document.getElementById('servicePrice');
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('appointmentDate').min = today;
    
    // Open modal when clicking Book Now
    bookBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            const price = this.getAttribute('data-price');
            
            serviceNameInput.value = service;
            servicePriceInput.value = price;
            
            // Update modal title
            document.querySelector('#bookingModal h2').textContent = `Book ${service} Service`;
            
            // Show modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
    
    // Close modal when clicking X
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Handle form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            service: serviceNameInput.value,
            price: servicePriceInput.value,
            name: document.getElementById('customerName').value,
            email: document.getElementById('customerEmail').value,
            phone: document.getElementById('customerPhone').value,
            date: document.getElementById('appointmentDate').value,
            device: document.getElementById('deviceType').value,
            description: document.getElementById('issueDescription').value,
            bookingDate: new Date().toISOString(),
            status: 'Pending',
            bookingId: 'BK' + Math.random().toString(36).substr(2, 8).toUpperCase()
        };
        
        // Save to localStorage (in a real app, you would send this to a server)
        saveBooking(formData);
        
        // Show success message
        showBookingSuccess(formData.bookingId);
        
        // Reset form
        bookingForm.reset();
    });
    
    // Save booking to localStorage and send WhatsApp notification
    function saveBooking(bookingData) {
        // Save to localStorage
        let bookings = JSON.parse(localStorage.getItem('serviceBookings')) || [];
        bookings.push(bookingData);
        localStorage.setItem('serviceBookings', JSON.stringify(bookings));
        
        // Prepare WhatsApp message
        const phoneNumber = '919884745432'; // Your WhatsApp business number (without + or spaces)
        const message = encodeURIComponent(
            `New Booking Received!\n\n` +
            `📋 *Booking ID*: ${bookingData.bookingId}\n` +
            `🔧 *Service*: ${bookingData.service}\n` +
            `💰 *Estimated Price*: ₹${bookingData.price}\n` +
            `👤 *Customer*: ${bookingData.name}\n` +
            `📱 *Phone*: ${bookingData.phone}\n` +
            `📅 *Preferred Date*: ${new Date(bookingData.date).toLocaleDateString()}\n` +
            `💻 *Device*: ${bookingData.device}\n` +
            `📝 *Issue*: ${bookingData.description}\n\n` +
            `🕒 *Booking Time*: ${new Date(bookingData.bookingDate).toLocaleString()}`
        );
        
        // Create WhatsApp share link
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        
        // Open WhatsApp in a new tab
        window.open(whatsappUrl, '_blank');
    }
    
    // Show success message
    function showBookingSuccess(bookingId) {
        const form = document.getElementById('bookingForm');
        form.style.display = 'none';
        
        const successHTML = `
            <div class="booking-success">
                <i class="fas fa-check-circle"></i>
                <h3>Booking Confirmed! 🎉</h3>
                <p>Your service request has been received.</p>
                <p>Booking ID: <strong>${bookingId}</strong></p>
                <div class="booking-details">
                    <p><i class="fas fa-info-circle"></i> We've opened WhatsApp to confirm your booking details.</p>
                    <p><i class="fas fa-phone"></i> Our team will contact you shortly to confirm your appointment.</p>
                </div>
                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="closeModal()">
                        <i class="fas fa-check"></i> Done
                    </button>
                    <a href="tel:+919884745432" class="btn btn-secondary">
                        <i class="fas fa-phone"></i> Call Us Now
                    </a>
                </div>
            </div>
        `;
        
        document.querySelector('.modal-content').insertAdjacentHTML('beforeend', successHTML);
    }
});

// Function to close modal (called from success message)
function closeModal() {
    const modal = document.getElementById('bookingModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Reset form for next use
    const form = document.getElementById('bookingForm');
    form.style.display = 'block';
    form.reset();
    
    // Remove success message
    const successMsg = document.querySelector('.booking-success');
    if (successMsg) {
        successMsg.remove();
    }
}
