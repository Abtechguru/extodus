
   
        let currentImageIndex = 0;
        const images = document.querySelectorAll('.carousel-image');

        function changeImage() {
            images[currentImageIndex].classList.remove('active');
            currentImageIndex = (currentImageIndex + 1) % images.length;
            images[currentImageIndex].classList.add('active');
        }

        setInterval(changeImage, 2000);

        // Handle form submission
        document.getElementById("carBookingForm").addEventListener("submit", function(event) {
            event.preventDefault();

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;
            const pickup = document.getElementById("pickup").value;
            const dropoff = document.getElementById("dropoff").value;
            const car = document.getElementById("carSelection").value;
            const requests = document.getElementById("requests").value;

            // Construct WhatsApp message
            const message = `Hello, I would like to book a car with the following details:
            %0AName: ${name}
            %0AEmail: ${email}
            %0APhone: ${phone}
            %0APickup: ${pickup}
            %0ADrop-off: ${dropoff}
            %0ACar Model: ${car}
            %0ASpecial Requests: ${requests}`;

            // Redirect to WhatsApp
            window.open(`https://wa.me/+2348123646242?text=${message}`, '_blank');
        });

        // Initialize Google Map
        function initMap() {
            // Company Coordinates (Replace with actual location)
            const companyLocation = { lat: 6.5244, lng: 3.3792 };

            // Map Options
            const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 15,
                center: companyLocation,
            });

            // Marker
            const marker = new google.maps.Marker({
                position: companyLocation,
                map: map,
                title: "EXTODUS CAR HIRE"
            });
        }

        // Responsive Navigation
        const mobileMenu = document.getElementById("mobile-menu");
        const navbarMenu = document.querySelector(".navbar-menu");

        mobileMenu.addEventListener("click", () => {
            mobileMenu.classList.toggle("is-active");
            navbarMenu.classList.toggle("active");
        });
    
