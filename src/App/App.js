import React, { Component } from "react";
import API from "../api/api";
import styled from "styled-components";

class App extends Component {
  state = {
    name: "",
    sprite: "",
    stats: []
  };
  componentDidMount() {
    this.getPokemon();
  }

  getPokemon = () =>
    API().then(res => {
      console.log(res.data.stats);
      const pokemon = res.data;
      this.setState({
        name: pokemon.name,
        sprite: pokemon.sprites.front_default,
        stats: pokemon.stats
      });
    });
  handleClick = () => {
    this.getPokemon();
  };
  render() {
    return (
      <>
        <Logo
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2000px-International_Pok%C3%A9mon_logo.svg.png"
          alt="Pokemon Logo"
        />
        <Container>
          <Name>{this.state.name}</Name>
          <SpriteContainer>
            <Sprite src={this.state.sprite} alt={this.state.name} />
            <div>
              {this.state.stats.map(({ stat, base_stat }, index) => (
                <p key={index}>
                  <span className="stat-name">{stat.name}:</span> {base_stat}
                </p>
              ))}
            </div>
          </SpriteContainer>
          <Button onClick={this.handleClick}>New Pokemon</Button>
        </Container>
      </>
    );
  }
}

const Logo = styled.img`
  width: 350px;
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  justify-items: center;
  padding: 10px;
  grid-gap: 20px;
  border: 3px solid black;
  border-radius: 5px;
  background: white;
`;

const SpriteContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 128px 1fr;
  .stat-name {
    font-weight: 700;
  }
`;

const Sprite = styled.img`
  margin: 30px auto;
  padding: 0;
  background: white;
  align-self: center;
  width: 128px;
`;

const Name = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

const Button = styled.button`
  margin: 10px auto;
  padding: 10px;
  border-width: 0;
  outline: none;
  border-radius: 2px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
  background-color: #2ecc71;
  color: #ecf0f1;
  transition: background-color 0.3s;
  &:hover,
  &:focus {
    background-color: #27ae60;
  }
`;

export default App;
