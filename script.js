document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded and Running");

    // ✅ Ensure treatments exist inside `treatment-list`
    let treatmentList = document.querySelector("#treatment-list");

    if (treatmentList && treatmentList.innerHTML.trim() === "") {
        console.log("Treatment list is empty! Adding default content.");

        treatmentList.innerHTML = `
            <div class="treatment-item">
                <h3>Vaksinasjon</h3>
                <p>Beskrivelse av vaksinasjon...</p>
            </div>
            <div class="treatment-item">
                <h3>Kirurgi</h3>
                <p>Beskrivelse av kirurgi...</p>
            </div>
        `;
    }

    // Clear all existing event listeners to avoid duplicates
    function clearListeners(selector) {
        document.querySelectorAll(selector).forEach(element => {
            const clone = element.cloneNode(true);
            element.parentNode.replaceChild(clone, element);
        });
    }

    // Clear all existing listeners
    clearListeners(".treatment-category");
    clearListeners(".treatment-item");
    clearListeners(".treatment-details");

    // ✅ Click Event for Expanding Categories
    document.querySelectorAll(".treatment-category").forEach(category => {
        category.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            console.log("Category Clicked:", this.innerText);

            let list = this.nextElementSibling;

            if (list && list.classList.contains("treatment-list")) {
                let isActive = list.classList.contains("active");

                // Close all other lists first
                document.querySelectorAll(".treatment-list").forEach(otherList => {
                    otherList.classList.remove("active");
                });

                if (!isActive) {
                    list.classList.add("active");
                    console.log("✅ Category list activated:", this.innerText);
                } else {
                    list.classList.remove("active");
                    console.log("❌ Category list deactivated:", this.innerText);
                }
            }
        });
    });

    // ✅ Click Event for Treatment Items - FIXED VERSION
    document.querySelectorAll(".treatment-item").forEach(item => {
        item.addEventListener("click", function (event) {
            // Prevent ALL propagation and default behaviors
            event.preventDefault();
            event.stopPropagation();
            console.log("Treatment Clicked:", this.innerText);
            
            // Based on HTML structure, treatment details is the next sibling
            let details = this.nextElementSibling;
            
            if (details && details.classList.contains("treatment-details")) {
                // Important: Stop all other treatment details from interfering
                document.querySelectorAll(".treatment-details").forEach(d => {
                    if (d !== details) d.classList.remove("active");
                });
                
                // Toggle active class
                details.classList.toggle("active");
                console.log(details.classList.contains("active") ? 
                    "🔍 Treatment details opened: " + this.innerText : 
                    "❌ Treatment details closed: " + this.innerText);
            } else {
                console.log("❌ No treatment details found for:", this.innerText);
            }
        });
    });

    // Prevent clicks on treatment details from closing them
    document.querySelectorAll(".treatment-details").forEach(details => {
        details.addEventListener("click", function(event) {
            event.stopPropagation();
        });
    });
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("active");
    });
});

});
