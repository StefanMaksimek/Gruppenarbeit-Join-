setURL('https://gruppe-272.developerakademie.net/smallest_backend_ever-master')

        async function uploadUser() {
            await backend.setItem('users', JSON.stringify(users));
        }

        async function uploadTasks() {
            if (currentUser != "Testuser") {
                await backend.setItem('tasks', JSON.stringify(tasks));
            }
        }

        async function uploadIcons() {
            await backend.setItem('icons', JSON.stringify(icons));
        }

        async function init() {
            await downloadFromServer();
            users = JSON.parse(backend.getItem(`users`)) || [];
            icons = JSON.parse(backend.getItem(`icons`)) || [];

            loadUsers();
        }

        async function loadTaskFromBackend() {
            if (currentUser != "Testuser") {
                await downloadFromServer();
                tasks = JSON.parse(backend.getItem(`tasks`)) || [];
            }

            renderBoard()
            renderBacklog()
            openBoard()
        }