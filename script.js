const startBtn = document.getElementById('start');

const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numberCheckbox = document.getElementById('numbers');

const passwordInput = document.getElementById('password');

function requestServer(length, num, upper, lower) {

    function updateRequestUrl(length, num, upper, lower) {
        const requestUrl = `https://www.random.org/strings/?num=1&len=${length}&digits=${num}&upperalpha=${upper}&loweralpha=${lower}&unique=on&format=plain&rnd=new`;
        return requestUrl;
    }

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        function makeRequest() {
            xhr.open('GET', updateRequestUrl(length, num, upper, lower));

            xhr.onload = () => {
                if (xhr.status === 200) {
                    const response = xhr.responseText;
                    const data = response.trim();
                    resolve(data)
                    
                } else {
                    reject('Error: ' + xhr.status);
                }
            };

            xhr.send();
        }

        makeRequest()
    });
}

function generatePassword() {
    const lengthInput = document.getElementById('length');
    const passwordLength = lengthInput.value;

    if (passwordLength > 20){
        alert('max length is 20!');
        return
    }

    const num = numberCheckbox.checked ? 'on' : 'off';
    const upper = uppercaseCheckbox.checked ? 'on' : 'off';
    const lower = lowercaseCheckbox.checked ? 'on' : 'off';

    requestServer(passwordLength, num, upper, lower)
        .then(password => {
            passwordInput.value = password;
        })
        .catch(error => {
            console.log(error);
        });

}

startBtn.addEventListener('click', generatePassword);

function copyPassword(text){
    return navigator.clipboard.writeText(text);
}

const copyBtn = document.getElementById('copy');

copyBtn.addEventListener('click', () => {
    copyPassword(passwordInput.value)
});