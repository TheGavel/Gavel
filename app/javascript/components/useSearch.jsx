import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useSearch(query, pageNumber,setPageNumber,params) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [products, setProducts] = useState([])
  const [hasMore, setHasMore] = useState(false)
  const token = document.querySelector('meta[name~="csrf-token"]').content;
  axios.defaults.headers.common['X-CSRF-Token'] = token

  let url = ''
  if( params.mode == "categories" ){
    url = `/api/v1/products/categories/${query}/${pageNumber}`}
  else{
    url = `/api/v1/products/search/${query}/${pageNumber}`
  }
  if(query == undefined){
    url = `/api/v1/products/categories/3C數位/${pageNumber}`
  }

  useEffect(() => {
    setProducts([])
    setHasMore(true)
    setPageNumber(1)
  }, [query])

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    axios({
      method: 'GET',
      url: url,
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(productData => {
      let dataArray = [];
      productData.data.forEach((item) => {
        let data = {};
        data["sellerImg"] = item.seller_image;
        data["productImg"] = item.product_image;
        data["productTitle"] = item.name;
        data["productContent"] = item.description;
        data["labelList"] = item.label_list
        data["id"] = item.id;
        dataArray.push(data);
      });
      setProducts((oldArray) => [...oldArray,...dataArray]);
      setHasMore(productData.data.length > 0)
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [query, pageNumber])
  return { loading, error, products, hasMore }
}
