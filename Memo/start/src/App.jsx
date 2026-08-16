// ! 19.4 Использование children вместо мемоизации
import {useState} from 'react';
import './index.css';

export default function RootApp() {
	const [showArchive, setShowArchive] = useState(false);

	return (
		<App>
			<Archive
				setShowArchive={setShowArchive}
				showArchive={showArchive}
			/>
		</App>
	);
}

function App({children}) {
	const [count, setCount] = useState(0);

	return (
		<section className='app'>
			<h1 className='app__title'>Simple Counter</h1>
			<p className='app__count'>Count: {count}</p>
			<button
				className='app__button'
				onClick={() => setCount(count + 1)}
			>
				Increase Count
			</button>
			{children}
		</section>
	);
}

function Archive({showArchive, setShowArchive}) {
	// Генерируем 30 000 постов один раз при монтировании
	const [posts] = useState(() =>
		Array.from({length: 30000}, () => createRandomPost()),
	);

	return (
		<aside className='archive'>
			<h2 className='archive__title'>Архив</h2>
			<button
				className='archive__toggle'
				onClick={() => setShowArchive((s) => !s)}
			>
				{showArchive ? 'Hide archive posts' : 'Show archive posts'}
			</button>
			{showArchive && (
				<ul className='archive__list'>
					{posts.map((post, i) => (
						<li
							className='archive__item'
							key={i}
						>
							<p className='archive__post'>
								<strong className='archive__post-title'>
									{post.title}:
								</strong>{' '}
								{post.body}
							</p>
						</li>
					))}
				</ul>
			)}
		</aside>
	);
}

function createRandomPost() {
	return {
		title: `Random Title ${Math.floor(Math.random() * 10000)}`,
		body: `This is a randomly generated post content with ID: ${Math.floor(Math.random() * 10000)}`,
	};
}

// ! 19.3 Как работает хук useCallBack()
// ? Example 1

// import React, {useState, memo} from 'react';

// function App() {
// 	const [count, setCount] = useState(0);

// 	// The function is recreated on every render
// 	const handleClick = (post) => {
// 		console.log(`You clicked on ${post.title}`);
// 	};

// 	return (
// 		<div>
// 			<h1>Count: {count}</h1>
// 			<button onClick={() => setCount(count + 1)}>Increase Count</button>
// 			<PostList handleClick={handleClick} />
// 		</div>
// 	);
// }

// const PostList = memo(function PostList({handleClick}) {
// 	const posts = Array.from({length: 5000}, (_, i) => ({
// 		title: `Post ${i}`,
// 		body: `This is post number ${i}`,
// 	}));

// 	console.log('PostList rerendered');

// 	return (
// 		<ul>
// 			{posts.map((post, i) => (
// 				<li key={i}>
// 					{post.title} - {post.body}
// 					<button onClick={() => handleClick(post)}>Click</button>
// 				</li>
// 			))}
// 		</ul>
// 	);
// });

// export default App;

// ? Example 2

// import React, {useState, useCallback, memo} from 'react';

// function App() {
// 	const [count, setCount] = useState(0);

// 	// Memoizing the handleClick function using useCallback
// 	const handleClick = useCallback((post) => {
// 		console.log(`You clicked on ${post.title}`);
// 	}, []);

// 	return (
// 		<div>
// 			<h1>Count: {count}</h1>
// 			<button onClick={() => setCount(count + 1)}>Increase Count</button>
// 			<PostList handleClick={handleClick} />
// 		</div>
// 	);
// }

// const PostList = memo(function PostList({handleClick}) {
// 	const posts = Array.from({length: 5000}, (_, i) => ({
// 		title: `Post ${i}`,
// 		body: `This is post number ${i}`,
// 	}));

// 	console.log('PostList rerendered');

// 	return (
// 		<ul>
// 			{posts.map((post, i) => (
// 				<li key={i}>
// 					{post.title} - {post.body}
// 					<button onClick={() => handleClick(post)}>Click</button>
// 				</li>
// 			))}
// 		</ul>
// 	);
// });

// export default App;

// ! 19.2 Как работает хук useMemo()
// import {memo, useMemo, useState} from 'react';
// import './index.css';

