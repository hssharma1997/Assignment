import { Image, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'

const MovieCard = ({ item }) => {
    return (
        <View style={styles.container}>

            <View>
                <Text style={styles.textStyle}><Text style={{fontWeight:'bold',fontSize:18}}>Title: </Text>{item.title}</Text>
                <Text style={styles.textStyle}><Text style={{fontWeight:'bold',fontSize:18}}>Release Data: </Text>{item.release_date}</Text>
                <Text style={styles.textStyle}><Text style={{fontWeight:'bold',fontSize:18}}>Overview: </Text>{item.overview}</Text>
            </View>
        </View>
    )
}

export default memo(MovieCard)

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: '#9f9f9f',
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 12,
        padding: 28,
        color: '#000',
        backgroundColor:'#fff',
        elevation:1
    },
    textStyle:{
        color:'#000',
        textAlign:'center',
        lineHeight:28
    }
})