const joke = document.querySelector('.start'),
punchLine = document.querySelector('.punchline'),
jokeBtn = document.querySelector('button'),
sound = document.querySelector('.sound'),
text = document.querySelector('.text'),
generate = document.querySelector('h3'),
copy = document.querySelector('.copy');

randomJoke();

function randomJoke(){
    generate.textContent = "Generating...."
    jokeBtn.classList.add('generate');

    fetch('https://official-joke-api.appspot.com/jokes/random').then(res => res.json()).then(result=>{
        // console.log(result);
        joke.textContent = result.setup;
        punchLine.textContent = '"' + '.......' + result.punchline + ' "';
        generate.textContent = "New joke"
        jokeBtn.classList.remove('generate');
    });
}

sound.addEventListener('click', ()=>{
    if(!joke.textContent && !punchLine.textContent)return;
    //the SpeechSynthesisUtterance is a web speech api that represent a speech request
    let utterance = new SpeechSynthesisUtterance(joke.textContent + "     " + punchLine.textContent + "        HA HA HA HA HA");
    speechSynthesis.speak(utterance);
});

copy.addEventListener('click', ()=>{
    // writeText() property writes the specified text string to the system clipboard
    navigator.clipboard.writeText(joke.textContent + punchLine.textContent)
    text.style.display = 'block';
    setTimeout( ()=>{
        text.style.display = 'none';
    }, 500)
});


jokeBtn.addEventListener('click', randomJoke);