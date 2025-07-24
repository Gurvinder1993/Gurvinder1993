// Shopping Cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateCartDisplay();
    }

    bindEvents() {
        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const productCard = e.target.closest('.product-card');
                this.addToCart(productCard);
            });
        });

        // Cart icon click
        document.querySelector('.cart-icon').addEventListener('click', (e) => {
            e.preventDefault();
            this.showCart();
        });

        // Modal close
        document.querySelector('.close').addEventListener('click', () => {
            this.hideCart();
        });

        // Close modal when clicking outside
        document.getElementById('cart-modal').addEventListener('click', (e) => {
            if (e.target.id === 'cart-modal') {
                this.hideCart();
            }
        });

        // Checkout button
        document.querySelector('.checkout-btn').addEventListener('click', () => {
            this.checkout();
        });
    }

    addToCart(productCard) {
        const name = productCard.querySelector('h3').textContent;
        const priceText = productCard.querySelector('.current-price').textContent;
        const price = parseFloat(priceText.replace('$', ''));
        const image = productCard.querySelector('.product-image img').src;

        // Check if item already exists
        const existingItem = this.items.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                name,
                price,
                image,
                quantity: 1
            });
        }

        this.updateCartDisplay();
        this.showAddedToCartAnimation(productCard);
    }

    removeFromCart(index) {
        this.items.splice(index, 1);
        this.updateCartDisplay();
        this.renderCartItems();
    }

    updateQuantity(index, quantity) {
        if (quantity <= 0) {
            this.removeFromCart(index);
        } else {
            this.items[index].quantity = quantity;
            this.updateCartDisplay();
            this.renderCartItems();
        }
    }

    updateCartDisplay() {
        const cartCount = document.querySelector('.cart-count');
        const cartTotal = document.getElementById('cart-total');
        
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        cartCount.textContent = totalItems;
        if (cartTotal) {
            cartTotal.textContent = totalPrice.toFixed(2);
        }
    }

    showCart() {
        this.renderCartItems();
        document.getElementById('cart-modal').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    hideCart() {
        document.getElementById('cart-modal').style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    renderCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        
        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Your cart is empty</p>';
            return;
        }

        cartItemsContainer.innerHTML = this.items.map((item, index) => `
            <div class="cart-item" style="display: flex; align-items: center; padding: 1rem; border-bottom: 1px solid #eee;">
                <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; margin-right: 1rem;">
                <div style="flex: 1;">
                    <h4 style="margin: 0 0 0.5rem 0; font-size: 1rem;">${item.name}</h4>
                    <p style="margin: 0; color: #007bff; font-weight: bold;">$${item.price.toFixed(2)}</p>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <button onclick="cart.updateQuantity(${index}, ${item.quantity - 1})" style="background: #f8f9fa; border: 1px solid #ddd; width: 30px; height: 30px; border-radius: 4px; cursor: pointer;">-</button>
                    <span style="min-width: 30px; text-align: center;">${item.quantity}</span>
                    <button onclick="cart.updateQuantity(${index}, ${item.quantity + 1})" style="background: #f8f9fa; border: 1px solid #ddd; width: 30px; height: 30px; border-radius: 4px; cursor: pointer;">+</button>
                    <button onclick="cart.removeFromCart(${index})" style="background: #dc3545; color: white; border: none; width: 30px; height: 30px; border-radius: 4px; cursor: pointer; margin-left: 0.5rem;">×</button>
                </div>
            </div>
        `).join('');
    }

    showAddedToCartAnimation(productCard) {
        const button = productCard.querySelector('.add-to-cart');
        const originalText = button.textContent;
        
        button.textContent = 'Added!';
        button.style.background = '#28a745';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '#28a745';
            button.disabled = false;
        }, 1500);
    }

    checkout() {
        if (this.items.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        alert(`Thank you for your purchase! Total: $${this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}`);
        this.items = [];
        this.updateCartDisplay();
        this.hideCart();
    }
}

// Mobile Menu functionality
class MobileMenu {
    constructor() {
        this.init();
    }

    init() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        toggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            toggle.querySelector('i').classList.toggle('fa-bars');
            toggle.querySelector('i').classList.toggle('fa-times');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                toggle.querySelector('i').classList.add('fa-bars');
                toggle.querySelector('i').classList.remove('fa-times');
            });
        });
    }
}

// Search functionality
class SearchFunction {
    constructor() {
        this.init();
    }

    init() {
        const searchInput = document.querySelector('.search-box input');
        const searchButton = document.querySelector('.search-box button');
        
        searchButton.addEventListener('click', () => {
            this.performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch(searchInput.value);
            }
        });
    }

    performSearch(query) {
        if (!query.trim()) return;
        
        // Simple search simulation
        const products = document.querySelectorAll('.product-card');
        let found = false;
        
        products.forEach(product => {
            const productName = product.querySelector('h3').textContent.toLowerCase();
            if (productName.includes(query.toLowerCase())) {
                product.scrollIntoView({ behavior: 'smooth', block: 'center' });
                product.style.border = '2px solid #007bff';
                setTimeout(() => {
                    product.style.border = 'none';
                }, 3000);
                found = true;
            }
        });
        
        if (!found) {
            alert(`No products found for "${query}"`);
        }
    }
}

// Smooth scrolling for navigation links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Newsletter subscription
class Newsletter {
    constructor() {
        this.init();
    }

    init() {
        const form = document.querySelector('.newsletter-form');
        const input = form.querySelector('input');
        const button = form.querySelector('button');
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            this.subscribe(input.value);
        });
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.subscribe(input.value);
            }
        });
    }

    subscribe(email) {
        if (!this.validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        alert('Thank you for subscribing to our newsletter!');
        document.querySelector('.newsletter-form input').value = '';
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

// Header scroll effect
class HeaderScroll {
    constructor() {
        this.init();
    }

    init() {
        const header = document.querySelector('.header');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = '#fff';
                header.style.backdropFilter = 'none';
            }
            
            // Hide header on scroll down, show on scroll up
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
}

// Product card animations
class ProductAnimations {
    constructor() {
        this.init();
    }

    init() {
        // Intersection Observer for fade-in animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        // Observe product cards and category cards
        document.querySelectorAll('.product-card, .category-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });

        // Quick view functionality
        document.querySelectorAll('.quick-view').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const productCard = e.target.closest('.product-card');
                const productName = productCard.querySelector('h3').textContent;
                alert(`Quick view for ${productName} - This would open a product detail modal in a real application.`);
            });
        });
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all classes
    window.cart = new ShoppingCart();
    new MobileMenu();
    new SearchFunction();
    new SmoothScroll();
    new Newsletter();
    new HeaderScroll();
    new ProductAnimations();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    console.log('ShopHub ecommerce website loaded successfully!');
});

// Add CSS for mobile menu
const mobileMenuCSS = `
@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        top: 80px;
        left: -100%;
        width: 100%;
        height: calc(100vh - 80px);
        background: white;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        transition: left 0.3s ease;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 999;
    }
    
    .nav-menu.active {
        left: 0;
    }
    
    .nav-menu ul {
        flex-direction: column;
        gap: 2rem;
        padding-top: 2rem;
    }
    
    .nav-menu a {
        font-size: 1.2rem;
    }
}
`;

// Inject mobile menu CSS
const style = document.createElement('style');
style.textContent = mobileMenuCSS;
document.head.appendChild(style);

