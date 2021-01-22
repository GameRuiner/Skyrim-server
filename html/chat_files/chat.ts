// const ipAndPort: string = window.location.href.split('/')[2];
// const ip: string = ipAndPort.split(':')[0];
// const uiPort: number = +ipAndPort.split(':')[1];

const ip: string = '127.0.0.1';
const uiPort: number = 3000;

const chat_size: number = 50, // сколько сообщений помещаем в чат
	common_chat_size: number = 100, // размер общего чата
	I_AM: string = 'Exhort'; // никнейм, тянуть с api.

const dom_time = document.getElementById('header__time'),
	head_chatname = document.getElementById('header__chatname'),
	menu_ul = document.getElementById('menu__ul'),
	chat_sendform = document.getElementById('chat__sendform') as HTMLFormElement,
	chat_sendform_button = document.querySelector(
		'#chat__sendform button'
	) as HTMLButtonElement;

// по этой штуке находим какие менюхи соотносятся с какими чатами
const chats = {
	menu__ul__1: 'chat__1',
	menu__ul__2: 'chat__2',
	menu__ul__3: 'chat__3',
	menu__ul__4: 'chat__4',
};

let isScroll = true, // по этой штуке определяется, надо ли опускать скрол при появлении нового сообщения
	author_color = {};

chat_sendform_button.addEventListener('click', () => {
	const chat_uls = Array.from(document.querySelectorAll('.chat__ul'));
	const formData = new FormData(chat_sendform);

	for (let i = 0; i < chat_uls.length; i++) {
		if (!chat_uls[i].classList.contains('hide')) {
			if (i > 0)
				connection.send(
					JSON.stringify({
						type: 'chatMessage',
						text: formData.get('message'),
						channelIdx: i,
					})
				);
		}
	}
	chat_sendform.reset();
});
// chat_sendform.onsubmit = (event) => {
// 	event.preventDefault();
// 	const chat_uls = [...document.querySelectorAll('.chat__ul')];

// 	for (let i = 0; i < chat_uls.length; i++) {
// 		if (!chat_uls[i].classList.contains('hide')) {
// 			if (i > 0)
// 				connection.send(
// 					JSON.stringify({
// 						type: 'chatMessage',
// 						text: event.srcElement[0].value,
// 						channelIdx: i,
// 					})
// 				);
// 		}
// 	}
// 	chat_sendform.reset(); // отмена перезагрузки странцы, потом в ajax можно сделать, если будет ajax
// };

if (menu_ul) {
	menu_ul.addEventListener('click', (event) => {
		// event - слушатель на все вкладки менюхи
		active(event.target as HTMLElement);
	});
}

// т.к. нет скайримского времени на данный момент, то поставил реальное покачто
if (dom_time) {
	const showTime = () => {
		dom_time.innerText = realTime();
	};
	setInterval(showTime, 1000);
}

const realTime = () => {
	const time = new Date();
	let hour = time.getHours().toString();
	let minute = time.getMinutes().toString();

	if (hour.length == 1) {
		hour = '0' + hour;
	}

	if (minute.length == 1) {
		minute = '0' + minute;
	}

	return hour + ':' + minute;
};

const active = (elem: HTMLElement) => {
	// смена цвета вкладок менюхи и смена названия в хедере
	if (!elem.classList.contains('active')) {
		const menu_items = document.getElementsByClassName('menu__ul__item');

		try {
			for (let i = 0; i < menu_items.length; i++) {
				menu_items[i].classList.remove('active');
			}
		} catch (e) {
			console.log(e);
		}

		elem.classList.add('active');

		if (chats.hasOwnProperty(elem.id)) {
			chatShowing(chats[elem.id].replace('chat__', ''));
		}
		const chat__sendform = document.getElementById('chat__sendform');
		const chatline = document.getElementById('chatline');
		if (chat__sendform && chatline) {
			if (elem.id == 'menu__ul__1') {
				// либо можно по innerText
				chat__sendform.style.display = 'none';
				chatline.style.height = '295px';
			} else {
				chat__sendform.style.display = 'flex';
				chatline.style.height = '265px';
			}
		}

		// хз какие будут вкладки, если есть уникальные названия, то сюда
		switch (elem.innerText) {
			case 'Чат':
				head_chatname.innerText = 'Общий Чат';
				break;

			case 'RP':
				head_chatname.innerText = 'Roleplay Чат';
				break;

			default:
				head_chatname.innerText = elem.innerText;
				break;
		}
	}
};

