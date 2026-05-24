// NG Print - Product Data
const products = [
    {
        id: 1,
        title: "Premium School ID Card",
        category: "printing",
        image: "https://images.unsplash.com/photo-1598257006458-087169a1f08d?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Custom School Tie",
        category: "uniform",
        image: "https://images.unsplash.com/photo-1589756823853-eed746dfde70?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Custom School Belt",
        category: "uniform",
        image: "https://images.unsplash.com/photo-1624222247344-550fb8ef986c?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "Customized Key Ring",
        category: "accessories",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=500&auto=format&fit=crop"
    }
];

// WhatsApp Business Number (NG COMPUTER PANJIPARA)
const WHATSAPP_NUMBER = "919851579961";

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderProducts('all');
    setupFilterButtons();
});

// Render products based on category
function renderProducts(category) {
    const productGrid = document.getElementById('productGrid');
    
    // Agar HTML me id="productGrid" nahi hai toh code crash hone se bachaye
    if (!productGrid) return; 

    let filteredProducts = products;
    if (category !== 'all') {
        filteredProducts = products.filter(product => product.category === category);
    }

    productGrid.innerHTML = '';

    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// Create individual product card (Matching Tailwind CSS HTML Design)
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition duration-300 flex flex-col fade-in';
    
    const categoryLabel = {
        printing: '🪪 ID Printing',
        uniform: '👔 Uniform',
        accessories: '🔑 Accessories'
    };

    card.innerHTML = `
        <div class="h-56 bg-slate-100 overflow-hidden relative">
            <img src="${product.image}" alt="${product.title}" class="w-full h-full object-cover">
        </div>
        <div class="p-5 flex flex-col flex-grow justify-between">
            <div>
                <span class="inline-block bg-teal-50 text-teal-700 text-xs font-bold px-2.5 py-1 rounded-full mb-3">${categoryLabel[product.category]}</span>
                <h3 class="text-lg font-bold text-slate-900 mb-1">${product.title}</h3>
            </div>
            <div>
                <div class="border-t border-slate-100 pt-4 mt-2">
                    <button class="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-center font-bold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
                            onclick="sendWhatsAppMessage('${product.title}')">
                        <i class="fa-brands fa-whatsapp text-xl"></i> Contact WhatsApp
                    </button>
                </div>
            </div>
        </div>
    `;

    return card;
}

// Send WhatsApp message
function sendWhatsAppMessage(productTitle) {
    const message = `Hi NG PRINT, I am interested in ordering: ${productTitle}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// Setup filter buttons
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active style from all
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-emerald-600', 'text-white');
                btn.classList.add('bg-white', 'text-slate-700');
            });
            
            // Add active style to clicked
            this.classList.add('bg-emerald-600', 'text-white');
            this.classList.remove('bg-white', 'text-slate-700');
            
            // Filter products
            const filter = this.getAttribute('data-filter');
            renderProducts(filter);
        });
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
