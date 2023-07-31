payload = []

function downloadTextFile(str) {
    let link = document.createElement("a");
    let file = new Blob([str], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = "output.json";
    link.click();
    URL.revokeObjectURL(link.href);
}

document.querySelectorAll('b').forEach(el => { // iterate over character name elements (<b>)
    payload.push({}) // new character-quote pair
    
    payload[payload.length-1]["character"] = el.textContent // append character
    payload[payload.length-1]["quote"] = el.parentElement.nextElementSibling.textContent // append quote
    
    payload[payload.length-1]["quote"] = payload[payload.length-1]["quote"].trim() // remove leading newlines/whitespace

    // this is the most scuffed way of doing this im so sorry
    if (String(el.parentElement.nextElementSibling.nextElementSibling).includes("Heading")) {
        payload.push({})
        // i dont even know how this works but it does
        payload[payload.length-1]["scene"] = el.parentElement.nextElementSibling.nextElementSibling.textContent
        payload[payload.length-1]["cue"] = el.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent
        
        payload[payload.length-1]["cue"] = payload[payload.length-1]["cue"].trim() // remove leading newlines/whitespace
    }
});


payload = JSON.stringify(payload)
downloadTextFile(payload)
