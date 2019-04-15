/*
Объявите функцию без формальных параметров,
которая выводит в консоль сама себя и все переданные ей аргументы
Вызовите эту функцию с аргументами 10, false, "google"
*/
function func () {
	console.log(func,arguments)
}

func(10,false,'Google')

/*
Объявите функцию userInfo, которая выводит в консоль:
свойство "Дата регистрации: " + свойство data контекста вызова, 
если свойство registered имеет значение true
сообщение "Незарегистрированный пользователь: " + свойство name в противном случае
( используйте переменные в литералах )
Создайте два объекта с одинаковым набором свойств:
name ( строка )
registered ( логическое значение )
data ( дата в формате "дд.мм.гг" )
Добавьте каждому объекту метод getInfo, который будет ссылкой на функцию userInfo
Вызовите каждый метод
*/
var registredUser = {
	name:'John',
	registred: true,
	data:'07.11.2015' 
};

var	unregistredUser = {
	name:'Vasya',
	registred:false,
	data:'20.02.2020',
};

registredUser.getInfo = userInfo;

unregistredUser.getInfo = userInfo;

registredUser.getInfo();

unregistredUser.getInfo();

function userInfo(){
	this.registred === true ? console.log(`Дата регистрации: ${this.data}`) :
		console.log(`Незарегистрированный пользователь: ${this.name}`)

}

/*
Есть три объекта: users, posts и comments
( готовые объекты уже ждут вас по ссылке )
Написать код функции getPostComments ( postId ),
которая возвращает массив всех комментариев к посту
с идентификатором postId
( с именем автора комментария и текстом комментария )
*/

var users = {
	14587: {
			name: "Ivan",
			email: "ivan78@gmail.com"
	},
	28419: {
			name: "Georg",
			email: "georg.klep@gmail.com"
	},
	41457: {
			name: "Stephan",
			email: "stephan.borg@gmail.com"
	}
}

var posts = {
	7891451: {
			author: 14587,
			text: "Imagine we can encapsulate these secondary responsibilities in functions"
	},
	7891452: {
			author: 28419,
			text: `В конструкторе ключевое слово super используется как функция, вызывающая родительский конструктор. 
					Её необходимо вызвать до первого обращения к ключевому слову this в теле конструктора. 
					Ключевое слово super также может быть использовано для вызова функций родительского объекта`
	},
	7891453: {
			author: 28419,
			text: `DOM не обрабатывает или не вынуждает проверять пространство имен как таковое. 
					Префикс пространства имен, когда он связан с конкретным узлом, не может быть изменен`
	},
	7891454: {
			author: 14587,
			text: "Ключевое слово super используется для вызова функций, принадлежащих родителю объекта"
	}
}

var comments = {
	91078454: {
			postId: 7891451,
			author: 28419,
			text: `The static String.fromCharCode() method returns a string created 
					from the specified sequence of UTF-16 code units`
	},
	91078455: {
			postId: 7891451,
			author: 41457,
			text: `HTML элемент <template> — это механизм для отложенного рендера клиентского контента, 
					который не отображается во время загрузки, но может быть инициализирован при помощи JavaScript`
	},
	91078457: {
			postId: 7891452,
			author: 41457,
			text: "Глобальный объект String является конструктором строк, или, последовательностей символов"
	},
	91078458: {
			postId: 7891452,
			author: 14587,
			text: `The Element.namespaceURI read-only property returns the namespace URI of the element, 
					or null if the element is not in a namespace`
	}
}

function getPostComments( postId ) {
	var postComments = []
	for( var comment in comments )
		 if ( comments[ comment ].postId === postId )
			  postComments.push ({
				   author: users[ comments[comment].author ].name,
				   text: comments[ comment ].text
			  })
	return postComments
}