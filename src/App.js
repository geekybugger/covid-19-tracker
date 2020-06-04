import React from 'react';
import {Cards, Charts, CountryPicker} from './components';

import styles from './App.module.css';
import {fetchData} from './api';

class App extends React.Component{
    
     state ={
         data : {},
     }

    async componentDidMount(){
        const fetchedData = await fetchData();
        this.setState({ data : fetchedData })
    }

    render(){
        return(
            <div className={styles.container}>
                <Cards data = {this.state.data} />
                <CountryPicker />
                <Charts />
            </div>
        )
    }
}
export default App;