// function createRandomPost() {
// 	return {
// 		title: `Random Title ${Math.floor(Math.random() * 10000)}`,
// 		body: `This is a randomly generated post content with ID: ${Math.floor(Math.random() * 10000)}`,
// 	};
// }

// function App() {
// 	const [count, setCount] = useState(0);

// 	// * useMemo() работает в связке с memo
// 	const archiveOptions = useMemo(
// 		() => ({
// 			showArchive: false,
// 			title: 'Archive',
// 		}),
// 		[],
// 	); // * [] - это массив зависимостей, как в useEffect()

// 	return (
// 		<section className='app'>
// 			<h1 className='app__title'>Simple Counter</h1>
// 			<p className='app__count'>Count: {count}</p>
// 			<button
// 				className='app__button'
// 				onClick={() => setCount(count + 1)}
// 			>
// 				Increase Count
// 			</button>
// 			<Archive archiveOptions={archiveOptions} />
// 		</section>
// 	);
// }

// const Archive = memo(function Archive({archiveOptions}) {
// 	const [showArchive, setShowArchive] = useState(archiveOptions.showArchive);

// 	// Генерируем 30 000 постов один раз при монтировании
// 	const [posts] = useState(() =>
// 		Array.from({length: 30000}, () => createRandomPost()),
// 	);

// 	return (
// 		<aside className='archive'>
// 			{/* // ! can't update memoized title with props */}
// 			<h2 className='archive__title'>Archive</h2>
// 			<button
// 				className='archive__toggle'
// 				onClick={() => setShowArchive((s) => !s)}
// 			>
// 				{showArchive ? 'Hide archive posts' : 'Show archive posts'}
// 			</button>
// 			{showArchive && (
// 				<ul className='archive__list'>
// 					{posts.map((post, i) => (
// 						<li
// 							className='archive__item'
// 							key={i}
// 						>
// 							<p className='archive__post'>
// 								<strong className='archive__post-title'>
// 									{post.title}:
// 								</strong>{' '}
// 								{post.body}
// 							</p>
// 						</li>
// 					))}
// 				</ul>
// 			)}
// 		</aside>
// 	);
// });

// export default App;

// ! 19.1 Вкладка profiler в devTools
// import {memo, useState} from 'react';
// import './index.css'; // импорт стилей

// function createRandomPost() {
// 	return {
// 		title: `Random Title ${Math.floor(Math.random() * 10000)}`,
// 		body: `This is a randomly generated post content with ID: ${Math.floor(Math.random() * 10000)}`,
// 	};
// }

// function App() {
// 	const [count, setCount] = useState(0);
// 	const [showArchive, setShowArchive] = useState(false);

// 	return (
// 		<section className='app'>
// 			<h1 className='app__title'>Simple Counter</h1>
// 			<p className='app__count'>Count: {count}</p>
// 			<button
// 				className='app__button'
// 				onClick={() => setCount(count + 1)}
// 			>
// 				Increase Count
// 			</button>
// 			<Archive
// 				setShowArchive={setShowArchive}
// 				showArchive={showArchive}
// 			/>
// 		</section>
// 	);
// }

// const Archive = memo(function Archive({showArchive, setShowArchive}) {
// 	// Генерируем 30 000 постов один раз при монтировании
// 	const [posts] = useState(() =>
// 		Array.from({length: 30000}, () => createRandomPost()),
// 	);

// 	return (
// 		<aside className='archive'>
// 			<h2 className='archive__title'>Архив</h2>
// 			<button
// 				className='archive__toggle'
// 				onClick={() => setShowArchive((s) => !s)}
// 			>
// 				{showArchive ? 'Hide archive posts' : 'Show archive posts'}
// 			</button>
// 			{showArchive && (
// 				<ul className='archive__list'>
// 					{posts.map((post, i) => (
// 						<li
// 							className='archive__item'
// 							key={i}
// 						>
// 							<p className='archive__post'>
// 								<strong className='archive__post-title'>
// 									{post.title}:
// 								</strong>{' '}
// 								{post.body}
// 							</p>
// 						</li>
// 					))}
// 				</ul>
// 			)}
// 		</aside>
// 	);
// });

// export default App;
