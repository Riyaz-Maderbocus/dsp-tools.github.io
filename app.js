const hamburger = document.querySelector(".hamburger");
const bar1 = document.querySelector(".bar-1");
const bar2 = document.querySelector(".bar-2");
const bar3 = document.querySelector(".bar-3");
const mobileNav = document.querySelector(".mobile-nav");

hamburger.addEventListener("click", () => {
    bar1.classList.toggle("animateBar1");
    bar2.classList.toggle("animateBar2");
    bar3.classList.toggle("animateBar3");
    // mobileNav.style.display = "block";
    if (mobileNav.style.display === "none" || !mobileNav.style.display) {
        mobileNav.style.display = "block"
    } else {
        mobileNav.style.display = "none"
    }
})