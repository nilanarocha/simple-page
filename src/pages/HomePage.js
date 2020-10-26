import { Component, Fragment } from 'react';
import MenuBar from '../components/MenuBar';
import Footer from '../components/Footer';
import './HomePage.css';

class HomePage extends Component {
  state = {
    title: '',
    image: '',
    article: '',
  };
  componentDidMount() {
    this.callBackendAPI()
      .then((response) => this.setState({ ...response }))
      .catch((error) => console.log(error));
  }

  callBackendAPI = async () => {
    const response = await fetch('/api/article');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  render() {
    const { title, image, article } = this.state;
    return (
      <Fragment>
        <MenuBar />
        <article>
          <h1>{title || 'title not found'}</h1>
          {image ? (
            <img src={image} alt="cat" />
          ) : (
            <img
              src="https://www.macedonrangeshalls.com.au/wp-content/uploads/2017/10/image-not-found.png"
              alt="cat"
            />
          )}
          {article && <p>{article}</p>}
        </article>
        <Footer />
      </Fragment>
    );
  }
}

export default HomePage;
