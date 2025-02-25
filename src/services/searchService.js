import { printGridTitle } from "./printService.js";
const searchInputs = document.querySelectorAll('input[type="search"]');

searchInputs.forEach(input => {
    input.addEventListener('input', async event=>{
        const title = event.target.value
        printGridTitle(title)
    })
})
