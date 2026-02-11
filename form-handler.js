// Form submission handler for Supabase integration

// Get Supabase client with retries
function getSupabaseClient() {
    if (window.supabaseClient) {
        return window.supabaseClient;
    }
    
    // Try to initialize if not done yet
    if (window.supabase && window.SUPABASE_URL && window.SUPABASE_ANON_KEY) {
        window.supabaseClient = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
        return window.supabaseClient;
    }
    
    return null;
}

// Submit reservation form
async function submitReservation(formData) {
    try {
        const supabase = getSupabaseClient();
        if (!supabase) {
            throw new Error('Supabase client not initialized. Check browser console.');
        }

        const reservationData = {
            first_name: formData.get('first-name'),
            last_name: formData.get('last-name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            guests: formData.get('guests') || formData.get('guest-count'),
            date: formData.get('date'),
            time: formData.get('time'),
            special_requests: formData.get('special-requests'),
            terms_agreement: formData.get('terms-agreement') === 'on',
            created_at: new Date().toISOString()
        };

        const { data, error } = await supabase
            .from('reservations')
            .insert([reservationData]);

        if (error) throw error;

        console.log('Reservation submitted successfully:', data);
        return { success: true, data };
    } catch (error) {
        console.error('Error submitting reservation:', error);
        return { success: false, error: error.message };
    }
}

// Submit private dining inquiry
async function submitPrivateDining(formData) {
    try {
        const supabase = getSupabaseClient();
        if (!supabase) {
            throw new Error('Supabase client not initialized. Check browser console.');
        }

        const privateDiningData = {
            event_type: formData.get('event-type'),
            guest_count: formData.get('guest-count'),
            preferred_date: formData.get('preferred-date'),
            contact_name: formData.get('contact-name'),
            contact_email: formData.get('contact-email'),
            contact_phone: formData.get('contact-phone'),
            special_requests: formData.get('special-requests'),
            created_at: new Date().toISOString()
        };

        const { data, error } = await supabase
            .from('private_dining')
            .insert([privateDiningData]);

        if (error) throw error;

        console.log('Private dining inquiry submitted successfully:', data);
        return { success: true, data };
    } catch (error) {
        console.error('Error submitting private dining inquiry:', error);
        return { success: false, error: error.message };
    }
}

// Show success message in form
function showSuccessMessage(form, message) {
    const originalContent = form.innerHTML;
    
    // Get the form's parent container to properly center content
    const formParent = form.parentElement;
    const wasCharcoalBg = form.classList.contains('bg-charcoal') || formParent.classList.contains('bg-charcoal');
    
    // Remove grid layout from form to allow proper centering
    form.className = form.className.replace(/grid|grid-cols-\d+|md:grid-cols-\d+|gap-\d+/g, '').trim();
    form.classList.add('flex', 'items-center', 'justify-center');
    
    form.innerHTML = `
        <div class="flex flex-col items-center justify-center text-center py-12 px-4 w-full">
            <div class="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span class="material-symbols-outlined text-white text-4xl">check_circle</span>
            </div>
            <h3 class="text-3xl font-bold ${wasCharcoalBg ? 'text-white' : 'text-charcoal'} mb-4 serif-header">Success!</h3>
            <p class="${wasCharcoalBg ? 'text-gray-300' : 'text-gray-600'} text-lg mb-8 max-w-md mx-auto">${message}</p>
            <button onclick="location.reload()" class="bg-primary text-white px-8 py-4 rounded text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg">
                Submit Another Request
            </button>
        </div>
    `;
}

// Show error message
function showErrorMessage(form, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'bg-red-500/20 border border-red-500 text-red-100 px-4 py-3 rounded mb-4';
    errorDiv.textContent = `Error: ${message}`;
    
    // Remove any existing error messages
    const existingError = form.querySelector('.bg-red-500\\/20');
    if (existingError) {
        existingError.remove();
    }
    
    form.insertBefore(errorDiv, form.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Handle form submissions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Form handler initialized');

    // Quick reservation form on index page
    const quickReservationForm = document.getElementById('quick-reservation-form');
    if (quickReservationForm) {
        quickReservationForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';

            const formData = new FormData(this);
            const result = await submitReservation(formData);
            
            if (result.success) {
                window.location.href = 'thank-you.html';
            } else {
                showErrorMessage(this, result.error);
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    }

    // Full reservation form
    const reservationForm = document.getElementById('reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';

            const formData = new FormData(this);
            const result = await submitReservation(formData);
            
            if (result.success) {
                showSuccessMessage(this, 'Your reservation request has been submitted successfully! We will contact you within 24 hours to confirm your booking.');
            } else {
                showErrorMessage(this, result.error);
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    }

    // Private dining form
    const privateDiningForm = document.getElementById('private-dining-form');
    if (privateDiningForm) {
        privateDiningForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            const formData = new FormData(this);
            const result = await submitPrivateDining(formData);
            
            if (result.success) {
                showSuccessMessage(this, 'Your private dining inquiry has been submitted! Our events team will reach out to you shortly.');
            } else {
                showErrorMessage(this, result.error);
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    }
});
