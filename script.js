const prices = {
    management: { postPrice: 50 },
    creation: { postPrice: 100 },
    reels: {
        photographer: 300,
        ai: 150,
        videoEdit: 250,
        fromPost: 100
    },
    carousel: { pricePerSlide: 30 }
};

const serviceType = document.getElementById('serviceType');
const channelCheckboxes = document.querySelectorAll('.channel-item input');
const postsSection = document.getElementById('postsSection');
const postsContainer = document.getElementById('postsContainer');
const reelsOptions = document.getElementById('reelsOptions');
const carouselSection = document.getElementById('carouselSection');
const totalAmount = document.getElementById('totalAmount');

serviceType.addEventListener('change', () => {
    reelsOptions.style.display = serviceType.value ? 'block' : 'none';
    carouselSection.style.display = serviceType.value ? 'block' : 'none';
    calculateTotal();
});

channelCheckboxes.forEach(cb => cb.addEventListener('change', updatePostsSection));

function updatePostsSection() {
    const selected = [...channelCheckboxes].filter(c => c.checked).map(c => c.value);
    postsSection.style.display = selected.length ? 'block' : 'none';
    postsContainer.innerHTML = '';

    selected.forEach(ch => {
        const div = document.createElement('div');
        div.innerHTML = `<label>${ch}</label><input type="number" class="post-count" min="0" value="0">`;
        postsContainer.appendChild(div);
    });

    document.querySelectorAll('.post-count').forEach(i => i.addEventListener('input', calculateTotal));
    calculateTotal();
}

function calculateTotal() {
    let total = 0;
    const service = serviceType.value;
    if (!service) return totalAmount.textContent = "0 EGP";

    document.querySelectorAll('.post-count').forEach(i => {
        total += (parseInt(i.value) || 0) * prices[service].postPrice;
    });

    totalAmount.textContent = total + " EGP";
}

