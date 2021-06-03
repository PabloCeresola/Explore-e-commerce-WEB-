<<<<<<< HEAD
import { BrowserRouter } from "react-router-dom";
=======
import io from 'socket.io-client'
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
>>>>>>> d2daf69c5671e5820818cea5dd3029c70b625fc6
import 'bootstrap/dist/css/bootstrap.min.css';
import './Style/Home.css'
import './Style/SignIn.css'
import './Style/SignUp.css'
import "./Style/munoz.css"
import "./Style/like.scss"
import './Style/admin.css'
import './Style/header.css'
import './Style/Footer.css'
import './Style/sexToyCategory.css'
import './Style/accesories.css'
import './Style/checkout.css'
import './Style/paymentSucessFull.css'
import 'react-credit-cards/es/styles-compiled.css';
import "./Style/CreditCard.css"
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import getRoutesByRole from './helpers/rutes'
import cartActions from "./redux/actions/cartActions";
import userActions from "./redux/actions/userActions"



const App = (props) => {

  if (localStorage.getItem("cart")) {
    const response = JSON.parse(localStorage.getItem("cart"))
    props.localStorage(response)
  }

  if (localStorage.getItem("num")) {
    const response = JSON.parse(localStorage.getItem("num"))
    props.localStorageNum(response)
  }

  if (!props.usuarioStatus && localStorage.getItem('token')) {
    const userData = JSON.parse(localStorage.getItem('userLogged'))
    const userLoggedForzed = {
      token: localStorage.getItem('token'),
      ...userData
    }
    props.relogin(userLoggedForzed)
  }

  let role = "notLogged"
  if (props.usuarioStatus) {
    if (props.usuarioStatus.admin) {
      role = "admin"
    } else {
      role = "common"
    }
  }

  return (
    <BrowserRouter>
      {getRoutesByRole(role)}
      < ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>

  )
}

const mapStateToProps = state => {
  return {
    usuarioStatus: state.user.usuarioStatus
  }
}

const mapDispatchToProps = {
  relogin: userActions.relogin,
  localStorage: cartActions.localStorage,
  localStorageNum: cartActions.localStorageNum,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);