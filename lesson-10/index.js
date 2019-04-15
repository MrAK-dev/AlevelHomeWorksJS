/*
Логирование поступающих сообщений в объекте log
Задан массив сообщений и пустой объект log:
let messages = [
    "backspace",
    "enter",
    "shift",
    "control",
    "delete",
    "space",
    "subtract"
]
var log = {}
Далее, есть функция, отправляющая сообщения в случайном порядке в случайное время:
var sendMessage = ( message, callback ) => 
    setTimeout (
        () => callback ( message ),
        Math.random () * 7000
    )
Обратите внимание, что эта функция получает при вызове не только текст сообщения, 
но и кллбэк-функцию, которой нужно передать это сообщение
С помощью кода:
messages.forEach (
    message => sendMessage ( message, handler )
)
инициируем отправку сообщений
Ваша задача - напилить код функции handler,
которая получает сообщение и заносит его в объект log
в виде нового свойства,
значение которого - текст поступившего сообщения,
а ключ ( имя свойства ) - это время поступления сообщения ( в виде строки )
log
{
    19:34:08: "control"
    19:34:08[2]: "backspace"
    19:34:09: "subtract"
    19:34:09[2]: "enter"
    19:34:11: "delete"
    19:34:11[2]: "shift"
}
В помощь вам уже есть функция, которая формирует ключ очередного сообщения:
getKey = () => {
    var key = new Date().toLocaleString().split(", ")[1]
    return log [ key ] ? key + "[2]" : key
}
На случай, если два сообщения поступят одновременно, функция getKey добавляет "[2]" 
к значению ключа ( иначе значения ключей двух сообщений будут совпадать )
*/
let messages = [
    "backspace",
    "enter",
    "shift",
    "control",
    "delete",
    "space",
    "subtract"
]

var log = {}

var sendMessage = ( message, callback ) => 
    setTimeout (
        () => callback ( message ),
        Math.random () * 7000
    )

var handler = message => {
    Object.assign(log,
        {[getKey()] : message}
    )
}
messages.forEach (
    message => sendMessage ( message, handler )
)

getKey = () => {
    var key = new Date().toLocaleString().split(", ")[1]
    return log [ key ] ? key + "[2]" : key
}
/*
Допилите код конструктора User, дополнив его акцессорами приватного свойства presence так, чтобы после выполнения скрипта:

function User ( name ) {
    this.name = name
    var presence = false
    ...
}
let user = new User ( "Ivan" )
console.info ( user.presence )
в консоли было:
"Ivan is absent"
а после выполнения кода:
user.presence = "+"
console.info ( user.presence )
в консоли было:
"Ivan is present"
*/
function User ( name ) {
    this.name = name
    var presence = false
    Object.defineProperty ( this, "presence", {
        get: () =>
            presence ? 
                `${this.name} is present` : 
                    `${this.name} is absent`,
        set: newVal =>
            presence = newVal + "***" 
    })
}

let user = new User ( "Ivan" )
console.info ( user.presence )
user.presence = '+'
console.info ( user.presence )

/*
Объявить функцию-конструктор User
:warning: Конструктор должен принимать аргументы, описывающие юзера
:clipboard: Статические свойства и методы конструктора
avatars
массив
admin
объект
etAvatar
метод, возвращающий извлеченный из массива avatars элемент
Собственные свойства экземпляров
:one: name ( имя пользователя )
:two: email
:three: photoURL ( URL фотографии пользователя )
Конструктор должен иметь дефолтные значения для всех аргументов
дефолтное значение URL фотографии пользователя должно быть результатом работы статического метода getAvatar
:clipboard: Унаследованные свойства экземпляров
:five: неперечислимое неизменяемое свойство messageBox - элемент DOM
messageBox - это контейнер, куда будут выводиться сообщения всех пользователей и admin
при выводе сообщения пользователя в messageBox должны отображаться его аватар и имя
:four: унаследованные методы write и read
запись осуществляется в messageBox, чтение - из messageBox
*/
function User (name = 'unknown',email = 'johndoe@gmail.com',photoURL = User.getAvatar()) {
    this.name = name
    this.email = email
    this.photoURL = photoURL
}

User.avatars = [ 
    "https://pre00.deviantart.net/50f9/th/pre/i/2011/217/e/8/pikachu_2_by_nostalgiaattack-d45jd3i.png",
    "https://cdn.diversityavatars.com/wp-content/uploads/2018/01/Vector-Smart-Object-5.png",
    "https://cdn4.iconfinder.com/data/icons/user-avatar-flat-icons/512/User_Avatar-31-512.png",
    "http://icons.iconarchive.com/icons/hopstarter/face-avatars/256/Male-Face-L3-icon.png",
    "https://findicons.com/files/icons/1072/face_avatars/300/i05.png",
    "http://www.iconarchive.com/download/i51043/hopstarter/halloween-avatars/Gomez.ico",
    "http://icons.iconarchive.com/icons/hopstarter/halloween-avatars/256/Zombie-2-icon.png",
    "https://vignette.wikia.nocookie.net/yogscast/images/8/8a/Avatar_Turps_2015.jpg"
]

User.admin = {
    photoURL: "https://i.pinimg.com/originals/3d/47/4f/3d474f82ff71595e8081f9a120892ae8.gif",
    name: "admin"
}
    
User.getAvatar = function () {
    return this.avatars.shift()
}

User.prototype.messageBox = (function() {
    let box = document.createElement('div')
    document.body.appendChild(box)
    box.style = `
        position: fixed;
        bottom: 0;
        right: 0;
        width: 300px;
        height: 200px;
        overflow: auto;
        border: 1px solid purple;
        padding: 10px;
        background-color: white;
    `
    box.avatar = box.appendChild(
        document.createElement('img')
    )
    box.avatar.style.width = '50px'
    box.nick = box.appendChild(
        document.createElement('span')
    )
    box.nick.style = 'font-weight: bold; color: orange; padding-left:10px;'
    box.message = box.appendChild(
        document.createElement('textarea')
    )
    box.message.placeholder = 'Message'
    box.message.oninput = function (event) {
        event.target.parentNode.querySelector('img').src = User.admin.photoURL
        event.target.parentNode.querySelector('span').innerHTML = User.admin.name
    }
    box.message.style = 'width: 100%; height: 100%; background-color: black; color: orange;'
    return box
})()

User.prototype.write = function(text) {
    this.messageBox.avatar.src = this.photoURL
    this.messageBox.nick.innerHTML = this.name
    this.messageBox.message.value = text
}
User.prototype.read = function () {
    this.messageBox.avatar.src = this.photoURL
    this.messageBox.nick.innerHTML = this.name
    this.info = this.messageBox.message.value
    console.log ( `${this.name} прочитал сообщение:\n${this.info}` )
    this.messageBox.message.value = "OK"
}

var users = []
users.push ( new User ( "Иван" ) )
users.push ( new User ( 'Alex', "alex@gmail.com" ) )
users.push ( new User ( 'Bob', "bob777@gmail.com" ) )
users.push ( new User ( 'Dima', "dima888@gmail.com" ) )
users.push ( new User ( 'Fima', "fima999@gmail.com" ) )

var k = 1
users.forEach ( 
     function ( user ) {
          setTimeout ( 
               function () {
                    user.write ( `Hello, I'm ${user.name}` )
               }, 3000 * k++
          )
} )
