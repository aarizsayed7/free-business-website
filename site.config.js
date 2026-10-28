// ============================================================
//  EDIT THIS FILE ONLY. Everything on the website comes from here.
//  Leave a field as "" (or remove a section's items) to hide it.
// ============================================================

window.SITE = {
  business: {
    name: "Sunrise Bakery",
    tagline: "Fresh bread, cakes and snacks — baked every morning.",
    about:
      "We are a neighbourhood bakery serving fresh breads, custom cakes and evening snacks. Everything is baked in-house, every day, with no shortcuts.",
    category: "Bakery", // used for Google (schema.org) — e.g. Bakery, Restaurant, HairSalon, Store
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
    { days: "Mon – Sat", time: "8:00 AM – 9:00 PM" },
    { days: "Sunday", time: "9:00 AM – 2:00 PM" },
  ],

  services: [
    { title: "Fresh Breads", text: "Pav, brown bread, multigrain and more, out of the oven by 8 AM." },
    { title: "Custom Cakes", text: "Birthdays, anniversaries, office parties. Order 24 hours ahead." },
    { title: "Evening Snacks", text: "Puffs, rolls and cookies, fresh every evening." },
  ],

  gallery: [
    // { src: "images/cake.jpg", alt: "Chocolate birthday cake" },
  ],

  testimonials: [
    // { name: "Customer name", text: "What they said." },
  ],

  faq: [
    // { q: "Do you deliver?", a: "Yes, within 3 km." },
  ],

  social: {
    instagram: "", // full URL
    facebook: "",
    youtube: "",
    google: "", // your Google Maps / Business Profile link
  },

  theme: {
    accent: "#c2410c", // main brand colour (buttons, highlights)
    font: "Inter", // any Google Font name
  },

  // Page language code (e.g. "en", "hi", "mr") and optional translations of
  // the fixed words on the page. Leave out any you don't need to change.
  // Ready translations are in the translations/ folder: copy one into labels.
  language: "en",
  labels: {
    // about: "About us",
    // services: "What we offer",
  },

  // Text on the WhatsApp enquiry button / form
  enquiry: {
    heading: "Place an order or ask a question",
    button: "Send on WhatsApp",
  },
};
