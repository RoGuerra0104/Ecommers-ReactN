import { FlatList, StyleSheet } from 'react-native'
import ProductItem from '../components/ProductItem'
import { useState, useEffect } from 'react'
import Search from '../components/Search'
import { useDispatch, useSelector } from 'react-redux'


const ProductsByCategoryScreen = ({ navigation }) => {

    const [productsByCategory, setProductsByCategory] = useState([])
    const [search, setSearch] = useState('')

    const category = useSelector(state=>state.shopReducer.categorySelected)
    const productsFilteredByCategory = useSelector(state=>state.shopReducer.productsFilteredByCategory)


    useEffect(() => {
        const productsFiltered = productsFilteredByCategory.filter(
            product => product.title.toLowerCase().includes(search.toLowerCase()))
        setProductsByCategory(productsFiltered)
    }, [category, search])

    const renderProductItem = ({ item }) => (
        <ProductItem product={item} navigation={navigation} />
    )

    const onSearch = (search) => {
        setSearch(search)
    }

    return (
        <>

            <Search onSearchHandlerEvent={onSearch} />
            <FlatList
                style={style.categoryScreen}
                data={productsByCategory}
                renderItem={renderProductItem}
                keyExtractor={item => item.id}
            />
        </>
    )
}

export default ProductsByCategoryScreen

const style = StyleSheet.create({
    categoryScreen: {
        marginBottom: 90
    }
})
