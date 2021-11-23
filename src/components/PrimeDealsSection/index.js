import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import ProductCard from '../ProductCard'
import './index.css'

class PrimeDealsSection extends Component {
  state = {
    primeDeals: [],
    apiStatus: '',
  }

  componentDidMount() {
    this.getPrimeDeals()
  }

  getPrimeDeals = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/prime-deals'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.prime_deals.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        primeDeals: updatedData,
        apiStatus: 'SUCCESS',
      })
    } else if (response.status === 401) {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  render() {
    const {apiStatus, primeDeals} = this.state
    let sai
    if (apiStatus === 'SUCCESS') {
      sai = (
        <div className="products-list-container">
          <h1 className="primedeals-list-heading">Exclusive Prime Deals</h1>
          <ul className="products-list">
            {primeDeals.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))}
          </ul>
        </div>
      )
    } else if (apiStatus === 'Failure') {
      sai = (
        <img
          src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
          alt="Register Prime"
          className="register-prime-image"
        />
      )
    }
    return sai
  }
}

export default PrimeDealsSection
