import { Image, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'

const MovieCard = ({ item }) => {
    return (
        <View style={styles.container}>

            <View>
                <Text style={styles.textStyle}>Title:{item.title}</Text>
                <Text style={styles.textStyle}>Release Data:{item.release_date}</Text>
                <Text style={styles.textStyle}>Overview:{item.overview}</Text>
            </View>
        </View>
    )
}

export default memo(MovieCard)

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#000',
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 12,
        padding: 8,
        color: '#000'
    },
    textStyle:{
        color:'#000'
    }
})