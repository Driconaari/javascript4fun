function displayGreeting() {
    const name = document.getElementById('nameInput').value;
    const greetingMessage = document.getElementById('greetingMessage');
    if (name) {
        greetingMessage.innerHTML = `Hello, ${name}!`;
    } else {
        greetingMessage.innerHTML = 'Please enter your name.';
    }
}
