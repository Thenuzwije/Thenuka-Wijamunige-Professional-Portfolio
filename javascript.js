
document.addEventListener('DOMContentLoaded', () => {

    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobile-menu');
    const navLinksWrapper = document.querySelector('.nav-links-wrapper');
    const navItems = document.querySelectorAll('.nav-links a');
    const themeBtn = document.getElementById('theme-toggle');
    const mybutton = document.getElementById("shortcutBtn");
    const sections = document.querySelectorAll('section, header');

    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            mybutton.classList.add("show");
        } else {
            mybutton.classList.remove("show");
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinksWrapper.classList.toggle('active');
        });
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinksWrapper.classList.remove('active');
            }
        });
    });

    
    if (themeBtn) {
        const savedTheme = localStorage.getItem('theme');
        const icon = themeBtn.querySelector('i');
        
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            icon.classList.replace('fa-moon', 'fa-sun');
        }

        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            if (document.body.classList.contains('dark-theme')) {
                icon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    
    const newRevealElements = document.querySelectorAll('.reveal');
    const newRevealOptions = {
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px"
    };
    const advancedRevealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, newRevealOptions);
    newRevealElements.forEach(el => advancedRevealOnScroll.observe(el));

    
    let slideIndex = 1;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");

    window.showSlides = function(n) {
        if (slides.length === 0) return;
        if (n > slides.length) { slideIndex = 1; }    
        if (n < 1) { slideIndex = slides.length; }
        
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active-dot", "");
        }
        
        if (slides[slideIndex - 1]) slides[slideIndex - 1].style.display = "block";
        if (dots.length > 0 && dots[slideIndex - 1]) dots[slideIndex - 1].className += " active-dot"; 
    };
    window.plusSlides = function(n) { showSlides(slideIndex += n); };
    window.currentSlide = function(n) { showSlides(slideIndex = n); };
    showSlides(slideIndex);
    setInterval(() => plusSlides(1), 8000);
    
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const slideshowContainer = document.getElementById('slideshow-container');
    
    if (fullscreenBtn && slideshowContainer) {
        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                if (slideshowContainer.requestFullscreen) {
                    slideshowContainer.requestFullscreen();
                } else if (slideshowContainer.webkitRequestFullscreen) { 
                    slideshowContainer.webkitRequestFullscreen();
                } else if (slideshowContainer.msRequestFullscreen) { 
                    slideshowContainer.msRequestFullscreen();
                }
                fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
            } else {
                if (document.exitFullscreen) document.exitFullscreen();
                fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
            }
        });
        document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement && fullscreenBtn) {
                fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (!slideshowContainer) return;
        if (e.key === 'ArrowLeft') plusSlides(-1);
        if (e.key === 'ArrowRight') plusSlides(1);
        if (e.key === 'Escape' && document.fullscreenElement) document.exitFullscreen();
    });

    
    if (mybutton) {
        mybutton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
            contactForm.reset();
        });
    }

    
    window.addEventListener('beforeprint', () => {
        if (navbar) navbar.style.display = 'none';
        if (mybutton) mybutton.style.display = 'none';
    });
    window.addEventListener('afterprint', () => {
        if (navbar) navbar.style.display = 'block';
        if (mybutton) mybutton.style.display = 'flex';

    });

    
    

    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const mainContent = document.querySelector('main');

    function clearHighlights() {
        const highlights = document.querySelectorAll('.highlight');
        highlights.forEach(span => {
            const parent = span.parentNode;
            if (parent) {
                const textNode = document.createTextNode(span.textContent);
                parent.replaceChild(textNode, span);
                parent.normalize(); 
            }
        });
    }

    function performSearch() {
        const query = searchInput.value.trim();
        clearHighlights(); 
        
        if (query === '') return; 

        const walk = document.createTreeWalker(mainContent, NodeFilter.SHOW_TEXT, null, false);
        let node;
        const nodesToProcess = [];
        while (node = walk.nextNode()) nodesToProcess.push(node);

        let foundMatch = false;
        const regex = new RegExp(`(${query})`, 'gi');
        nodesToProcess.forEach(textNode => {
            if (textNode.parentNode && !['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(textNode.parentNode.nodeName)) {
                if (regex.test(textNode.nodeValue)) {
                    const fragment = document.createDocumentFragment();
                    const parts = textNode.nodeValue.split(regex);
                    
                    parts.forEach(part => {
                        if (part.toLowerCase() === query.toLowerCase()) {
                            const span = document.createElement('span');
                            span.className = 'highlight';
                            span.textContent = part;
                            fragment.appendChild(span);
                            foundMatch = true;
                        } else if (part) {
                            fragment.appendChild(document.createTextNode(part));
                        }
                    });
                    
                    textNode.parentNode.replaceChild(fragment, textNode);
                }
            }
        });

        if (foundMatch) {
            const firstMatch = document.querySelector('.highlight');
            if (firstMatch) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const rect = firstMatch.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                window.scrollTo({
                    top: rect.top + scrollTop - navbarHeight - 20, 
                    behavior: 'smooth'
                });
            }
        } else {
            alert(`No results found for "${query}"`);
        }
    }

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); 
                performSearch();
            }
        });
        searchInput.addEventListener('input', () => {
            if (searchInput.value.trim() === '') {
                clearHighlights();
            }
        });
    }

    
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');

    if (chatbotToggle && chatbotWindow) {
        chatbotToggle.addEventListener('click', () => {
            chatbotWindow.classList.toggle('active');
        });
        chatbotClose.addEventListener('click', () => {
            chatbotWindow.classList.remove('active');
        });

        function addMessage(text, sender) {
            const msgDiv = document.createElement('div');
            msgDiv.classList.add('message');
            msgDiv.classList.add(sender === 'bot' ? 'bot-message' : 'user-message');
            msgDiv.textContent = text;
            if(sender === 'user') {
                const options = document.querySelector('.chat-options');
                if(options) options.remove();
            }
            chatbotMessages.appendChild(msgDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }

        function botReply(userText) {
            setTimeout(() => {
                let reply = "Thanks for reaching out! For direct communication, please click the WhatsApp button on the bottom left.";
                let lowerText = userText.toLowerCase();
                
                if (lowerText.includes('service') || lowerText.includes('work')) {
                    reply = "I specialize in Professional Photography, Cinematography, and comprehensive IT solutions.";
                } else if (lowerText.includes('hire') || lowerText.includes('price') || lowerText.includes('cost')) {
                    reply = "Pricing depends heavily on your specific project needs. Please contact me on WhatsApp to discuss details!";
                } else if (lowerText.includes('hi') || lowerText.includes('hello')) {
                    reply = "Hello there! How can I assist you with your creative vision today?";
                }
                addMessage(reply, 'bot');
            }, 700);
        }

        window.sendChatReply = function(text) {
            addMessage(text, 'user');
            botReply(text);
        };

        chatSend.addEventListener('click', () => {
            const text = chatInput.value.trim();
            if(text) {
                addMessage(text, 'user');
                chatInput.value = '';
                botReply(text);
            }
        });

        chatInput.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') {
                chatSend.click();
            }
        });
    }

    
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -12; 
            const rotateY = ((x - centerX) / centerX) * 12;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
            card.style.zIndex = "10";
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.zIndex = "1";
            card.style.transition = 'transform 0.5s ease, box-shadow 0.3s ease';
            setTimeout(() => {
                card.style.transition = '';
            }, 500);
        });
    });

    
    const loginBtn = document.getElementById('loginBtn');
    const authModal = document.getElementById('authModal');
    const authClose = document.querySelector('.auth-close');

    if (loginBtn && authModal) {
        loginBtn.addEventListener('click', () => {
            authModal.classList.add('active');
        });
    }

    if (authClose && authModal) {
        authClose.addEventListener('click', () => {
            authModal.classList.remove('active');
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.classList.remove('active');
        }
    });

    console.log('Portfolio loaded successfully!');
});