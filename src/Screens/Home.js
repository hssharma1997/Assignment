import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import MovieCard from '../Components/MovieCard'
// import Toast from 'react-native-toast-message'

import { TOKEN } from '../constant';




const URL = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page='

const Home = ({ navigation }) => {
    const [query, setQuery] = useState('')
    const [data, setData] = useState([])
    const [moviesData, setMoviesData] = useState([])
    const [filteredMoviesData, setFilteredMoviesData] = useState([])
    const [pageNo, setPageNo] = useState(1)
    const [showLoadMore, setShowLoadMore] = useState(false)
  


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

        fetch(`${URL}${pageNo}`, options).then(resp => resp.json())
            .then(result => {
                console.log(pageNo);
                setPageNo(prev=>prev+1)
                setData(prev => [prev, result])
                setMoviesData(prev => [...prev, ...result.results])
                setFilteredMoviesData(prev => [...prev, ...result.results])
            })
            .catch(e => console.log(e))
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
            // Toast.show({
            //     type: 'info',
            //     text1: 'No More Movies Found...'
            // });
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
            <View style={styles.textInputContainer}>
                <TextInput
                    value={query}
                    onChangeText={txt => setQuery(txt)}
                    placeholder='Search Movies Here...'

                />
            </View>
            <FlatList
                data={filteredMoviesData}
                keyExtractor={(item, index) => (item.id+index).toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => onPressHandler(item)}>
                        <MovieCard item={item} />
                    </TouchableOpacity>
                )}
                onEndReached={() => setShowLoadMore(true)}
                showsVerticalScrollIndicator={false}

            />
            {showLoadMore && <TouchableOpacity style={styles.loadBtn} onPress={() => getMoreMovie()}>
                <Text>Load More...</Text>
            </TouchableOpacity>}
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    loadBtn: {
        borderWidth: 1,
        borderColor: '#000',
        alignItems: 'center',
        margin: 16,
        paddingVertical: 12
    },
    textInputContainer: {
        borderWidth: 1,
        borderColor: 'black',
        margin: 16,
        borderRadius: 12,
        paddingHorizontal: 12
    }
})