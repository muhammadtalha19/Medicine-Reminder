document.addEventListener('DOMContentLoaded', function () {
  var addButton = document.getElementById('addButton');
  var medicineTable = document.getElementById('medicineTable');

  addButton.addEventListener('click', function () {
    var medicineName = document.getElementById('medicineName').value;
    var quantity = parseInt(document.getElementById('quantity').value);
    var time = document.getElementById('time').value;

    if (medicineName.trim() === '' || isNaN(quantity) || quantity <= 0 || time.trim() === '') {
      alert('Please enter a valid medicine name, positive quantity, and time');
      return;
    }

    var newRow = document.createElement('tr');
    newRow.innerHTML = '<td>' + medicineName + '</td>' +
      '<td>' + quantity + '</td>' +
      '<td>' + time + '</td>' +
      '<td><button class="takeButton">Take Medicine</button></td>';

    medicineTable.querySelector('tbody').appendChild(newRow);

    document.getElementById('medicineName').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('time').value = '';
  });

  medicineTable.addEventListener('click', function (event) {
    if (event.target.classList.contains('takeButton')) {
      var row = event.target.parentNode.parentNode;
      var medicineName = row.querySelector('td:nth-child(1)').textContent;
      var quantityCell = row.querySelector('td:nth-child(2)');
      var quantity = parseInt(quantityCell.textContent);

      if (quantity > 0) {
        quantity--;
        quantityCell.textContent = quantity;

        if (quantity === 0) {
          row.classList.add('fade-out');
          setTimeout(function () {
            row.remove();
          }, 2000);
        }

        alert('Successfully taken "' + medicineName + '"');
      }
    }
  });

  function checkMedicineTime() {
    var currentTime = new Date();
    var currentHour = currentTime.getHours();
    var currentMinute = currentTime.getMinutes();

    var rows = medicineTable.querySelectorAll('tbody tr');
    rows.forEach(function (row) {
      var timeCell = row.querySelector('td:nth-child(3)');
      var time = timeCell.textContent.split(':');
      var hour = parseInt(time[0]);
      var minute = parseInt(time[1]);

      if (currentHour === hour && currentMinute === minute) {
        var medicineName = row.querySelector('td:nth-child(1)').textContent;
        showAlert('Time to take "' + medicineName + '"  medicine. \n!!Stay Healthy, Stay Happy!!');
      }
    });
  }

  function showAlert(message) {
    alert(message);
  }

  setInterval(checkMedicineTime, 1000); // Check the time every second
});
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker registered ✅"))
    .catch((err) => console.log("SW registration failed 😢", err));
}
document.addEventListener('DOMContentLoaded', function () {
  var addButton = document.getElementById('addButton');
  var medicineTable = document.getElementById('medicineTable');

  // Load history if on the History page
  if (document.body.contains(document.getElementById('historyTable'))) {
    loadHistory();
  }

  addButton.addEventListener('click', function () {
    var medicineName = document.getElementById('medicineName').value;
    var quantity = parseInt(document.getElementById('quantity').value);
    var time = document.getElementById('time').value;

    if (medicineName.trim() === '' || isNaN(quantity) || quantity <= 0 || time.trim() === '') {
      alert('Please enter a valid medicine name, positive quantity, and time');
      return;
    }

    var newRow = document.createElement('tr');
    newRow.innerHTML = '<td>' + medicineName + '</td>' +
      '<td>' + quantity + '</td>' +
      '<td>' + time + '</td>' +
      '<td><button class="takeButton">Take Medicine</button></td>';

    medicineTable.querySelector('tbody').appendChild(newRow);

    document.getElementById('medicineName').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('time').value = '';
  });

  medicineTable.addEventListener('click', function (event) {
    if (event.target.classList.contains('takeButton')) {
      var row = event.target.parentNode.parentNode;
      var medicineName = row.querySelector('td:nth-child(1)').textContent;
      var quantityCell = row.querySelector('td:nth-child(2)');
      var quantity = parseInt(quantityCell.textContent);

      if (quantity > 0) {
        quantity--;
        quantityCell.textContent = quantity;

        if (quantity === 0) {
          saveToHistory(medicineName, row.querySelector('td:nth-child(3)').textContent);
          row.classList.add('fade-out');
          setTimeout(function () {
            row.remove();
          }, 2000);
        }

        alert('Successfully taken "' + medicineName + '"');
      }
    }
  });

  function saveToHistory(medicineName, time) {
    var history = JSON.parse(localStorage.getItem('medicineHistory')) || [];
    history.push({ name: medicineName, time: time, status: 'Taken' });
    localStorage.setItem('medicineHistory', JSON.stringify(history));
  }

  function loadHistory() {
    var historyTable = document.getElementById('historyTable').querySelector('tbody');
    var history = JSON.parse(localStorage.getItem('medicineHistory')) || [];

    history.forEach(function (item) {
      var row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name}</td>
        <td>1</td>
        <td>${item.time}</td>
        <td>${item.status}</td>
      `;
      historyTable.appendChild(row);
    });
  }

  function checkMedicineTime() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
  
    const rows = medicineTable.querySelectorAll('tbody tr');
    rows.forEach(function (row) {
      const timeCell = row.querySelector('td:nth-child(3)');
      const time = timeCell.textContent.split(':');
      const hour = parseInt(time[0]);
      const minute = parseInt(time[1]);
  
      // Check if the time matches and if the row is not already notified
      if (currentHour === hour && currentMinute === minute && !row.classList.contains('notified')) {
        const medicineName = row.querySelector('td:nth-child(1)').textContent;
        showAlert(`Time to take "${medicineName}" medicine. Stay Healthy!`);
        
        // Mark the row as notified
        row.classList.add('notified');
      }
    });
  }

  function showAlert(message) {
    alert(message);
  }

  setInterval(checkMedicineTime, 1000); // Check the time every second
});
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker registered ✅"))
    .catch((err) => console.log("SW registration failed 😢", err));
}
// Save medicine to history in localStorage
function saveToHistory(medicineName, time) {
  const history = JSON.parse(localStorage.getItem('medicineHistory')) || [];
  history.push({ name: medicineName, time: time, status: 'Taken' });
  localStorage.setItem('medicineHistory', JSON.stringify(history));
}

// Handle "Take Medicine" button click
document.getElementById('medicineTable').addEventListener('click', function (event) {
  if (event.target.classList.contains('takeButton')) {
    const row = event.target.parentNode.parentNode;
    const medicineName = row.querySelector('td:nth-child(1)').textContent;
    const time = row.querySelector('td:nth-child(3)').textContent;

    // Save to history
    saveToHistory(medicineName, time);

    // Remove the row from the table
    row.remove();
    alert(`You have taken "${medicineName}"`);
  }
});