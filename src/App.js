import React from 'react';
import {Cards, Charts, CountryPicker, Appbar} from './components';

import styles from './App.module.css';
import {fetchData} from './api';

class App extends React.Component{
    
     state ={
         data : {},
         country : '' ,
     }

    async componentDidMount(){
        const fetchedData = await fetchData();
        this.setState({ data : fetchedData })
    }

    handleCountryChange = async (country) => {
        // fetch the data
        // set the state
        const fetchedData = await fetchData(country);
        console.log(fetchedData);
        this.setState({ data : fetchedData, country: country })
    }

    render(){
        return(
            <div>  
                <Appbar />
                <div className={styles.container}>

                    <Cards data = {this.state.data} />
                    <CountryPicker handleCountryChange = {this.handleCountryChange} />
                    <Charts data={this.state.data} country={this.state.country} />
                </div>
            </div>
        )
    }
}
export default App;