  // Menu Items Data
        const menuItems = [
            {
                id: 1,
                name: 'Margherita Pizza',
                price: 12.99,
                description: 'Fresh mozzarella, basil, and tomato sauce on crispy crust',
                image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&h=400&fit=crop'
            },
            {
                id: 2,
                name: 'Grilled Chicken Burger',
                price: 10.99,
                description: 'Juicy grilled chicken with lettuce, tomato, and special sauce',
                image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop'
            },
            {
                id: 3,
                name: 'Caesar Salad',
                price: 8.99,
                description: 'Crisp romaine lettuce with parmesan and homemade dressing',
                image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=400&fit=crop'
            },
            {
                id: 4,
                name: 'Spaghetti Carbonara',
                price: 13.99,
                description: 'Classic Italian pasta with creamy cheese and bacon sauce',
                image: 'https://www.cookingclassy.com/wp-content/uploads/2020/10/spaghetti-carbonara-01.jpg'
            },
            {
                id: 5,
                name: 'Fish & Chips',
                price: 11.99,
                description: 'Crispy battered fish served with golden fries',
                image: 'https://cdn.tasteatlas.com/Images/Dishes/1b8d6a9b836a48379c9e3045ae362ffc.jpg'
            },
            {
                id: 6,
                name: 'Chocolate Cake',
                price: 6.99,
                description: 'Rich chocolate cake with creamy frosting',
                image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=400&fit=crop'
            },
            {
                id: 7,
                name: 'Thai Green Curry',
                price: 13.99,
                description: 'Spicy green curry with chicken and fresh vegetables',
                image: 'https://vintagekitty.com/wp-content/uploads/2016/09/Green-Curry-Top-Down-Web-500x500.jpg'
            },
            {
                id: 8,
                name: 'Vegetarian Tacos',
                price: 9.99,
                description: 'Three soft tacos with beans, veggies, and fresh salsa',
                image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&h=400&fit=crop'
            },
            {
                id: 9,
                name: 'Sushi Platter',
                price: 19.99,
                description: 'Assorted fresh sushi rolls with salmon and vegetables',
                image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=400&fit=crop'
            },
                {
                    id: 10,
                    name: 'Pasta Flora',
                    price: 20.99,
                    description: 'Assorted fresh sushi rolls with salmon and vegetables',
                    image: 'https://masandpas.com/wp-content/uploads/2020/04/Pasta-flora-easy-jam-tart-squares-easy-kids-baking-recipe-pasta-fiorla-48-710x470.jpg'
                },


                 {
                    id: 11,
                    name: 'Mallow',
                    price: 18.99,
                    description: 'Assorted fresh sushi rolls with salmon and vegetables',
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsvWTng9Dgh4QomBUFwIQbPUolsB-7noP1aA&s=10'
                },

                 {
                    id: 12,
                    name: 'Macaroni in Bechamel',
                    price: 18.99,
                    description: 'Classic mac and cheese with a creamy bechamel sauce',
                    image: 'https://img.youm7.com/large/20161215120638638.jpg'
                },





            ];
        let cart = [];

        // Initialize menu on page load
        document.addEventListener('DOMContentLoaded', () => {
            renderMenu();
            setupCartModal();

            // Hamburger Menu Toggle (bind after DOM is ready)
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');

            if (hamburger && navLinks) {
                hamburger.addEventListener('click', () => {
                    hamburger.classList.toggle('active');
                    navLinks.classList.toggle('active');
                });

                // Close menu when link is clicked
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.addEventListener('click', () => {
                        hamburger.classList.remove('active');
                        navLinks.classList.remove('active');
                    });
                });
            }
        });

        // Render Menu Items
        function renderMenu() {
            const menuGrid = document.getElementById('menuGrid');
            menuGrid.innerHTML = menuItems.map(item => `
                <div class="menu-item">
                    <div class="menu-item-image-wrap">
                        <img src="${item.image}" alt="${item.name}" class="menu-item-image">
                        <div class="price-badge">$${item.price.toFixed(2)}</div>
                    </div>
                    <div class="menu-item-content">
                        <div class="menu-item-header">
                            <h3>${item.name}</h3>
                        </div>
                        <p class="menu-item-description">${item.description}</p>
                        <div class="menu-item-footer">
                            <div class="quantity-selector">
                                <button onclick="decreaseQty(${item.id})">−</button>
                                <input type="number" id="qty-${item.id}" value="1" min="1" readonly>
                                <button onclick="increaseQty(${item.id})">+</button>
                            </div>
                            <button class="add-to-cart-btn" onclick="addToCart(${item.id})">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Quantity Controls
        function increaseQty(itemId) {
            const input = document.getElementById(`qty-${itemId}`);
            input.value = parseInt(input.value) + 1;
        }

        function decreaseQty(itemId) {
            const input = document.getElementById(`qty-${itemId}`);
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
            }
        }

        // Add to Cart
        function addToCart(itemId) {
            const quantity = parseInt(document.getElementById(`qty-${itemId}`).value);
            const item = menuItems.find(i => i.id === itemId);

            const existingItem = cart.find(c => c.id === itemId);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({ ...item, quantity });
            }

            updateCartCount();
            showNotification(`${item.name} added to cart!`);
            document.getElementById(`qty-${itemId}`).value = 1;
        }

        // Update Cart Count Badge
        function updateCartCount() {
            const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
            document.querySelector('.cart-count').textContent = totalQty;
        }

        // Setup Cart Modal
        function setupCartModal() {
            const modal = document.getElementById('cartModal');
            const closeBtn = document.querySelector('.close');
            const cartIcon = document.querySelector('.cart-icon');

            cartIcon.addEventListener('click', (e) => {
                e.preventDefault();
                openCart();
            });

            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });

            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }

        // Open Cart Modal
        function openCart() {
            const modal = document.getElementById('cartModal');
            renderCart();
            modal.style.display = 'block';
        }

        // Render Cart Items
        function renderCart() {
            const cartItemsDiv = document.getElementById('cartItems');
            const cartSummary = document.getElementById('cartSummary');

            if (cart.length === 0) {
                cartItemsDiv.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
                cartSummary.style.display = 'none';
                return;
            }

            cartItemsDiv.innerHTML = cart.map((item, index) => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div style="font-size: 0.9rem; color: #666;">
                            ${item.quantity} x $${item.price.toFixed(2)} = <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('');

            // Calculate totals
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const deliveryFee = 2.99;
            const total = subtotal + deliveryFee;

            document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
            document.getElementById('total').textContent = `$${total.toFixed(2)}`;

            cartSummary.style.display = 'block';
        }

        // Remove from Cart
        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCartCount();
            renderCart();
        }

        // Checkout
        function checkout() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            alert('🎉 Order placed successfully!\n\nThank you for your order. Your food will be delivered soon!');
            cart = [];
            updateCartCount();
            document.getElementById('cartModal').style.display = 'none';
            renderMenu();
        }

        // Notification
        function showNotification(message) {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 80px;
                right: 20px;
                background: #4CAF50;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 4px;
                z-index: 3000;
                animation: slideIn 0.3s ease;
            `;
            notification.textContent = message;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 2000);
        }

        

        // Smooth scroll function
        function scrollToSection(event) {
                    event.preventDefault();
                    const anchor = event.target.closest('a');
                    if (!anchor) return;
                    const target = anchor.getAttribute('href');
                    const section = document.querySelector(target);

                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth' });
                        const hamburger = document.querySelector('.hamburger');
                        const navLinks = document.querySelector('.nav-links');
                        if (hamburger && navLinks) {
                            hamburger.classList.remove('active');
                            navLinks.classList.remove('active');
                        }
                    }
        }

        // Add animations styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
 
         document.head.appendChild(style);