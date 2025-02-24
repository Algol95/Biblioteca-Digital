const sidebar = document.querySelector(".sidebar");

const body = document.querySelector("body")

function openMenu(){
    sidebar.classList.add("active")
    body.insertAdjacentHTML("afterbegin", `<div class="overlay"></div>`)
    const overlay = document.querySelector(".overlay");
    body.classList.add("no-scroll")
    setTimeout(()=> overlay.classList.add("active") , 10)
    

}

function closeMenu(){
    sidebar.classList.remove("active")
    const overlay = document.querySelector(".overlay");
    overlay.classList.remove("active")
    body.classList.remove("no-scroll")
    setTimeout(()=> overlay.remove(), 1000)
}