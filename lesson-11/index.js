/*
Создать файл с данными в формате JSON
Это должен быть массив объектов с двумя свойствами: title и ref
title - название картинки
ref - ссылка на картинку
Задание:
Загрузить данные из JSON-файла
Распарсить данные в массив
Вывести на страницу картинки и подписи к ним
*/
function loadData(url){
	return new Promise(
		function(resolve,reject){
			const request = new XMLHttpRequest()
			request.open('GET',url)

			request.onreadystatechange = function(event){
				event.target.readyState === 4 ? 
                    event.target.status === 200 ? 
                        resolve(event.target.responseText) :
	 					    reject(event.target.statusText) : null  
			}
			request.send()
		}
	)
}
loadData('data.json').then(
	response => JSON.parse(response).forEach(
			picture => {
                    let image = document.body.appendChild(document.createElement('img'))
                        image.src = picture.url
                        image.tytle = picture.name
                        image.style.margin = '10px'
                        image.style.height = '200px'
                    }
		),
	err => console.log(err)
)

/*
var messages = [
    "backspace",
    "enter",
    "shift",
    "control",
    "delete",
    "space",
    "subtract"
]
messages.getKey = () => {
    var key = new Date().toLocaleString().split(", ")[1]
    return log [ key ] ? log [ key + "[2]" ] ? key + "[3]" : key + "[2]" : key
}
var log = {}
sendMessage
var sendMessage = message => new Promise (
    resolve => setTimeout (
        () => resolve ( message ),
        Math.random () * 7000
    )
)
Задача: напилить код, который вызывает функцию sendMessage для каждого элемента массива messages
и логирует полученные сообщения в объекте log следующим образом:
log
{
    22:25:57: "backspace"
    22:25:58: "shift"
    22:25:59: "subtract"
    22:25:59[2]: "enter"
    22:25:59[3]: "delete"
    22:26:01: "control"
    22:26:01[2]: "space"
}
*/
var messages = [
    "backspace",
    "enter",
    "shift",
    "control",
    "delete",
    "space",
    "subtract"
]

messages.getKey = () => {
    var key = new Date().toLocaleString().split(", ")[1]
    return log [ key ] ? log [ key + "[2]" ] ? key + "[3]" : key + "[2]" : key
}

var log = {}

var sendMessage = message => new Promise (
    resolve => setTimeout (
        () => resolve ( message ),
        Math.random () * 7000
    )
)

messages.forEach(
    (current,index,arr) => sendMessage(current)
        .then(
            response => Object.assign(log,
                {[arr.getKey()]: current}
            )
         )
)
/*
Изменим условие предыдущего задания
Массив messages, объект log и функция sendMessage остаются теми же
Немного изменится метод getKey:
messages.getKey = () => new Date().toLocaleString().split(", ")[1]
Нужно напилить код рекурсивной функции recursive,
которая вызывает sendMessage поочередно с каждым элементом массива messages, 
но только после того, как предыдущий месседж будет залогирован в объекте log
var sendAll = () => {
    var index = 0
    function recursive () {
        ...
    }
    recursive ()
}

sendAll()
*/
var messages = [
    "backspace",
    "enter",
    "shift",
    "control",
    "delete",
    "space",
    "subtract"
]

messages.getKey = () => new Date().toLocaleString().split(", ")[1]

var log = {}

var sendMessage = message => new Promise (
    resolve => setTimeout (
        () => resolve ( message ),
        Math.random () * 7000
    )
)

var sendAll = () => {
    var index = 0
    function recursive () {
        sendMessage(messages[index++])
            .then(
                response => {
                    if(!response) return
                    Object.assign(log,
                        {[messages.getKey()] : response}
                        )
                    recursive()
                }
            )
    }
    recursive ()
}

sendAll()