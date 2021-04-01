export const addItemToCart = (product, qty, next) => {
	let cart = [];
	let PRODUCTS = [];
	let total = 1;
	if (typeof window !== undefined) {
		if (localStorage.getItem('cart')) {
			cart = JSON.parse(localStorage.getItem('cart'));
			window.localStorage.removeItem('cart');
		}
		console.log(product);
		cart.push({
			product: product,
			qty: qty,
			// uid: uuidv1()
		});
		localStorage.setItem('cart', JSON.stringify(cart));
	}
};
