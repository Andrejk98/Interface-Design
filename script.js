const statusEl = document.getElementById('status');
const bluetoothContainer = document.getElementById('bluetoothContainer');
const bluetoothIcon = document.getElementById('bluetoothIcon');

const successSound = document.getElementById('successSound');
const disconnectSound = document.getElementById('disconnectSound');
const searchingSound = document.getElementById('searchingSound');  // Neues Audio-Element für den Such-Sound

// Startet die Bluetooth-Sequenz
function startBluetoothSequence() {
    statusEl.textContent = 'Gerät wird gesucht...';
    searchingSound.play();  // Starte den Such-Sound

    // Startet den normalen Puls
    bluetoothContainer.classList.add('pulse');
    bluetoothContainer.classList.remove('red-pulse');  // Falls der rote Puls aktiv ist, stoppen

    setTimeout(() => {
        statusEl.textContent = 'Verbindung wird hergestellt...';

        setTimeout(() => {
            statusEl.textContent = 'Verbunden';
            successSound.play();  // Spiele den Erfolgs-Sound ab

            // Grüner Kreis bei erfolgreicher Verbindung
            bluetoothContainer.classList.add('success');
            bluetoothContainer.classList.remove('pulse'); // Stoppe den normalen Puls
            searchingSound.pause();  // Stoppe den Such-Sound, wenn verbunden
            searchingSound.currentTime = 0;  // Setze den Such-Sound zurück

            setTimeout(() => {
                // Verbindung trennen
                statusEl.textContent = 'Verbindung getrennt';
                disconnectSound.play();  // Spiele den Trennungs-Sound ab
                bluetoothContainer.classList.remove('success');  // Entferne den grünen Kreis

                // Roter Puls nach Verbindungstrennung starten
                bluetoothContainer.classList.add('red-pulse');

                searchingSound.pause();  // Stoppe den Such-Sound, falls er noch läuft
                searchingSound.currentTime = 0;  // Setze den Such-Sound zurück

                setTimeout(() => {
                    bluetoothContainer.classList.remove('red-pulse');  // Entferne den roten Puls nach 2 Sekunden
                }, 2000); // Nach 2 Sekunden verschwindet der rote Puls
            }, 4000); // Zeit bis zur Trennung
        }, 2000); // Zeit bis zur erfolgreichen Verbindung
    }, 2000); // Zeit, in der nach Geräten gesucht wird
}

// Startet den normalen Puls, wenn das Bluetooth-Icon geklickt wird
bluetoothIcon.addEventListener('click', () => {
    // Bluetooth-Sequenz starten
    startBluetoothSequence();
});
