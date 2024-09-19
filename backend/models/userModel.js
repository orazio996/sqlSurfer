class User {
    id;
    username;
    password;

    constructor(id, username, password){
        this.id = id;
        this.username = username;
        this.password = password;
    }

    constructor(user){
        this.id = user.id
        this.username = user.username
        this.password = user.password
    }
}