document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    const apiKey = '7dbbbcc699ac44a913f85664b0eb0b55'; 

    function fetchWeather(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        return fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod !== 200) {
                    throw new Error('Weather data not available');
                }
                return data;
            });
    }

    addButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task');

            fetchWeather('London').then((data) => {
     
                const weatherInfo = `${data.name}: ${data.main.temp}°C, ${data.weather[0].description}`;
                const weatherSpan = document.createElement('span');
                weatherSpan.textContent = weatherInfo;
                taskDiv.appendChild(weatherSpan);
            }).catch(() => {
              
                const errorSpan = document.createElement('span');
                errorSpan.textContent = 'Weather data not available';
                taskDiv.appendChild(errorSpan);
            });

            const taskContent = document.createElement('span');
            taskContent.textContent = taskText;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');
            deleteButton.addEventListener('click', function () {
                taskList.removeChild(taskDiv);
            });

            taskDiv.appendChild(taskContent);
            taskDiv.appendChild(deleteButton);

            taskList.appendChild(taskDiv);

            taskInput.value = '';
        }
    });
});



