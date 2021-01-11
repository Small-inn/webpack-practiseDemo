import avatar from './avatar.jpg'
import './index.css'

console.log(avatar)

let img = new Image()
img.src = avatar
img.classList.add('avatar')


const root = document.getElementById('root')
root.append(img)

function test() {
  console.log(1111)
  return 1231783216
}

test()