function addMenuItem(name: string) {
	var mdiv = document.createElement('li'),
		menu_items = document.getElementsByClassName('menu__ul__item'),
		num = Object.keys(chats).length + 1;

	mdiv.innerText = name;
	mdiv.classList.add('menu__ul__item');
	mdiv.id = 'menu__ul__' + num;
	menu_ul.appendChild(mdiv);

	chats[mdiv.id] = 'chat__' + num.toString();
	chat_sendform.insertAdjacentHTML(
		'beforebegin',
		'<ul class="chat__ul chat__offli hide" id="chat__' + num + '"></ul>'
	);

	const chat = document.getElementById('chat__' + num);

	chat.onscroll = function () {
		if (chat.scrollTop == chat.scrollHeight - chat.clientHeight) {
			isScroll = true;
		} else {
			isScroll = false;
		}
	};

	if (menu_items.length == 8) {
		// разделитель менюхи на 2 части
		menu_ul.style.flexWrap = 'wrap';
		menu_items[3].insertAdjacentHTML(
			'afterend',
			'<div class="line-break" id="lb"></div>'
		);
	}
}

function removeMenuItem(elem: HTMLElement) {
	var menu_items = [...document.querySelectorAll('.menu__ul__item')],
		chat = document.getElementById(chats[elem.id]);

	delete chats[elem.id];
	chat.remove();
	elem.remove();

	if (menu_items.length < 8 && menu_items.length >= 7) {
		// удаление разделителя менюхи
		menu_ul.style.flexWrap = 'nowrap';
		try {
			// чтобы проверку не делать -- в try/catch, потом можно переделать
			document.getElementById('lb').remove();
		} catch (e) {
			console.log(e);
		}
	}

	active(document.getElementById('menu__ul__1')); // переход после удаления на общий чат
}

function chatShowing(id: string) {
	// хайдит и шовит нужный чат
	var chat_uls = document.getElementsByClassName('chat__ul'),
		chat = document.getElementById('chat__' + id);

	try {
		for (let i = 0; i < chat_uls.length; i++) {
			if (!chat_uls[i].classList.contains('hide')) {
				chat_uls[i].classList.add('hide');
			}
		}
	} catch (e) {
		console.log(e);
	}

	chat.classList.remove('hide');
	chat.scrollTop = chat.scrollHeight - chat.clientHeight; // держит скролл внизу
}

function addMsg(author, msg, time, chat) {
	// наверняка есть более эффективное решение, но покачто в рабочем состоянии
	const common_chat = document.getElementById('chat__1');
	let color;

	//if (msg.length == 0) { return; } // если не над пустых сообщений, то раскомент

	if (author_color.hasOwnProperty(author)) {
		// можно переделать их различение по id потом, как api будет
		color = author_color[author];
	} else {
		const red = Math.floor(50 + Math.random() * (255 + 1 - 50)),
			green = Math.floor(50 + Math.random() * (255 + 1 - 50)),
			blue = Math.floor(50 + Math.random() * (255 + 1 - 50));

		color = 'rgb(' + red + ',' + green + ',' + blue + ');';
		author_color[author] = color;
	}

	chat.insertAdjacentHTML(
		'beforeend',
		'<li class="chat__ul__item animate">' +
			'<div>' +
			'<span style="color:' +
			color +
			'">' +
			author +
			'</span>' +
			' : ' +
			'<span>' +
			msg +
			'<span></div>' +
			'</li>'
	);
	setTimeout(delAnimate, 1010, chat.lastElementChild);

	if (chat.childNodes.length >= chat_size) {
		// удаляем самое верхнее сообщение
		chat.removeChild(chat.firstElementChild);
	}

	common_chat.insertAdjacentHTML(
		'beforeend',
		'<li class="chat__ul__item animate">' +
			'<div>[' +
			time +
			'] ' +
			'<span style="color:' +
			color +
			'">' +
			author +
			'</span>' +
			' : ' +
			'<span>' +
			msg +
			'<span></div>' +
			'</li>'
	);
	setTimeout(delAnimate, 1010, common_chat.lastElementChild);

	if (common_chat.childNodes.length >= common_chat_size) {
		// удаляем самое верхнее сообщение
		common_chat.removeChild(common_chat.firstElementChild);
	}

	if (isScroll == true) {
		common_chat.scrollTop = common_chat.scrollHeight - common_chat.clientHeight;
	}
	if (chat != document.getElementById('chat__1')) {
		chat.scrollTop = chat.scrollHeight - chat.clientHeight;
	}
	if (chat.scrollHeight > chat.clientHeight) {
		viewportElems(chat);
	}
}

