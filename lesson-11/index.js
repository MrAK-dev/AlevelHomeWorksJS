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