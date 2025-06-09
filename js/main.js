// Main JavaScript File for IRMANUFA Website

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  initPreloader();
  initMobileMenu();
  initScrollSpy();
  initBackToTop();
  initSmoothScroll();
  initCurrentYear();
  loadPrograms();
  loadGallery();
  loadTeam();
  loadBlogPosts();
  loadPrayerTimes();
  initDonationForm();
  initContactForm();
  initNewsletterForm();
  initAnimations();
});

// ========== Preloader ==========
function initPreloader() {
  const preloader = document.querySelector(".preloader");

  // Show preloader
  preloader.style.display = "flex";

  // Hide preloader when page is loaded
  window.addEventListener("load", function () {
    setTimeout(function () {
      preloader.style.opacity = "0";
      preloader.style.visibility = "hidden";

      // Remove preloader from DOM after animation
      setTimeout(function () {
        preloader.remove();
      }, 500);
    }, 1000);
  });
}

// ========== Mobile Menu ==========
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navMenu = document.querySelector(".nav-menu");

  mobileMenuBtn.addEventListener("click", function () {
    this.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  });

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenuBtn.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });
  });
}

// ========== Scroll Spy ==========
function initScrollSpy() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Header scroll effect
  const header = document.getElementById("header");
  window.addEventListener("scroll", function () {
    if (this.scrollY >= 100) {
      header.classList.add("header-scroll");
    } else {
      header.classList.remove("header-scroll");
    }
  });
}

// ========== Back to Top Button ==========
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", function () {
    if (this.scrollY >= 500) {
      backToTopBtn.classList.add("active");
    } else {
      backToTopBtn.classList.remove("active");
    }
  });

  backToTopBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ========== Smooth Scroll ==========
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href*="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.getElementById("header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// ========== Current Year ==========
function initCurrentYear() {
  const yearElements = document.querySelectorAll(".current-year");
  const currentYear = new Date().getFullYear();

  yearElements.forEach((element) => {
    element.textContent = currentYear;
  });
}

// ========== Load Programs ==========
function loadPrograms() {
  const programsGrid = document.querySelector(".programs-grid");

  if (!programsGrid) return;

  // Sample program data (in a real app, this would come from an API)
  const programs = [
    {
      id: 1,
      title: " Kegiatan Rutinan Marhabanan",
      description:
        "Kajian mingguan untuk remaja dengan tema-tema aktual dan relevan dengan kehidupan sehari-hari.",
      image: "assets/programs/marhabanan.jpg",
      schedule: "Setiap Jumat",
      time: "20:00 - 21:00 WIB",
    },
    {
      id: 2,
      title: "Kegiatan Rapat Evaluasi Tahunan ",
      description:
        "Program pembinaancKarakter Anggota terhadap progres kegiatan Satu Tahun kebelakang.",
      image: "assets/programs/Evaluasi2.jpg",
      schedule: "Setiap Bulan Juni",
      time: "19:15 - 20:45 WIB",
    },
    {
      id: 3,
      title: "Kegiatan Penyambutan Bulan Suci Ramadhan ",
      description:
        "Kegiatan tahunan untuk memberikan kontribusi positif terhadap masyarakat.",
      image: "assets/programs/bulansuci.jpg",
      schedule: "Tahunan ",
      time: "20:00 - 00:00 WIB",
    },
    {
      id: 4,
      title: "Bakti Sosial",
      description:
        "Aksi sosial membantu masyarakat sekitar sebagai bentuk kepedulian sosial.",
      image: "assets/programs/baksos2.jpg",
      schedule: "Tiap Bulan& Tiap Tahun",
      time: "19:00 - 22:00 WIB",
    },
    {
      id: 5,
      title: "Kaderisasi",
      description:
        "Program intensif untuk memperdalam ilmu agama dan ilmu keorganisasian.",
      image: "assets/programs/kaderisasi2.jpg",
      schedule: "Liburan Sekolah",
      time: "08:00 - 15:00 WIB",
    },
    {
      id: 6,
      title: "Baksos Mushola",
      description:
        "Kegiatan Yang diusung oleh divisi HUMAS Irmanufa sebagai bentuk wujud kepudulian terhadap lingkungan sekitar.",
      image: "assets/programs/mushola.jpg",
      schedule: "Setiap Minggu",
      time: "10:00 - 12:00 WIB",
    },
  ];

  // Clear loading state
  programsGrid.innerHTML = "";

  // Add programs to the grid
  programs.forEach((program) => {
    const programCard = document.createElement("div");
    programCard.className = "program-card animate fade-in-up";
    programCard.innerHTML = `
            <div class="program-img">
                <img src="${program.image}" alt="${program.title}">
            </div>
            <div class="program-content">
                <h3>${program.title}</h3>
                <p>${program.description}</p>
                <div class="program-meta">
                    <span><i class="far fa-calendar-alt"></i> ${program.schedule}</span>
                    <span><i class="far fa-clock"></i> ${program.time}</span>
                </div>
            </div>
        `;

    programsGrid.appendChild(programCard);
  });
}

