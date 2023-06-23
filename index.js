/* 
*Доп задание:

*используйте https://jsonplaceholder.typicode.com/ как в заданиях по асинхронному JS и затем ваша задача вывести список пользователей (добавить лоудер еще).

*затем задача следующая:

*когда кликнете на пользователя, нужно вывести его детали ниже или где угодно, но в html (показан пример на скрине, реализовать можете дизайн как хотите). 

*https://jsonplaceholder.typicode.com/users

 !! ВАЖНО !! 

*Выводить нужно детали с помощью дополнительного запроса на другой эндпоинт уже по айдишнику пользователя.

*https://jsonplaceholder.typicode.com/users/${userId}
*/

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'
const dataContainer = document.querySelector('#data-container')

const eventHandler = async (event) => {
  const { target } = event
  if (target.className === 'item_link') {
    try {
      deleteUserContainer()
      deleteLinkHover()
      toggleLoader()
      target.classList.add('item_link-hover')
      userId = target.dataset.id
      const response = await fetch(`${USERS_URL}/${userId}`)
      if (!response.ok) {
        throw new Error('Ошибка загрузки информации о пользователе')
      }
      const userData = await response.json()

      const userHTML = createElementUserData(userData)
      document.body.append(userHTML)
    } catch (error) {
      console.error(error)
    } finally {
      toggleLoader()
    }
  }
}

dataContainer.addEventListener('click', eventHandler)

const deleteUserContainer = () => {
  const deleteEl = document.querySelector('.user-container')
  if (deleteEl) deleteEl.remove()
}

const toggleLoader = () => {
  const loader = document.querySelector('#loader')
  if (loader) loader.toggleAttribute('hidden')
}

const deleteLinkHover = () => {
  const elItemLinkHover = document.querySelector('.item_link-hover')

  if (elItemLinkHover) elItemLinkHover.classList.remove('item_link-hover')
}

const createElement = (tag, nameClass) => {
  const el = document.createElement(tag)
  if (nameClass) el.className = nameClass
  return el
}
const createElementUser = ({ name, id }) => {
  const item = createElement('li', 'item')
  const link = createElement('a', 'item_link')
  link.type = 'button'
  link.dataset.id = `${id}`
  link.textContent = `${name}`
  item.append(link)
  return item
}

const createElementUserData = ({ name, username, email, phone, website }) => {
  const userContainer = createElement('div', 'user-container')
  const userTitle = createElement('h2')
  userTitle.textContent = `${name}`
  const userList = createElement('ul', 'user-list')
  const userName = createElement('li')
  userName.textContent = `Username: ${username}`
  const userEmail = createElement('li')
  userEmail.textContent = `Email: ${email}`
  const userPhone = createElement('li')
  userPhone.textContent = `Phone: ${phone}`
  const userWebsite = createElement('li')
  userWebsite.textContent = `Website: ${website}`
  userList.append(userName, userEmail, userPhone, userWebsite)
  userContainer.append(userTitle, userList)
  return userContainer
}

const getAListOfUsers = async () => {
  try {
    toggleLoader()
    const response = await fetch(USERS_URL)

    if (!response.ok) {
      throw new Error('Ошибка загрузки списка пользователей')
    }
    const usersData = await response.json()
    usersData.forEach((user) => {
      userElementHTML = createElementUser(user)
      dataContainer.append(userElementHTML)
    })
  } catch (error) {
    console.error(error)
  } finally {
    toggleLoader()
  }
}

getAListOfUsers()
