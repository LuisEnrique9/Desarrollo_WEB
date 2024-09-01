document.addEventListener('DOMContentLoaded', function () {
    // Creación de los arreglos con comentarios
    const comments = [
        "Este lugar es increíble, lo recomiendo a todos.",
        "La vista es impresionante, ¡volveré seguro!",
        "Un sitio perfecto para relajarse y desconectar.",
        "Las actividades fueron divertidas y bien organizadas.",
        "Un destino perfecto para toda la familia.",
        "El lago es simplemente hermoso, un tesoro natural.",
        "El alojamiento fue cómodo y con unas vistas preciosas.",
        "Una experiencia que nunca olvidaré.",
        "Perfecto para una escapada de fin de semana.",
        "Un lugar que combina aventura y tranquilidad."
    ];

    // Creación de arreglos con los nombres
    const names = [
        "Carlos",
        "Marta",
        "Luis",
        "Ana",
        "José",
        "María",
        "Javier",
        "Laura",
        "Daniel",
        "Elena"
    ];

    // Función para obtener elementos aleatorios
    function getRandomItems(arr, num) {
        const shuffled = arr.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }

    // Seleccionar 3 comentarios y 3 nombres aleatorios
    const selectedComments = getRandomItems(comments, 3);
    const selectedNames = getRandomItems(names, 3);

    // Mostrar los comentarios en el contenedor
    const commentsContainer = document.getElementById("comments-container");
    selectedComments.forEach((comment, index) => {
        const commentElement = document.createElement("div");
        commentElement.className = "comment";
        commentElement.innerHTML = `<p class="name">${selectedNames[index]}</p><p>${comment}</p>`;
        commentsContainer.appendChild(commentElement);
    });

    // Manejar el envío del formulario de contacto
    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Obtener los valores de los campos del formulario
        const name = document.getElementById("name").value;
        const birthdate = document.getElementById("birthdate").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        // Validar los campos del formulario
        if (name && birthdate && email && message) {
            // Mostrar modal de confirmación
            $('#confirmationModal').modal('show');

            // Registrar los datos en la consola
            console.log("Nombre:", name);
            console.log("Fecha de Nacimiento:", birthdate);
            console.log("Correo Electrónico:", email);
            console.log("Mensaje:", message);

            // Limpiar el formulario
            contactForm.reset();
        } else {
            alert("Por favor, llena todos los campos correctamente.");
        }
    });
});
