const nav = document.querySelector('#nav');
const footerSection = document.querySelector('#footer');

document.addEventListener('DOMContentLoaded', async () => {
    try {
        if (!localStorage.currentUser)  localStorage.currentUser=JSON.stringify(undefined)
            
        showMenu();
        footer();
        // other functions????
    } catch (error) {
        console.error("Failed to load products:", error);
    }
});

function showMenu() {
    nav.innerHTML = `
    <div class="nav-container">
        <div class="nav-container">
        <div class="logo">
            <img src="/images/logo.png" alt="logo image">
            <p>GoodBuy</p>
        </div> 

        <div class="links">
            <nav class="nav-links" id="nav-links">
                <a href="/index.html" class="hamburger-menu">Home</a>
                <a href="/sub-pages/profile.html">Profile</a>
                <a href="/sub-pages/login.html">Login</a>
            </nav>
            <a href="javascript:void(0);" class="hamburger-menu" onclick="menuDisplay()">
                <i class="fa fa-bars"></i>
            </a>
        </div>
    </div>`;
}

function footer() {
    footerSection.innerHTML = `<p>&copy; | Goodbuy 2024 | CMPS350 Couse Project | G3 L51</p>`;
}

function menuDisplay() {
    let element = document.getElementById("nav-links");
    if (element.style.display === "block") {
        element.style.display = "none";
    } else {
        element.style.display = "block";
    }
}

