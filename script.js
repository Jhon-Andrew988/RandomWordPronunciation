let repeatCount = 0;
let currentWord = '';
let words = [];

document.getElementById('startButton').addEventListener('click', function() {
    // Reiniciar el contador de repeticiones
    repeatCount = 0;
    
    // Obtener el valor del input
    let inputText = document.getElementById('wordInput').value;
    
    // Dividir el input en un array de palabras
    words = inputText.split(',').map(word => word.trim()).filter(word => word !== '');
    
    // Verificar si hay palabras disponibles
    if (words.length > 0) {
        pickWord();
    } else {
        // Manejar el caso donde no quedan palabras
        document.getElementById('wordToPronounce').textContent = 'No words left to pronounce!';
    }
    
    // Cambiar el color de fondo
    document.body.style.backgroundColor = getRandomColor();
});

document.getElementById('repeatButton').addEventListener('click', function() {
    if (repeatCount < 3) {
        repeatCount++;
        
        // Pronunciar nuevamente la palabra actual
        let accent = document.getElementById('accentSelect').value;
        pronounceWord(currentWord, accent);
        
        // Actualizar el texto del botón con el contador actual
        document.getElementById('repeatButton').textContent = `Repeat (${repeatCount}/3)`;
    }
    
    // Deshabilitar el botón después de 3 repeticiones
    if (repeatCount >= 3) {
        document.getElementById('repeatButton').disabled = true;
    }
});

function pickWord() {
    if (words.length > 0) {
        // Seleccionar una palabra al azar
        let randomIndex = Math.floor(Math.random() * words.length);
        currentWord = words[randomIndex]; // Guardar la palabra seleccionada
        
        // Eliminar la palabra seleccionada del array
        words.splice(randomIndex, 1);
        
        // Actualizar el campo de texto con las palabras restantes
        document.getElementById('wordInput').value = words.join(', ');
        
        // Actualizar la sección de resultados
        document.getElementById('wordToPronounce').textContent = `Word to Pronounce: ${currentWord}`;
        
        // Añadir la palabra seleccionada al historial
        let historyList = document.getElementById('historyList');
        let listItem = document.createElement('li');
        listItem.textContent = currentWord;
        historyList.appendChild(listItem);
        
        // Pronunciar la palabra seleccionada
        let accent = document.getElementById('accentSelect').value;
        pronounceWord(currentWord, accent);
        
        // Habilitar el botón de repetir
        document.getElementById('repeatButton').disabled = false;
        document.getElementById('repeatButton').textContent = `Repeat (0/3)`;
    } else {
        document.getElementById('wordToPronounce').textContent = 'No more words left!';
        document.getElementById('repeatButton').disabled = true;
    }
}

function pronounceWord(word, accent) {
    let utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = accent; // Definir el idioma (inglés americano o británico)
    speechSynthesis.speak(utterance);
}

// Función para obtener un color aleatorio
function getRandomColor() {
    const colors = ['#ff0000', '#ffffff', '#0000ff']; // Rojo, blanco, azul (tema de USA)
    return colors[Math.floor(Math.random() * colors.length)];
}
