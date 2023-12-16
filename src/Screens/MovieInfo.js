import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TOKEN } from '../constant'

const MovieInfo = ({ navigation, route }) => {
    const { item } = route.params
    const [movieDetails,setMovieDetails]=useState({})

    useEffect(()=>{
       getMovieData()
    },[])


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
                console.log(result);
            })
            .catch(e => console.log(e))
    }
    return (
        <View style={styles.container}>
            <View>
                <Image
                // src={}
                />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.textStyle}>{item.title}</Text>
                <Text style={styles.textStyle}>Rating: {item.vote_average}</Text>
                <Text style={styles.textStyle}>Lang:{item.original_language}</Text>
                <Text style={styles.textStyle}>Category:{item.adult ? 'A' : 'U/A'}</Text>
                <Text style={styles.textStyle}>Runtime:{movieDetails.runtime} M</Text>
                <Text style={[styles.textStyle,{marginTop:24}]}>{movieDetails.tagline}</Text>
                <Text style={[styles.textStyle,{marginTop:24,fontSize:32}]}>{movieDetails.status}</Text>
            </View>

        </View>
    )
}

export default MovieInfo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 16,
        borderWidth: 0.6,
        borderColor: '#000',
        borderRadius: 12,
        padding: 16
    },
    textStyle: {
        fontSize: 18,
        color: '#000',
        textAlign:'center'

    }

})