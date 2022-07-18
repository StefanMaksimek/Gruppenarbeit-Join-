function showUserDetails(user) {
    let userObj = users.find(t => t.name == user);
    let icon = userObj.icon;
    let mail = userObj.mail;
    let tel = userObj.phone;
    let category = userObj.category;
    let city = userObj.city;
    let hobby = userObj.Hobbys;

    document.getElementById('myModal').classList.add('d-block')
    document.getElementById('show-user-details-container').classList.remove('d-none')

    fillUserDetails(user, icon, mail, tel, category, city, hobby);
}


function fillUserDetails(user, icon, mail, tel, category, city, hobby) {
    fillUserNameForDetailView(user);
    fillUserIconDetailView(icon);
    fillUserMailDetailView(mail);
    fillUserPhoneDetailView(tel);
    fillUserCategoryDetailView(category);
    fillUserCityDetailView(city);
    fillUserHobbyDetailView(hobby)
}


function fillUserNameForDetailView(name) {
    let userName = document.getElementById('show-user-details-box-name')
    userName.innerHTML = `${name}`
}


function fillUserIconDetailView(icon) {
    let userIcon = document.getElementById('show-user-details-box-icon')
    userIcon.src = `${icon}`
}


function fillUserMailDetailView(mail) {
    let userMail = document.getElementById('show-user-details-box-mail')
    userMail.innerHTML = `${mail}`
}


function fillUserPhoneDetailView(tel) {
    let userTel = document.getElementById('show-user-details-box-tel')
    userTel.innerHTML = `${tel}`
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
    document.getElementById('show-user-details-box-mail').innerHTML = '';
    document.getElementById('show-user-details-box-tel').innerHTML = '';
    document.getElementById('show-user-details-box-category').innerHTML = '';
    document.getElementById('show-user-details-box-city').innerHTML = '';
    document.getElementById('show-user-details-box-hobby').innerHTML = '';
}