// Product Data
const products = [
    {
        id: 1,
        title: "Wireless Headphones",
        price: "₦15,999",
        category: "electronics",
        image: "https://via.placeholder.com/300x300.jpeg"
    },
    {
        id: 2,
        title: "USB-C Cable",
        price: "₦2,499",
        category: "accessories",
        image: "https://via.placeholder.com/300x300.jpeg"
    },
    {
        id: 3,
        title: "Premium T-Shirt",
        price: "₦5,999",
        category: "clothing",
        image: "https://via.placeholder.com/300x300.jpeg"
    },
    {
        id: 4,
        title: "Desk Lamp",
        price: "₦8,999",
        category: "home",
        image: "https://via.placeholder.com/300x300.jpeg"
    },
    {
        id: 5,
        title: "Webcam HD",
        price: "₦12,499",
        category: "electronics",
        image: "https://via.placeholder.com/300x300.jpeg"
    },
    {
        id: 6,
        title: "Screen Protector",
        price: "₦1,999",
        category: "accessories",
        image: "https://via.placeholder.com/300x300.jpeg"
    },
    {
        id: 7,
        title: "Casual Jeans",
        price: "₦9,999",
        category: "clothing",
        image: "https://via.placeholder.com/300x300.jpeg"
    },
    {
        id: 8,
        title: "Wall Clock",
        price: "₦4,499",
        category: "home",
        image: "https://via.placeholder.com/300x300.jpeg"
    },
    {
        id: 9,
        title: "Portable Speaker",
        price: "₦11,999",
        category: "electronics",
        image: "https://via.placeholder.com/300x300.jpeg"
    },
    {
        id: 10,
        title: "Phone Stand",
        price: "₦3,999",
        category: "accessories",
        image: "https://via.placeholder.com/300x300.jpeg"
    },
    {
        id: 11,
        title: "Hoodie",
        price: "₦7,999",
        category: "clothing",
        image: "https://via.placeholder.com/300x300.jpeg"
    },
    {
        id: 12,
        title: "Throw Pillow",
        price: "₦6,499",
        category: "home",
        image: "https://via.placeholder.com/300x300.jpeg"
    }
];

// WhatsApp Business Number (Update with your actual number)
const WHATSAPP_NUMBER = "2348012345678";

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderProducts('all');
    setupFilterButtons();
    setupMobileMenu();
});

// Render products based on category
function renderProducts(category) {
    const productGrid = document.getElementById('productGrid');
    
    let filteredProducts = products;
    if (category !== 'all') {
        filteredProducts = products.filter(product => product.category === category);
    }

    productGrid.innerHTML = '';

    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productCard.classList.add('fade-in');
        productGrid.appendChild(productCard);
    });
}

// Create individual product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card bg-white rounded-lg shadow-md overflow-hidden';
    
    const categoryLabel = {
        electronics: '📱 Electronics',
        accessories: '🎧 Accessories',
        clothing: '👕 Clothing',
        home: '🏠 Home Decor'
    };

    card.innerHTML = `
        <div class="relative overflow-hidden bg-gray-200 h-48">
            <img src="${product.image}" alt="${product.title}" class="w-full h-full object-cover hover:scale-110 transition duration-300">
            <div class="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                ${categoryLabel[product.category]}
            </div>
        </div>
        <div class="p-4">
            <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2">${product.title}</h3>
            <div class="flex justify-between items-center mb-4">
                <span class="text-2xl font-bold text-blue-600">${product.price}</span>
            </div>
            <button class="whatsapp-btn w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center space-x-2"
                    onclick="sendWhatsAppMessage('${product.title}', '${product.price}')">
                <i class="fab fa-whatsapp"></i>
                <span>Order on WhatsApp</span>
            </button>
        </div>
    `;

    return card;
}

// Send WhatsApp message
function sendWhatsAppMessage(productTitle, productPrice) {
    const message = `Hi, I'm interested in purchasing: ${productTitle} (${productPrice})`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// Setup filter buttons
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.remove('bg-blue-600', 'text-white');
                btn.classList.add('bg-white', 'text-gray-700');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            this.classList.add('bg-blue-600', 'text-white');
            this.classList.remove('bg-white', 'text-gray-700');
            
            // Filter products
            const filter = this.getAttribute('data-filter');
            renderProducts(filter);
        });
    });
}

// Setup mobile menu
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            // This is a simple toggle - you can expand this functionality
            alert('Mobile menu: Home | Categories | Contact');
        });
    }
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