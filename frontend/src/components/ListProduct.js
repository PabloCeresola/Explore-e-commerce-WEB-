import { useEffect, useState } from "react"
import CardProduct from "../components/CardProduct"
import { connect } from "react-redux"
import cartActions from "../redux/actions/cartActions"

const ListProduct = (props) => {

    const [products,setProducts] = useState([])

    useEffect(()=>{
        fetchProducts()
    },[])

    const fetchProducts = async () => {
        let response = await props.allProducts()
        if (response) {
            setProducts(response.result)
        }
    }

    return (
        <>
            <div>
                <div className="titleContainerProducts"><h2>Popular sextoy</h2></div>
                <div className="productsListHome">
                    {products.map(product => <CardProduct key={product._id} product={product} />)}
                </div>
            </div>
{/*             <div>
                <div className="titleContainerProducts"><h2>Popular Accesorios</h2></div>
                <div className="productsListHome">
                    {products.map(product => <CardProduct key={product._id} product={product} />)}
                </div>
            </div>
            <div >
                <div className="titleContainerProducts"><h2>Popular Cremas</h2></div>
                <div className="productsListHome">
                    {products.map(product => <CardProduct key={product._id} product={product} />)}
                </div>
            </div> */}
        </>
    )
}

const mapStateToProps = state =>{
    return{
        usuarioStatus: state.user.usuarioStatus 
    }
}

const mapDispatchToProps = {
    allProducts: cartActions.allProducts
}


export default connect(mapStateToProps, mapDispatchToProps)(ListProduct)