// ========== Load Gallery ==========
function loadGallery() {
  const galleryContainer = document.querySelector(".gallery-container");

  if (!galleryContainer) return;

  // Sample gallery data (in a real app, this would come from an API)
  const galleryItems = [
    { id: 1, image: "assets/gallery/gallery-1.jpg" },
    { id: 2, image: "assets/gallery/gallery-2.jpg" },
    { id: 3, image: "assets/gallery/gallery-3.jpg" },
    { id: 4, image: "assets/gallery/gallery-4.jpg" },
    { id: 5, image: "assets/gallery/gallery-5.jpg" },
    { id: 6, image: "assets/gallery/gallery-6.jpg" },
    { id: 7, image: "assets/gallery/gallery-7.jpg" },
    { id: 8, image: "assets/gallery/gallery-8.jpg" },
    { id: 9, image: "assets/gallery/gallery-9.jpg" },
    { id: 10, image: "assets/gallery/gallery-10.jpg" },
    { id: 11, image: "assets/gallery/gallery-11.jpg" },
    { id: 12, image: "assets/gallery/gallery-12.jpg" },
  ];

  // Clear loading state
  galleryContainer.innerHTML = "";

  // Add gallery items
  galleryItems.forEach((item) => {
    const galleryItem = document.createElement("div");
    galleryItem.className = "gallery-item animate fade-in";
    galleryItem.innerHTML = `
            <img src="${item.image}" alt="Gallery Item ${item.id}">
            <div class="overlay">
                <i class="fas fa-search-plus"></i>
            </div>
        `;

    galleryContainer.appendChild(galleryItem);
  });

  // Initialize lightbox (you would need a lightbox library for full functionality)
  initLightbox();
}

function initLightbox() {
  // This is a simplified version - in a real app, you'd use a lightbox library like Fancybox or Lightbox2
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item) => {
    item.addEventListener("click", function () {
      const imgSrc = this.querySelector("img").getAttribute("src");
      showLightbox(imgSrc);
    });
  });
}

