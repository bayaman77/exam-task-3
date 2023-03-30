import styles from './Checkout.module.css'
import { LoadingIcon } from './Icons'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import getProductsThunk from './store/products/products.thunk'
import { useSelector } from 'react-redux/es/exports'
import { productsActions } from './store/products/Products.slice'

const Product = ({ id, name, availableCount, price, quantity, total }) => {
    const dispatch = useDispatch()

    const incrementQuantity = () => {
        if (availableCount > quantity) {
            dispatch(productsActions.increment(id))
            dispatch(productsActions.getProductTotal(id))
            dispatch(productsActions.getAllTotal())
        }
    }

    const decrementQuantity = () => {
        dispatch(productsActions.decrement(id))
        dispatch(productsActions.getProductTotal(id))
        dispatch(productsActions.getAllTotal())
    }

    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{availableCount}</td>
            <td>${price}</td>
            <td>{quantity}</td>
            <td>${total}</td>
            <td>
                <button
                    className={styles.actionButton}
                    onClick={incrementQuantity}
                >
                    +
                </button>
                <button
                    className={styles.actionButton}
                    onClick={decrementQuantity}
                    disabled={!quantity}
                >
                    -
                </button>
            </td>
        </tr>
    )
}

const Checkout = () => {
    const dispatch = useDispatch()

    const { products, error, isLoading, total, discount } = useSelector(
        (state) => state.products
    )

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [dispatch])

    return (
        <div>
            <header className={styles.header}>
                <h1>Electro World</h1>
            </header>
            <main>
                {isLoading && !error && <LoadingIcon />}
                {error && (
                    <h4 style={{ color: 'red' }}>Some thing went wrong</h4>
                )}

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th># Available</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <Product
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                availableCount={product.availableCount}
                                price={product.price}
                                quantity={product.quantity}
                                total={product.total}
                            />
                        ))}
                    </tbody>
                </table>
                <h2>Order summary</h2>
                <p>{`Discount: $ ${discount}`}</p>
                <p>{`Total: $ ${total}`}</p>
            </main>
        </div>
    )
}

export default Checkout
