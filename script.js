// NG Print - Product Data (Using .jpeg formats strictly)
const products = [
    {
        id: 1,
        title: "Premium PVC School ID Card",
        category: "Printing",
        desc: "High-grade PVC cards with vibrant, non-fading print quality.",
        image: "https://placehold.co/600x600/f8fafc/1e3a8a.jpeg?text=ID+Card+Printing"
    },
    {
        id: 2,
        title: "Custom Woven School Tie",
        category: "Uniforms",
        desc: "Durable school ties with custom logo and stripe patterns.",
        image: "https://placehold.co/600x600/f8fafc/1e3a8a.jpeg?text=School+Ties"
    },
    {
        id: 3,
        title: "Logo Printed School Belt",
        category: "Uniforms",
        desc: "Adjustable belts with sturdy metal buckles and customized logo.",
        image: "https://placehold.co/600x600/f8fafc/1e3a8a.jpeg?text=School+Belts"
    },
    {
        id: 4,
        title: "Acrylic Custom Key Ring",
        category: "Accessories",
        desc: "Double-sided printed key rings for bags and keys.",
        image: "https://placehold.co/600x600/f8fafc/1e3a8a.jpeg?text=Custom+Key+Rings"
    }
];

// WhatsApp Business Number (NG COMPUTER PANJIPARA)
const WHATSAPP_NUMBER = "919851579961";

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
});

// Render products dynamically (VistaPrint style cards)
function renderProducts() {
    const productGrid = document.getElementById('productGrid');
    
    if (!productGrid) return; 

    productGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-blue-300 transition duration-300 group flex flex-col';
        
        productCard.innerHTML = `
            <div class="relative h-60 bg-gray-100 overflow-hidden p-4">
                <img src="${product.image}" alt="${product.title}" class="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition duration-500">
                <div class="absolute top-3 left-3 bg-white text-gray-800 text-[10px] font-extrabold px-2 py-1 rounded shadow uppercase tracking-wider">
                    ${product.category}
                </div>
            </div>
            <div class="p-5 flex flex-col flex-grow">
                <h3 class="text-lg font-bold text-gray-900 leading-tight mb-2 group-hover:text-blue-700 transition">${product.title}</h3>
                <p class="text-sm text-gray-500 mb-5 flex-grow">${product.desc}</p>
                <button onclick="sendWhatsAppMessage('${product.title}')" class="w-full bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-bold py-2.5 px-4 rounded-lg transition duration-200 flex justify-center items-center gap-2">
                    <i class="fa-brands fa-whatsapp text-lg"></i>
                    Order Now
                </button>
            </div>
        `;

        productGrid.appendChild(productCard);
    });
}

// Send WhatsApp message formatted professionally
function sendWhatsAppMessage(productTitle) {
    const message = `Hello NG PRINT,\n\nI visited your website and I am interested in placing an order for:\n*${productTitle}*\n\nPlease share the details and pricing.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}
