import React from 'react'
import CakeView from './features/cake/CakeView'
import IcecreamView from './features/icecream/IcecreamView'
import UserView from './features/user/UserView'

const CakeShopPage = () => {
  return (
    <div >
      <h1>Welcome to Cake Shop</h1>
      <CakeView />
      <IcecreamView />
      <UserView />
    </div>
  )
}

export default CakeShopPage
