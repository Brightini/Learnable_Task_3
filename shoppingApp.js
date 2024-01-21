const readline = require("readline-sync");

const productCategory = [
	{ id: 1, category: "Food Items" },
	{ id: 2, category: "Drinks" },
	{ id: 3, category: "Books" },
];

const foodItems = [
	{ id: 1, item: "Bread", price: 1000 },
	{ id: 2, item: "Butter", price: 700 },
	{ id: 3, item: "Milk", price: 2500 },
	{ id: 4, item: "Coffee", price: 1000 },
];

const drinks = [
	{ id: 1, item: "Coke", price: 200 },
	{ id: 2, item: "Fanta", price: 200 },
	{ id: 3, item: "Chivita", price: 1500 },
	{ id: 4, item: "Ribena", price: 1200 },
];

const books = [
	{ id: 1, item: "The Pragmatic Programmer by Dave Thomas", price: 10000 },
	{ id: 2, item: "Eloquent JavaScript by Marijn Haverbeke", price: 7000 },
	{ id: 3, item: "HeadFirst Javascript by Eric Freeman", price: 15000 },
];

// Sample cart data
let cart = [];

function displayProductItems(category) {
	console.log("\nAvailable Items:");
	category.forEach((product) => {
		console.log(
			`[${product.id}] ${product.item} - N${product.price.toFixed(2)}`,
		);
	});
}

function displayProductCategory() {
	console.log("Available Product Categories:");
	productCategory.forEach((product) => {
		console.log(`[${product.id}] ${product.category}`);
	});
}

function selectProductCategory() {
	console.log("\nSelect a product category\n");
	displayProductCategory();

	const categoryChoice = parseInt(readline.question("Enter the category ID: "));
	switch (categoryChoice) {
		case 1:
			displayProductItems(foodItems);
			break;
		case 2:
			displayProductItems(drinks);
			break;
		case 3:
			displayProductItems(books);
			break;
		default:
			console.log("Invalid category ID. Please try again");
	}
}

function addToCart(category, productId, quantity) {
	let selectedProduct;

	if (category.some((item) => item.id === productId)) {
		selectedProduct = category.find((item) => item.id === productId);
	}

	if (selectedProduct) {
		const itemInCart = cart.find((item) => item.product.id === productId);
		if (itemInCart) {
			itemInCart.quantity += quantity;
		} else {
			cart.push({ product: selectedProduct, quantity });
		}
		console.log(
			`Added ${quantity} ${selectedProduct.item} item(s) to the cart.`,
		);
	} else {
		console.log("Invalid product ID.");
	}
}

function displayCart() {
	console.log("Shopping Cart:");
	cart.forEach((item) => {
		console.log(`${item.product.item} - Quantity: ${item.quantity}`);
	});
}

function checkout() {
	let total = 0;
	cart.forEach((item) => {
		total += item.product.price * item.quantity;
	});
	console.log(`Total: $${total.toFixed(2)}`);
	console.log("Thank you for shopping with us!");
	cart = [];
}

function startShopping() {
	while (true) {
		console.log("\nWelcome to Bright Stores!");
		console.log("[1] Display Product Categories");
		console.log("[2] Add to Cart");
		console.log("[3] View Cart");
		console.log("[4] Checkout");
		console.log("[5] Exit");
		console.log("[6] Clear Screen");

		const choice = readline.question("Enter your choice: ");

		switch (choice) {
			case "1":
				selectProductCategory();
				break;
			case "2":
				displayProductCategory();
				const categoryChoice = parseInt(
					readline.question("Enter the category ID: "),
				);
				switch (categoryChoice) {
					case 1:
						category = foodItems;
						break;
					case 2:
						category = drinks;
						break;
					case 3:
						category = books;
						break;
					default:
						console.log("Invalid category ID. Please try again");
						continue; // Restart the loop if the category is invalid
				}
				displayProductItems(category);
				const productId = parseInt(
					readline.question("Enter the product ID: "),
					10,
				);
				const quantity = parseInt(
					readline.question("Enter the quantity: "),
					10,
				);
				addToCart(category, productId, quantity);
				break;
			case "3":
				displayCart();
				break;
			case "4":
				checkout();
				break;
			case "5":
				console.log("Bye!");
				process.exit();
			case "6":
				console.clear();
				break;
			default:
				console.log("Invalid choice. Please try again.");
		}
	}
}

// Start the e-commerce application
startShopping();
