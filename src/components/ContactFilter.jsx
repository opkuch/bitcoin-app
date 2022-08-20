import { Component } from 'react'

export class ContactFilter extends Component {
  state = {
    term: '',
  }
  handleChange = ({ target }) => {
    const value = target.type === 'number' ? +target.value || '' : target.value
    this.setState({ term: value }, () => {
      this.props.onChangeFilter({ ...this.state })
    })
  }

  render() {
    const { term } = this.state
    return (
      <div className="contact-filter">
        <section>
          <label htmlFor="searchContact"></label>
          <input
            value={term}
            onChange={this.handleChange}
            type="text"
            name="searchContact"
            id="searchContact"
            placeholder='Search for contacts..'
            autoFocus
          />
        </section>
      </div>
    )
  }
}
