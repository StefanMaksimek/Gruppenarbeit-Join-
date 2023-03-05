function showUserDetails(userMail) {
    let userObj = users.find(t => t.mail == userMail);
    let icon = userObj.icon;
    let name = userObj.name;
    let phone = userObj.phone;
    let category = userObj.category;
    let city = userObj.city;
    let hobby = userObj.Hobbys;

    document.getElementById('myModal').classList.add('d-block')
    document.getElementById('show-user-details-container').classList.remove('d-none')

    fillUserDetails(user, icon, name, phone, category, city, hobby, userMail);
    if (userMail == localStorage.getItem('joinLoginMail')) {
        document.getElementById('user-detail-view-btn-box').innerHTML = `<button class="login-area-btn login-area-btn-login login-btn-shadow" onclick="editUser()">Edit <img src="img/logos/icon-pencil.svg" style="height: 24px; object-fit: cover; padding-bottom: 2px; margin-left: 24px"></button>`;
    }
    else {
        document.getElementById('user-detail-view-btn-box').innerHTML = '';
    }
}


function fillUserDetails(user, icon, name, phone, category, city, hobby, mail) {
    fillUserNameForDetailView(user);
    fillUserIconDetailView(icon);
    fillUserMailDetailView(name);
    fillUserPhoneDetailView(phone);
    fillUserCategoryDetailView(category);
    fillUserCityDetailView(city);
    fillUserHobbyDetailView(hobby);
    fillUserMailForDetailView(mail);
}


function fillUserNameForDetailView(name) {
    let userName = document.getElementById('show-user-details-box-name')
    userName.innerHTML = `${name}`
}


function fillUserMailForDetailView(mail) {
    let userMail = document.getElementById('show-user-details-box-mail');
    userMail.innerHTML = `${mail}`
}


function fillUserIconDetailView(icon) {
    let userIcon = document.getElementById('show-user-details-box-icon')
    userIcon.src = `${icon}`
}


function fillUserMailDetailView(name) {
    let userName = document.getElementById('show-user-details-box-name')
    userName.innerHTML = `${name}`
}


function fillUserPhoneDetailView(phone) {
    let userTel = document.getElementById('show-user-details-box-tel')
    userTel.innerHTML = `${phone}`
}


function fillUserCategoryDetailView(category) {
    let userCategory = document.getElementById('show-user-details-box-category')
    userCategory.innerHTML = `${category}`
}


function fillUserCityDetailView(city) {
    let userCity = document.getElementById('show-user-details-box-city')
    userCity.innerHTML = `${city}`
}


function fillUserHobbyDetailView(hobby) {
    let userHobby = document.getElementById('show-user-details-box-hobby')
    userHobby.innerHTML = `${hobby}`
}


function closeUserDetailsView() {
    document.getElementById('myModal').classList.remove('d-block')
    document.getElementById('show-user-details-container').classList.add('d-none');
    clearUserDetailsView()
}


function clearUserDetailsView() {
    document.getElementById('show-user-details-box-name').innerHTML = '';
    document.getElementById('show-user-details-box-icon').src = '';
    document.getElementById('show-user-details-box-tel').innerHTML = '';
    document.getElementById('show-user-details-box-category').innerHTML = '';
    document.getElementById('show-user-details-box-city').innerHTML = '';
    document.getElementById('show-user-details-box-hobby').innerHTML = '';
    document.getElementById('show-user-details-box-mail').innerHTML = '';
}


function editUser() {
    let userMail = document.getElementById('show-user-details-box-mail').innerHTML
    let user = users.find(u => u.mail == userMail)
    document.getElementById('show-user-details-box-name').innerHTML = `<input class="change-user-details" id="user-detail-view-change-name" type="text" value="${user.name}">`;
    document.getElementById('show-user-details-box-tel').innerHTML = `<input class="change-user-details" id="user-detail-view-change-tel" type="tel" value="${user.phone}">`;
    document.getElementById('show-user-details-box-category').innerHTML = `<input class="change-user-details" id="user-detail-view-change-category" type="text" value="${user.category}">`;
    document.getElementById('show-user-details-box-city').innerHTML = `<input class="change-user-details" id="user-detail-view-change-city" type="tesx" value="${user.city}">`;
    document.getElementById('show-user-details-box-hobby').innerHTML = `<input class="change-user-details" id="user-detail-view-change-hobby" type="text" value="${user.Hobbys}">`;
    document.getElementById('show-user-details-box-mail').innerHTML = `<input class="change-user-details" id="user-detail-view-change-mail" type="mail" value="${user.mail}">`;
    document.getElementById('user-detail-view-btn-box').innerHTML = `<button class="login-area-btn login-area-btn-guest login-btn-shadow" onclick="saveUserChanges('${user.id}')">Save <img src="img/logos/icon-save.svg" style="height: 24px; object-fit: cover; padding-bottom: 2px; margin-left: 24px"></button>`;
}


function saveUserChanges(id) {
    let name = document.getElementById('user-detail-view-change-name').value;
    let phone = document.getElementById('user-detail-view-change-tel').value;
    let category = document.getElementById('user-detail-view-change-category').value;
    let city = document.getElementById('user-detail-view-change-city').value;
    let hobby = document.getElementById('user-detail-view-change-hobby').value;
    let mail = document.getElementById('user-detail-view-change-mail').value;

    updateUserObj(id, name, phone, category, city, hobby, mail)
}


function updateUserObj(id, name, phone, category, city, hobby, mail) {
    let user = users.find(u => u.id == id)
    let index = users.indexOf(user)
    users[index].name = name;
    users[index].phone = phone;
    users[index].category = category;
    users[index].city = city;
    users[index].Hobbys = hobby;
    users[index].mail = mail;
    goBackInViewingModusOfUserDetailView(index);
}


function goBackInViewingModusOfUserDetailView(index) {
    document.getElementById('show-user-details-box-name').innerHTML = `${users[index].name}`;
    document.getElementById('show-user-details-box-tel').innerHTML = `${users[index].phone}`;
    document.getElementById('show-user-details-box-category').innerHTML = `${users[index].category}`;
    document.getElementById('show-user-details-box-city').innerHTML = `${users[index].city}`;
    document.getElementById('show-user-details-box-hobby').innerHTML = `${users[index].Hobbys}`;
    document.getElementById('show-user-details-box-mail').innerHTML = `${users[index].mail}`;
    document.getElementById('user-detail-view-btn-box').innerHTML = `<button class="login-area-btn login-area-btn-login login-btn-shadow" onclick="editUser()">Edit <img src="img/logos/icon-pencil.svg" style="height: 24px; object-fit: cover; padding-bottom: 2px; margin-left: 24px"></button>`;
    uploadUser();
    loadUserListForContacts();
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
    document.getElementById('contact-details-edit-btn').innerHTML = `<button class="login-area-btn login-area-btn-guest login-btn-shadow" onclick="showUserDetailsContact('${user.mail}')">Cancel <img src="img/close-icon.png" style="height: 16px; object-fit: cover; padding-bottom: 2px; margin-left:24px;"></button><button class="login-area-btn login-area-btn-guest login-btn-shadow" onclick="saveUserChangesContact('${user.id}')">Save <img src="img/logos/icon-save.svg" style="height: 24px; object-fit: cover; padding-bottom: 2px; margin-left: 24px"></button>`;
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