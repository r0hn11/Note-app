// create a notes app

// if(location.href.slice(location.href.lastIndexOf('/'),).includes('notes')){}
// else{location.href = '../notes2.html'}

const menu_icon = document.getElementById('menu_icon')
const menu = document.getElementById('menu')
const menu_links = document.querySelectorAll('#menu>li')
const confirm_box = document.getElementById('confirm')
const confirm_links = document.querySelectorAll('#confirm>li')
const about_box = document.getElementById('about')
const heading = document.querySelector('.container>.heading')
const color_box = document.querySelector('.container>.swatch_par')
const swatches = document.querySelectorAll('.container>.swatch_par>.swatch')
const note_title = document.getElementById('note_title')
const note = document.getElementById('note')

const colors = [
    'hsl(50, 100%, 60%)',
    'hsl(101, 50%, 60%)',
    'hsl(194, 93%, 70%)',
    'hsl(333, 80%, 85%)',
    'hsl(230, 100%, 74%)'
]
const text_colors = ['#0009', '#fff', '#0009', '#0009', '#fff']

let i=0;
while(i!=swatches.length){
    swatches[i].style.background = colors[i]
    i++
}

// inputs

if(localStorage.getItem('title') != null){note_title.value = localStorage.getItem('title')}
else{note_title.value = window.innerWidth+' '+window.innerHeight}
if(localStorage.getItem('note') != null){note.value = localStorage.getItem('note')}
if(localStorage.getItem('theme') != null){document.documentElement.style.setProperty('--clr', localStorage.getItem('theme'))}
if(localStorage.getItem('theme') != null){document.documentElement.style.setProperty('--txt-theme', localStorage.getItem('theme-txt'))}

note_title.onmousemove = ()=>{
    localStorage.setItem('title', note_title.value)
}
note.onmousemove = ()=>{
    localStorage.setItem('note', note.value)
}

// menus

menu_icon.addEventListener('click', ()=>{
    menu.classList.toggle('hidden')
    color_box.classList.remove('drop_down')
    confirm_box.classList.add('hidden')
    about_box.classList.add('hidden')
})

function setDark(){
    document.documentElement.style.setProperty('--bg','#222')
    document.documentElement.style.setProperty('--contrast','#ddd')
    document.documentElement.style.setProperty('--card-bg','#333')
    document.documentElement.style.setProperty('--card-bg-dark','#555')
    document.documentElement.style.setProperty('--txt','#ddd')
    document.documentElement.style.setProperty('--txt-fade','#fff9')
    document.documentElement.style.setProperty('--shd','#0007')
}

function setLight(){
    document.documentElement.style.setProperty('--bg','#eee')
    document.documentElement.style.setProperty('--contrast','#444')
    document.documentElement.style.setProperty('--card-bg','#fff')
    document.documentElement.style.setProperty('--card-bg-dark','#eee')
    document.documentElement.style.setProperty('--txt','#000a')
    document.documentElement.style.setProperty('--txt-fade','#0009')
    document.documentElement.style.setProperty('--shd','#0003')
}

var theme
if(localStorage.getItem('theme_flag')!=null){
    theme = localStorage.getItem('theme_flag')
    if(theme == 1){setDark()}
    else{setLight()}
}
else{
    if(window.matchMedia('(prefers-color-scheme: dark)').matches){
        setDark()
        theme = 1
    }
    else{
        setLight()
        theme = 0
    }
    localStorage.setItem('theme_flag', theme)
}
menu_links[0].onclick = ()=>{
    if(theme == 0){
        setDark()
        theme = 1;
    }
    else if(theme == 1){
        setLight()
        theme = 0;
    }
    localStorage.setItem('theme_flag', theme)
}

menu_links[1].onclick = ()=>{
    color_box.classList.add('drop_down')
    menu.classList.add('hidden')
    let choice
    for(let i=0;i<swatches.length;i++){
        swatches[i].addEventListener('click',()=>{
            console.log(i)
            choice = i
            document.documentElement.style.setProperty('--clr',colors[choice])
            document.documentElement.style.setProperty('--txt-theme',text_colors[choice])
            localStorage.setItem('theme',colors[choice])
            localStorage.setItem('theme-txt',text_colors[choice])
        })
    }
}

menu_links[2].onclick = ()=>{
    confirm_box.classList.remove('hidden')
    menu.classList.add('hidden')
    confirm_links[0].onclick = ()=>{
        localStorage.clear()
        location.reload()
    }
    confirm_links[1].onclick = ()=>{
        confirm_box.classList.add('hidden')
        menu.classList.remove('hidden')
    }
}


menu_links[3].onclick = ()=>{
    about_box.classList.remove('hidden')
    menu.classList.add('hidden')
}

// closing on outside click
const ids = ['body', 'root', 'note', 'head', 'about']
window.onclick = (e)=>{
    if(ids.includes(e.target.id.toString())){
        menu.classList.add('hidden')
        about_box.classList.add('hidden')
        color_box.classList.remove('drop_down')
    }
}

