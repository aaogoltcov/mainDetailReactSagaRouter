import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { getProductList, productListSelect, isProductListLoadingSelect } from "../store/slices/productListSlice/productList";
import Loading from '../views/Loading';
import { Link } from 'react-router-dom';
import { requestButtonNameSelect } from "../store/slices/productSlice/product";

export default function Main() {
    const productList = useSelector(productListSelect);
    const isProductListLoading = useSelector(isProductListLoadingSelect);
    const requestButtonName = useSelector(requestButtonNameSelect);
    const dispatch = useDispatch();
    
    function productListRequestHandler(event) {
        event.preventDefault();
        dispatch(getProductList());
    }

    return (
        <>
            <button type="button"
                    className="btn btn-primary m-1"
                    onClick={productListRequestHandler}>
                <Loading status={ isProductListLoading } title={ requestButtonName } />
            </button>
            <ul className="list-group">
                {productList.map(product => {
                    return <Link 
                        key={ product.id } 
                        to={ "product/" + product.id } 
                        className="list-group-item list-group-item-action">{ product.name }</Link>
                })}
            </ul>
        </>
    )
}