class User {
    id;
    mail;
    password;
    icon;
    category;
    Hobbys;
    city;
    name;
    telephon;

    constructor(userInfo) {
        this.id = userInfo.id;
        this.mail = userInfo.mail;
        this.password = userInfo.password;
        this.icon = userInfo.icon;
        this.category = userInfo.category;
        this.Hobbys = userInfo.Hobbys;
        this.city = userInfo.city;
        this.name = userInfo.name;
        this.telephon = userInfo.telephon;
    }
}