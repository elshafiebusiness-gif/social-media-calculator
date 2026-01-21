// Prices (Estimated) - يمكنك تعديل الأسعار من هنا
const prices = {
    management: {
        postPrice: 50  // سعر البوست في Management
    },
    creation: {
        postPrice: 100  // سعر البوست في Creation
    },
    reels: {
        photographer: 300,  // سعر Reel بـ Photographer
        ai: 150,           // سعر Reel بـ AI
        videoEdit: 250,    // سعر Reel بـ Video Edit
        fromPost: 100      // سعر Reel من Post
    },
    carousel: {
        pricePerSlide: 30  // سعر الـ Slide الواحد في Carousel
    }
};

// Get all elements
const serviceType = document.getElementById('serviceType');
const channelCheckboxes = document.querySelectorAll('.channel-item input[type="checkbox"]');
const postsSection = document.getElementById('postsSection');
const postsContainer = document.getElementById('postsContainer');
const reelsOptions = document.getElementById('reelsOptions');
const carouselSection = document.getElementById('carouselSection');
const totalAmount = document.getElementById('totalAmount');

// Reel checkboxes
const reelCheckboxes = {
    photographer: document.getElementById('photographer'),
    ai: document.getElementById('ai'),
    videoEdit: document.getElementById('videoEdit'),
    fromPost: document.getElementById('fromPost')
};

// Reel count inputs
const reelCounts = {
    photographer: document.getElementById('photographerCount'),
    ai: document.getElementById('aiCount'),
    videoEdit: document.getElementById('videoEditCount'),
    fromPost: document.getElementById('fromPostCount')
};

// Show/hide sections when service type changes
serviceType.addEventListener('change', function() {
    if (this.value) {
        reelsOptions.style.display = 'block';
        carouselSection.style.display = 'block';
    } else {
        reelsOptions.style.display = 'none';
        carouselSection.style.display = 'none';
    }
    calculateTotal();
});

// Handle channel selection
channelCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updatePostsSection);
});

// Update posts section based on selected channels
function updatePostsSection() {
    const selectedChannels = Array.from(channelCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

    if (selectedChannels.length > 0) {
        postsSection.style.display = 'block';
        postsContainer.innerHTML = '';

        selectedChannels.forEach(channel => {
            const channelName = document.querySelector(`label[for="${channel}"]`).textContent;
            const postDiv = document.createElement('div');
            postDiv.className = 'post-input-group';
            postDiv.innerHTML = `
                <label>${channelName} - Number of Posts</label>
                <input type="number" class="post-count" data-channel="${channel}" min="0" value="0" placeholder="0">
            `;
            postsContainer.appendChild(postDiv);
        });

        // Add event listeners to new inputs
        document.querySelectorAll('.post-count').forEach(input => {
            input.addEventListener('input', calculateTotal);
        });
    } else {
        postsSection.style.display = 'none';
        postsContainer.innerHTML = '';
    }

    calculateTotal();
}

// Handle reel checkboxes
Object.keys(reelCheckboxes).forEach(key => {
    reelCheckboxes[key].addEventListener('change', function() {
        if (this.checked) {
            reelCounts[key].style.display = 'inline-block';
            // Set default value to 1 when checked
            if (!reelCounts[key].value || reelCounts[key].value === '0') {
                reelCounts[key].value = 1;
            }
        } else {
            reelCounts[key].style.display = 'none';
            reelCounts[key].value = 0;
        }
        calculateTotal();
    });

    // Add input event listener for each reel count
    reelCounts[key].addEventListener('input', calculateTotal);
});

// Carousel inputs event listeners
document.getElementById('carouselCount').addEventListener('input', calculateTotal);
document.getElementById('slidesPerCarousel').addEventListener('input', calculateTotal);

// Calculate Total Function
function calculateTotal() {
    let total = 0;
    const service = serviceType.value;

    if (!service) {
        totalAmount.textContent = '0 EGP';
        return;
    }

    // Calculate posts price
    const postInputs = document.querySelectorAll('.post-count');
    postInputs.forEach(input => {
        const count = parseInt(input.value) || 0;
        total += count * prices[service].postPrice;
    });

    // Calculate reels price
    Object.keys(reelCheckboxes).forEach(key => {
        if (reelCheckboxes[key].checked) {
            const count = parseInt(reelCounts[key].value) || 0;
            total += count * prices.reels[key];
        }
    });

    // Calculate carousel price
    const carouselCount = parseInt(document.getElementById('carouselCount').value) || 0;
    const slidesPerCarousel = parseInt(document.getElementById('slidesPerCarousel').value) || 5;
    total += carouselCount * slidesPerCarousel * prices.carousel.pricePerSlide;

    // Update total display
    totalAmount.textContent = total.toLocaleString('en-US') + ' EGP';
}

// Initialize - set default state
document.addEventListener('DOMContentLoaded', function() {
    calculateTotal();
});
