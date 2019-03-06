import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const intialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
constructor() {
  super();
    this.state = intialState;
}

calculateFaceLocations = (data) => {  
  const image = document.getElementById('inputImage');
  const height = image.height;
  const width = image.width;
  return data.outputs[0].data.regions.map(face => {
    const clarifaiFace = face.region_info.bounding_box;
    return {
        leftCol: (clarifaiFace.left_col * width),
        topRow: (clarifaiFace.top_row * height),
        rightCol: (width - clarifaiFace.right_col * width),
        bottomRow: (height - clarifaiFace.bottom_row * height)  
      }
  });
}



displayFaceBoxes = (boxes) => {
  this.setState({boxes: boxes});
}

onInputChange = (event) => {
  this.setState({ input: event.target.value });
}

onButtonSubmit = () => {
  this.setState({ imageUrl: this.state.input })
  fetch('https://ghostly-shadow-53379.herokuapp.com/imageurl', {
    method: 'post',
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify({
      input: this.state.input
    })
  })
  .then(response => response.json())
    .then(response => {
      if (response) {
        fetch('https://ghostly-shadow-53379.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count}))
            })
          .catch(console.log)
      }
      this.displayFaceBoxes(this.calculateFaceLocations(response))
  })
    .catch(err => console.log(err));
}

onRouteChange = (route) => {
  if (route === 'signout') {
    this.setState(intialState);
  } else if (route === 'home') {
    this.setState({isSignedIn: true});
  }
  this.setState({route: route});
}

loadUser = (data) => {
  this.setState({user: {
    id: data.id,
    name: data.name,
    email: data.email,
    password: data.password,
    entries: data.entries,
    joined: data.joined
  }})
}

  render() {
    const {imageUrl, route, boxes, user, isSignedIn } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
              params={particlesOptions}
            />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home'
          ? <div>
          <Logo />
          <Rank name={user.name} entries={user.entries}/>
          <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition boxes={boxes} imageUrl={imageUrl}/>
        </div>
          : (
            route === 'signin'
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          )}
      </div>
    );
  }
}

export default App;
