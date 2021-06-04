import { Link } from "react-router-dom"


const Footer = () => {
    return (
        <>
            <footer className="bg-white">
                <div className="container py-5">
                    <div className="row py-4">
                        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0"><img src="img/logo.png" alt="" width="180" class="mb-3" />
                            <p className="font-italic text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
                            <ul className="list-inline mt-4">
                                <li className="list-inline-item"><a href="#" target="_blank" title="twitter"><i class="fab fa-twitter-square"></i></a></li>
                                <li className="list-inline-item"><a href="#" target="_blank" title="facebook"><i class="fab fa-facebook-f"></i></a></li>
                                <li className="list-inline-item"><a href="#" target="_blank" title="instagram"><i class="fab fa-instagram"></i></a></li>
                                <li className="list-inline-item"><a href="#" target="_blank" title="pinterest"><i class="fab fa-pinterest"></i></a></li>
                                <li className="list-inline-item"><a href="#" target="_blank" title="vimeo"><i class="fab fa-vimeo"></i></a></li>
                            </ul>
                        </div>
                        <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
                            <h6 class="text-uppercase font-weight-bold mb-4">Shop</h6>
                            <ul class="list-unstyled mb-0">
                                <li className="mb-2"><Link to="/products" className="text-muted">Our Products</Link></li>
                                <li className="mb-2"><Link to="/sextoy" className="text-muted">Sex Toy</Link></li>
                                <li className="mb-2"><Link to="/accesories" className="text-muted">Accesories</Link></li>
                                <li className="mb-2"><Link to="" className="text-muted">Stores</Link></li>
                                <li className="mb-2"><Link to="" className="text-muted">Our Blog</Link></li>
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
                            <h6 className="text-uppercase font-weight-bold mb-4">Company</h6>
                            <ul className="list-unstyled mb-0">
                                <li className="mb-2"><Link to="/signin" className="text-muted">Login</Link></li>
                                <li className="mb-2"><Link to="/signup" className="text-muted">Register</Link></li>
                            </ul>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-lg-0">
                            <h6 className="text-uppercase font-weight-bold mb-4">Newsletter</h6>
                            <p className="text-muted mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. At itaque temporibus.</p>
                            <div className="p-1 rounded border">
                                <div className="input-group">
                                    <input type="email" placeholder="Enter your email address" aria-describedby="button-addon1" class="form-control border-0 shadow-0" />
                                    <div className="input-group-append">
                                        <button id="button-addon1" type="submit" className="btn btn-link"><i class="fa fa-paper-plane"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-light py-4">
                    <div className="container text-center">
                        <p className="text-muted mb-0 py-2"> <a target="_blank" href="https://www.youtube.com/watch?v=CrZubI4MvC0">© 2021 Group 3 All rights reserved.</a> </p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer


