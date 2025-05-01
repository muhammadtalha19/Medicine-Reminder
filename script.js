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
