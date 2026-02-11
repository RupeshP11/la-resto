// Supabase Configuration
// Replace these with your actual Supabase project credentials
window.SUPABASE_URL = 'https://yrbtiptkblhtvcbozakk.supabase.co';
window.SUPABASE_ANON_KEY = 'sb_publishable_TN8vnqHGrgzermRmM0lBCA_XApuYpp7';

// Initialize Supabase client after library loads
if (window.supabase && window.SUPABASE_URL && window.SUPABASE_ANON_KEY) {
    try {
        window.supabaseClient = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
        console.log('✅ Supabase client initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing Supabase:', error);
    }
} else {
    console.warn('⚠️ Waiting for Supabase library to load...');
    // Try again after a delay if library not loaded yet
    setTimeout(() => {
        if (window.supabase && window.SUPABASE_URL && window.SUPABASE_ANON_KEY && !window.supabaseClient) {
            try {
                window.supabaseClient = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
                console.log('✅ Supabase client initialized (delayed)');
            } catch (error) {
                console.error('❌ Error initializing Supabase (delayed):', error);
            }
        }
    }, 500);
}
