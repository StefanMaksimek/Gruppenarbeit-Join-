function loadUserListForContacts() {
    let content = document.getElementById('contact-list')
    content.innerHTML = '';
    users.sort((a, b) => a.name.localeCompare(b.name))
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user.name == '') {
            user.name = user.mail
        }
        if (document.getElementById(`${getFirstCharacterOfName(user.name)}`) == null || document.getElementById(`${getFirstCharacterOfName(user.name)}`) == undefined) {
            content.innerHTML += `<div class="contact-list-char" id="${getFirstCharacterOfName(user.name)}">${getFirstCharacterOfName(user.name)}</div>`
        }

        content.innerHTML += `<div onclick="showUserDetailsContact('${user.mail}')" class="contact-list-detail-box">
                                <img src="${user.icon}" alt="">
                                <div>
                                    <div>${user.name}</div>
                                    <div class="contact-list-detail-mail">${user.mail}</div>
                                </div>
                            </div>`
    }
}


function getFirstCharacterOfName(name) {
    let firstCharacter = Array.from(name)[0].toUpperCase();
    return firstCharacter
}


function closeAndOpenContactList() {
    let image = document.getElementById('close-open-icon-contact-list')
    let contactList = document.getElementById('contact-list')
    if (contactList.classList.contains('d-none')) {
        image.src = 'img/logos/icon-arrow-left-line.svg';
        document.getElementById('contact-list').classList.remove('d-none')
        document.getElementById('close-open-icon-contact-list-container').style.left = '260px'
    }
    else {
        document.getElementById('contact-list').classList.add('d-none')
        image.src = 'img/logos/icon-arrow-right-line.svg';
        document.getElementById('close-open-icon-contact-list-container').style.left = '24px'
    }
}


function showUserDetailsContact(mail) {
    let user = users.find(u => u.mail == mail)
    document.getElementById('contact-user-detail-name').innerHTML = user.name
    document.getElementById('contact-user-detail-img').src = user.icon
    document.getElementById('contact-user-detail-mail').innerHTML = user.mail
    document.getElementById('contact-user-detail-phone').innerHTML = user.phone
    document.getElementById('contact-user-detail-category').innerHTML = user.category
    document.getElementById('contact-user-detail-city').innerHTML = user.city
    document.getElementById('contact-user-detail-hobby').innerHTML = user.Hobbys
    document.getElementById('contact-detail-info').classList.remove('d-none')

    if (mail == localStorage.getItem('joinLoginMail')) {
        document.getElementById('contact-details-edit-btn').innerHTML = `<button class="login-area-btn login-area-btn-login login-btn-shadow" onclick="editUserContact()">Edit <img src="img/logos/icon-pencil.svg" style="height: 24px; object-fit: cover; padding-bottom: 2px; margin-left: 24px"></button>`;
    }
    else {
        document.getElementById('contact-details-edit-btn').innerHTML = '';
    }

    if (window.innerWidth <= 500) {
        closeAndOpenContactList();
    }
}

function editUserContact() {
    let userMail = localStorage.getItem('joinLoginMail')
    let user = users.find(u => u.mail == userMail)
    document.getElementById('contact-user-detail-name').innerHTML = `<input class="change-user-details-contacts" id="user-detail-view-change-name-contact" type="text" value="${user.name}">`;
    document.getElementById('contact-user-detail-phone').innerHTML = `<input class="change-user-details-contacts" id="user-detail-view-change-tel-contact" type="tel" value="${user.phone}">`;
    document.getElementById('contact-user-detail-category').innerHTML = `<input class="change-user-details-contacts" id="user-detail-view-change-category-contact" type="text" value="${user.category}">`;
    document.getElementById('contact-user-detail-city').innerHTML = `<input class="change-user-details-contacts" id="user-detail-view-change-city-contact" type="tesx" value="${user.city}">`;
    document.getElementById('contact-user-detail-hobby').innerHTML = `<input class="change-user-details-contacts" id="user-detail-view-change-hobby-contact" type="text" value="${user.Hobbys}">`;
    document.getElementById('contact-user-detail-mail').innerHTML = `<input class="change-user-details-contacts" id="user-detail-view-change-mail-contact" type="mail" value="${user.mail}">`;
    document.getElementById('contact-details-edit-btn').innerHTML = `<button class="login-area-btn login-area-btn-guest login-btn-shadow mg-right" onclick="showUserDetailsContact('${user.mail}')">Cancel <img src="img/close-icon.png" style="height: 16px; object-fit: cover; padding-bottom: 2px; margin-left:24px;"></button><button class="login-area-btn login-area-btn-login login-btn-shadow" onclick="saveUserChangesContact('${user.id}')">Save <img src="img/logos/icon-save-white.svg" style="height: 24px; object-fit: cover; padding-bottom: 2px; margin-left: 24px"></button>`;
}


function saveUserChangesContact(id) {
    let name = document.getElementById('user-detail-view-change-name-contact').value;
    let phone = document.getElementById('user-detail-view-change-tel-contact').value;
    let category = document.getElementById('user-detail-view-change-category-contact').value;
    let city = document.getElementById('user-detail-view-change-city-contact').value;
    let hobby = document.getElementById('user-detail-view-change-hobby-contact').value;
    let mail = document.getElementById('user-detail-view-change-mail-contact').value;

    updateUserObjContact(id, name, phone, category, city, hobby, mail)
}


function updateUserObjContact(id, name, phone, category, city, hobby, mail) {
    let user = users.find(u => u.id == id)
    let index = users.indexOf(user)
    users[index].name = name;
    users[index].phone = phone;
    users[index].category = category;
    users[index].city = city;
    users[index].Hobbys = hobby;
    users[index].mail = mail;
    goBackInViewingModusOfUserContact(index);
}


function goBackInViewingModusOfUserContact(index) {
    document.getElementById('contact-user-detail-name').innerHTML = `${users[index].name}`;
    document.getElementById('contact-user-detail-phone').innerHTML = `${users[index].phone}`;
    document.getElementById('contact-user-detail-category').innerHTML = `${users[index].category}`;
    document.getElementById('contact-user-detail-city').innerHTML = `${users[index].city}`;
    document.getElementById('contact-user-detail-hobby').innerHTML = `${users[index].Hobbys}`;
    document.getElementById('contact-user-detail-mail').innerHTML = `${users[index].mail}`;
    document.getElementById('contact-details-edit-btn').innerHTML = `<button class="login-area-btn login-area-btn-login login-btn-shadow" onclick="editUserContact()">Edit <img src="img/logos/icon-pencil.svg" style="height: 24px; object-fit: cover; padding-bottom: 2px; margin-left: 24px"></button>`;
    uploadUser();
    loadUserListForContacts();
}