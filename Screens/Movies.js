/*
 * Displays a list of movies
 * */

import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TextInput,
    Dimensions,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { Card } from 'react-native-paper';
import { EvilIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import Loading from '../Components/Loading';
import { fetchMovies } from "../Services/Services";
import { fetchMoviesUpcoming } from "../Services/Services";
import { movieGenres } from "../Services/Services";

const screen = Dimensions.get('screen');

const HomeScreen = ({ navigation }) => {
    const [movies, setMovies] = useState([]);
    const [moviesUpcoming, setMoviesUpcoming] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [searchNow, setSearchNow] = useState(false);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetchMovies(searchTerm, movies).then((data) => {
            setMovies(data);
            setLoading(false);
        });
    }, [searchNow]);

    useEffect(() => {
        setLoading(true);
        fetchMoviesUpcoming(searchTerm, moviesUpcoming).then((data) => {
            setMoviesUpcoming(data);
            setLoading(false);
        });
    }, [searchNow]);

    const getGenres = moviesUpcoming.map(({ title, genre_ids }) => {
        const genreNames = genre_ids.map(gid => genres
            .find(({ id }) => id === gid).name);
        var genreNamesSpace = genreNames.join(', ');
        return {
            title,
            genres: genreNamesSpace
        }
    });

    useEffect(() => {
        setLoading(true);
        movieGenres(searchTerm, genres).then((data) => {
            setGenres(data);
            setLoading(false);
        });
    }, [searchNow]);

    return loading ? (
        <Loading />
    ) : (
            <View style={styles.container}>

                <View>
                    <View style={styles.inputCard}>
                        <TextInput
                            style={styles.input}
                            placeholder={'Search Movies'}
                            value={searchTerm}
                            onChangeText={(text) => setSearchTerm(text)}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                console.log('pressed');
                                setSearchNow(!searchNow);
                            }}>
                            <EvilIcons
                                name={searchTerm ? 'search' : 'refresh'}
                                size={20}
                                color="black"
                                style={{ alignSelf: 'center', marginHorizontal: 20 }}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.movieListCard}>
                        <Text style={styles.MovieType}>
                            Now Playing
                        </Text>
                        <FlatList
                            ListFooterComponent={<View />}
                            ListFooterComponentStyle={{ height: 120 }}
                            data={movies}
                            numColumns={2}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={styles.flView}>
                                        <Card style={styles.movieCard}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    navigation.navigate('Movie', { movie: item, genre: getGenres[index].genres });
                                                }}>
                                                <Image
                                                    source={{
                                                        uri: `http://image.tmdb.org/t/p/w780${item.poster_path}`,
                                                    }}
                                                    style={{ width: Constants.width, height: '100%' }}
                                                />

                                            </TouchableOpacity>

                                        </Card>

                                        <Text numberOfLines={1} style={styles.movieTitle} >
                                            {item.title}
                                        </Text>
                                    </View>
                                );
                            }}
                        />

                    </View>
                </View>
            </View>
        );
};

export default HomeScreen;

const styles = StyleSheet.create({
    banner: { width: Constants.width, height: 200 },
    bannerInfoCard: {
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 50,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(21,21,21,0.5)',
    },
    bannerTitle: {
        color: 'white',
        fontSize: 16,
        letterSpacing: 1.2,
    },
    bannerOverview: {
        color: 'grey',
    },
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight * 2,
        backgroundColor: '#212121',
    },
    inputCard: {
        position: 'absolute',
        top: -40,
        margin: 20,
        left: 10,
        right: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 5,
        zIndex: 100,
    },
    input: {
        padding: 10,
        flex: 1,
    },
    movieCard: {
        flex: 1,
        height: 200,
        margin: 5,
        alignSelf: 'center',
        overflow: 'hidden',
        borderWidth: 2,
        width: 200
    },
    movieListCard: {
        top: screen.height * 0.05,
    },
    MovieType: {
        fontSize: 20,
        color: '#fff',
    },
    movieTitle: {
        fontSize: 20,
        color: 'white',
        alignSelf: 'center',
    },
    flView: {
        flex: 1,
        height: 300,
        margin: 5,
        overflow: 'hidden',
        width: 200
    },

});