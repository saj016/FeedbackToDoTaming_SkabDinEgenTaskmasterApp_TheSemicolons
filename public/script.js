/*
async function loadTodoItems() {
    const ul = document.getElementById('todoList');
    ul.innerHTML = ''; //ryd eksisterende indhold

    try {
        const response = await fetch('/api/tasks');
        if (!response.ok) {
            throw new Error(`Serverfejl: ${response.status}`);
        }

        const data = await response.json();

        //Tjek, at responsen er et array
        if (!Array.isArray(data)) {
            throw new Error('Ugyldig dataformat modtaget fra serveren');
        }

        //Udfyld ul med li elementer
        data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.text;
            ul. appendChild(li);
        });
    } catch (error) {
        console.error('Hentningsfejl: ' + error);
        const li = document.createElement('li');
        li.textContent = 'Fejl ved hentning af information.';
        ul.appendChild(li);
    }
}
*/


/*
document.getElementById('newTodoForm').addEventListener('submit', async function(e){
    e.preventDefault(); //prevent default form submission

    const formData = {
        text: document.getElementById('newTodo').value
    };

    try {
        const response = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON
        });

        const result = await response.json();
        alert(`Serveren siger: ${result.message}`);
    } catch (error) {
        console.error('Fejl ved sending af data: ', error);
    }
});
*/

loadTodoItems();
