/* screen/MovieScreen.js 
 
 Displays the movie details
 
 */
import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView,
} from 'react-native';
import Constants from 'expo-constants';
import Loading from '../Components/Loading';
import BackButton from '../Components/BackButton';
import { EvilIcons } from '@expo/vector-icons';
import _ from "lodash";
import YoutubePlayer from 'react-native-youtube-iframe';

const screen = Dimensions.get('window');

import { fetchTrailer } from '../Services/Services';

export default function MovieScreen({ navigation, route }) {
    const [loading, setLoading] = useState(true);
    const [trailer, setTrailer] = useState('');
    const { movie, genre } = route.params;

    useEffect(() => {

        setLoading(true);

        fetchTrailer(movie.id).then((data) => {
            setTrailer(data[0].key);
            setLoading(false);
        });

    }, []);

    return loading ? (
        <Loading />
    ) : (
            <View style={styles.container}>

                <ScrollView style={{ }}>

                    <View style={{ flexGrow: 1,}}>

                        <View style={{ width: '100%', height: '40%', }}>

                            <Image
                                source={{
                                    uri: `http://image.tmdb.org/t/p/w1280${movie?.backdrop_path}`,
                                }}
                                style={styles.banner2}
                            />

                        </View>

                        <BackButton navigation={navigation} />

                        <View style={styles.movieContainer}>

                            <Image
                                source={{
                                    uri: `http://image.tmdb.org/t/p/w780${movie?.poster_path}`,
                                }}
                                style={styles.backDropImage}
                            />

                            <View style={{ flex: 1, flexDirection: "column", height: screen.height * 0.4, }}>

                                <Text numberOfLines={1} style={styles.movieTitle}>
                                    {movie.title}
                                </Text>

                                <Text numberOfLines={1} style={{ color: 'white' }}>
                                    Release Date: {movie.release_date}
                                </Text>

                                <Text numberOfLines={1} style={{ color: 'white' }} >
                                    {genre}
                                </Text>

                                <Text style={{ color: 'white' }}>

                                    <EvilIcons
                                        name={movie.vote_average, 'star'}
                                        size={20}
                                        color="yellow"
                                        style={{ padding: 20 }}
                                    />
                                    {movie.vote_average}
                                </Text>

                            </View>

                        </View>

                        <Text style={{ color: 'white', fontSize: 0.06 * screen.width, marginLeft: screen.width * - 0.01 }}> Overview </Text>

                        <Text style={styles.overviewText}>
                            {movie.overview}
                        </Text>

                    </View>

                    <View style={{ flexGrow: 1,  marginTop: -60 }}>

                        <Text style={{ color: 'white', fontSize: 0.06 * screen.width, marginLeft: screen.width * 0.01 }}>Trailer</Text>

                        <View style={{ marginLeft: screen.width * 0.09, marginTop: screen.height * 0.03, }}>

                        <YoutubePlayer
                            height={screen.height * 1}
                            width={screen.width * 0.8}
                            play={false}
                            videoId={trailer}
                        />

                    </View>

                    </View>

                </ScrollView>

            </View>
        );
}

const styles = StyleSheet.create({
    banner: { width: window.width, height: 200 },
    banner2: { width: window.width, height: '100%' },
    credit: {
        flex: 1,
        padding: 10,
    },
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#212121',
    },
    title: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backDropImage: {
        height: screen.height * 0.4,
        width: screen.width * 0.44,
        marginTop: screen.height * -0.225,
        marginLeft: screen.width * 0.04
    },
    movieContainer: {
        flexDirection: "row",
        width: window.width,
        height: screen.height * 0.2,
    },
    movieTitle: {
        color: 'white',
        fontSize: 20,
    },
    overviewText: {
        fontSize: 0.04 * screen.width,
        marginBottom: 5,
        color: 'white',
        flexShrink: 1,
        color: '#DCDCDC',
    },

});