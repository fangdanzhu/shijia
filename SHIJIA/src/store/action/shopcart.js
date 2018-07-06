import * as TYPE from '../action-types'

let shopcart = {
	
	payment(shopList){
		return{
			type:TYPE.SHOPCART_PAYMENT,
			shopList
		}
	}
	
}

export default shopcart