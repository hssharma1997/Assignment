import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TOKEN } from '../constant'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { Rating, AirbnbRating } from 'react-native-ratings';




const MovieInfo = ({ navigation, route }) => {
    const { height, width } = useWindowDimensions()
    const { item } = route.params
    const [movieDetails, setMovieDetails] = useState({})

    useEffect(() => {
        getMovieData()
    }, [])


    const getMovieData = () => {

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${TOKEN}`
            }
        }

        fetch(`https://api.themoviedb.org/3/movie/${item.id}?language=en-US`, options).then(resp => resp.json())
            .then(result => {
                setMovieDetails(result)
            })
            .catch(e => console.log(e))
    }
    return (
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
            <View style={{ position: 'absolute', backgroundColor: '#fff', zIndex: 999, height: 40, width: 40, borderRadius: 20, left: 10, top: 10 }}>
                <Icon name='arrow-back-circle-outline' size={38} color='#000' onPress={() => navigation.pop()} />

            </View>
            <View style={[styles.container]}>

                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/original${movieDetails.poster_path}` }}
                    style={{ width: width - 60, height: height / 2.4, borderWidth: 0.2, borderColor: 'black' }}
                    resizeMode='contain'
                />
                <View >
                    <Text style={[styles.textStyle, { fontWeight: 'bold', marginBottom: 4 }]}>{item.title}</Text>
                    <View style={styles.infoContainer}>
                        <Text style={styles.textStyle}>Runtime</Text>
                        <Text style={styles.textStyle}>Lang</Text>
                        <Text style={styles.textStyle}>Rating</Text>
                        <Text style={styles.textStyle}>Category</Text>
                    </View>
                    <View style={[styles.infoContainer, { marginTop: 0 }]}>
                        <Text style={styles.textStyle}>{movieDetails.runtime} M</Text>
                        <Text style={styles.textStyle}>{item.original_language}</Text>
                        <Text style={styles.textStyle}>{item.vote_average}</Text>
                        <Text style={styles.textStyle}>{item.adult ? 'A' : 'U/A'}</Text>


                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={[styles.textStyle, { marginTop: 6 }]}>{movieDetails.tagline}</Text>
                        <Text style={[styles.textStyle, { marginTop: 6, fontSize: 32, }]}>{movieDetails.status}</Text>
                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}

export default MovieInfo

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#fff',
        marginTop: 120,
        borderWidth: 0.3,
        borderColor: '#000',
        borderRadius: 12,
        padding: 16,
        justifyContent:'center',
        alignItems:'center',

        // marginBottom: 30

    },
    textStyle: {
        fontSize: 18,
        color: '#000',
        textAlign: 'center',

    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
      
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,

    },

})