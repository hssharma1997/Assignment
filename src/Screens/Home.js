import { FlatList, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import MovieCard from '../Components/MovieCard'
import Toast from 'react-native-toast-message'
import Icon from 'react-native-vector-icons/EvilIcons';


import { TOKEN } from '../constant';




const URL = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page='

const Home = ({ navigation }) => {
    const [query, setQuery] = useState('')
    const [data, setData] = useState([])
    const [moviesData, setMoviesData] = useState([])
    const [filteredMoviesData, setFilteredMoviesData] = useState([])
    const [pageNo, setPageNo] = useState(1)
    const [showLoadMore, setShowLoadMore] = useState(false)
    const [loading, setLoading] = useState(false)



    useEffect(() => {
        getMoviesData()
    }, [])

    useEffect(() => {
        querySearch()
    }, [query])

    const getMoviesData = () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${TOKEN}`
            }
        }
        setLoading(true)
        fetch(`${URL}${pageNo}`, options).then(resp => resp.json())
            .then(result => {
                setPageNo(prev => prev + 1)
                setData(prev => [prev, result])
                setMoviesData(prev => [...prev, ...result.results])
                setFilteredMoviesData(prev => [...prev, ...result.results])
                setLoading(false)
            })
            .catch(e => {
                console.log(e)
                setLoading(false)
            })

    }

    const onPressHandler = (item) => {
        navigation.navigate('MovieInfo', { item: item })
    }

    const getMoreMovie = () => {
        if (pageNo < data[data.length - 1].total_pages) {
            getMoviesData()
            setShowLoadMore(false)
        }
        else {
            Toast.show({
                type: 'info',
                text1: 'No More Movies Found...'
            });
        }

    }

    const querySearch = () => {
        if (query) {
            const list = moviesData.filter(item => item.title.toLowerCase().includes(query.toLowerCase()))
            console.log(list, 'LISTT');
            setFilteredMoviesData(list)

        }
        else setFilteredMoviesData(moviesData)



    }

    return (
        
        <View style={styles.container}>
            {loading && <View style={styles.loaderView}>
                <ActivityIndicator size="large" color="#000" animating={loading} />
            </View>}
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 12, paddingVertical: 6 }}>
                <Icon name='user' size={44} color='#000' />
            </View>
            <View style={styles.textInputContainer}>
                <TextInput
                    value={query}
                    onChangeText={txt => setQuery(txt)}
                    placeholder='Search Movies Here...'
                    style={{ color: '#000',width:'85%' }}
                />
                <Icon name='search' size={38} color='#000' />
            </View>
            <FlatList
                style={{ borderBottomWidth: 0.7, borderColor: 'black', marginTop: 8 }}
                data={filteredMoviesData}
                keyExtractor={(item, index) => (item.id + index).toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => onPressHandler(item)}>
                        <MovieCard item={item} />

                    </TouchableOpacity>
                )}
                onEndReached={() => {setShowLoadMore(true) }}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={() => (<>
                    {showLoadMore && <TouchableOpacity style={styles.loadBtn} onPress={() => getMoreMovie()}>
                        <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}>Load More...</Text>
                    </TouchableOpacity>}</>)}

            />

        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    loadBtn: {
        borderWidth: 1,
        borderColor: '#000',
        alignItems: 'center',
        margin: 16,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#ffdf00',
        elevation: 1,
        position: 'relative',
        bottom: 0,
        width: '50%',
        alignSelf: 'center',

    },
    textInputContainer: {
        borderWidth: 0.6,
        borderColor: 'black',
        margin: 16,
        borderRadius: 12,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    loaderView: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99,
        backgroundColor: '#f0f0f0',
        opacity: 0.7
    }
})