// Utility Functions for IRMANUFA Website

// ========== DOM Utilities ==========
const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

// ========== Form Validation ==========
function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
            
            // Email validation
            if (input.type === 'email' && input.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value.trim())) {
                    isValid = false;
                    input.classList.add('error');
                }
            }
            
            // Phone validation
            if (input.type === 'tel' && input.value.trim()) {
                const phoneRegex = /^[0-9]{10,15}$/;
                if (!phoneRegex.test(input.value.trim())) {
                    isValid = false;
                    input.classList.add('error');
                }
            }
        }
    });
    
    return isValid;
}

// ========== Local Storage Utilities ==========
function setLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        console.error('LocalStorage error:', e);
        return false;
    }
}

function getLocalStorage(key) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (e) {
        console.error('LocalStorage error:', e);
        return null;
    }
}

function removeLocalStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (e) {
        console.error('LocalStorage error:', e);
        return false;
    }
}

// ========== Cookie Utilities ==========
function setCookie(name, value, days = 30) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
}

function getCookie(name) {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    
    return null;
}

function deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

// ========== Date Utilities ==========
function formatDate(date, format = 'dd/mm/yyyy') {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    
    return format
        .replace('dd', day)
        .replace('mm', month)
        .replace('yyyy', year);
}

function getTimeAgo(date) {
    const now = new Date();
    const diff = now - new Date(date);
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    
    if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
    if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
}

// ========== String Utilities ==========
function truncateString(str, maxLength = 100, suffix = '...') {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength) + suffix;
}

function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

function slugify(str) {
    return str
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// ========== Number Utilities ==========
function formatNumber(num, decimals = 0) {
    return num.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}

function formatCurrency(amount, currency = 'IDR') {
    return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currency
    }).format(amount);
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ========== Device Detection ==========
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function isIOS() {
    return /iPad|iPhone|iPod/i.test(navigator.userAgent);
}

function isAndroid() {
    return /Android/i.test(navigator.userAgent);
}

function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

// ========== Browser Detection ==========
function isChrome() {
    return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
}

function isFirefox() {
    return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
}

function isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

function isEdge() {
    return navigator.userAgent.includes('Edg');
}

function isIE() {
    return !!document.documentMode;
}

// ========== Scroll Utilities ==========
function scrollToElement(element, offset = 0, duration = 800) {
    const target = typeof element === 'string' ? document.querySelector(element) : element;
    if (!target) return;
    
    const start = window.pageYOffset;
    const targetPosition = target.getBoundingClientRect().top + start - offset;
    const distance = targetPosition - start;
    let startTime = null;
    
    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ========== Event Utilities ==========
function onEvent(element, event, callback, options = {}) {
    if (Array.isArray(element)) {
        element.forEach(el => el.addEventListener(event, callback, options));
    } else if (element instanceof NodeList || element instanceof HTMLCollection) {
        [...element].forEach(el => el.addEventListener(event, callback, options));
    } else {
        element.addEventListener(event, callback, options);
    }
}

function offEvent(element, event, callback, options = {}) {
    if (Array.isArray(element)) {
        element.forEach(el => el.removeEventListener(event, callback, options));
    } else if (element instanceof NodeList || element instanceof HTMLCollection) {
        [...element].forEach(el => el.removeEventListener(event, callback, options));
    } else {
        element.removeEventListener(event, callback, options);
    }
}

function onceEvent(element, event, callback) {
    const handler = function() {
        callback.apply(this, arguments);
        offEvent(element, event, handler);
    };
    onEvent(element, event, handler);
}

// ========== AJAX Utilities ==========
function fetchJSON(url, options = {}) {
    return fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        ...options
    }).then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
    });
}

function postJSON(url, data, options = {}) {
    return fetchJSON(url, {
        method: 'POST',
        body: JSON.stringify(data),
        ...options
    });
}

// ========== Image Utilities ==========
function preloadImages(images) {
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

function lazyLoadImages() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// ========== Media Query Utilities ==========
function matchMedia(query, callback) {
    const mediaQuery = window.matchMedia(query);
    
    function handleChange(e) {
        if (typeof callback === 'function') {
            callback(e.matches);
        }
    }
    
    mediaQuery.addListener(handleChange);
    handleChange(mediaQuery);
    
    return {
        removeListener: () => mediaQuery.removeListener(handleChange)
    };
}

// ========== Performance Utilities ==========
function measurePerformance(fn, name = 'Function') {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    
    console.log(`${name} took ${(end - start).toFixed(2)}ms to execute`);
    return result;
}

// ========== Export Utilities ==========
export {
    $, $$,
    validateForm,
    setLocalStorage, getLocalStorage, removeLocalStorage,
    setCookie, getCookie, deleteCookie,
    formatDate, getTimeAgo,
    truncateString, capitalizeWords, slugify,
    formatNumber, formatCurrency, randomNumber,
    isMobile, isIOS, isAndroid, isTouchDevice,
    isChrome, isFirefox, isSafari, isEdge, isIE,
    scrollToElement, isElementInViewport,
    onEvent, offEvent, onceEvent,
    fetchJSON, postJSON,
    preloadImages, lazyLoadImages,
    matchMedia,
    measurePerformance
};