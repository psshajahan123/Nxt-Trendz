import Popup from 'reactjs-popup'

import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(eachCartItem => {
        total += eachCartItem.price * eachCartItem.quantity
      })

      let a = true

      const onChangeSelect = event => {
        console.log(event.target.value)
        if (String(event.target.value) === 'Cash on Delivery') {
          a = false
        } else {
          a = true
        }
      }

      console.log(a)

      return (
        <>
          <div className="cart-summary-container">
            <h1 className="order-total-value">
              <span className="order-total-label">Order Total:</span> Rs {total}
              /-
            </h1>
            <p className="total-items">{cartList.length} Items in cart</p>

            <Popup
              trigger={
                <button type="button" className="checkout-button button">
                  Checkout
                </button>
              }
              modal
              nested
            >
              {close => (
                <div className="modal">
                  <button type="button" className="close" onClick={close}>
                    &times;
                  </button>
                  <div className="header"> Payment </div>
                  <div className="content">
                    <h1>Payement options</h1>
                    <p>Total Items: {cartList.length}</p>
                    <p>Total Price: {total} Rs</p>
                    <form onChange={onChangeSelect}>
                      <input type="radio" disabled="true" />
                      Net Banking
                      <input type="radio" />
                      Cash on Delivery
                    </form>
                  </div>
                  <div className="actions">
                    <Popup
                      trigger={
                        <button type="button" className="button">
                          Confirm Order
                        </button>
                      }
                      position="top center"
                      nested
                    >
                      <div>
                        <p>Your order has been placed successfully</p>
                      </div>
                    </Popup>
                    <button
                      type="button"
                      className="button"
                      onClick={() => {
                        console.log('modal closed ')
                        close()
                      }}
                    >
                      Cancel Payment
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
