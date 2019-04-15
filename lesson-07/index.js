/*
Обязательное задание ( 3 балла )
Создайте элемент 'p', при клике на котором появляется картинка размером 100px
При наведении указателя мышки на картинку ее размер должен плавно увеличиваться до 200px
При клике на картинке она должна исчезать
*/
var paragraph = document.body.appendChild(document.createElement('p'))
paragraph.style = `
        color: blue;
        `
paragraph.innerText = 'Click me!'
var img = document.createElement('img')
img.src = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
img.style = `
        width: 100px;
        height: 100px;
        
        `
img.className = 'img'
paragraph.addEventListener('click', function(event){
  document.body.appendChild(img)})
img.addEventListener('mouseover', function (event) {
       document.querySelector('img').style = `
                        width: 200px;
                        height: 200px;
                        transition: all 2s;
                `
})
img.addEventListener('click', function(event){
        document.querySelector('img').style.display = 'none'
})

/*
Создайте коллекцию вложенных друг в друга html-элементов
с обработчиками событий click, mouseover, mouseout
var collection = []
function over ( event ) {
    ...
}
function out ( event ) {
    ...
}
function clickHandler ( event ) {
    ...
}
[ "first", "second", "third", "fourth" ].forEach (
    function ( tag, index, arr  ) {
        ...
    }
)
Установите атрибуты стиля width и height такие, 
чтобы вложенные элементы были меньше размером, чем родитель
Установите значение #ff00ff50 атрибута background-color каждому элементу
Установите значение dotted 1px yellow; атрибута border каждому элементу
При наступлении события mouseover значение атрибута background-color должно меняться на #ffff0050
При наступлении события mouseout атрибуту background-color должно устанавливаться исходное значение
При наступлении события click элемент должен быть удален
При наведении мышки на элемент должна появляться подсказка
с его именем ( "first", "second", "third", "fourth" )
*/
console.time('start')
var elemData = {
   name: "div",
    attrs: {
       className: "container",
       title: ['first','second','third','fourth'],
       style: `
           top: 20px;
           left: 20px;
           border: dotted 1px yellow;
           background-color:#ff00ff50;
       `
   }
}

function addElement ( elemNum, parentElem ) {
   var elem = parentElem.appendChild (
       document.createElement ( elemData.name )
   )
   elem.num = elemNum

   for ( var attr in elemData.attrs ) 
      elem [ attr ] = elemData.attrs [ attr ]
   elem.title = elemData.attrs.title[elemNum]
   elem.style.width = `${400 - elemNum * 50}px`
   elem.style.height = `${400 - elemNum * 50}px`
   
   elem.addEventListener ( 'click', clickHandler )
   elem.addEventListener('mouseover', over)
   elem.addEventListener('mouseout',  out)
   return elem
}

var collection = []
collection [0] = addElement ( 0, document.body )
elemData.attrs.title.forEach (
    function ( tag, index  ) {
        index === 0 ? null : 
            collection.push (
                addElement ( index, collection [ index - 1 ])
            )
    }
)

function over (event){
    event.target.style.backgroundColor = '#ffff0050'
}

function out(event){
     event.target.style.backgroundColor = '#ff00ff50'
}

function clickHandler (event){

    event.target.remove()
}
console.timeEnd('start')

/*
Условия предыдущего задания изменить так:
var collection = []
function enter ( event ) {
    ...
}
function leave ( event ) {
    ...
}
function clickHandler ( event ) {
    ...
}
[ 1, 2, 3, 4, 5, 6, 7 ].forEach (
    ...
)
при удалении элемента его потомки должны оставаться
*/
var elemData = {
    name: "div",
     attrs: {
        className: "container",
        title: ['first','second','third','fourth'],
        style: `
            top: 20px;
            left: 20px;
            border: dotted 1px yellow;
            background-color:#ff00ff50;
        `
    }
 }
 
 function addElement ( elemNum, parentElem ) {
    var elem = parentElem.appendChild (
        document.createElement ( elemData.name )
    )
    elem.num = elemNum
 
    for ( var attr in elemData.attrs ) 
       elem [ attr ] = elemData.attrs [ attr ]
    elem.title = elemData.attrs.title[elemNum]
    elem.style.width = `${400 - elemNum * 50}px`
    elem.style.height = `${400 - elemNum * 50}px`
    elem.addEventListener ('mouseover', enter)
    elem.addEventListener ('mouseout',leave)
    elem.addEventListener ( 'click', clickHandler )
   
    return elem
 }
 
 var collection = []
 collection [0] = addElement ( 0, document.body )
 elemData.attrs.title.forEach (
     function ( tag, index  ) {
         index === 0 ? null : 
             collection.push (
                 addElement ( index, collection [ index - 1 ])
             )
     }
 )
 
 function enter (event){
     event.target.style.backgroundColor = '#ffff0050'
 }
 
 function leave (event){
      event.target.style.backgroundColor = '#ff00ff50'
 }
 
 function clickHandler (event) {
     event.target.children.length ?
         event.target.parentNode.appendChild(
             event.target.children[0]) : null
         event.target.remove()
 }
 
 