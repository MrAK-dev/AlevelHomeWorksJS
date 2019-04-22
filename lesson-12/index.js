/*
Захостить на гитхабе приложение, которое:
читает куки на клиенте, и если там есть дата последнего посещения, выводит ее на страницу
пишет в куки на клиенте текущую дату посещения
*/
function addToCookie(){
    var res = document.cookie
        .split ( "; " )
            .map ( x =>
                Object.assign (
                    {},
                    (
                        arr => {
                         return { [ arr [0] ] : arr [1] }
                        }
                    ) ( x.split ( "=" ))
                )
            )
                .find(
                    date => {
                        return date.lastVisit
                    }
                )
    res ? document.body.appendChild(
            document.createElement('p')).innerText = `Last visit was : ${res.lastVisit}` 
                : null
    document.cookie = `lastVisit=${new Date().toLocaleString()}`   
}
/*
Объявить функцию, которая будет вызываться в момент изменения хэш-части адреса страницы
и сохранять в localStorage клиента hash-часть адреса страницы как pageId
и время входа ( в секундах ) как startTime
Назначить эту функцию обработчиком события hashchange объекта window
Желательно, чтобы при изменении хеш-части адреса происходило обновление контента страницы без перезагрузки
( например, изменялся заголовок и картинка, чтобы создать иллюзию перехода на новую страницу )
Отслеживать в панели разработчика изменения в localStorage
*/
let storageObject = {}
let hashhistory = []
window.addEventListener('hashchange',function(event){
	localStorage.clear()
	storageObject = {
		pageId : `${location.hash}`,
		startTime: `${new Date().getTime()}`
	}
	localStorage.setItem('history',JSON.stringify(storageObject))
	hashhistory.push(JSON.parse(localStorage.getItem('history')))
	console.log('hash was changed')
	console.log(hashhistory)
	localStorage.setItem('history',JSON.stringify(hashhistory))
})
/*
Напилить код, который:
вставляет кнопку на страницу
добавляет обработчика события click кнопки
Обработчик события click:
вычисляет случайное целое число от 1 до 20000 и помещает его в переменную winner
добавляет картинку
ждет 4 секунды
плавно изменяет непрозрачность картинки до 0, в процессе изменяя src картинки на новое значение
плавно изменяет непрозрачность картинки до 1
ждет еще 2 секунды, и делает fetch-запрос на гитхабовский API, чтобы получить данные юзера под номером winner
при получении ответа изменяет src картинки на аватарку юзера, а так же вставляет логин юзера под фотографией
ждет еще 10 секунд и удаляет картинку и подпись
На время показа картинок кнопку лучше прятать
*/
let createElem = elem => document.body.appendChild(
	document.createElement(elem))
let timeOut = time => new Promise (
	resolve => setTimeout(() => resolve(),time)
)
let buttonPlay = createElem('button')
buttonPlay.innerText = 'Tip to play'
buttonPlay.addEventListener('click',
	event => {
		let winner = Math.round(Math.random() * 20000)
		event.target.style.display = 'none'
		let img = createElem('img')
		img.height = '200'
		img.src = "https://thumbs.gfycat.com/LivelyObviousAnhinga-size_restricted.gif"
		img.style.transition = 'all 0.5s'
		let userName = createElem('h4')
		timeOut ( 4000 )
       		.then ( () => img.src = "https://thumbs.gfycat.com/OddWideHookersealion-small.gif" )
		timeOut ( 3500 )
        	.then ( () => img.style.opacity = 0 ) 
		timeOut ( 4500 )
        	.then ( () => img.style.opacity = 1 )
		timeOut ( 5500 )
        	.then (
            	() => {
					let exit = true
					function getAvatar () {
    					fetch (`https://api.github.com/users/${winner}`)
        					.then (
            					response => response.status === 200 ? response.json ()
                					.then ( user => 
										{
											img.src = user.avatar_url
											userName.innerText = `Winner is: ${user.name}`
										},
                							error => exit = false
                					) : null
        					)
    					exit ? null : getAvatar ()		
					}
					getAvatar()
                }
			)
		 timeOut ( 10000 )
        	.then ( () => {
            	img.remove()
            	userName.remove()
            	event.target.style.display = "block"
        	})
	}
)