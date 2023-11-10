import React, { useState, useEffect } from "react";
import './rankingBanner.css'
import CharacterImg from '../../Pictures/EulaInfo.png'
import axios from 'axios';
// import { response } from 'express';

function RankingBanner() {
    axios.defaults.baseURL = 'http://localhost:5000/api'; // Replace with your API URL
    axios.defaults.withCredentials = true;

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/get/rerun-ranking')
        .then((response) => {
            // Handle the successful response here
            setData(response.data);
        })
        .catch((error) => {
            // Handle errors here
            console.error("Error fetching data: ", error);
        });
    }, []);

    // console.log(data)
    
    return (
        <table>
            <thead>
                <tr>
                    <th className="ranking-label-text">5 star Banner Rerun Ranking</th>
                    <th>last rerun patch</th>
                    <th>No. since last rerun</th>   
                </tr>
            </thead>
            <tbody>
                {Object.entries(data).map(([character, [value1, value2]], index) => (
                    <tr key={character}>
                        <td className='image-ranking-container'>
                            <div className='char-name'>{character}</div>
                            <div className={`characterProfile-container ${index === 0 ? 'first-item' : ''}`}>
                                {/* <img className='characterImg' src={CharacterImg} alt={character} /> */}
                                <img className='characterImg' src={getImagePathForCharacter(character)} alt= {character} />
                            </div>
                            <div className={`circle ${index === 0 ? 'first-item' : ''}`}>{index + 1}</div>
                        </td>
                        <td className='text-ranking'>{value1}</td>
                        <td className='text-ranking'>{value2}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default RankingBanner

function getImagePathForCharacter(chName) {
    const lowerCaseChName = chName.toLowerCase();
    const formattedName = lowerCaseChName.replace(/\s/g, '-');
    const return_name = process.env.PUBLIC_URL + '/character-img/' + formattedName + '-icon.png'
    return return_name;
}