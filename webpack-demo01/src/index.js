import avatar from './avatar.jpg'
import './index.css'

console.log(avatar)

let img = new Image()
img.src = avatar
img.classList.add('avatar')


const root = document.getElementById('root')
root.append(img)

console.log('lx')