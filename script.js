document.addEventListener("DOMContentLoaded", function () {
// ===== DARK/LIGHT MODE =====
const themeBtn = document.getElementById("themeToggle");
if(themeBtn){
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        
        // Ganti icon tombol sesuai mode
        if(document.body.classList.contains("light-mode")){
            themeBtn.textContent = "☀️"; // Light mode aktif
        } else {
            themeBtn.textContent = "🌙"; // Dark mode aktif
        }
    });
}
    // ===== MODAL VIDEO =====
    const modal = document.getElementById("videoPlayer");
    const video = document.getElementById("video");
    const closeBtn = document.querySelector(".close");
    const cards = document.querySelectorAll(".video-card");

    // Buka modal & play video
    cards.forEach(card => {
        card.addEventListener("click", function () {
            const src = this.getAttribute("data-video");
            video.src = src;
            modal.classList.add("show");
            video.play();
        });

        // ===== AUTO THUMBNAIL =====
        const img = card.querySelector("img");
        const videoSrc = card.getAttribute("data-video");
        if(!img.src || img.src === "") {
            const tempVideo = document.createElement("video");
            tempVideo.src = videoSrc;
            tempVideo.addEventListener("loadeddata", () => {
                const canvas = document.createElement("canvas");
                canvas.width = tempVideo.videoWidth;
                canvas.height = tempVideo.videoHeight;
                canvas.getContext("2d").drawImage(tempVideo, 0, 0, canvas.width, canvas.height);
                img.src = canvas.toDataURL();
            });
        }
    });

    // Tutup modal function
    function closeVideo() {
        video.pause();
        video.currentTime = 0;
        video.src = "";
        modal.classList.remove("show");
    }

    closeBtn.addEventListener("click", closeVideo);

    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            closeVideo();
        }
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            closeVideo();
        }
    });

    // ===== DROPDOWN MENU SMOOTH + CLICK =====
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach(drop => {
        const btn = drop.querySelector(".dropbtn");
        btn.addEventListener("click", e => {
            e.preventDefault();
            drop.classList.toggle("open"); // toggle open class
        });
    });

    // Klik di luar dropdown → tutup semua submenu
    document.addEventListener("click", function(e) {
        dropdowns.forEach(drop => {
            if(!drop.contains(e.target)) {
                drop.classList.remove("open");
            }
        });
    });

    // ===== SEARCH REALTIME =====
    const searchInput = document.getElementById("searchInput");
    if(searchInput){
        searchInput.addEventListener("input", function() {
            const term = this.value.toLowerCase();
            cards.forEach(card => {
                const title = card.querySelector("p").textContent.toLowerCase();
                card.style.display = title.includes(term) ? "block" : "none";
            });
        });
    }

});