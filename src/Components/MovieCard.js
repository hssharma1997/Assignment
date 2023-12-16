import { Image, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'

const MovieCard = ({ item }) => {
    return (
        <View style={styles.container}>

            <View>
                <Text>Title:{item.title}</Text>
                <Text>Release Data:{item.release_date}</Text>
                <Text>Overview:{item.overview}</Text>
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
        color:'#000'
    }
})