// Improved script.js for behandlinger page
document.addEventListener("DOMContentLoaded", function () {
    console.log("Treatment JavaScript Loaded and Running");

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

    // ✅ Click Event for Expanding Categories - IMPROVED FOR MOBILE
    document.querySelectorAll(".treatment-category").forEach(category => {
        // Add both click and touch events
        ["click", "touchend"].forEach(eventType => {
            category.addEventListener(eventType, function (event) {
                // Stop default behavior and propagation
                event.preventDefault();
                event.stopPropagation();
                console.log("Category " + eventType + ":", this.innerText);

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
            }, { passive: false }); // Important for touch events
        });
    });

    // ✅ Click Event for Treatment Items - IMPROVED FOR MOBILE
    document.querySelectorAll(".treatment-item").forEach(item => {
        // Add both click and touch events
        ["click", "touchend"].forEach(eventType => {
            item.addEventListener(eventType, function (event) {
                // Prevent ALL propagation and default behaviors
                event.preventDefault();
                event.stopPropagation();
                console.log("Treatment " + eventType + ":", this.innerText);
                
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
            }, { passive: false }); // Important for touch events
        });
    });

    // Prevent clicks on treatment details from closing them - IMPROVED FOR MOBILE
    document.querySelectorAll(".treatment-details").forEach(details => {
        ["click", "touchend"].forEach(eventType => {
            details.addEventListener(eventType, function(event) {
                event.stopPropagation();
            }, { passive: false });
        });
    });
});