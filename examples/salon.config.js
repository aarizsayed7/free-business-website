// ============================================================
//  EDIT THIS FILE ONLY. Everything on the website comes from here.
//  Leave a field as "" (or remove a section's items) to hide it.
// ============================================================

window.SITE = {
  business: {
    name: "Glow Hair & Beauty Studio",
    tagline: "Haircuts, colour and bridal makeup by trained stylists.",
    about:
      "A friendly neighbourhood salon for men and women. Walk in or book on WhatsApp — we use quality products and keep every tool sanitised.",
    category: "HairSalon", // used for Google (schema.org) — e.g. Bakery, Restaurant, HairSalon, Store
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
    { days: "Tue – Sun", time: "10:00 AM – 8:30 PM" },
    { days: "Monday", time: "Closed" },
  ],

  services: [
    { title: "Haircut & Styling", text: "Cuts, blow-dry and styling for men, women and kids." },
    { title: "Hair Colour & Spa", text: "Global colour, highlights, keratin and hair spa." },
    { title: "Bridal & Party Makeup", text: "Book a trial session two weeks before the event." },
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
    accent: "#9d174d", // main brand colour (buttons, highlights)
    font: "Poppins", // any Google Font name
  },

  // Text on the WhatsApp enquiry button / form
  enquiry: {
    heading: "Book an appointment",
    button: "Send on WhatsApp",
  },
};
