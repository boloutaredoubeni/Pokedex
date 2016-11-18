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

export class PokedexScreen extends Component {

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

    _renderRow(aPokemon) {
        let num = (() => {
            let { url } = aPokemon;
            let parts = url.split('/');
            return parts[parts.length - 2];
        })();
        return (
            <View >
                <Text>#{num}</Text>
                {this._renderPokemonIcon(num)}
                <Text>{aPokemon.name}</Text>
            </View>
        );
    }

    _renderPokemonIcon(num) {
        let assetUrl = `pokemon-sprites/sprites/pokemon/other-sprites/official-artwork/${num}.png`
        return (
            <Image
                style={{width: 50, height: 50}} 
                source={require(assetUrl)}/>
        )
    }

    render() {
        return (
            <View>
                <ListView
                    enableEmptySections
                    dataSource={this.state.dataSource}
                    renderRow={aPokemon => this._renderRow(aPokemon)}
                />
            </View>
        )
    }
}

export default connect(
    state => ({
        pokemon: state.pokedex.pokemon
    })
)(PokedexScreen);