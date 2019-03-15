import React from 'react';

class Rank extends React.Component {
  constructor() {
    super();
    this.state = {
      emoji: ''
    }
  }

  componentDidMount() {
    this.generateEmoji(this.props.entries);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.entries === this.props.entries && this.props.prevProps === this.props.name) {
      return null;
    }
    this.generateEmoji(this.props.entries);
  }

  generateEmoji = (entries) => {
    fetch(`https://twv7o0ex20.execute-api.us-east-1.amazonaws.com/dev/rank?rank=${entries}`)
    .then(response => response.json())
    .then(data => this.setState({emoji: data.input}))
    .catch(console.log)
  }

  render() {
    return (
      <div>
          <div className='white f3'>
            {`${this.props.name}, your current entry count is...`}
          </div>
          <div className='white f1'>
            { this.props.entries }
          </div>
          <div>
            {`Badge rank: ${this.state.emoji}`}
          </div>
      </div>
    );
  }
}

export default Rank;