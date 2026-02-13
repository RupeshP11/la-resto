# La`Resto

A modern, responsive restaurant website featuring online reservations, menu showcase, and private dining information.

## Overview

La`Resto is a full-featured restaurant website built with vanilla JavaScript, HTML5, and CSS3. The project includes a complete reservation system integrated with Supabase for real-time data management, multiple pages for menu exploration, restaurant story, and private dining experiences.

## Features

- **Online Reservation System**: Real-time table booking with form validation and database integration
- **Dynamic Menu Display**: Interactive menu pages showcasing restaurant offerings with images
- **Private Dining Section**: Dedicated pages for special events and private room bookings
- **Admin Dashboard**: Backend interface for managing reservations
- **Responsive Design**: Mobile-first approach with cross-device compatibility
- **Navigation System**: Smooth page transitions and consistent navigation across all pages

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Supabase (PostgreSQL)
- **Database**: Real-time data storage and retrieval
- **Version Control**: Git & GitHub

## Project Structure

```
La`Resto/
├── index.html              # Homepage
├── menu.html               # Menu page
├── story.html              # Restaurant story
├── private-dining.html     # Private dining info
├── reservations.html       # Reservation form
├── admin.html              # Admin dashboard
├── thank-you.html          # Confirmation page
├── styles.css              # Main stylesheet
├── navbar.js               # Navigation component
├── form-handler.js         # Form validation & submission
├── supabase-config.js      # Database configuration
├── supabase-setup.sql      # Database schema
└── images/                 # Image assets
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/RupeshP11/la-resto.git
cd la-resto
```

2. Open `index.html` in your browser or serve with a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server
```

3. Access the website at `http://localhost:8000`

## Database Setup

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project
3. Run the SQL setup script from `supabase-setup.sql` in the SQL editor
4. Update `supabase-config.js` with your project credentials:
   - Supabase URL
   - Anonymous/Public API Key

## Usage

### For Users
- Browse menu items and restaurant information
- Make reservations through the booking form
- Explore private dining options
- Receive confirmation after successful booking

### For Administrators
- Access admin dashboard at `admin.html`
- View and manage reservations
- Track booking data in real-time

## Features in Detail

### Reservation System
- Date and time picker
- Party size selection
- Customer information capture
- Form validation
- Database integration with Supabase
- Confirmation page with booking details

### Responsive Layout
- Mobile-optimized navigation
- Flexible grid layouts
- Optimized images for performance
- Touch-friendly interface

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- User authentication for registered customers
- Email confirmation system
- Payment gateway integration
- Table availability calendar
- Customer reviews and ratings

## Contributing

Contributions are welcome. Please fork the repository and create a pull request with your changes.

## License

This project is open source and available for personal and educational use.

## Contact

**Developer**: Rupesh Prajapati  
**GitHub**: [@RupeshP11](https://github.com/RupeshP11)  
**Project Link**: [https://github.com/RupeshP11/la-resto](https://github.com/RupeshP11/la-resto)

---

Built with HTML, CSS, JavaScript, and Supabase
