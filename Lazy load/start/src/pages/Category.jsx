import {Link, useLocation, useParams, useSearchParams} from 'react-router-dom';
import {products} from '../data/data';

function Category() {
	const {categoryId} = useParams();
	const [searchParams, setSearchParams] = useSearchParams();

	const location = useLocation();
	console.log(location);

	const maxPrice =
		searchParams.get('maxPrice') ?
			Number(searchParams.get('maxPrice'))
		:	Infinity;
	// const maxPrice = location.state.maxPrice;

	const currentCategoryArray = products.filter(
		(product) =>
			product.categoryId === categoryId && product.price <= maxPrice,
	);

	function handleChange(e) {
		const value = e.target.value;
		setSearchParams(value ? {maxPrice: value} : {});
	}

	return (
		<div className='px-6 py-10'>
			<h1 className='mb-6 text-3xl font-semibold text-center'>
				Category {categoryId}
			</h1>
			<div className='mb-4'>
				<label
					className='block mb-2 text-sm font-medium text-gray-700'
					htmlFor='maxPrice'
				>
					Max Price{' '}
				</label>
				<input
					className='focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md'
					type='number'
					id='maxPrice'
					placeholder='Enter max price'
					value={searchParams.get('maxPrice') || ''}
					onChange={handleChange}
				/>
			</div>
			<ul className='grid grid-cols-3 gap-4 px-5'>
				{currentCategoryArray.map((product) => (
					<li key={product.name}>
						<Link
							className='group relative flex flex-col items-center justify-center'
							to={`/product/${product.id}`}
						>
							<span className='group-hover:text-2xl absolute z-10 text-xl font-semibold text-center text-white transition-all ease-out'>
								{' '}
								{product.name} <br /> {product.price}$
							</span>

							<img
								className='rounded-md'
								src={product.img}
								alt={product.name}
							/>
							<div className='opacity-40 absolute inset-0 bg-gray-900 rounded-md'></div>
						</Link>
					</li>
				))}
			</ul>{' '}
		</div>
	);
}

export default Category;
