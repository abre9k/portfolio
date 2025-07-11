document.addEventListener("DOMContentLoaded", () => {
        const tiles = document.querySelectorAll(".tile:not(.intro-tile)");
        const backToTopButton = document.getElementById("backToTop");
        const menuToggle = document.getElementById("menu-toggle");
        const menuList = document.getElementById("menu-list");

        // Tile Hover-Effekt
        tiles.forEach(tile => {
            tile.addEventListener("mouseenter", () => {
                tile.classList.add("hovered");
            });
            tile.addEventListener("mouseleave", () => {
                tile.classList.remove("hovered");
            });
        });

        // Tile Hover beim Scrollen prüfen (Maus über Tile)
        window.addEventListener("scroll", () => {
            tiles.forEach(tile => {
                const rect = tile.getBoundingClientRect();
                const x = window.event?.clientX;
                const y = window.event?.clientY;
                if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                    tile.classList.add("hovered");
                }
            });

            // Back-to-top Button anzeigen/ausblenden
            if (window.scrollY > 500) {
                backToTopButton.classList.add("visible");
            } else {
                backToTopButton.classList.remove("visible");
            }
        });

        // Back-to-top Button Klick
        backToTopButton.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        // Hamburger Menü Toggle
        menuToggle.addEventListener("click", () => {
            menuList.classList.toggle("hidden");
        });

        // Klick außerhalb schließt das Hamburger Menü
        document.addEventListener("click", (event) => {
            if (!menuList.classList.contains("hidden")) {
                if (!menuList.contains(event.target) && !menuToggle.contains(event.target)) {
                    menuList.classList.add("hidden");
                }
            }
        });
        // Seite springt zurück nach oben beim Neuladen
        window.addEventListener('load', () => {
            setTimeout(() => window.scrollTo(0, 0), 0);
        });

    });
