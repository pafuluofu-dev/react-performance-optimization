import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import {lazy, Suspense} from 'react';

import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import Thanks from './pages/Thanks';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Cart = lazy(() => import('./pages/Cart'));
const Category = lazy(() => import('./pages/Category'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{path: 'old-home', element: <Navigate to={'/'} />},
			{
				path: 'about',
				element: <About />,
			},
			{
				path: 'cart',
				element: <Cart />,
			},
			{path: 'thanks', element: <Thanks />},
			{
				path: 'category/:categoryId',
				element: <Category />,
			},
			{
				path: 'product/:productId',
				element: <ProductDetails />,
			},
			{path: '*', element: <NotFound />},
			// { path: "*", element: <Navigate to="/" /> },
		],
	},
]);

export default function App() {
	return <RouterProvider router={router} />;
}
