// ============================================================
//  EDIT THIS FILE ONLY. Everything on the website comes from here.
//  Leave a field as "" (or remove a section's items) to hide it.
// ============================================================

window.SITE = {
  business: {
    name: "Prime Auto & AC Repairs",
    tagline: "Car servicing, AC repair and wheel alignment — honest quotes, same-day work.",
    about:
      "A family-run workshop servicing all car brands. We explain the problem, quote before we start, and show you the old parts we replace.",
    category: "AutoRepair", // used for Google (schema.org) — e.g. Bakery, Restaurant, HairSalon, Store
    logo: "", // optional: path or URL to a logo image, e.g. "images/logo.png"
    heroImage: "", // optional: big photo at the top, e.g. "images/shop.jpg"
  },

  contact: {
    phone: "+91 98765 43210", // shown + click-to-call
    whatsapp: "919876543210", // country code + number, digits only
    email: "hello@example.com",
    address: "Shop 4, Example Road, Andheri West, Mumbai 400053",
    mapQuery: "Andheri West, Mumbai", // what to show on the Google map
  },

  hours: [
    { days: "Mon – Sat", time: "9:00 AM – 7:00 PM" },
    { days: "Sunday", time: "Emergency calls only" },
  ],

  services: [
    { title: "General Service", text: "Oil change, filters, brakes and a 30-point check." },
    { title: "Car AC Repair", text: "Gas top-up, compressor and cooling-coil work." },
    { title: "Pickup & Drop", text: "Free pickup within 5 km for full services." },
  ],

  gallery: [
    // { src: "images/cake.jpg", alt: "Chocolate birthday cake" },
  ],

  testimonials: [
    // { name: "Customer name", text: "What they said." },
  ],

  social: {
    instagram: "", // full URL
    facebook: "",
    youtube: "",
    google: "", // your Google Maps / Business Profile link
  },

  theme: {
    accent: "#1d4ed8", // main brand colour (buttons, highlights)
    font: "Manrope", // any Google Font name
  },

  // Text on the WhatsApp enquiry button / form
  enquiry: {
    heading: "Get a free quote",
    button: "Send on WhatsApp",
  },
};
