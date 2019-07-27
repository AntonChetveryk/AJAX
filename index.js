/*
let number = 5;
const promise = new Promise((resolve, reject) => {
	setTimeout(() => {
		if (number >= 10) {
			resolve('bigger then 10')
		} else {
			reject('number is smaller')
		}

	}, 2000)
})

promise.then((resolve) => {
	console.log(resolve);
}).catch((reject) => {
	console.log(reject);
})

console.log(promise);


function defer(delay) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, delay);
	})
}

defer(2000).then(() => {
	console.log('hello');
	return defer(3000);
}).then(() => {
	console.log('How are you?')
})


function ownFetch(url, cb) {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', url);
	xhr.addEventListener('load', () => {
		console.log('success');
	})
	xhr.send();
}
*/


console.log('        Users');

let users = [];
const API = 'https://jsonplaceholder.typicode.com/';
const nameEl = document.getElementById('name');
const emailEl = document.getElementById('email');
const btnCreate = document.getElementById('create');
const container = document.querySelector('.container');

btnCreate.addEventListener('click', () => {
	const user = {
		name: nameEl.value,
		email: emailEl.value
	};
	console.log(user);
	fetch(API + 'users', {
		method: 'POST',
		body: JSON.stringify(user)
	}).then((res) => {
		return res.json()
	}).then((id) => {
		user.id = id;
		users.push(user);
		renderUsers();
	}).catch((error) => {
		console.log(error)
	});
})

function getUsers() {
	return fetch(API + 'users').then(res => {
		return res.json();
	}).catch(err => {
		console.log('error');
	})
}

function deleteUsers(userId) {
	return fetch(API + 'users/' + userId, {
		method: 'DELETE'
	}).then(() => {
		return users = users.filter(function (user) {
			return user.id !== userId;
		})
	}).catch(err => {
		console.log('error');
	})
}

function renderUsers() {
	container.innerHTML = '';
	users.forEach((user) => {
		const div = document.createElement('div');
		div.style.marginTop = '50px';
		div.innerHTML = `<h4>${user.name}</h4><h5>${user.email}</h5>`
		const btn = document.createElement('button');
		btn.innerText = 'delete';
		btn.addEventListener('click', () => {
			deleteUsers(user.id).then(() => {
				div.remove();
				btn.remove();
			})
		})
		container.append(div);
		container.append(btn);
	})
}
getUsers().then(data => {
	users = data;
	renderUsers()
})