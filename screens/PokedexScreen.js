import React, { 
    Component, 
    PropTypes 
} from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ListView,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { fetchPokemon } from '../actions/actions.pokedex';
import cacheAssetsAsync from '../utilities/cacheAssetsAsync';
import PokemonListItem from '../components/PokemonListItem';


export class PokedexScreen extends Component {

    static route = {
        navigationBar: {
            title: 'Pokemon',
            backgroundColor: '#a70c00'
        },
    }

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        pokemon: PropTypes.array.isRequired
    }

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: this.ds.cloneWithRows(props.pokemon)
        }
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.pokemon),
      });
    }

    componentDidMount() {
      let { dispatch } = this.props;
      dispatch(fetchPokemon());
    }

    _renderRow(pokemon) {
      return (
        <PokemonListItem key={`${pokemon.name}`} pokemon={pokemon} />
      );
    }

    render() {
      return (
        <View>
          <ListView
            enableEmptySections
            dataSource={this.state.dataSource}
            renderRow={pokemon => this._renderRow(pokemon)}
          />
        </View>
      )
    }
}

/** TODO: share with all screens */
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#a70c00'
    },
    container: {
        flex: 1,
    },
    list: {
        flex: 1,
    },
});

export default connect(
    state => ({
        pokemon: state.pokedex.pokemon
    })
)(PokedexScreen);