const data = JSON.parse(localStorage.getItem('blogDetail'));
function render() {
    const img = `<div class="single-artcile-bg" style="background-image: url('${data.img}')"></div>`
    document.getElementById('single-article-text').innerHTML = img
    const title = `<h2>${data.title}</h2>`
    document.getElementById('title').innerHTML = title
    const desc = `<p>${data.description}</p>`
    document.getElementById('desc').innerHTML = desc
}
render()