function delAnimate(elem: HTMLElement) {
	elem.classList.remove('animate');
}

const mAreaBot = document.getElementById('magicarea').getBoundingClientRect()
		.bottom,
	mAreaTop = document.getElementById('magicarea').getBoundingClientRect().top;

function viewportElems(chat: any) {
	var elems = chat.childNodes;
	for (let i = 1; i < elems.length; i++) {
		if (
			elems[i].getBoundingClientRect().top < mAreaBot &&
			elems[i].getBoundingClientRect().top > mAreaTop
		) {
			var elemTop = elems[i].getBoundingClientRect().top;
			var elemBot = elems[i].getBoundingClientRect().bottom;
			var rotate = Math.round(
				(Math.abs(elemTop - mAreaBot) / Math.abs(mAreaTop - mAreaBot)) * 90
			);

			elems[i].lastElementChild.style.webkitTransform =
				'rotate3d(1, 0, 0, ' + rotate + 'deg)';
			elems[i].lastElementChild.style.opacity = Math.abs(
				1 - Math.abs(elemTop - mAreaBot) / Math.abs(mAreaTop - mAreaBot)
			);
		}
		if (elems[i].getBoundingClientRect().top > mAreaBot) {
			elems[i].lastElementChild.style.webkitTransform =
				'rotate3d(0, 0, 0, 0deg)';
			elems[i].lastElementChild.style.opacity = 1;
		}
		if (elems[i].getBoundingClientRect().top <= mAreaTop) {
			elems[i].lastElementChild.style.webkitTransform =
				'rotate3d(1, 0, 0, ' + 90 + 'deg)';
			elems[i].lastElementChild.style.opacity = 0;
		}
	}
}

(() => {
	const items = [
		...document.querySelectorAll('.chat__ul'),
	] as HTMLUListElement[];

	for (let i = 0; i < items.length; i++) {
		items[i].onscroll = function () {
			viewportElems(items[i]);
			if (
				items[i].scrollTop + 2 >=
				items[i].scrollHeight - items[i].clientHeight
			) {
				isScroll = true;
			} else {
				isScroll = false;
			}
		};
	}
})();

(() => {
	active(document.getElementById('menu__ul__1'));
})();

let connection;
let interval;

const socketMessageListener = (event: any) => {
	// append received message from the server to the DOM element
	//document.write("data:", JSON.stringify(event.data));
	const chat_uls = document.getElementsByClassName('chat__ul');
	const obj = JSON.parse(event.data);
	console.log(obj);
	//addMsg(obj.author || "Unknown Author", obj.text, realTime(), chat_uls[0]);
	const channelIdx = +obj.channelIdx;
	if (channelIdx >= 0 && channelIdx <= 3)
		addMsg(
			obj.author || 'Unknown Author',
			obj.text,
			realTime(),
			chat_uls[channelIdx]
		);
};

const socketOpenListener = (event: any) => {
	interval = setInterval(() => {
		if ((window as any).spBrowserToken) {
			connection.send(
				JSON.stringify({
					type: 'token',
					token: (window as any).spBrowserToken,
				})
			);
			clearInterval(interval);
		}
	}, 100);
};

const socketCloseListener = () => {
	const wsendpoint = 'ws://' + ip + ':' + (uiPort === 3000 ? 8080 : uiPort + 1);
	console.log('Connecting to ' + wsendpoint);
	connection = new WebSocket(wsendpoint);
	connection.addEventListener('open', socketOpenListener);
	connection.addEventListener('message', socketMessageListener);
	connection.addEventListener('close', socketCloseListener);
};
socketCloseListener();