function showLightbox(imgSrc) {
  // Create lightbox overlay
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${imgSrc}" alt="Lightbox Image">
            <button class="lightbox-close">&times;</button>
        </div>
    `;

  // Add to body
  document.body.appendChild(lightbox);
  document.body.classList.add("no-scroll");

  // Close lightbox
  const closeBtn = lightbox.querySelector(".lightbox-close");
  closeBtn.addEventListener("click", function () {
    lightbox.remove();
    document.body.classList.remove("no-scroll");
  });

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
      lightbox.remove();
      document.body.classList.remove("no-scroll");
    }
  });
}

// ========== Load Team ==========
function loadTeam() {
  const teamGrid = document.querySelector(".team-grid");

  if (!teamGrid) return;

  // Sample team data (in a real app, this would come from an API)
  const teamMembers = [
    {
      id: 1,
      name: "Agung Ubaidillah",
      position: "Ketua Umum",
      image: "assets/team/team-1.jpg",
      social: {
        facebook: "#",
        instagram: "#",
        twitter: "#",
        whatsapp: "#",
      },
    },
    {
      id: 2,
      name: "Sukran Alramadhana",
      position: "Wakil Ketua",
      image: "assets/team/team-2.jpg",
      social: {
        facebook: "#",
        instagram: "#",
        twitter: "#",
        whatsapp: "#",
      },
    },
    {
      id: 3,
      name: "Salwa Revtiani",
      position: "Sekretaris Umum",
      image: "assets/team/team-3.jpg",
      social: {
        facebook: "#",
        instagram: "#",
        twitter: "#",
        whatsapp: "#",
      },
    },
    {
      id: 4,
      name: "Indana Zulfa",
      position: "Bendahara Umum",
      image: "assets/team/team-4.jpg",
      social: {
        facebook: "#",
        instagram: "#",
        twitter: "#",
        whatsapp: "#",
      },
    },
    {
      id: 5,
      name: "Rafiq Wahid Alifudin",
      position: "Ketua Divisi Keagamaan Dan Kemasjidan",
      image: "assets/team/team-5.jpg",
      social: {
        facebook: "#",
        instagram: "#",
        twitter: "#",
        whatsapp: "#",
      },
    },
    {
      id: 6,
      name: "Dedi Juwanto ",
      position: "Ketua Divisi Humas",
      image: "assets/team/team-6.jpg",
      social: {
        facebook: "#",
        instagram: "#",
        twitter: "#",
        whatsapp: "#",
      },
    },

    {
      id: 7,
      name: "Mohammad Rizky",
      position: "Ketua Kesekretariatan",
      image: "assets/team/team-7.jpg",
      social: {
        facebook: "#",
        instagram: "#",
        twitter: "#",
        whatsapp: "#",
      },
    },

    {
      id: 8,
      name: "Mohammad Arif Hidayat",
      position: "Ketua Divisi Pengembangan Sumber Daya Manusia",
      image: "assets/team/team-8.jpg",
      social: {
        facebook: "#",
        instagram: "#",
        twitter: "#",
        whatsapp: "#",
      },
    },

    {
      id: 9,
      name: "Devita Agustin ",
      position: "Ketua Divisi Peringatan Hari Besar Islam",
      image: "assets/team/team-9.jpg",
      social: {
        facebook: "#",
        instagram: "#",
        twitter: "#",
        whatsapp: "#",
      },
    },
    {
      id: 10,
      name: "Nazwa Aulia Rakhmania Ruhli Saputri",
      position: "Ketua Divisi Publikasi Dekorasi Dan Dokumentasi",
      image: "assets/team/team-10.jpg",
      social: {
        facebook: "#",
        instagram: "#",
        twitter: "#",
        whatsapp: "#",
      },
    },
  ];

  // Clear loading state
  teamGrid.innerHTML = "";

  // Add team members
  teamMembers.forEach((member) => {
    const teamMember = document.createElement("div");
    teamMember.className = "team-member animate fade-in-up";
    teamMember.innerHTML = `
            <div class="member-img">
                <img src="${member.image}" alt="${member.name}">
            </div>
            <div class="member-info">
                <h3>${member.name}</h3>
                <p>${member.position}</p>
                <div class="member-social">
                    <a href="${member.social.facebook}" target="_blank"><i class="fab fa-facebook-f"></i></a>
                    <a href="${member.social.instagram}" target="_blank"><i class="fab fa-instagram"></i></a>
                    <a href="${member.social.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>
                    <a href="${member.social.whatsapp}" target="_blank"><i class="fab fa-whatsapp"></i></a>
                </div>
            </div>
        `;

    teamGrid.appendChild(teamMember);
  });
}

// ========== Load Blog Posts ==========
function loadBlogPosts() {
  const blogGrid = document.querySelector(".blog-grid");

  if (!blogGrid) return;

  // Sample blog data (in a real app, this would come from an API)
  const blogPosts = [
    {
      id: 1,
      title: "Pentingnya Menjaga Ukhuwah Islamiyah di Kalangan Remaja",
      excerpt:
        "Ukhuwah Islamiyah adalah persaudaraan yang terbentuk karena kesamaan iman dan tauhid kepada Allah SWT...",
      image: "assets/blog/blog-1.jpg",
      date: "9 Juni 2025",
      author: "Dvisi Pubdekdok Irmanufa",
      category: "Artikel",
      url: "https://www.umm.ac.id/id/arsip-koran/seputar-papua/opini-mengamalkan-ukhuwah-islamiyah-dikalangan-remaja-milenial-era-modern.html",
    },
    {
      id: 2,
      title: "Tips Mengatur Waktu antara Sekolah dan Kegiatan Masjid",
      excerpt:
        "Sebagai remaja muslim yang aktif, seringkali kita dihadapkan pada tantangan membagi waktu antara...",
      image: "assets/blog/blog-2.jpg",
      date: "9 Juni 2025",
      author: "Divisi Pubdekdok Irmanufa",
      category: "Tips",
      url: "https://dkm.or.id/blog/tips-mengelola-waktu-dalam-pendidikan-islam-masjid.html",
    },
    {
      id: 3,
      title: "Laporan Kegiatan Irmanufa ",
      excerpt:
        "Alhamdulillah, pada  tanggal 21, IRMANUFA telah melaksanakan kegiatan bakti sosial..mengedarkan surat resmi kegiatan .",
      image: "assets/blog/blog-3.jpg",
      date: "21 April 2025",
      author: "Divisi Keagamaan Dan Kemasjidan Iramnufa",
      category: "Laporan",
      url: "https://drive.google.com/file/d/1cVISQgTnnnP7dkSScgUwfeZrUszj6ZGq/view?usp=drive_link",
    },
  ];

  // Clear loading state
  blogGrid.innerHTML = "";

  // Add blog posts
  blogPosts.forEach((post) => {
    const blogCard = document.createElement("div");
    blogCard.className = "blog-card animate fade-in-up";
    blogCard.innerHTML = `
            <div class="blog-img">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span><i class="far fa-calendar-alt"></i> ${post.date}</span>
                    <span><i class="far fa-user"></i> ${post.author}</span>
                </div>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <a href="${post.url}" class="read-more">Baca Selengkapnya <i class="fas fa-arrow-right"></i></a>
            </div>
        `;

    blogGrid.appendChild(blogCard);
  });
}

// ========== Load Prayer Times ==========
function loadPrayerTimes() {
  const prayerTimesContainer = document.querySelector(".prayer-times");

  if (!prayerTimesContainer) return;

  // Sample prayer times data (in a real app, this would come from an API)
  const prayerTimes = [
    { id: 1, name: "Subuh", time: "04:30", icon: "fas fa-moon", active: false },
    { id: 2, name: "Dzuhur", time: "12:00", icon: "fas fa-sun", active: true },
    { id: 3, name: "Ashar", time: "15:15", icon: "fas fa-sun", active: false },
    {
      id: 4,
      name: "Maghrib",
      time: "18:00",
      icon: "fas fa-sun",
      active: false,
    },
    { id: 5, name: "Isya", time: "19:15", icon: "fas fa-moon", active: false },
  ];

  // Clear loading state
  prayerTimesContainer.innerHTML = "";

  // Add prayer times
  prayerTimes.forEach((prayer) => {
    const prayerTime = document.createElement("div");
    prayerTime.className = `prayer-time animate fade-in ${
      prayer.active ? "active" : ""
    }`;
    prayerTime.innerHTML = `
            <i class="${prayer.icon}"></i>
            <h4>${prayer.name}</h4>
            <p>${prayer.time}</p>
        `;

    prayerTimesContainer.appendChild(prayerTime);
  });
}

// ========== Donation Form ==========
function initDonationForm() {
  const donationForm = document.getElementById("donationForm");

  if (!donationForm) return;

  // Amount option buttons
  const amountOptions = document.querySelectorAll(".amount-option");
  const amountInput = document.getElementById("donationAmount");

  amountOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // Remove active class from all options
      amountOptions.forEach((opt) => opt.classList.remove("active"));

      // Add active class to clicked option
      this.classList.add("active");

      // Set the amount input value
      amountInput.value = this.getAttribute("data-amount");
    });
  });

  // Form submission
  donationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    // Simple validation
    if (!data.amount || isNaN(data.amount) || parseFloat(data.amount) <= 0) {
      alert("Silahkan masukkan jumlah donasi yang valid");
      return;
    }

    if (!data.name || !data.email || !data.phone) {
      alert("Silahkan lengkapi semua field yang wajib diisi");
      return;
    }

    // In a real app, you would send this data to your backend
    console.log("Donation data:", data);

    // Show success message
    alert(
      `Terima kasih atas donasi Anda sebesar Rp ${parseInt(
        data.amount
      ).toLocaleString(
        "id-ID"
      )}. Kami akan menghubungi Anda melalui WhatsApp untuk konfirmasi lebih lanjut.`
    );

    // Reset form
    this.reset();
    amountOptions.forEach((opt) => opt.classList.remove("active"));
  });
}

// ========== Contact Form ==========
function initContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    // Simple validation
    if (
      !data.name ||
      !data.email ||
      !data.phone ||
      !data.subject ||
      !data.message
    ) {
      alert("Silahkan lengkapi semua field yang wajib diisi");
      return;
    }

    // In a real app, you would send this data to your backend
    console.log("Contact data:", data);

    // Show success message
    alert(
      `Terima kasih ${data.name}, pesan Anda telah berhasil dikirim. Kami akan menghubungi Anda segera.`
    );

    // Reset form
    this.reset();
  });
}

// ========== Newsletter Form ==========
function initNewsletterForm() {
  const newsletterForm = document.getElementById("newsletterForm");

  if (!newsletterForm) return;

  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = this.querySelector('input[type="email"]').value;

    // Simple validation
    if (!email || !email.includes("@")) {
      alert("Silahkan masukkan alamat email yang valid");
      return;
    }

    // In a real app, you would send this data to your backend
    console.log("Newsletter subscription:", email);

    // Show success message
    alert(
      `Terima kasih telah berlangganan newsletter kami. Email konfirmasi telah dikirim ke ${email}.`
    );

    // Reset form
    this.reset();
  });
}

// ========== Animations ==========
function initAnimations() {
  // Initialize animations on scroll
  const animateElements = document.querySelectorAll(".animate");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("aos-animate");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  animateElements.forEach((element) => {
    observer.observe(element);
  });

  // Add animation delays
  const programCards = document.querySelectorAll(".program-card");
  const teamMembers = document.querySelectorAll(".team-member");
  const blogCards = document.querySelectorAll(".blog-card");

  programCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });

  teamMembers.forEach((member, index) => {
    member.style.animationDelay = `${index * 0.1}s`;
  });

  blogCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
}
