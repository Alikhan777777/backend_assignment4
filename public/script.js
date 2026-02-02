const API_URL = '/api';
let token = localStorage.getItem('token');
let role = localStorage.getItem('role');

// При загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadBooks();
});

// Проверка авторизации и отображение интерфейса в зависимости от роли
function checkAuth() {
    // Обновим токен и роль из localStorage на случай изменений
    token = localStorage.getItem('token');
    role = localStorage.getItem('role');

    const showAuthBtn   = document.getElementById('showAuthBtn');
    const userInfo      = document.getElementById('userInfo');
    const logoutBtn     = document.getElementById('logoutBtn');
    const adminSection  = document.getElementById('adminSection');
    const authModal     = document.getElementById('authModal');

    if (token) {
        // Пользователь залогинен
        showAuthBtn.style.display  = 'none';
        userInfo.style.display     = 'inline';
        logoutBtn.style.display    = 'inline-block';
        authModal.style.display    = 'none';

        // Текст для разных ролей
        if (role === 'admin') {
            userInfo.innerText = 'Вы зашли как: Администратор';
            adminSection.style.display = 'block';   // Админ видит форму добавления книг и т.п.
        } else {
            userInfo.innerText = 'Вы зашли как: Пользователь';
            adminSection.style.display = 'none';    // Обычный пользователь не видит админ‑форму
        }
    } else {
        // Не авторизован — обычный гость: просто показываем кнопку "Войти / Регистрация"
        // Сами книги остаются видимыми для всех.
        showAuthBtn.style.display  = 'inline-block';
        userInfo.style.display     = 'none';
        logoutBtn.style.display    = 'none';
        adminSection.style.display = 'none';
        // Модалка по умолчанию скрыта и открывается только по кнопке
        authModal.style.display    = 'none';
    }
}
// Показать модалку входа
document.getElementById('showAuthBtn').onclick = () => document.getElementById('authModal').style.display = 'flex';

// Логин / Регистрация
let isLogin = true;
document.getElementById('toggleAuthText').onclick = () => {
    isLogin = !isLogin;
    document.getElementById('authTitle').innerText = isLogin ? 'Вход' : 'Регистрация';
    document.getElementById('authSubmit').innerText = isLogin ? 'Войти' : 'Создать';
};

document.getElementById('authForm').onsubmit = async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const roleVal = document.getElementById('roleSelect').value;

    const path = isLogin ? '/auth/login' : '/auth/register';
    const res = await fetch(API_URL + path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role: roleVal })
    });

    const data = await res.json();
    if (res.ok) {
        if (isLogin) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            location.reload();
        } else {
            alert('Готово! Теперь входи.');
            isLogin = true;
        }
    } else { alert(data.message); }
};

// Выход
document.getElementById('logoutBtn').onclick = () => {
    localStorage.clear();
    location.reload();
};

// Форма добавления/редактирования книг (доступна только администратору)
const bookForm = document.getElementById('bookForm');
if (bookForm) {
    bookForm.onsubmit = async (e) => {
        e.preventDefault();

        const id    = document.getElementById('bookId').value;
        const name  = document.getElementById('name').value;
        const author= document.getElementById('author').value;
        const cost  = Number(document.getElementById('cost').value);

        // Определяем метод и URL: если есть id — обновление, иначе создание
        const method = id ? 'PUT' : 'POST';
        const url    = id ? `${API_URL}/books/${id}` : `${API_URL}/books`;

        const res = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // токен администратора
            },
            body: JSON.stringify({ name, author, cost })
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
            alert(data.message || data.error || 'Ошибка при сохранении книги');
            return;
        }

        // Очистить форму и перезагрузить список книг
        document.getElementById('bookId').value = '';
        bookForm.reset();
        loadBooks();
    };
}

// Загрузка книг
async function loadBooks() {
    const res = await fetch(API_URL + '/books');
    const books = await res.json();
    const list = document.getElementById('booksList');
    list.innerHTML = '';

    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <h3>${book.name}</h3>
            <p>Автор: ${book.author}</p>
            <p><b>$${book.cost}</b></p>
            <div class="reviews-box">
                <div id="rev-${book._id}"></div>
                ${token ? `
                    <div class="review-input-group">
                        <textarea id="in-${book._id}" rows="2" placeholder="Подробный отзыв..."></textarea>
                    </div>
                    <div class="review-input-group">
                        <select id="rate-${book._id}">
                            <option value="1">Оценка: 1</option>
                            <option value="2">Оценка: 2</option>
                            <option value="3" selected>Оценка: 3</option>
                            <option value="4">Оценка: 4</option>
                            <option value="5">Оценка: 5</option>
                        </select>
                        <button onclick="addReview('${book._id}')" class="btn btn-primary">Оставить отзыв</button>
                    </div>
                ` : ''}
            </div>
            ${role === 'admin'
                ? `
                    <div class="admin-actions">
                        <button onclick="startEditBook('${book._id}', '${book.name.replace(/'/g, "\\'")}', '${book.author.replace(/'/g, "\\'")}', ${book.cost})" class="btn btn-primary">Редактировать</button>
                        <button onclick="deleteBook('${book._id}')" class="btn btn-danger">Удалить</button>
                    </div>
                  `
                : ''
            }
        `;
        list.appendChild(card);
        loadReviews(book._id);
    });
}

// Работа с отзывами
async function loadReviews(bookId) {
    const res = await fetch(`${API_URL}/books/${bookId}/reviews`);
    const reviews = await res.json();
    document.getElementById(`rev-${bookId}`).innerHTML = reviews
        .map(r => {
            const username = r.user?.username || 'Пользователь';
            const rating   = r.rating ?? '-';
            return `
                <div class="review-item">
                    <strong>${username}</strong> — Оценка: ${rating}/5
                    <br>
                    ${r.text}
                </div>
            `;
        })
        .join('');
}

async function addReview(bookId) {
    const textEl   = document.getElementById(`in-${bookId}`);
    const rateEl   = document.getElementById(`rate-${bookId}`);
    const text     = textEl.value.trim();
    const rating   = Number(rateEl.value);

    if (!text) {
        alert('Пожалуйста, напишите подробный отзыв.');
        return;
    }

    await fetch(`${API_URL}/books/${bookId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ text, rating })
    });
    // очистить поле и обновить список отзывов
    textEl.value = '';
    loadReviews(bookId);
}

// Заполнить форму администратора данными книги для редактирования
function startEditBook(id, name, author, cost) {
    const idInput     = document.getElementById('bookId');
    const nameInput   = document.getElementById('name');
    const authorInput = document.getElementById('author');
    const costInput   = document.getElementById('cost');
    const formTitle   = document.getElementById('formTitle');

    if (!idInput || !nameInput || !authorInput || !costInput) return;

    idInput.value       = id;
    nameInput.value     = name;
    authorInput.value   = author;
    costInput.value     = cost;

    if (formTitle) {
        formTitle.innerText = 'Редактировать книгу';
    }

    // Прокрутить к форме, чтобы администратор сразу увидел её
    document.getElementById('adminSection')?.scrollIntoView({ behavior: 'smooth' });
}

// Удаление (Admin)
async function deleteBook(id) {
    await fetch(`${API_URL}/books/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    loadBooks();
}