// Product Data Array
const products = [
    {
        id: 1,
        name: "Premium Student ID Card",
        category: "SCHOOL ID CARD",
        price: "₹45 / pc",
        material: "PVC Glossy/Matte",
        minQty: "50 Pcs",
        about: "High-quality double-sided printed PVC ID cards. Scratch resistant and durable. Includes standard lanyard.",
        image: "https://placehold.co/400x300/1e3a8a/ffffff?text=School+ID+Card"
    },
    {
        id: 2,
        name: "Custom Acrylic Key Ring",
        category: "KEY RING",
        price: "₹25 / pc",
        material: "Transparent Acrylic",
        minQty: "100 Pcs",
        about: "Laser-cut custom shape acrylic keyrings with double-sided school/company logo printing.",
        image: "https://placehold.co/400x300/eab308/ffffff?text=Acrylic+Key+Ring"
    },
    {
        id: 3,
        name: "House Uniform T-Shirt",
        category: "TSHIRT CUSTOMISE",
        price: "₹220 / pc",
        material: "100% Cotton / Dry-Fit",
        minQty: "30 Pcs",
        about: "Comfortable, breathable t-shirts for school houses or events. Screen print or embroidery options available.",
        image: "https://placehold.co/400x300/dc2626/ffffff?text=Custom+T-Shirt"
    },
    {
        id: 4,
        name: "Premium Woven School Tie",
        category: "TIE",
        price: "₹85 / pc",
        material: "Polyester Silk",
        minQty: "50 Pcs",
        about: "Rich quality woven ties with custom school emblem. Available in standard and slim fits.",
        image: "https://placehold.co/400x300/166534/ffffff?text=School+Tie"
    },
    {
        id: 5,
        name: "Adjustable Uniform Belt",
        category: "BELT",
        price: "₹90 / pc",
        material: "Heavy-Duty Canvas/Nylon",
        minQty: "50 Pcs",
        about: "Strong canvas belts with adjustable metal buckles. Logo embossed directly on the buckle.",
        image: "https://placehold.co/400x300/475569/ffffff?text=Uniform+Belt"
    },
    {
        id: 6,
        name: "Woven Clothes Label",
        category: "CLOTHES LABEL",
        price: "₹5 / pc",
        material: "Damask Woven Fabric",
        minQty: "500 Pcs",
        about: "Wash-proof labels to stitch onto school uniforms, sweaters, and blazers. Soft and non-itchy.",
        image: "https://placehold.co/400x300/6b21a8/ffffff?text=Clothes+Label"
    },
    {
        id: 7,
        name: "Staff Smart ID Card (RFID)",
        category: "SCHOOL ID CARD",
        price: "₹120 / pc",
        material: "NFC/RFID Enabled PVC",
        minQty: "10 Pcs",
        about: "Smart ID cards for staff biometric attendance systems and access control. High security.",
        image: "https://placehold.co/400x300/0f766e/ffffff?text=Smart+ID+Card"
    },
    {
        id: 8,
        name: "Metal Sublimation Keychain",
        category: "KEY RING",
        price: "₹45 / pc",
        material: "Alloy Metal",
        minQty: "50 Pcs",
        about: "Premium metal keychains with vibrant, permanent sublimation print. Perfect for corporate gifting.",
        image: "https://placehold.co/400x300/b91c1c/ffffff?text=Metal+Key+Ring"
    }
];

// Elements
const productGrid = document.getElementById('productGrid');
const noResults = document.getElementById('noResults');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const mobileSearchInput = document.getElementById('mobileSearchInput');

// Function to render products
function renderProducts(items) {
    productGrid.innerHTML = ""; // Clear existing grid
    
    if (items.length === 0) {
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
        items.forEach(product => {
            const card = document.createElement('div');
            card.className = "product-card bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col";
            
            card.innerHTML = `
                <div class="relative">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
                    <span class="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide shadow">${product.category}</span>
                </div>
                <div class="p-5 flex-1 flex flex-col">
                    <h3 class="text-lg font-bold text-gray-900 mb-1">${product.name}</h3>
                    <p class="text-xs text-gray-500 mb-4 line-clamp-2">${product.about}</p>
                    
                    <div class="bg-gray-50 rounded-lg p-3 mb-4 text-xs text-gray-700 flex-1 border border-gray-100">
                        <div class="flex justify-between mb-1">
                            <span class="font-semibold text-gray-500">Material:</span>
                            <span class="font-medium text-right">${product.material}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-semibold text-gray-500">Min. Qty:</span>
                            <span class="font-medium text-right">${product.minQty}</span>
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                        <div>
                            <p class="text-xs text-gray-400 font-semibold">Starting at</p>
                            <p class="text-lg font-extrabold text-blue-700">${product.price}</p>
                        </div>
                        <a href="https://wa.me/919851579961?text=Hi NG PRINT, I want to inquire about: ${product.name}" target="_blank" class="bg-green-500 hover:bg-green-600 text-white p-2.5 rounded-lg transition shadow-md hover:shadow-lg">
                            <i class="fa-brands fa-whatsapp text-lg"></i>
                        </a>
                    </div>
                </div>
            `;
            productGrid.appendChild(card);
        });
    }
}

// Initial Render
renderProducts(products);

// Filter by Category
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Handle Active Class Styling
        filterBtns.forEach(b => {
            b.classList.remove('bg-blue-900', 'text-white');
            b.classList.add('bg-white', 'text-gray-600');
        });
        btn.classList.remove('bg-white', 'text-gray-600');
        btn.classList.add('bg-blue-900', 'text-white');

        // Filter Logic
        const category = btn.getAttribute('data-category');
        if (category === "ALL") {
            renderProducts(products);
        } else {
            const filtered = products.filter(p => p.category === category);
            renderProducts(filtered);
        }
    });
});

// Search Functionality
function handleSearch(e) {
    const term = e.target.value.toLowerCase();
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.category.toLowerCase().includes(term) ||
        p.about.toLowerCase().includes(term)
    );
    
    // Reset category buttons when searching
    filterBtns.forEach(b => {
        b.classList.remove('bg-blue-900', 'text-white');
        b.classList.add('bg-white', 'text-gray-600');
    });
    filterBtns[0].classList.add('bg-blue-900', 'text-white'); // Make "ALL" active visually
    
    renderProducts(filtered);
}

searchInput.addEventListener('input', handleSearch);
if (mobileSearchInput) {
    mobileSearchInput.addEventListener('input', handleSearch);
}
